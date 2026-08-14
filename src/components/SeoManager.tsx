import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { serviceCatalogBySlug, type ServiceSlug } from "../content/serviceCatalog";
import { type Lang, useI18n } from "../i18n";

const BASE_URL = "https://www.tektonikadv.ru";
const DEFAULT_IMAGE = `${BASE_URL}/og-cover.jpg`;

type SeoCopy = { title: string; description: string };
type LocalizedSeo = Record<Lang, SeoCopy>;
type PageSeo = LocalizedSeo & { schemaType?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" };

const pages: Record<string, PageSeo> = {
  "/": {
    schemaType: "WebPage",
    ru: { title: "Геолого-геофизические исследования и геологоразведка | ТЕКТОНИКА", description: "ООО «ТЕКТОНИКА» выполняет геологические и геофизические исследования, магниторазведку, электроразведку, БПЛА-съёмку, топографию и камеральную обработку на Дальнем Востоке и по России." },
    en: { title: "Geological & Geophysical Surveys in Russia | TEKTONIKA", description: "TEKTONIKA provides geological and geophysical surveys, magnetic and electrical exploration, UAV mapping, topography, data processing and reporting across the Russian Far East and Russia." },
    zh: { title: "俄罗斯地质与地球物理勘探服务 | TEKTONIKA", description: "TEKTONIKA 在俄罗斯远东及全俄提供地质调查、地球物理勘探、磁法与电法勘探、无人机测绘、地形测量、数据处理和报告服务。" },
  },
  "/services": {
    schemaType: "CollectionPage",
    ru: { title: "Геофизические и геологоразведочные услуги | ТЕКТОНИКА", description: "Полный цикл геолого-геофизических работ: геология, магниторазведка, электроразведка, БПЛА, топография, лаборатория, обработка и интерпретация." },
    en: { title: "Geophysical & Geological Exploration Services | TEKTONIKA", description: "Full-cycle geological and geophysical services: geology, magnetic and electrical surveys, UAV mapping, topography, laboratory measurements, processing and interpretation." },
    zh: { title: "地球物理与地质勘探服务 | TEKTONIKA", description: "全周期地质与地球物理服务：地质、磁法、电法、无人机测绘、地形测量、实验室测量、数据处理与解释。" },
  },
  "/projects": {
    schemaType: "CollectionPage",
    ru: { title: "Проекты геологоразведки и геофизики | ТЕКТОНИКА", description: "Проекты ООО «ТЕКТОНИКА» и опыт команды в аэромагниторазведке, электроразведке, геохимических поисках и камеральной обработке в регионах России." },
    en: { title: "Geological & Geophysical Survey Projects | TEKTONIKA", description: "TEKTONIKA projects and team experience in UAV aeromagnetic surveys, electrical exploration, geochemical prospecting and data interpretation across Russia." },
    zh: { title: "地质与地球物理勘探项目 | TEKTONIKA", description: "了解 TEKTONIKA 在俄罗斯各地区开展的无人机航空磁测、电法勘探、地球化学找矿和数据解释项目。" },
  },
  "/about": {
    schemaType: "AboutPage",
    ru: { title: "О компании ООО «ТЕКТОНИКА» | Геология и геофизика", description: "ООО «ТЕКТОНИКА» — инженерная геолого-геофизическая команда из Хабаровска: поле, БПЛА, производство, обработка и техническая отчётность." },
    en: { title: "About TEKTONIKA | Geological & Geophysical Engineering", description: "TEKTONIKA is a Khabarovsk-based geological and geophysical engineering team combining field surveys, UAV technology, in-house production, processing and reporting." },
    zh: { title: "关于 TEKTONIKA | 地质与地球物理工程", description: "TEKTONIKA 是位于哈巴罗夫斯克的地质与地球物理工程团队，涵盖野外调查、无人机技术、自主生产、数据处理和技术报告。" },
  },
  "/research": {
    schemaType: "CollectionPage",
    ru: { title: "Научная деятельность и геофизические исследования | ТЕКТОНИКА", description: "Методические материалы и исследования: интерпретация, 1D/2D/3D моделирование, БПЛА, свойства образцов и контроль качества полевых данных." },
    en: { title: "Research & Geophysical Methods | TEKTONIKA", description: "Applied research in geophysical interpretation, 1D/2D/3D modelling, UAV technologies, sample properties and field-data quality control." },
    zh: { title: "科研与地球物理方法 | TEKTONIKA", description: "应用研究与方法：地球物理解释、1D/2D/3D 建模、无人机技术、样品物性和野外数据质量控制。" },
  },
  "/media": {
    schemaType: "CollectionPage",
    ru: { title: "Медиа и полевые работы | ООО «ТЕКТОНИКА»", description: "Фотографии и материалы о полевых геологических и геофизических работах, экспедициях, оборудовании и БПЛА ООО «ТЕКТОНИКА»." },
    en: { title: "Fieldwork Media & News | TEKTONIKA", description: "Photos and materials from TEKTONIKA geological and geophysical fieldwork, expeditions, equipment and UAV operations." },
    zh: { title: "野外工作媒体与新闻 | TEKTONIKA", description: "TEKTONIKA 地质与地球物理野外作业、勘探活动、设备和无人机工作的照片与资料。" },
  },
  "/careers": {
    schemaType: "CollectionPage",
    ru: { title: "Вакансии и работа в геологоразведке | ТЕКТОНИКА", description: "Актуальные вакансии ООО «ТЕКТОНИКА» для полевых и инженерных специалистов в геологоразведке, геофизике и БПЛА-проектах." },
    en: { title: "Careers in Geological Exploration | TEKTONIKA", description: "Current TEKTONIKA vacancies for field and engineering specialists in geological exploration, geophysics and UAV projects." },
    zh: { title: "地质勘探职位与招聘 | TEKTONIKA", description: "TEKTONIKA 面向野外和工程专业人员的职位，参与地质勘探、地球物理和无人机项目。" },
  },
  "/contacts": {
    schemaType: "ContactPage",
    ru: { title: "Контакты ООО «ТЕКТОНИКА» — Хабаровск", description: "Контакты ООО «ТЕКТОНИКА»: Хабаровск, телефоны, e-mail и B2B-форма запроса на геологические и геофизические работы." },
    en: { title: "Contact TEKTONIKA — Khabarovsk, Russia", description: "Contact TEKTONIKA in Khabarovsk: phone, email, office address and B2B enquiry form for geological and geophysical projects." },
    zh: { title: "联系 TEKTONIKA — 俄罗斯哈巴罗夫斯克", description: "联系位于俄罗斯哈巴罗夫斯克的 TEKTONIKA：电话、邮箱、办公地址及地质与地球物理项目咨询表单。" },
  },
  "/privacy": {
    ru: { title: "Политика конфиденциальности | ТЕКТОНИКА", description: "Политика обработки и защиты персональных данных на сайте ООО «ТЕКТОНИКА»." },
    en: { title: "Privacy Policy | TEKTONIKA", description: "Privacy and personal data processing policy for the TEKTONIKA website." },
    zh: { title: "隐私政策 | TEKTONIKA", description: "TEKTONIKA 网站的隐私与个人数据处理政策。" },
  },
  "/agreement": {
    ru: { title: "Пользовательское соглашение | ТЕКТОНИКА", description: "Пользовательское соглашение и условия использования сайта ООО «ТЕКТОНИКА»." },
    en: { title: "Terms of Use | TEKTONIKA", description: "Terms and conditions for using the TEKTONIKA website." },
    zh: { title: "网站使用条款 | TEKTONIKA", description: "TEKTONIKA 网站的使用条款与条件。" },
  },
  "/media/news/expedition-launch": {
    ru: { title: "Старт полевого сезона и экспедиции | ТЕКТОНИКА", description: "Новости ООО «ТЕКТОНИКА» о подготовке и старте полевых геолого-геофизических работ и экспедиций." },
    en: { title: "Field Season & Expedition Launch | TEKTONIKA", description: "TEKTONIKA news about preparations and the start of geological and geophysical field expeditions." },
    zh: { title: "野外季与勘探启动 | TEKTONIKA", description: "TEKTONIKA 关于地质与地球物理野外勘探准备和启动的新闻。" },
  },
};

const labels: Record<Lang, Record<string, string>> = {
  ru: { services: "Услуги", projects: "Проекты", about: "О компании", research: "Научная деятельность", media: "Медиа", careers: "Карьера", contacts: "Контакты", privacy: "Политика конфиденциальности", agreement: "Пользовательское соглашение", news: "Новости", "expedition-launch": "Старт экспедиции" },
  en: { services: "Services", projects: "Projects", about: "About", research: "Research", media: "Media", careers: "Careers", contacts: "Contacts", privacy: "Privacy Policy", agreement: "Terms of Use", news: "News", "expedition-launch": "Expedition Launch" },
  zh: { services: "服务", projects: "项目", about: "关于我们", research: "科研活动", media: "媒体", careers: "招聘", contacts: "联系方式", privacy: "隐私政策", agreement: "使用条款", news: "新闻", "expedition-launch": "勘探启动" },
};

function localizedUrl(pathname: string, lang: Lang) {
  const clean = pathname === "/" ? "" : pathname;
  const prefix = lang === "ru" ? "" : `/${lang}`;
  return `${BASE_URL}${prefix}${clean}` || BASE_URL;
}

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let node = document.head.querySelector<HTMLMetaElement>(selector);
  if (!node) {
    node = document.createElement("meta");
    document.head.appendChild(node);
  }
  for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, value);
}

