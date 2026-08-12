import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { type Lang, useI18n } from "../i18n";

const BASE_URL = "https://www.tektonikadv.ru";
const DEFAULT_IMAGE = `${BASE_URL}/og-cover.jpg`;

type LocalizedSeo = Record<Lang, { title: string; description: string }>;

type PageSeo = LocalizedSeo & {
  schemaType?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  index?: boolean;
};

const pages: Record<string, PageSeo> = {
  "/": {
    schemaType: "WebPage",
    ru: {
      title: "Геолого-геофизические исследования и геологоразведка | ТЕКТОНИКА",
      description:
        "ООО «ТЕКТОНИКА» выполняет геологические и геофизические исследования, магниторазведку, электроразведку, БПЛА-съёмку, топографию и камеральную обработку на Дальнем Востоке и по России.",
    },
    en: {
      title: "Geological & Geophysical Surveys in Russia | TEKTONIKA",
      description:
        "TEKTONIKA provides geological and geophysical surveys, magnetic and electrical exploration, UAV mapping, topography, data processing and reporting across the Russian Far East and Russia.",
    },
    zh: {
      title: "俄罗斯地质与地球物理勘探服务 | TEKTONIKA",
      description:
        "TEKTONIKA 在俄罗斯远东及全俄提供地质调查、地球物理勘探、磁法与电法勘探、无人机测绘、地形测量、数据处理和报告服务。",
    },
  },
  "/services": {
    schemaType: "CollectionPage",
    ru: {
      title: "Геофизические и геологоразведочные услуги | ТЕКТОНИКА",
      description:
        "Полный цикл геолого-геофизических работ: геологическое изучение, магниторазведка, электроразведка, топография и БПЛА, лабораторные измерения, 1D/2D/3D интерпретация и отчётность.",
    },
    en: {
      title: "Geophysical & Geological Exploration Services | TEKTONIKA",
      description:
        "Full-cycle geological and geophysical services: field geology, magnetic and electrical surveys, UAV mapping, topography, laboratory measurements, 1D/2D/3D interpretation and reporting.",
    },
    zh: {
      title: "地球物理与地质勘探服务 | TEKTONIKA",
      description:
        "全周期地质与地球物理服务：野外地质、磁法勘探、电法勘探、无人机测绘、地形测量、实验室测量、1D/2D/3D 解释和报告。",
    },
  },
  "/projects": {
    schemaType: "CollectionPage",
    ru: {
      title: "Проекты геологоразведки и геофизики | ТЕКТОНИКА",
      description:
        "Проекты ООО «ТЕКТОНИКА» и опыт команды: аэромагниторазведка БПЛА, электроразведка, геохимические поиски и камеральная обработка в Хабаровском крае, Приморье, Якутии, Магаданской области и других регионах.",
    },
    en: {
      title: "Geological & Geophysical Survey Projects | TEKTONIKA",
      description:
        "Explore TEKTONIKA projects and team experience in UAV aeromagnetic surveys, electrical exploration, geochemical prospecting and data interpretation across Russia.",
    },
    zh: {
      title: "地质与地球物理勘探项目 | TEKTONIKA",
      description:
        "了解 TEKTONIKA 在俄罗斯各地区开展的无人机航空磁测、电法勘探、地球化学找矿和数据解释项目与团队经验。",
    },
  },
  "/about": {
    schemaType: "AboutPage",
    ru: {
      title: "О компании ООО «ТЕКТОНИКА» | Геология и геофизика",
      description:
        "ООО «ТЕКТОНИКА» — инженерная геолого-геофизическая команда из Хабаровска. Полевые исследования, БПЛА, собственное производство, камеральная обработка и техническая отчётность.",
    },
    en: {
      title: "About TEKTONIKA | Geological & Geophysical Engineering",
      description:
        "TEKTONIKA is a Khabarovsk-based geological and geophysical engineering team combining field surveys, UAV technology, in-house production, data processing and technical reporting.",
    },
    zh: {
      title: "关于 TEKTONIKA | 地质与地球物理工程",
      description:
        "TEKTONIKA 是位于哈巴罗夫斯克的地质与地球物理工程团队，业务涵盖野外调查、无人机技术、自主生产、数据处理和技术报告。",
    },
  },
  "/research": {
    schemaType: "CollectionPage",
    ru: {
      title: "Научная деятельность и геофизические исследования | ТЕКТОНИКА",
      description:
        "Методические материалы и исследования ООО «ТЕКТОНИКА»: геофизическая интерпретация, 1D/2D/3D моделирование, БПЛА-технологии, физические свойства образцов и контроль качества полевых данных.",
    },
    en: {
      title: "Research & Geophysical Methods | TEKTONIKA",
      description:
        "TEKTONIKA research and applied methods in geophysical interpretation, 1D/2D/3D modelling, UAV technologies, physical sample properties and field-data quality control.",
    },
    zh: {
      title: "科研与地球物理方法 | TEKTONIKA",
      description:
        "TEKTONIKA 的应用研究与方法，包括地球物理解释、1D/2D/3D 建模、无人机技术、样品物性测量和野外数据质量控制。",
    },
  },
  "/media": {
    schemaType: "CollectionPage",
    ru: {
      title: "Медиа и полевые работы | ООО «ТЕКТОНИКА»",
      description:
        "Фотографии, новости и материалы о полевых геологических и геофизических работах, экспедициях, оборудовании и БПЛА ООО «ТЕКТОНИКА».",
    },
    en: {
      title: "Fieldwork Media & News | TEKTONIKA",
      description:
        "Photos, news and materials from TEKTONIKA geological and geophysical fieldwork, expeditions, equipment and UAV operations.",
    },
    zh: {
      title: "野外工作媒体与新闻 | TEKTONIKA",
      description:
        "TEKTONIKA 地质与地球物理野外作业、勘探活动、设备和无人机工作的照片、新闻与资料。",
    },
  },
  "/careers": {
    schemaType: "CollectionPage",
    ru: {
      title: "Вакансии и работа в геологоразведке | ТЕКТОНИКА",
      description:
        "Актуальные вакансии ООО «ТЕКТОНИКА» для полевых и инженерных специалистов. Работа в геологоразведке, геофизике и БПЛА-проектах на Дальнем Востоке.",
    },
    en: {
      title: "Careers in Geological Exploration | TEKTONIKA",
      description:
        "Current TEKTONIKA vacancies for field and engineering specialists working on geological exploration, geophysics and UAV projects in the Russian Far East.",
    },
    zh: {
      title: "地质勘探职位与招聘 | TEKTONIKA",
      description:
        "TEKTONIKA 面向野外和工程专业人员的最新职位，参与俄罗斯远东地区的地质勘探、地球物理和无人机项目。",
    },
  },
  "/contacts": {
    schemaType: "ContactPage",
    ru: {
      title: "Контакты ООО «ТЕКТОНИКА» — Хабаровск",
      description:
        "Контакты ООО «ТЕКТОНИКА»: Хабаровск, ул. Ким Ю Чена, 65, офис 326. Телефоны, e-mail и форма запроса на геологические и геофизические работы.",
    },
    en: {
      title: "Contact TEKTONIKA — Khabarovsk, Russia",
      description:
        "Contact TEKTONIKA in Khabarovsk, Russia. Phone, email, office address and enquiry form for geological and geophysical survey projects.",
    },
    zh: {
      title: "联系 TEKTONIKA — 俄罗斯哈巴罗夫斯克",
      description:
        "联系位于俄罗斯哈巴罗夫斯克的 TEKTONIKA。获取电话、邮箱、办公地址，并提交地质与地球物理项目咨询。",
    },
  },
  "/privacy": {
    schemaType: "WebPage",
    ru: { title: "Политика конфиденциальности | ТЕКТОНИКА", description: "Политика обработки и защиты персональных данных на сайте ООО «ТЕКТОНИКА»." },
    en: { title: "Privacy Policy | TEKTONIKA", description: "Privacy and personal data processing policy for the TEKTONIKA website." },
    zh: { title: "隐私政策 | TEKTONIKA", description: "TEKTONIKA 网站的隐私与个人数据处理政策。" },
  },
  "/agreement": {
    schemaType: "WebPage",
    ru: { title: "Пользовательское соглашение | ТЕКТОНИКА", description: "Пользовательское соглашение и условия использования сайта ООО «ТЕКТОНИКА»." },
    en: { title: "Terms of Use | TEKTONIKA", description: "Terms and conditions for using the TEKTONIKA website." },
    zh: { title: "网站使用条款 | TEKTONIKA", description: "TEKTONIKA 网站的使用条款与条件。" },
  },
  "/media/news/expedition-launch": {
    schemaType: "WebPage",
    ru: {
      title: "Старт полевого сезона и экспедиции | ТЕКТОНИКА",
      description: "Новости ООО «ТЕКТОНИКА» о подготовке и старте полевых геолого-геофизических работ и экспедиций.",
    },
    en: { title: "Field Season & Expedition Launch | TEKTONIKA", description: "TEKTONIKA news about preparations and the start of geological and geophysical field expeditions." },
    zh: { title: "野外季与勘探启动 | TEKTONIKA", description: "TEKTONIKA 关于地质与地球物理野外勘探准备和启动的新闻。" },
  },
};

