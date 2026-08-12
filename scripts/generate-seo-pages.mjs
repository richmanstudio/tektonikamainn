import fs from "node:fs/promises";
import path from "node:path";

const BASE_URL = "https://www.tektonikadv.ru";
const DIST = path.resolve("dist");
const LANGS = ["ru", "en", "zh"];

const pages = [
  {
    path: "/",
    priority: "1.0",
    ru: ["Геолого-геофизические исследования и геологоразведка | ТЕКТОНИКА", "ООО «ТЕКТОНИКА» выполняет геологические и геофизические исследования, магниторазведку, электроразведку, БПЛА-съёмку, топографию и камеральную обработку на Дальнем Востоке и по России."],
    en: ["Geological & Geophysical Surveys in Russia | TEKTONIKA", "TEKTONIKA provides geological and geophysical surveys, magnetic and electrical exploration, UAV mapping, topography, data processing and reporting across the Russian Far East and Russia."],
    zh: ["俄罗斯地质与地球物理勘探服务 | TEKTONIKA", "TEKTONIKA 在俄罗斯远东及全俄提供地质调查、地球物理勘探、磁法与电法勘探、无人机测绘、地形测量、数据处理和报告服务。"],
  },
  {
    path: "/services",
    priority: "0.9",
    ru: ["Геофизические и геологоразведочные услуги | ТЕКТОНИКА", "Полный цикл геолого-геофизических работ: геологическое изучение, магниторазведка, электроразведка, топография и БПЛА, лабораторные измерения, 1D/2D/3D интерпретация и отчётность."],
    en: ["Geophysical & Geological Exploration Services | TEKTONIKA", "Full-cycle geological and geophysical services: field geology, magnetic and electrical surveys, UAV mapping, topography, laboratory measurements, 1D/2D/3D interpretation and reporting."],
    zh: ["地球物理与地质勘探服务 | TEKTONIKA", "全周期地质与地球物理服务：野外地质、磁法勘探、电法勘探、无人机测绘、地形测量、实验室测量、1D/2D/3D 解释和报告。"],
  },
  {
    path: "/projects",
    priority: "0.9",
    ru: ["Проекты геологоразведки и геофизики | ТЕКТОНИКА", "Проекты ООО «ТЕКТОНИКА» и опыт команды: аэромагниторазведка БПЛА, электроразведка, геохимические поиски и камеральная обработка в Хабаровском крае, Приморье, Якутии, Магаданской области и других регионах."],
    en: ["Geological & Geophysical Survey Projects | TEKTONIKA", "Explore TEKTONIKA projects and team experience in UAV aeromagnetic surveys, electrical exploration, geochemical prospecting and data interpretation across Russia."],
    zh: ["地质与地球物理勘探项目 | TEKTONIKA", "了解 TEKTONIKA 在俄罗斯各地区开展的无人机航空磁测、电法勘探、地球化学找矿和数据解释项目与团队经验。"],
  },
  {
    path: "/about",
    priority: "0.8",
    ru: ["О компании ООО «ТЕКТОНИКА» | Геология и геофизика", "ООО «ТЕКТОНИКА» — инженерная геолого-геофизическая команда из Хабаровска. Полевые исследования, БПЛА, собственное производство, камеральная обработка и техническая отчётность."],
    en: ["About TEKTONIKA | Geological & Geophysical Engineering", "TEKTONIKA is a Khabarovsk-based geological and geophysical engineering team combining field surveys, UAV technology, in-house production, data processing and technical reporting."],
    zh: ["关于 TEKTONIKA | 地质与地球物理工程", "TEKTONIKA 是位于哈巴罗夫斯克的地质与地球物理工程团队，业务涵盖野外调查、无人机技术、自主生产、数据处理和技术报告。"],
  },
  {
    path: "/research",
    priority: "0.7",
    ru: ["Научная деятельность и геофизические исследования | ТЕКТОНИКА", "Методические материалы и исследования ООО «ТЕКТОНИКА»: геофизическая интерпретация, 1D/2D/3D моделирование, БПЛА-технологии, физические свойства образцов и контроль качества полевых данных."],
    en: ["Research & Geophysical Methods | TEKTONIKA", "TEKTONIKA research and applied methods in geophysical interpretation, 1D/2D/3D modelling, UAV technologies, physical sample properties and field-data quality control."],
    zh: ["科研与地球物理方法 | TEKTONIKA", "TEKTONIKA 的应用研究与方法，包括地球物理解释、1D/2D/3D 建模、无人机技术、样品物性测量和野外数据质量控制。"],
  },
  {
    path: "/media",
    priority: "0.6",
    ru: ["Медиа и полевые работы | ООО «ТЕКТОНИКА»", "Фотографии, новости и материалы о полевых геологических и геофизических работах, экспедициях, оборудовании и БПЛА ООО «ТЕКТОНИКА»."],
    en: ["Fieldwork Media & News | TEKTONIKA", "Photos, news and materials from TEKTONIKA geological and geophysical fieldwork, expeditions, equipment and UAV operations."],
    zh: ["野外工作媒体与新闻 | TEKTONIKA", "TEKTONIKA 地质与地球物理野外作业、勘探活动、设备和无人机工作的照片、新闻与资料。"],
  },
  {
    path: "/careers",
    priority: "0.7",
    ru: ["Вакансии и работа в геологоразведке | ТЕКТОНИКА", "Актуальные вакансии ООО «ТЕКТОНИКА» для полевых и инженерных специалистов. Работа в геологоразведке, геофизике и БПЛА-проектах на Дальнем Востоке."],
    en: ["Careers in Geological Exploration | TEKTONIKA", "Current TEKTONIKA vacancies for field and engineering specialists working on geological exploration, geophysics and UAV projects in the Russian Far East."],
    zh: ["地质勘探职位与招聘 | TEKTONIKA", "TEKTONIKA 面向野外和工程专业人员的最新职位，参与俄罗斯远东地区的地质勘探、地球物理和无人机项目。"],
  },
  {
    path: "/contacts",
    priority: "0.8",
    ru: ["Контакты ООО «ТЕКТОНИКА» — Хабаровск", "Контакты ООО «ТЕКТОНИКА»: Хабаровск, ул. Ким Ю Чена, 65, офис 326. Телефоны, e-mail и форма запроса на геологические и геофизические работы."],
    en: ["Contact TEKTONIKA — Khabarovsk, Russia", "Contact TEKTONIKA in Khabarovsk, Russia. Phone, email, office address and enquiry form for geological and geophysical survey projects."],
    zh: ["联系 TEKTONIKA — 俄罗斯哈巴罗夫斯克", "联系位于俄罗斯哈巴罗夫斯克的 TEKTONIKA。获取电话、邮箱、办公地址，并提交地质与地球物理项目咨询。"],
  },
  {
    path: "/media/news/expedition-launch",
    priority: "0.5",
    ru: ["Старт полевого сезона и экспедиции | ТЕКТОНИКА", "Новости ООО «ТЕКТОНИКА» о подготовке и старте полевых геолого-геофизических работ и экспедиций."],
    en: ["Field Season & Expedition Launch | TEKTONIKA", "TEKTONIKA news about preparations and the start of geological and geophysical field expeditions."],
    zh: ["野外季与勘探启动 | TEKTONIKA", "TEKTONIKA 关于地质与地球物理野外勘探准备和启动的新闻。"],
  },
  {
    path: "/privacy",
    priority: "0.2",
    ru: ["Политика конфиденциальности | ТЕКТОНИКА", "Политика обработки и защиты персональных данных на сайте ООО «ТЕКТОНИКА»."],
    en: ["Privacy Policy | TEKTONIKA", "Privacy and personal data processing policy for the TEKTONIKA website."],
    zh: ["隐私政策 | TEKTONIKA", "TEKTONIKA 网站的隐私与个人数据处理政策。"],
  },
  {
    path: "/agreement",
    priority: "0.2",
    ru: ["Пользовательское соглашение | ТЕКТОНИКА", "Пользовательское соглашение и условия использования сайта ООО «ТЕКТОНИКА»."],
    en: ["Terms of Use | TEKTONIKA", "Terms and conditions for using the TEKTONIKA website."],
    zh: ["网站使用条款 | TEKTONIKA", "TEKTONIKA 网站的使用条款与条件。"],
  },
];

