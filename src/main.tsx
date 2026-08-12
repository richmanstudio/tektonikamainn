// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/index";
import { LanguageProvider } from "./i18n";
import { CmsProvider } from "./cms";
import SeoManager from "./components/SeoManager";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <CmsProvider>
        <BrowserRouter>
          <SeoManager />
          <AppRoutes />
        </BrowserRouter>
      </CmsProvider>
    </LanguageProvider>
  </React.StrictMode>
);