const breadcrumbNames: Record<Lang, Record<string, string>> = {
  ru: { services: "Услуги", projects: "Проекты", about: "О компании", research: "Научная деятельность", media: "Медиа", careers: "Карьера", contacts: "Контакты", privacy: "Политика конфиденциальности", agreement: "Пользовательское соглашение", news: "Новости", "expedition-launch": "Старт экспедиции" },
  en: { services: "Services", projects: "Projects", about: "About", research: "Research", media: "Media", careers: "Careers", contacts: "Contacts", privacy: "Privacy Policy", agreement: "Terms of Use", news: "News", "expedition-launch": "Expedition Launch" },
  zh: { services: "服务", projects: "项目", about: "关于我们", research: "科研活动", media: "媒体", careers: "招聘", contacts: "联系方式", privacy: "隐私政策", agreement: "使用条款", news: "新闻", "expedition-launch": "勘探启动" },
};

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element!.setAttribute(key, value));
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
}

function buildBreadcrumb(pathname: string, lang: Lang) {
  const homeName = lang === "ru" ? "Главная" : lang === "zh" ? "首页" : "Home";
  const parts = pathname.split("/").filter(Boolean);
  const itemListElement = [
    { "@type": "ListItem", position: 1, name: homeName, item: BASE_URL },
    ...parts.map((part, index) => ({
      "@type": "ListItem",
      position: index + 2,
      name: breadcrumbNames[lang][part] || part,
      item: `${BASE_URL}/${parts.slice(0, index + 1).join("/")}`,
    })),
  ];
  return { "@type": "BreadcrumbList", "@id": `${BASE_URL}${pathname}#breadcrumb`, itemListElement };
}

