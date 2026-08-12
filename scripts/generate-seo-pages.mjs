import fs from "node:fs/promises";
import path from "node:path";

const BASE_URL = "https://www.tektonikadv.ru";
const DIST = path.resolve("dist");

const pages = [
  {
    path: "/",
    title: "Геолого-геофизические исследования и геологоразведка | ТЕКТОНИКА",
    description:
      "ООО «ТЕКТОНИКА» выполняет геологические и геофизические исследования, магниторазведку, электроразведку, БПЛА-съёмку, топографию и камеральную обработку на Дальнем Востоке и по России.",
    priority: "1.0",
  },
  {
    path: "/services",
    title: "Геофизические и геологоразведочные услуги | ТЕКТОНИКА",
    description:
      "Полный цикл геолого-геофизических работ: геологическое изучение, магниторазведка, электроразведка, топография и БПЛА, лабораторные измерения, 1D/2D/3D интерпретация и отчётность.",
    priority: "0.9",
  },
  {
    path: "/projects",
    title: "Проекты геологоразведки и геофизики | ТЕКТОНИКА",
    description:
      "Проекты ООО «ТЕКТОНИКА» и опыт команды: аэромагниторазведка БПЛА, электроразведка, геохимические поиски и камеральная обработка в регионах России.",
    priority: "0.9",
  },
  {
    path: "/about",
    title: "О компании ООО «ТЕКТОНИКА» | Геология и геофизика",
    description:
      "ООО «ТЕКТОНИКА» — инженерная геолого-геофизическая команда из Хабаровска. Полевые исследования, БПЛА, собственное производство, камеральная обработка и техническая отчётность.",
    priority: "0.8",
  },
  {
    path: "/research",
    title: "Научная деятельность и геофизические исследования | ТЕКТОНИКА",
    description:
      "Исследования и методические материалы ООО «ТЕКТОНИКА»: геофизическая интерпретация, 1D/2D/3D моделирование, БПЛА-технологии и контроль качества полевых данных.",
    priority: "0.7",
  },
  {
    path: "/media",
    title: "Медиа и полевые работы | ООО «ТЕКТОНИКА»",
    description:
      "Фотографии, новости и материалы о полевых геологических и геофизических работах, экспедициях, оборудовании и БПЛА ООО «ТЕКТОНИКА».",
    priority: "0.6",
  },
  {
    path: "/careers",
    title: "Вакансии и работа в геологоразведке | ТЕКТОНИКА",
    description:
      "Актуальные вакансии ООО «ТЕКТОНИКА» для полевых и инженерных специалистов. Работа в геологоразведке, геофизике и БПЛА-проектах на Дальнем Востоке.",
    priority: "0.7",
  },
  {
    path: "/contacts",
    title: "Контакты ООО «ТЕКТОНИКА» — Хабаровск",
    description:
      "Контакты ООО «ТЕКТОНИКА»: Хабаровск, ул. Ким Ю Чена, 65, офис 326. Телефоны, e-mail и форма запроса на геологические и геофизические работы.",
    priority: "0.8",
  },
  {
    path: "/media/news/expedition-launch",
    title: "Старт полевого сезона и экспедиции | ТЕКТОНИКА",
    description: "Новости ООО «ТЕКТОНИКА» о подготовке и старте полевых геолого-геофизических работ и экспедиций.",
    priority: "0.5",
  },
  {
    path: "/privacy",
    title: "Политика конфиденциальности | ТЕКТОНИКА",
    description: "Политика обработки и защиты персональных данных на сайте ООО «ТЕКТОНИКА».",
    priority: "0.2",
  },
  {
    path: "/agreement",
    title: "Пользовательское соглашение | ТЕКТОНИКА",
    description: "Пользовательское соглашение и условия использования сайта ООО «ТЕКТОНИКА».",
    priority: "0.2",
  },
];

function escapeXml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}

function replaceMeta(html, selector, value) {
  const escaped = value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
  const pattern = selector.startsWith("property:")
    ? new RegExp(`<meta\\s+property=["']${selector.slice(9)}["'][^>]*>`, "i")
    : new RegExp(`<meta\\s+name=["']${selector}["'][^>]*>`, "i");
  const attr = selector.startsWith("property:") ? `property="${selector.slice(9)}"` : `name="${selector}"`;
  const tag = `<meta ${attr} content="${escaped}" />`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

function renderPage(template, page) {
  const canonical = `${BASE_URL}${page.path === "/" ? "" : page.path}`;
  let html = template;
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${page.title}</title>`);
  html = replaceMeta(html, "description", page.description);
  html = replaceMeta(html, "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
  html = replaceMeta(html, "googlebot", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
  html = replaceMeta(html, "property:og:title", page.title);
  html = replaceMeta(html, "property:og:description", page.description);
  html = replaceMeta(html, "property:og:url", canonical);
  html = replaceMeta(html, "twitter:title", page.title);
  html = replaceMeta(html, "twitter:description", page.description);
  html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${canonical}" />`);
  return html;
}

async function main() {
  const indexPath = path.join(DIST, "index.html");
  const template = await fs.readFile(indexPath, "utf8");

  for (const page of pages) {
    const html = renderPage(template, page);
    const targetDir = page.path === "/" ? DIST : path.join(DIST, page.path.slice(1));
    await fs.mkdir(targetDir, { recursive: true });
    await fs.writeFile(path.join(targetDir, "index.html"), html, "utf8");
  }

  const notFound = replaceMeta(
    renderPage(template, {
      path: "/404",
      title: "Страница не найдена | ТЕКТОНИКА",
      description: "Запрошенная страница не найдена.",
    }),
    "robots",
    "noindex, nofollow"
  );
  await fs.writeFile(path.join(DIST, "404.html"), notFound, "utf8");

  const lastmod = new Date().toISOString().slice(0, 10);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map((page) => {
      const loc = `${BASE_URL}${page.path === "/" ? "" : page.path}`;
      return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${page.priority}</priority>\n  </url>`;
    })
    .join("\n")}\n</urlset>\n`;
  await fs.writeFile(path.join(DIST, "sitemap.xml"), sitemap, "utf8");

  const robots = `User-agent: *\nAllow: /\nDisallow: /tektonika-admin\n\nSitemap: ${BASE_URL}/sitemap.xml\nHost: www.tektonikadv.ru\n`;
  await fs.writeFile(path.join(DIST, "robots.txt"), robots, "utf8");

  console.log(`SEO pages generated: ${pages.length}; sitemap and robots.txt written.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