function localePath(pagePath, lang) {
  const pagePart = pagePath === "/" ? "" : pagePath;
  const prefix = lang === "ru" ? "" : `/${lang}`;
  return `${prefix}${pagePart}` || "/";
}

function localeUrl(pagePath, lang) {
  const localizedPath = localePath(pagePath, lang);
  return `${BASE_URL}${localizedPath === "/" ? "" : localizedPath}`;
}

function escapeXml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}

function escapeAttr(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
}

function replaceMeta(html, selector, value) {
  const escaped = escapeAttr(value);
  const pattern = selector.startsWith("property:")
    ? new RegExp(`<meta\\s+property=["']${selector.slice(9)}["'][^>]*>`, "i")
    : new RegExp(`<meta\\s+name=["']${selector}["'][^>]*>`, "i");
  const attr = selector.startsWith("property:") ? `property="${selector.slice(9)}"` : `name="${selector}"`;
  const tag = `<meta ${attr} content="${escaped}" />`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

function schema(page, lang, canonical, title, description) {
  const pageType = page.path === "/about" ? "AboutPage" : page.path === "/contacts" ? "ContactPage" : ["/services", "/projects", "/research", "/media", "/careers"].includes(page.path) ? "CollectionPage" : "WebPage";
  const graph = [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "ООО «ТЕКТОНИКА»",
      alternateName: "TEKTONIKA",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.webp` },
      email: "tektonikayur16@gmail.com",
      telephone: ["+79243015165", "+79842626115"],
      address: { "@type": "PostalAddress", streetAddress: "ул. Ким Ю Чена, д. 65, офис 326", addressLocality: "Хабаровск", addressRegion: "Хабаровский край", postalCode: "680000", addressCountry: "RU" },
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
      "@type": pageType,
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#organization` },
      inLanguage: lang === "zh" ? "zh-CN" : lang,
    },
  ];
  if (page.path === "/services") {
    graph.push({ "@type": "Service", "@id": `${canonical}#service`, name: lang === "ru" ? "Геолого-геофизические исследования" : lang === "zh" ? "地质与地球物理调查" : "Geological and geophysical surveys", provider: { "@id": `${BASE_URL}/#organization` }, areaServed: { "@type": "Country", name: "Россия" } });
  }
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
}

