import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { type Lang, useI18n } from "../i18n";

const BASE_URL = "https://www.tektonikadv.ru";

const schemaTypes: Record<string, string> = {
  "/": "WebPage",
  "/services": "CollectionPage",
  "/projects": "CollectionPage",
  "/about": "AboutPage",
  "/research": "CollectionPage",
  "/media": "CollectionPage",
  "/careers": "CollectionPage",
  "/contacts": "ContactPage",
  "/privacy": "WebPage",
  "/agreement": "WebPage",
  "/media/news/expedition-launch": "WebPage",
};

const breadcrumbNames: Record<Lang, Record<string, string>> = {
  ru: { services: "Услуги", projects: "Проекты", about: "О компании", research: "Научная деятельность", media: "Медиа", careers: "Карьера", contacts: "Контакты", privacy: "Политика конфиденциальности", agreement: "Пользовательское соглашение", news: "Новости", "expedition-launch": "Старт экспедиции" },
  en: { services: "Services", projects: "Projects", about: "About", research: "Research", media: "Media", careers: "Careers", contacts: "Contacts", privacy: "Privacy Policy", agreement: "Terms of Use", news: "News", "expedition-launch": "Expedition Launch" },
  zh: { services: "服务", projects: "项目", about: "关于我们", research: "科研活动", media: "媒体", careers: "招聘", contacts: "联系方式", privacy: "隐私政策", agreement: "使用条款", news: "新闻", "expedition-launch": "勘探启动" },
};

function localizedUrl(pathname: string, lang: Lang) {
  const clean = pathname === "/" ? "" : pathname;
  const prefix = lang === "ru" ? "" : `/${lang}`;
  return `${BASE_URL}${prefix}${clean}` || BASE_URL;
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
}

function setOgUrl(url: string) {
  let meta = document.head.querySelector<HTMLMetaElement>('meta[property="og:url"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", "og:url");
    document.head.appendChild(meta);
  }
  meta.content = url;
}

function addAlternate(hreflang: string, href: string) {
  const link = document.createElement("link");
  link.rel = "alternate";
  link.hreflang = hreflang;
  link.href = href;
  link.dataset.localeSeo = "true";
  document.head.appendChild(link);
}

function buildBreadcrumb(pathname: string, lang: Lang) {
  const parts = pathname.split("/").filter(Boolean);
  const homeName = lang === "ru" ? "Главная" : lang === "zh" ? "首页" : "Home";
  return {
    "@type": "BreadcrumbList",
    "@id": `${localizedUrl(pathname, lang)}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: homeName, item: localizedUrl("/", lang) },
      ...parts.map((part, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: breadcrumbNames[lang][part] || part,
        item: localizedUrl(`/${parts.slice(0, index + 1).join("/")}`, lang),
      })),
    ],
  };
}

export default function LocaleSeoOverrides() {
  const location = useLocation();
  const { lang } = useI18n();

  useEffect(() => {
    const pathname = location.pathname !== "/" ? location.pathname.replace(/\/$/, "") : "/";
    const canonical = localizedUrl(pathname, lang);
    const title = document.title;
    const description = document.head.querySelector<HTMLMetaElement>('meta[name="description"]')?.content || "";

    setCanonical(canonical);
    setOgUrl(canonical);

    document.head.querySelectorAll('link[data-locale-seo="true"]').forEach((node) => node.remove());
    addAlternate("ru", localizedUrl(pathname, "ru"));
    addAlternate("en", localizedUrl(pathname, "en"));
    addAlternate("zh-CN", localizedUrl(pathname, "zh"));
    addAlternate("x-default", localizedUrl(pathname, "ru"));

    // Keep a single, locale-correct JSON-LD graph after the generic runtime SEO layer runs.
    document.head.querySelectorAll('script[data-static-seo="true"], script[data-seo-jsonld="true"], script[data-locale-jsonld="true"]').forEach((node) => node.remove());

    const graph: Record<string, unknown>[] = [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "ООО «ТЕКТОНИКА»",
        alternateName: "TEKTONIKA",
        url: BASE_URL,
        logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.webp`, width: 512, height: 512 },
        email: "tektonikayur16@gmail.com",
        telephone: ["+79243015165", "+79842626115"],
        address: {
          "@type": "PostalAddress",
          streetAddress: "ул. Ким Ю Чена, д. 65, офис 326",
          addressLocality: "Хабаровск",
          addressRegion: "Хабаровский край",
          postalCode: "680000",
          addressCountry: "RU",
        },
        areaServed: { "@type": "Country", name: "Россия" },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+79842626115",
          contactType: "sales",
          availableLanguage: ["Russian", "English", "Chinese"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "ТЕКТОНИКА",
        publisher: { "@id": `${BASE_URL}/#organization` },
        inLanguage: lang === "zh" ? "zh-CN" : lang,
      },
      {
        "@type": schemaTypes[pathname] || "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: title,
        description,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        about: { "@id": `${BASE_URL}/#organization` },
        breadcrumb: { "@id": `${canonical}#breadcrumb` },
        inLanguage: lang === "zh" ? "zh-CN" : lang,
      },
      buildBreadcrumb(pathname, lang),
    ];

    if (pathname === "/services") {
      graph.push({
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: lang === "ru" ? "Геолого-геофизические исследования" : lang === "zh" ? "地质与地球物理调查" : "Geological and geophysical surveys",
        provider: { "@id": `${BASE_URL}/#organization` },
        areaServed: { "@type": "Country", name: "Россия" },
        serviceType: ["Геологическое изучение", "Магниторазведка", "Электроразведка", "БПЛА и топография", "Камеральная обработка"],
      });
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.localeJsonld = "true";
    script.text = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
    document.head.appendChild(script);
  }, [lang, location.pathname]);

  return null;
}
