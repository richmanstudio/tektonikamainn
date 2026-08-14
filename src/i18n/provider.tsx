import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import ru from "./locales/ru";
import en from "./locales/en";
import zh from "./locales/zh";
import type { Dictionary, Lang } from "./types";

const dictionaries: Record<Lang, Dictionary> = { ru, en, zh };

const LanguageContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void; t: Dictionary }>({
  lang: "ru",
  setLang: () => undefined,
  t: dictionaries.ru,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem("tektonika-lang");
    return stored === "en" || stored === "zh" ? stored : "ru";
  });

  const setLang = (next: Lang) => {
    localStorage.setItem("tektonika-lang", next);
    setLangState(next);
  };

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: dictionaries[lang] }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  return useContext(LanguageContext);
}

export const languages: { code: Lang; label: string }[] = [
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
  { code: "zh", label: "中文" },
];
