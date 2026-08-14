import fs from "node:fs/promises";
import path from "node:path";

// One-time deterministic migration: preserve dictionary content while separating locale modules.
const sourcePath = path.resolve("src/i18n.tsx");
const targetDir = path.resolve("src/i18n");
const localesDir = path.join(targetDir, "locales");

function between(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  if (start === -1) throw new Error(`Missing marker: ${startMarker}`);
  const contentStart = start + startMarker.length;
  const end = source.indexOf(endMarker, contentStart);
  if (end === -1) throw new Error(`Missing marker: ${endMarker}`);
  return source.slice(contentStart, end).trim();
}

function stripTrailingComma(value) {
  return value.replace(/,\s*$/, "");
}

async function main() {
  const source = await fs.readFile(sourcePath, "utf8");
  if (source.includes('export * from "./i18n/index"')) {
    console.log("i18n is already split; no changes required.");
    return;
  }

  const ruRaw = between(source, "const dictionaries = {\n  ru: ", "\n  en: {} as Dictionary,");
  const enRaw = between(source, "dictionaries.en = ", ";\n\ndictionaries.zh = ");
  const zhRaw = between(source, "dictionaries.zh = ", ";\n\nconst LanguageContext");

  const ruExpression = stripTrailingComma(ruRaw);
  const enExpression = enRaw.replaceAll("dictionaries.ru", "ru");
  const zhExpression = zhRaw.replaceAll("dictionaries.ru", "ru").replaceAll("dictionaries.en", "en");

  await fs.mkdir(localesDir, { recursive: true });

  await fs.writeFile(
    path.join(targetDir, "types.ts"),
    'export type Lang = "ru" | "en" | "zh";\nexport type Dictionary = Record<string, any>;\n',
    "utf8"
  );

  await fs.writeFile(
    path.join(localesDir, "ru.ts"),
    `import type { Dictionary } from "../types";\n\nconst ru: Dictionary = ${ruExpression};\n\nexport default ru;\n`,
    "utf8"
  );

  await fs.writeFile(
    path.join(localesDir, "en.ts"),
    `import ru from "./ru";\nimport type { Dictionary } from "../types";\n\nconst en: Dictionary = ${enExpression};\n\nexport default en;\n`,
    "utf8"
  );

  await fs.writeFile(
    path.join(localesDir, "zh.ts"),
    `import ru from "./ru";\nimport en from "./en";\nimport type { Dictionary } from "../types";\n\nconst zh: Dictionary = ${zhExpression};\n\nexport default zh;\n`,
    "utf8"
  );

  await fs.writeFile(
    path.join(targetDir, "provider.tsx"),
    `import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";\nimport ru from "./locales/ru";\nimport en from "./locales/en";\nimport zh from "./locales/zh";\nimport type { Dictionary, Lang } from "./types";\n\nconst dictionaries: Record<Lang, Dictionary> = { ru, en, zh };\n\nconst LanguageContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void; t: Dictionary }>({\n  lang: "ru",\n  setLang: () => undefined,\n  t: dictionaries.ru,\n});\n\nexport function LanguageProvider({ children }: { children: ReactNode }) {\n  const [lang, setLangState] = useState<Lang>(() => {\n    const stored = localStorage.getItem("tektonika-lang");\n    return stored === "en" || stored === "zh" ? stored : "ru";\n  });\n\n  const setLang = (next: Lang) => {\n    localStorage.setItem("tektonika-lang", next);\n    setLangState(next);\n  };\n\n  useEffect(() => {\n    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;\n  }, [lang]);\n\n  const value = useMemo(() => ({ lang, setLang, t: dictionaries[lang] }), [lang]);\n  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;\n}\n\nexport function useI18n() {\n  return useContext(LanguageContext);\n}\n\nexport const languages: { code: Lang; label: string }[] = [\n  { code: "ru", label: "RU" },\n  { code: "en", label: "EN" },\n  { code: "zh", label: "中文" },\n];\n`,
    "utf8"
  );

  await fs.writeFile(
    path.join(targetDir, "index.ts"),
    'export { LanguageProvider, languages, useI18n } from "./provider";\nexport type { Dictionary, Lang } from "./types";\n',
    "utf8"
  );

  await fs.writeFile(sourcePath, 'export * from "./i18n/index";\n', "utf8");
  console.log("i18n split into provider/types/locales without changing dictionary content.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
