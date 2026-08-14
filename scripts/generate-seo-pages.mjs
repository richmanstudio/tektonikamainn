import fs from "node:fs/promises";
import path from "node:path";

const BASE_URL = "https://www.tektonikadv.ru";
const DIST = path.resolve("dist");
const LANGS = ["ru", "en", "zh"];

const pages = [
  ["/", "1.0", ["Геолого-геофизические исследования и геологоразведка | ТЕКТОНИКА", "ООО «ТЕКТОНИКА» выполняет геологические и геофизические исследования, магниторазведку, электроразведку, БПЛА-съёмку, топографию и камеральную обработку на Дальнем Востоке и по России."], ["Geological & Geophysical Surveys in Russia | TEKTONIKA", "TEKTONIKA provides geological and geophysical surveys, magnetic and electrical exploration, UAV mapping, topography, processing and reporting across Russia."], ["俄罗斯地质与地球物理勘探服务 | TEKTONIKA", "TEKTONIKA 在俄罗斯远东及全俄提供地质调查、地球物理勘探、磁法与电法勘探、无人机测绘、地形测量、数据处理和报告服务。"]],
  ["/services", "0.9", ["Геофизические и геологоразведочные услуги | ТЕКТОНИКА", "Полный цикл геолого-геофизических работ: геология, магниторазведка, электроразведка, БПЛА, топография, лаборатория, обработка и интерпретация."], ["Geophysical & Geological Exploration Services | TEKTONIKA", "Full-cycle geological and geophysical services: geology, magnetic and electrical surveys, UAV mapping, topography, laboratory measurements, processing and interpretation."], ["地球物理与地质勘探服务 | TEKTONIKA", "全周期地质与地球物理服务：地质、磁法、电法、无人机测绘、地形测量、实验室测量、数据处理与解释。"]],
  ["/projects", "0.9", ["Проекты геологоразведки и геофизики | ТЕКТОНИКА", "Проекты ООО «ТЕКТОНИКА» и опыт команды в аэромагниторазведке, электроразведке, геохимических поисках и камеральной обработке в регионах России."], ["Geological & Geophysical Survey Projects | TEKTONIKA", "TEKTONIKA projects and team experience in UAV aeromagnetic surveys, electrical exploration, geochemical prospecting and data interpretation across Russia."], ["地质与地球物理勘探项目 | TEKTONIKA", "了解 TEKTONIKA 在俄罗斯各地区开展的无人机航空磁测、电法勘探、地球化学找矿和数据解释项目。"]],
  ["/about", "0.8", ["О компании ООО «ТЕКТОНИКА» | Геология и геофизика", "ООО «ТЕКТОНИКА» — инженерная геолого-геофизическая команда из Хабаровска: поле, БПЛА, производство, обработка и техническая отчётность."], ["About TEKTONIKA | Geological & Geophysical Engineering", "TEKTONIKA is a Khabarovsk-based geological and geophysical engineering team combining field surveys, UAV technology, production, processing and reporting."], ["关于 TEKTONIKA | 地质与地球物理工程", "TEKTONIKA 是位于哈巴罗夫斯克的地质与地球物理工程团队，涵盖野外调查、无人机技术、自主生产、数据处理和技术报告。"]],
  ["/research", "0.7", ["Научная деятельность и геофизические исследования | ТЕКТОНИКА", "Методические материалы и исследования: интерпретация, 1D/2D/3D моделирование, БПЛА, свойства образцов и контроль качества полевых данных."], ["Research & Geophysical Methods | TEKTONIKA", "Applied research in geophysical interpretation, 1D/2D/3D modelling, UAV technologies, sample properties and field-data quality control."], ["科研与地球物理方法 | TEKTONIKA", "应用研究与方法：地球物理解释、1D/2D/3D 建模、无人机技术、样品物性和野外数据质量控制。"]],
  ["/media", "0.6", ["Медиа и полевые работы | ООО «ТЕКТОНИКА»", "Фотографии и материалы о полевых геологических и геофизических работах, экспедициях, оборудовании и БПЛА ООО «ТЕКТОНИКА»."], ["Fieldwork Media & News | TEKTONIKA", "Photos and materials from TEKTONIKA geological and geophysical fieldwork, expeditions, equipment and UAV operations."], ["野外工作媒体与新闻 | TEKTONIKA", "TEKTONIKA 地质与地球物理野外作业、勘探活动、设备和无人机工作的照片与资料。"]],
  ["/careers", "0.7", ["Вакансии и работа в геологоразведке | ТЕКТОНИКА", "Актуальные вакансии ООО «ТЕКТОНИКА» для полевых и инженерных специалистов в геологоразведке, геофизике и БПЛА-проектах."], ["Careers in Geological Exploration | TEKTONIKA", "Current TEKTONIKA vacancies for field and engineering specialists in geological exploration, geophysics and UAV projects."], ["地质勘探职位与招聘 | TEKTONIKA", "TEKTONIKA 面向野外和工程专业人员的职位，参与地质勘探、地球物理和无人机项目。"]],
  ["/contacts", "0.8", ["Контакты ООО «ТЕКТОНИКА» — Хабаровск", "Контакты ООО «ТЕКТОНИКА»: телефоны, e-mail, офис в Хабаровске и B2B-форма запроса на геологические и геофизические работы."], ["Contact TEKTONIKA — Khabarovsk, Russia", "Contact TEKTONIKA: phone, email, Khabarovsk office address and B2B enquiry form for geological and geophysical projects."], ["联系 TEKTONIKA — 俄罗斯哈巴罗夫斯克", "联系 TEKTONIKA：电话、邮箱、哈巴罗夫斯克办公地址及地质与地球物理项目咨询表单。"]],
  ["/media/news/expedition-launch", "0.5", ["Старт полевого сезона и экспедиции | ТЕКТОНИКА", "Новости ООО «ТЕКТОНИКА» о подготовке и старте полевых геолого-геофизических работ и экспедиций."], ["Field Season & Expedition Launch | TEKTONIKA", "TEKTONIKA news about preparations and the start of geological and geophysical field expeditions."], ["野外季与勘探启动 | TEKTONIKA", "TEKTONIKA 关于地质与地球物理野外勘探准备和启动的新闻。"]],
  ["/privacy", "0.2", ["Политика конфиденциальности | ТЕКТОНИКА", "Политика обработки и защиты персональных данных на сайте ООО «ТЕКТОНИКА»."], ["Privacy Policy | TEKTONIKA", "Privacy and personal data processing policy for the TEKTONIKA website."], ["隐私政策 | TEKTONIKA", "TEKTONIKA 网站的隐私与个人数据处理政策。"]],
  ["/agreement", "0.2", ["Пользовательское соглашение | ТЕКТОНИКА", "Пользовательское соглашение и условия использования сайта ООО «ТЕКТОНИКА»."], ["Terms of Use | TEKTONIKA", "Terms and conditions for using the TEKTONIKA website."], ["网站使用条款 | TEKTONIKA", "TEKTONIKA 网站的使用条款与条件。"]],
].map(([pagePath, priority, ru, en, zh]) => ({ path: pagePath, priority, ru, en, zh }));

