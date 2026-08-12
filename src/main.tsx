// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/index";
import { LanguageProvider, type Lang } from "./i18n";
import { CmsProvider } from "./cms";
import LanguageUrlSync from "./components/LanguageUrlSync";
import SeoManager from "./components/SeoManager";
import "./index.css";

const localeMatch = window.location.pathname.match(/^\/(en|zh)(?=\/|$)/);
const initialLang: Lang = localeMatch?.[1] === "en" ? "en" : localeMatch?.[1] === "zh" ? "zh" : "ru";
const basename = initialLang === "ru" ? "/" : `/${initialLang}`;

// URL is the source of truth for language on direct visits and search-engine crawls.
localStorage.setItem("tektonika-lang", initialLang);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <LanguageProvider>
        <CmsProvider>
          <LanguageUrlSync />
          <SeoManager />
          <AppRoutes />
        </CmsProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
