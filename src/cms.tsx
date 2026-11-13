import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import type { CmsEntry, CmsMediaItem, CmsPageBlock, CmsService } from "./content/cmsTypes";
import { serviceCatalog } from "./content/serviceCatalog";
import api from "./utils/api";
import { useI18n } from "./i18n";

type CmsSite = Partial<Record<"projects" | "research" | "vacancies" | "services" | "pages" | "media", CmsEntry[]>>;

type CmsContent = {
  loading: boolean;
  source: "api" | "fallback";
  projectsGroups: any[];
  researchArticles: any[];
  vacancies: any[];
  services: CmsService[];
  pages: Record<string, CmsPageBlock>;
  media: CmsMediaItem[];
};

const CmsContext = createContext<CmsContent>({
  loading: false,
  source: "fallback",
  projectsGroups: [],
  researchArticles: [],
  vacancies: [],
  services: [],
  pages: {},
  media: [],
});

function buildProjects(entries: CmsEntry[] | undefined, fallbackGroups: any[]) {
  if (!entries?.length) return fallbackGroups;
  const grouped = new Map<string, any[]>();
  for (const entry of entries) {
    const type = String(entry.payload.type || "Проекты");
    const project = {
      slug: entry.slug,
      title: entry.title,
      client: String(entry.payload.client || ""),
      region: String(entry.payload.region || ""),
      year: Number(entry.payload.year) || new Date().getFullYear(),
      scope: String(entry.payload.scope || entry.payload.description || ""),
      result: String(entry.payload.result || ""),
      technologies: Array.isArray(entry.payload.technologies) ? entry.payload.technologies : [],
    };
    grouped.set(type, [...(grouped.get(type) || []), project]);
  }
  return Array.from(grouped.entries()).map(([type, projects]) => ({ type, projects }));
}

function buildResearch(entries: CmsEntry[] | undefined, fallbackArticles: any[]) {
  if (!entries?.length) return fallbackArticles;
  return entries.map((entry) => ({
    slug: entry.slug,
    title: entry.title,
    date: String(entry.payload.date || ""),
    tag: String(entry.payload.tag || ""),
    excerpt: String(entry.payload.excerpt || entry.payload.description || ""),
    author: String(entry.payload.author || ""),
    body: String(entry.payload.body || ""),
    sourceUrl: String(entry.payload.sourceUrl || ""),
    pdfUrl: String(entry.payload.pdfUrl || ""),
  }));
}

function buildVacancies(entries: CmsEntry[] | undefined, fallbackVacancies: any[]) {
  if (!entries?.length) return fallbackVacancies;
  return entries.map((entry) => ({
    id: entry.slug,
    title: entry.title,
    location: String(entry.payload.location || ""),
    salary: String(entry.payload.salary || ""),
    type: String(entry.payload.type || ""),
    description: String(entry.payload.description || ""),
    requirements: Array.isArray(entry.payload.requirements) ? entry.payload.requirements : [],
  }));
}

const serviceAccents = ["green", "blue", "yellow", "red", "blue", "green", "gray"];

function buildServices(entries: CmsEntry[] | undefined, lang: "ru" | "en" | "zh"): CmsService[] {
  if (!entries?.length) {
    return serviceCatalog.map((service, index) => ({
      slug: service.slug,
      title: service.title[lang],
      description: service.description[lang],
      items: service.benefits[lang],
      accent: serviceAccents[index] || "blue",
    }));
  }
  return entries.map((entry) => ({
    slug: entry.slug,
    title: entry.title,
    description: String(entry.payload.description || ""),
    items: Array.isArray(entry.payload.items) ? entry.payload.items.map(String) : [],
    accent: String(entry.payload.accent || "blue"),
  }));
}

function buildPages(entries: CmsEntry[] | undefined): Record<string, CmsPageBlock> {
  if (!entries?.length) return {};
  return Object.fromEntries(
    entries.map((entry) => [
      entry.slug,
      {
        slug: entry.slug,
        title: entry.title,
        text: String(entry.payload.text || entry.payload.description || ""),
        eyebrow: String(entry.payload.eyebrow || "") || undefined,
        ctaLabel: String(entry.payload.ctaLabel || "") || undefined,
        ctaHref: String(entry.payload.ctaHref || "") || undefined,
      },
    ])
  );
}

function buildMedia(entries: CmsEntry[] | undefined): CmsMediaItem[] {
  if (!entries?.length) return [];
  return entries.map((entry) => ({
    slug: entry.slug,
    title: entry.title,
    image: String(entry.payload.image || "") || undefined,
    caption: String(entry.payload.caption || entry.payload.description || "") || undefined,
    year: String(entry.payload.year || "") || undefined,
  }));
}

export function CmsProvider({ children }: { children: ReactNode }) {
  const { lang, t } = useI18n();
  const [site, setSite] = useState<CmsSite>({});
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState<"api" | "fallback">("fallback");

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    api
      .get<CmsSite>("/public/site", { params: { lang }, signal: controller.signal })
      .then((response) => {
        setSite(response.data);
        setSource("api");
      })
      .catch((error) => {
        if (error?.code === "ERR_CANCELED") return;
        setSite({});
        setSource("fallback");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [lang]);

  const value = useMemo<CmsContent>(
    () => ({
      loading,
      source,
      projectsGroups: buildProjects(site.projects, t.projects.groups),
      researchArticles: buildResearch(site.research, t.research.articles),
      vacancies: buildVacancies(site.vacancies, t.vacancies),
      services: buildServices(site.services, lang),
      pages: buildPages(site.pages),
      media: buildMedia(site.media),
    }),
    [lang, loading, site, source, t.projects.groups, t.research.articles, t.vacancies]
  );

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCmsContent() {
  return useContext(CmsContext);
}
