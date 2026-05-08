import { Calendar, MapPin } from "lucide-react";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../layouts/MainLayout";
import { useI18n } from "../i18n";
import { useCmsContent } from "../cms";

export default function Projects() {
  const { t } = useI18n();
  const cms = useCmsContent();
  const [searchParams, setSearchParams] = useSearchParams();
  const allProjects = useMemo(
    () => cms.projectsGroups.flatMap((group: any) => group.projects.map((project: any) => ({ ...project, group: group.type }))),
    [cms.projectsGroups]
  );
  const years = useMemo(() => [t.common.all, ...Array.from(new Set(allProjects.map((project: any) => project.year))).sort((a: any, b: any) => b - a)], [allProjects, t.common.all]);
  const regions = useMemo(() => [t.common.all, ...Array.from(new Set(allProjects.map((project: any) => project.region)))], [allProjects, t.common.all]);
  const activeGroup = searchParams.get("type") || t.common.all;
  const activeYear = searchParams.get("year") || t.common.all;
  const activeRegion = searchParams.get("region") || t.common.all;

  const setFilter = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === t.common.all) next.delete(key);
    else next.set(key, value);
    setSearchParams(next);
  };

  const visible = useMemo(
    () =>
      allProjects.filter((project: any) => {
        const groupMatch = activeGroup === t.common.all || project.group === activeGroup;
        const yearMatch = activeYear === t.common.all || String(project.year) === String(activeYear);
        const regionMatch = activeRegion === t.common.all || project.region === activeRegion;
        return groupMatch && yearMatch && regionMatch;
      }),
    [activeGroup, activeRegion, activeYear, allProjects, t.common.all]
  );

  return (
    <Layout>
      <section className="technical-surface text-white">
        <div className="site-container py-16 md:py-24">
          <h1 className="text-4xl font-extrabold md:text-6xl">{t.projects.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{t.projects.text}</p>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="site-container grid gap-5 xl:grid-cols-3">
          <FilterGroup
            label={t.projects.title}
            items={[t.common.all, ...cms.projectsGroups.map((group: any) => group.type)]}
            active={activeGroup}
            onSelect={(value) => setFilter("type", value)}
            activeClass="bg-[#0b4fa3] text-white"
          />
          <FilterGroup
            label={t.projects.regions}
            items={regions}
            active={activeRegion}
            onSelect={(value) => setFilter("region", value)}
            activeClass="bg-[#218c54] text-white"
          />
          <FilterGroup
            label={t.projects.years}
            items={years.map(String)}
            active={String(activeYear)}
            onSelect={(value) => setFilter("year", value)}
            activeClass="bg-[#d71920] text-white"
          />
        </div>
      </section>

      <section className="section-band bg-slate-100">
        <div className="site-container">
          <div className="mb-6 text-sm font-semibold text-slate-500">{t.projects.count}: {visible.length}</div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((project: any) => (
              <article key={`${project.group}-${project.title}`} className="corporate-card bg-white p-6">
                <div className="mb-5 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-500">
                  <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4 text-[#0b4fa3]" />{project.year}</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4 text-[#d71920]" />{project.region}</span>
                </div>
                <div className="mb-4 inline-block border border-slate-300 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-600">
                  {project.group}
                </div>
                <h2 className="text-2xl font-bold text-slate-950">{project.title}</h2>
                <p className="mt-2 text-sm font-semibold text-[#0b4fa3]">{project.client}</p>
                <p className="mt-4 text-sm leading-7 text-slate-600">{project.scope}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function FilterGroup({
  label,
  items,
  active,
  onSelect,
  activeClass,
}: {
  label: string;
  items: string[];
  active: string;
  onSelect: (value: string) => void;
  activeClass: string;
}) {
  return (
    <div>
      <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{label}</div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onSelect(item)}
            className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
              active === item ? activeClass : "border border-slate-300 bg-white text-slate-700 hover:border-[#0b4fa3]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