function upsertLink(selector: string, attributes: Record<string, string>) {
  let node = document.head.querySelector<HTMLLinkElement>(selector);
  if (!node) {
    node = document.createElement("link");
    document.head.appendChild(node);
  }
  for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, value);
}

function getSeo(pathname: string, lang: Lang): { copy: SeoCopy; schemaType: string; serviceSlug?: ServiceSlug } | null {
  const serviceMatch = pathname.match(/^\/services\/([a-z0-9-]+)$/);
  if (serviceMatch) {
    const service = serviceCatalogBySlug[serviceMatch[1] as ServiceSlug];
    if (!service) return null;
    return {
      copy: {
        title: `${service.title[lang]} | TEKTONIKA`,
        description: service.description[lang],
      },
      schemaType: "Service",
      serviceSlug: service.slug,
    };
  }
  const page = pages[pathname];
  if (!page) return null;
  return { copy: page[lang], schemaType: page.schemaType || "WebPage" };
}

function buildBreadcrumb(pathname: string, lang: Lang, canonical: string) {
  const parts = pathname.split("/").filter(Boolean);
  const home = lang === "ru" ? "Главная" : lang === "zh" ? "首页" : "Home";
  return {
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: home, item: localizedUrl("/", lang) },
      ...parts.map((part, index) => {
        const service = serviceCatalogBySlug[part as ServiceSlug];
        const name = service ? service.title[lang] : labels[lang][part] || part;
        return { "@type": "ListItem", position: index + 2, name, item: localizedUrl(`/${parts.slice(0, index + 1).join("/")}`, lang) };
      }),
    ],
  };
}