export default function SeoManager() {
  const { pathname } = useLocation();
  const { lang } = useI18n();

  useEffect(() => {
    const normalized = pathname !== "/" ? pathname.replace(/\/$/, "") : "/";
    const page = pages[normalized];
    const fallback = pages["/"];
    const seo = (page || fallback)[lang];
    const shouldIndex = page?.index !== false && Boolean(page);
    const canonical = `${BASE_URL}${normalized === "/" ? "" : normalized}`;
    const locale = lang === "ru" ? "ru_RU" : lang === "zh" ? "zh_CN" : "en_US";

    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
    document.title = seo.title;

    upsertMeta('meta[name="description"]', { name: "description", content: seo.description });
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: shouldIndex ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" : "noindex, nofollow",
    });
    upsertMeta('meta[name="googlebot"]', {
      name: "googlebot",
      content: shouldIndex ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" : "noindex, nofollow",
    });

    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: seo.title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: seo.description });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "ТЕКТОНИКА" });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: locale });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: DEFAULT_IMAGE });
    upsertMeta('meta[property="og:image:width"]', { property: "og:image:width", content: "1200" });
    upsertMeta('meta[property="og:image:height"]', { property: "og:image:height", content: "630" });
    upsertMeta('meta[property="og:image:alt"]', { property: "og:image:alt", content: "ООО ТЕКТОНИКА — геолого-геофизические исследования" });

    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: seo.title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: seo.description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: DEFAULT_IMAGE });

    upsertLink("canonical", canonical);

    document.head.querySelectorAll('script[data-seo-jsonld="true"]').forEach((node) => node.remove());
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
        "@type": page?.schemaType || "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: seo.title,
        description: seo.description,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        about: { "@id": `${BASE_URL}/#organization` },
        breadcrumb: { "@id": `${canonical}#breadcrumb` },
        inLanguage: lang === "zh" ? "zh-CN" : lang,
      },
      buildBreadcrumb(normalized, lang),
    ];

    if (normalized === "/services") {
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
    script.dataset.seoJsonld = "true";
    script.text = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
    document.head.appendChild(script);
  }, [lang, pathname]);

  return null;
}