const servicePages = [
  ["geological-surveys", "Геологические исследования", "Полевые геологические исследования, маршруты, документация, опробование и подготовка материалов для геологоразведочных проектов.", "Geological surveys", "Field geological surveys, mapping routes, documentation, sampling and engineering-ready geological deliverables.", "地质调查", "野外地质调查、路线填图、编录、采样及面向勘探项目的成果交付。"],
  ["magnetic-surveys", "Магниторазведка", "Наземная и БПЛА-магниторазведка для поисковых и картировочных задач с обработкой и интерпретацией данных.", "Magnetic surveys", "Ground and UAV magnetic surveys for exploration and mapping with processing and interpretation.", "磁法勘探", "面向找矿与制图任务的地面及无人机磁法勘探，并提供数据处理与解释。"],
  ["electrical-surveys", "Электроразведка", "Электроразведочные работы, полевые измерения и интерпретация для решения поисковых и инженерно-геологических задач.", "Electrical surveys", "Electrical geophysical surveys, field measurements and interpretation for exploration and engineering tasks.", "电法勘探", "用于找矿及工程任务的电法地球物理测量、野外采集与解释。"],
  ["uav-aerial-surveys", "БПЛА и аэрогеофизика", "БПЛА-съёмка для геофизики, картографии и мониторинга удалённых территорий.", "UAV and airborne geophysics", "UAV acquisition for geophysics, mapping and remote-area monitoring.", "无人机与航空地球物理", "用于地球物理、制图和偏远地区监测的无人机采集。"],
  ["topographic-surveys", "Топографические и геодезические работы", "Топографическая съёмка и геодезическое обеспечение полевых и геологоразведочных работ.", "Topographic and geodetic surveys", "Topographic surveying and geodetic support for field and exploration projects.", "地形与测地工作", "为野外与勘探项目提供地形测量及测地支持。"],
  ["laboratory-measurements", "Лабораторные измерения", "Измерение физических свойств образцов для геофизической интерпретации и контроля моделей.", "Laboratory measurements", "Physical-property measurements of samples for geophysical interpretation and model control.", "实验室测量", "测量样品物性参数，用于地球物理解释与模型约束。"],
  ["geophysical-data-processing", "Камеральная обработка и интерпретация", "Камеральная обработка геолого-геофизических данных, 1D/2D/3D моделирование, карты, разрезы и техническая отчётность.", "Geophysical processing and interpretation", "Geological and geophysical data processing, 1D/2D/3D modelling, mapping, sections and technical reporting.", "地球物理数据处理与解释", "地质与地球物理数据处理、1D/2D/3D 建模、图件、剖面及技术报告。"],
].map(([slug, ruTitle, ruDescription, enTitle, enDescription, zhTitle, zhDescription]) => ({
  path: `/services/${slug}`,
  priority: "0.85",
  ru: [`${ruTitle} | ТЕКТОНИКА`, ruDescription],
  en: [`${enTitle} | TEKTONIKA`, enDescription],
  zh: [`${zhTitle} | TEKTONIKA`, zhDescription],
  service: true,
}));