export default function SeoManager() {
  const location = useLocation();
  const { lang } = useI18n();

  useEffect(() => {
    const pathname = location.pathname !== "/" ? location.pathname.replace(/\/$/, "") : "/";
    const seo = getSeo(pathname, lang);
    const shouldIndex = Boolean(seo) && !pathname.startsWith("/tektonika-admin");
    const copy = seo?.copy || {
      title: lang === "ru" ? "Страница не найдена | ТЕКТОНИКА" : lang === "zh" ? "页面未找到 | TEKTONIKA" : "Page not found | TEKTONIKA",
      description: lang === "ru" ? "Запрошенная страница не найдена." : lang === "zh" ? "请求的页面不存在。" : "The requested page could not be found.",
    };
    const canonical = localizedUrl(pathname, lang);
    const locale = lang === "ru" ? "ru_RU" : lang === "zh" ? "zh_CN" : "en_US";

    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
    document.title = copy.title;
    upsertMeta('meta[name="description"]', { name: "description", content: copy.description });
    upsertMeta('meta[name="robots"]', { name: "robots", content: shouldIndex ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" : "noindex, nofollow" });
    upsertMeta('meta[name="googlebot"]', { name: "googlebot", content: shouldIndex ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" : "noindex, nofollow" });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: copy.title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: copy.description });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "ТЕКТОНИКА" });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: locale });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: DEFAULT_IMAGE });
    upsertMeta('meta[property="og:image:alt"]', { property: "og:image:alt", content: "ООО ТЕКТОНИКА — геолого-геофизические исследования" });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: copy.title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: copy.description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: DEFAULT_IMAGE });
    upsertLink('link[rel="canonical"]', { rel: "canonical", href: canonical });

    document.head.querySelectorAll('link[data-seo-alternate="true"]').forEach((node) => node.remove());
    ([['ru', 'ru'], ['en', 'en'], ['zh-CN', 'zh'], ['x-default', 'ru']] as const).forEach(([hreflang, localeLang]) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = hreflang;
      link.href = localizedUrl(pathname, localeLang);
      link.dataset.seoAlternate = "true";
      document.head.appendChild(link);
    });

    document.head.querySelectorAll('script[data-seo-jsonld="true"], script[data-locale-jsonld="true"], script[data-static-seo="true"]').forEach((node) => node.remove());
    if (!shouldIndex || !seo) return;

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
        address: { "@type": "PostalAddress", streetAddress: "ул. Ким Ю Чена, д. 65, офис 326", addressLocality: "Хабаровск", addressRegion: "Хабаровский край", postalCode: "680000", addressCountry: "RU" },
        areaServed: { "@type": "Country", name: "Россия" },
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "ТЕКТОНИКА",
        publisher: { "@id": `${BASE_URL}/#organization` },
        inLanguage: lang === "zh" ? "zh-CN" : lang,
      },
      buildBreadcrumb(pathname, lang, canonical),
    ];

    if (seo.serviceSlug) {
      const service = serviceCatalogBySlug[seo.serviceSlug];
      graph.push({
        "@type": "Service",
        "@id": `${canonical}#service`,
        url: canonical,
        name: service.title[lang],
        description: service.description[lang],
        keywords: service.keywords[lang],
        provider: { "@id": `${BASE_URL}/#organization` },
        areaServed: { "@type": "Country", name: "Россия" },
        availableChannel: { "@type": "ServiceChannel", serviceUrl: localizedUrl("/contacts", lang) },
      });
    } else {
      graph.push({
        "@type": seo.schemaType,
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: copy.title,
        description: copy.description,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        about: { "@id": `${BASE_URL}/#organization` },
        breadcrumb: { "@id": `${canonical}#breadcrumb` },
        inLanguage: lang === "zh" ? "zh-CN" : lang,
      });
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.seoJsonld = "true";
    script.text = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
    document.head.appendChild(script);
  }, [lang, location.pathname]);

  return null;
}
