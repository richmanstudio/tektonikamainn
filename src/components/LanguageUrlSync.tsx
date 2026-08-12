import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useI18n } from "../i18n";

export default function LanguageUrlSync() {
  const location = useLocation();
  const { lang } = useI18n();

  useEffect(() => {
    const rawPath = window.location.pathname;
    const match = rawPath.match(/^\/(en|zh)(?=\/|$)/);
    const currentUrlLang = match?.[1] || "ru";

    if (currentUrlLang === lang) return;

    const prefix = lang === "ru" ? "" : `/${lang}`;
    const relativePath = location.pathname === "/" ? "/" : location.pathname;
    const target = `${prefix}${relativePath}${location.search}${location.hash}`;
    window.location.assign(target);
  }, [lang, location.hash, location.pathname, location.search]);

  return null;
}