function renderPage(template, page, lang) {
  const [title, description] = page[lang];
  const canonical = localeUrl(page.path, lang);
  const htmlLang = lang === "zh" ? "zh-CN" : lang;
  const locale = lang === "ru" ? "ru_RU" : lang === "zh" ? "zh_CN" : "en_US";
  let html = template;

  html = html.replace(/<html\s+lang=["'][^"']+["']/i, `<html lang="${htmlLang}"`);
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);
  html = replaceMeta(html, "description", description);
  html = replaceMeta(html, "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
  html = replaceMeta(html, "googlebot", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
  html = replaceMeta(html, "property:og:title", title);
  html = replaceMeta(html, "property:og:description", description);
  html = replaceMeta(html, "property:og:url", canonical);
  html = replaceMeta(html, "property:og:locale", locale);
  html = replaceMeta(html, "twitter:title", title);
  html = replaceMeta(html, "twitter:description", description);
  html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${canonical}" />`);

  html = html.replace(/\s*<link\s+rel=["']alternate["'][^>]*>\s*/gi, "\n");
  const alternates = [
    `<link rel="alternate" hreflang="ru" href="${localeUrl(page.path, "ru")}" />`,
    `<link rel="alternate" hreflang="en" href="${localeUrl(page.path, "en")}" />`,
    `<link rel="alternate" hreflang="zh-CN" href="${localeUrl(page.path, "zh")}" />`,
    `<link rel="alternate" hreflang="x-default" href="${localeUrl(page.path, "ru")}" />`,
  ].join("\n    ");
  html = html.replace("</head>", `    ${alternates}\n  </head>`);

  html = html.replace(/<script\s+type=["']application\/ld\+json["']\s+data-static-seo=["']true["']>[\s\S]*?<\/script>/i, "");
  html = html.replace("</head>", `    <script type="application/ld+json" data-static-seo="true">${schema(page, lang, canonical, title, description)}</script>\n  </head>`);
  return html;
}

async function main() {
  const indexPath = path.join(DIST, "index.html");
  const template = await fs.readFile(indexPath, "utf8");

  for (const page of pages) {
    for (const lang of LANGS) {
      const html = renderPage(template, page, lang);
      const localized = localePath(page.path, lang);
      const targetDir = localized === "/" ? DIST : path.join(DIST, localized.slice(1));
      await fs.mkdir(targetDir, { recursive: true });
      await fs.writeFile(path.join(targetDir, "index.html"), html, "utf8");
    }
  }

  let notFound = template.replace(/<title>[^<]*<\/title>/i, "<title>Страница не найдена | ТЕКТОНИКА</title>");
  notFound = replaceMeta(notFound, "description", "Запрошенная страница не найдена.");
  notFound = replaceMeta(notFound, "robots", "noindex, nofollow");
  notFound = replaceMeta(notFound, "googlebot", "noindex, nofollow");
  await fs.writeFile(path.join(DIST, "404.html"), notFound, "utf8");

  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = [];
  for (const page of pages) {
    for (const lang of LANGS) {
      const loc = localeUrl(page.path, lang);
      const alternates = [
        ["ru", localeUrl(page.path, "ru")],
        ["en", localeUrl(page.path, "en")],
        ["zh-CN", localeUrl(page.path, "zh")],
        ["x-default", localeUrl(page.path, "ru")],
      ]
        .map(([hreflang, href]) => `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${escapeXml(href)}" />`)
        .join("\n");
      urls.push(`  <url>\n    <loc>${escapeXml(loc)}</loc>\n${alternates}\n    <lastmod>${lastmod}</lastmod>\n    <priority>${page.priority}</priority>\n  </url>`);
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`;
  await fs.writeFile(path.join(DIST, "sitemap.xml"), sitemap, "utf8");

  const robots = `User-agent: *\nAllow: /\nDisallow: /tektonika-admin\nDisallow: /en/tektonika-admin\nDisallow: /zh/tektonika-admin\n\nSitemap: ${BASE_URL}/sitemap.xml\nHost: www.tektonikadv.ru\n`;
  await fs.writeFile(path.join(DIST, "robots.txt"), robots, "utf8");

  console.log(`SEO pages generated: ${pages.length * LANGS.length} localized pages; hreflang sitemap and robots.txt written.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
