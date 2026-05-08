import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import api from "./utils/api";
import { useI18n } from "./i18n";

type CmsEntry = {
  id: number;
  collection: string;
  slug: string;
  language: string;
  title: string;
  payload: Record<string, any>;
  status: "draft" | "published";
  sort_order: number;
};

type CmsSite = Partial<Record<"projects" | "research" | "vacancies" | "services" | "pages" | "media", CmsEntry[]>>;

type CmsContent = {
  loading: boolean;
  source: "api" | "fallback";
  projectsGroups: any[];
  researchArticles: any[];
  vacancies: any[];
};

const CmsContext = createContext<CmsContent>({
  loading: false,
  source: "fallback",
  projectsGroups: [],
  researchArticles: [],
  vacancies: [],
});

function buildProjects(entries: CmsEntry[] | undefined, fallbackGroups: any[]) {
  if (!entries?.length) return fallbackGroups;
  const grouped = new Map<string, any[]>();
  for (const entry of entries) {
    const type = entry.payload.type || "Проекты";
    const project = {
      title: entry.title,
      client: entry.payload.client || "",
      region: entry.payload.region || "",
      year: Number(entry.payload.year) || new Date().getFullYear(),
      scope: entry.payload.scope || entry.payload.description || "",
    };
    grouped.set(type, [...(grouped.get(type) || []), project]);
  }
  return Array.from(grouped.entries()).map(([type, projects]) => ({ type, projects }));
}

function buildResearch(entries: CmsEntry[] | undefined, fallbackArticles: any[]) {
  if (!entries?.length) return fallbackArticles;
  return entries.map((entry) => ({
    title: entry.title,
    date: entry.payload.date || "",
    tag: entry.payload.tag || "",
    excerpt: entry.payload.excerpt || entry.payload.description || "",
    author: entry.payload.author || "",
    body: entry.payload.body || "",
  }));
}

function buildVacancies(entries: CmsEntry[] | undefined, fallbackVacancies: any[]) {
  if (!entries?.length) return fallbackVacancies;
  return entries.map((entry) => ({
    id: entry.slug,
    title: entry.title,
    location: entry.payload.location || "",
    salary: entry.payload.salary || "",
    type: entry.payload.type || "",
    description: entry.payload.description || "",
  }));
}

export function CmsProvider({ children }: { children: ReactNode }) {
  const { lang, t } = useI18n();
  const [site, setSite] = useState<CmsSite>({});
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState<"api" | "fallback">("fallback");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    api
      .get<CmsSite>("/public/site", { params: { lang } })
      .then((response) => {
        if (!alive) return;
        setSite(response.data);
        setSource("api");
      })
      .catch(() => {
        if (!alive) return;
        setSite({});
        setSource("fallback");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [lang]);

  const value = useMemo<CmsContent>(
    () => ({
      loading,
      source,
      projectsGroups: buildProjects(site.projects, t.projects.groups),
      researchArticles: buildResearch(site.research, t.research.articles),
      vacancies: buildVacancies(site.vacancies, t.vacancies),
    }),
    [loading, site.projects, site.research, site.vacancies, source, t.projects.groups, t.research.articles, t.vacancies]
  );

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCmsContent() {
  return useContext(CmsContext);
}