const allPages = [...pages, ...servicePages];

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
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}

function escapeAttr(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;");
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

function replaceCanonical(html, href) {
  const tag = `<link rel="canonical" href="${escapeAttr(href)}" />`;
  const pattern = /<link\s+rel=["']canonical["'][^>]*>/i;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

function addAlternates(html, page) {
  const tags = [
    ["ru", localeUrl(page.path, "ru")],
    ["en", localeUrl(page.path, "en")],
    ["zh-CN", localeUrl(page.path, "zh")],
    ["x-default", localeUrl(page.path, "ru")],
  ].map(([hreflang, href]) => `<link rel="alternate" hreflang="${hreflang}" href="${href}" />`).join("\n    ");
  return html.replace("</head>", `    ${tags}\n  </head>`);
}

function schema(page, lang, canonical, title, description) {
  const pageType = page.service ? "Service" : page.path === "/about" ? "AboutPage" : page.path === "/contacts" ? "ContactPage" : ["/services", "/projects", "/research", "/media", "/careers"].includes(page.path) ? "CollectionPage" : "WebPage";
  const entity = page.service
    ? { "@type": "Service", "@id": `${canonical}#service`, url: canonical, name: title.replace(/ \| (ТЕКТОНИКА|TEKTONIKA)$/u, ""), description, provider: { "@id": `${BASE_URL}/#organization` }, areaServed: { "@type": "Country", name: "Россия" } }
    : { "@type": pageType, "@id": `${canonical}#webpage`, url: canonical, name: title, description, isPartOf: { "@id": `${BASE_URL}/#website` }, about: { "@id": `${BASE_URL}/#organization` }, inLanguage: lang === "zh" ? "zh-CN" : lang };
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": `${BASE_URL}/#organization`, name: "ООО «ТЕКТОНИКА»", alternateName: "TEKTONIKA", url: BASE_URL, logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.webp` }, email: "tektonikayur16@gmail.com", telephone: ["+79243015165", "+79842626115"], address: { "@type": "PostalAddress", streetAddress: "ул. Ким Ю Чена, д. 65, офис 326", addressLocality: "Хабаровск", addressRegion: "Хабаровский край", postalCode: "680000", addressCountry: "RU" } },
      { "@type": "WebSite", "@id": `${BASE_URL}/#website`, url: BASE_URL, name: "ТЕКТОНИКА", publisher: { "@id": `${BASE_URL}/#organization` }, inLanguage: lang === "zh" ? "zh-CN" : lang },
      entity,
    ],
  };
}

function renderPage(template, page, lang) {
  const [title, description] = page[lang];
  const canonical = localeUrl(page.path, lang);
  let html = template.replace(/<html\s+lang=["'][^"']+["']/i, `<html lang="${lang === "zh" ? "zh-CN" : lang}"`);
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);
  html = replaceMeta(html, "description", description);
  html = replaceMeta(html, "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
  html = replaceMeta(html, "googlebot", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
  html = replaceMeta(html, "property:og:title", title);
  html = replaceMeta(html, "property:og:description", description);
  html = replaceMeta(html, "property:og:url", canonical);
  html = replaceMeta(html, "twitter:title", title);
  html = replaceMeta(html, "twitter:description", description);
  html = replaceCanonical(html, canonical);
  html = addAlternates(html, page);
  html = html.replace("</head>", `    <script type="application/ld+json" data-static-seo="true">${JSON.stringify(schema(page, lang, canonical, title, description))}</script>\n  </head>`);
  return html;
}

async function main() {
  const indexPath = path.join(DIST, "index.html");
  const template = await fs.readFile(indexPath, "utf8");

  for (const page of allPages) {
    for (const lang of LANGS) {
      const targetPath = localePath(page.path, lang);
      const targetDir = targetPath === "/" ? DIST : path.join(DIST, targetPath.slice(1));
      await fs.mkdir(targetDir, { recursive: true });
      await fs.writeFile(path.join(targetDir, "index.html"), renderPage(template, page, lang), "utf8");
    }
  }

  let notFound = template.replace(/<title>[^<]*<\/title>/i, "<title>Страница не найдена | ТЕКТОНИКА</title>");
  notFound = replaceMeta(notFound, "description", "Запрошенная страница не найдена.");
  notFound = replaceMeta(notFound, "robots", "noindex, nofollow");
  notFound = replaceMeta(notFound, "googlebot", "noindex, nofollow");
  await fs.writeFile(path.join(DIST, "404.html"), notFound, "utf8");

  const lastmod = new Date().toISOString().slice(0, 10);
  const entries = allPages.flatMap((page) => LANGS.map((lang) => {
    const loc = localeUrl(page.path, lang);
    const alternates = [
      ["ru", localeUrl(page.path, "ru")],
      ["en", localeUrl(page.path, "en")],
      ["zh-CN", localeUrl(page.path, "zh")],
      ["x-default", localeUrl(page.path, "ru")],
    ].map(([hreflang, href]) => `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${escapeXml(href)}" />`).join("\n");
    return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${page.priority}</priority>\n${alternates}\n  </url>`;
  }));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join("\n")}\n</urlset>\n`;
  await fs.writeFile(path.join(DIST, "sitemap.xml"), sitemap, "utf8");

  const robots = `User-agent: *\nAllow: /\nDisallow: /tektonika-admin\nDisallow: /en/tektonika-admin\nDisallow: /zh/tektonika-admin\n\nSitemap: ${BASE_URL}/sitemap.xml\nHost: www.tektonikadv.ru\n`;
  await fs.writeFile(path.join(DIST, "robots.txt"), robots, "utf8");

  console.log(`SEO pages generated: ${allPages.length * LANGS.length} localized pages; sitemap and robots.txt written.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
