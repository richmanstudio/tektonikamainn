import { ArrowRight, BriefcaseBusiness, Building2, MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Lang } from "../i18n";

type ProjectGroup = {
  type: string;
  projects: Project[];
};

type Project = {
  title: string;
  client: string;
  region: string;
  year: number;
  scope: string;
};

type MapPoint = Project & {
  id: string;
  group: string;
  category: "company" | "team";
  x: number;
  y: number;
  area: string;
};

const pointPositions: Record<string, Pick<MapPoint, "x" | "y" | "area">> = {
  "Участки Амхалга и Немту-Си": { x: 78, y: 50, area: "Амхалга / Немту-Си" },
  "Люгинская площадь": { x: 80, y: 58, area: "Люгинская площадь" },
  "Участок Осенний": { x: 88, y: 72, area: "Приморье" },
  "Чульбатканская площадь": { x: 73, y: 46, area: "Чульбаткан" },
  "Месторождение Сухой Лог": { x: 35, y: 61, area: "Сухой Лог" },
  "Фланги месторождения «Северное»": { x: 66, y: 39, area: "Южная Якутия" },
  "Нижний Биркачан": { x: 75, y: 29, area: "Колыма" },
};

const fallbackPositions = [
  { x: 78, y: 52, area: "Дальний Восток" },
  { x: 84, y: 61, area: "Хабаровский край" },
  { x: 88, y: 72, area: "Приморье" },
  { x: 62, y: 42, area: "Якутия" },
  { x: 35, y: 60, area: "Восточная Сибирь" },
];

const copy = {
  ru: {
    eyebrow: "География работ",
    title: "Карта проектов от Урала до Дальнего Востока",
    text: "Интерактивная схема показывает, где выполнялись проекты ООО «ТЕКТОНИКА» и где команда накопила профильный опыт до создания компании.",
    company: "Проекты компании",
    team: "Проекты сотрудников",
    all: "Все точки",
    legendCompany: "ООО «ТЕКТОНИКА»",
    legendTeam: "Опыт сотрудников",
    selected: "Выбранная точка",
    route: "Урал — Сибирь — Дальний Восток",
    mapLabel: "Работы и проектный опыт",
    details: "Открыть проекты",
    hint: "Наведите на точку или нажмите на нее",
    areas: ["Урал", "Западная Сибирь", "Красноярский край", "Якутия", "Магадан", "Хабаровск", "Приморье"],
  },
  en: {
    eyebrow: "Work geography",
    title: "Project map from the Urals to the Far East",
    text: "The interactive scheme shows where TEKTONIKA projects were delivered and where the team gained relevant experience before the company was founded.",
    company: "Company projects",
    team: "Team projects",
    all: "All points",
    legendCompany: "TEKTONIKA LLC",
    legendTeam: "Team experience",
    selected: "Selected point",
    route: "Urals - Siberia - Far East",
    mapLabel: "Works and project experience",
    details: "Open projects",
    hint: "Hover or tap a point",
    areas: ["Urals", "West Siberia", "Krasnoyarsk Krai", "Yakutia", "Magadan", "Khabarovsk", "Primorye"],
  },
  zh: {
    eyebrow: "工作地域",
    title: "从乌拉尔到远东的项目地图",
    text: "交互式示意图展示 TEKTONIKA 项目地点，以及公司成立前团队积累相关经验的区域。",
    company: "公司项目",
    team: "团队项目",
    all: "全部点位",
    legendCompany: "TEKTONIKA",
    legendTeam: "团队经验",
    selected: "选中点位",
    route: "乌拉尔 - 西伯利亚 - 远东",
    mapLabel: "工作与项目经验",
    details: "打开项目",
    hint: "悬停或点击点位",
    areas: ["乌拉尔", "西西伯利亚", "克拉斯诺亚尔斯克", "雅库特", "马加丹", "哈巴罗夫斯克", "滨海"],
  },
};

function normalizeCategory(group: string): MapPoint["category"] {
  const value = group.toLowerCase();
  return value.includes("сотруд") || value.includes("team") || value.includes("团队") ? "team" : "company";
}

function buildMapPoints(groups: ProjectGroup[]) {
  let fallbackIndex = 0;
  return groups.flatMap((group) =>
    group.projects.map((project, index) => {
      const fallback = fallbackPositions[fallbackIndex++ % fallbackPositions.length];
      const position = pointPositions[project.title] || fallback;
      return {
        ...project,
        ...position,
        id: `${group.type}-${project.title}-${index}`,
        group: group.type,
        category: normalizeCategory(group.type),
      };
    })
  );
}

export default function ProjectsGeoMap({ groups, lang }: { groups: ProjectGroup[]; lang: Lang }) {
  const dict = copy[lang] || copy.ru;
  const points = useMemo(() => buildMapPoints(groups), [groups]);
  const [filter, setFilter] = useState<"all" | "company" | "team">("all");
  const visiblePoints = points.filter((point) => filter === "all" || point.category === filter);
  const [activeId, setActiveId] = useState(() => visiblePoints[0]?.id || "");
  const activePoint = visiblePoints.find((point) => point.id === activeId) || visiblePoints[0];

  const setFiltered = (nextFilter: "all" | "company" | "team") => {
    setFilter(nextFilter);
    const nextPoint = points.find((point) => nextFilter === "all" || point.category === nextFilter);
    setActiveId(nextPoint?.id || "");
  };

  return (
    <div className="mb-16 overflow-hidden border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.10)]">
      <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="bg-slate-950 p-6 text-white sm:p-8 lg:p-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#7cc7ff]">{dict.eyebrow}</p>
          <h3 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">{dict.title}</h3>
          <p className="mt-6 text-base leading-7 text-white/72">{dict.text}</p>

          <div className="mt-8 grid gap-2">
            {[
              { value: "all" as const, label: dict.all },
              { value: "company" as const, label: dict.company },
              { value: "team" as const, label: dict.team },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setFiltered(item.value)}
                className={`flex min-h-12 items-center justify-between border px-4 text-left text-sm font-bold transition ${
                  filter === item.value
                    ? "border-[#7cc7ff] bg-[#0b4fa3] text-white"
                    : "border-white/15 bg-white/5 text-white/75 hover:border-white/40 hover:text-white"
                }`}
              >
                {item.label}
                <span className="text-xs text-white/65">{item.value === "all" ? points.length : points.filter((point) => point.category === item.value).length}</span>
              </button>
            ))}
          </div>

          {activePoint && (
            <article className="mt-8 border border-white/15 bg-white/[0.06] p-5">
              <div className="mb-4 flex items-center gap-3 text-xs font-extrabold uppercase text-[#7cc7ff]">
                {activePoint.category === "company" ? <Building2 className="h-4 w-4" /> : <BriefcaseBusiness className="h-4 w-4" />}
                {dict.selected}
              </div>
              <h4 className="text-2xl font-extrabold leading-tight">{activePoint.title}</h4>
              <p className="mt-3 text-sm font-bold text-white/70">{activePoint.client}</p>
              <p className="mt-4 text-sm leading-6 text-white/68">{activePoint.scope}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold">
                <span className="bg-white/10 px-3 py-2">{activePoint.region}</span>
                <span className="bg-white/10 px-3 py-2">{activePoint.year}</span>
              </div>
            </article>
          )}
        </aside>

        <div className="relative min-h-[520px] overflow-hidden bg-[#edf4f7] p-4 sm:p-6 lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_34%,rgba(11,79,163,0.18),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.86),rgba(207,222,229,0.72))]" />
          <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:42px_42px]" />

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">{dict.route}</p>
              <h4 className="mt-2 text-2xl font-extrabold text-slate-950">{dict.mapLabel}</h4>
            </div>
            <div className="flex flex-wrap gap-3 text-xs font-bold text-slate-700">
              <span className="inline-flex items-center gap-2"><span className="h-3 w-3 bg-[#0b4fa3]" />{dict.legendCompany}</span>
              <span className="inline-flex items-center gap-2"><span className="h-3 w-3 bg-[#d71920]" />{dict.legendTeam}</span>
            </div>
          </div>

          <div className="relative mt-6 aspect-[1.82/1] min-h-[280px] overflow-hidden border border-slate-300/80 bg-white/40">
            <svg viewBox="0 0 1000 550" role="img" aria-label={dict.mapLabel} className="absolute inset-0 h-full w-full">
              <defs>
                <linearGradient id="land" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#dbe6df" />
                  <stop offset="52%" stopColor="#c4d7d4" />
                  <stop offset="100%" stopColor="#aebfbb" />
                </linearGradient>
                <linearGradient id="range" x1="0" x2="1">
                  <stop offset="0%" stopColor="#728782" />
                  <stop offset="100%" stopColor="#46605d" />
                </linearGradient>
              </defs>
              <path d="M34 350 C92 281 169 283 240 252 C322 219 393 168 508 198 C599 221 619 145 721 151 C817 158 858 224 959 202 L973 373 C862 394 814 462 698 424 C590 388 504 455 392 416 C289 380 187 437 84 409 Z" fill="url(#land)" stroke="#8ea19c" strokeWidth="3" />
              <path d="M54 366 C167 338 232 301 340 318 C477 340 528 280 640 294 C743 307 822 272 956 292" fill="none" stroke="#ffffff" strokeOpacity="0.65" strokeWidth="12" />
              <path d="M60 366 C170 338 232 301 340 318 C477 340 528 280 640 294 C743 307 822 272 956 292" fill="none" stroke="#8fb0ba" strokeWidth="3" strokeDasharray="8 13" />
              <path d="M96 328 C132 278 161 250 201 227 M292 283 C318 239 340 220 377 199 M548 233 C601 189 638 177 692 174 M742 217 C790 195 838 194 891 211" fill="none" stroke="url(#range)" strokeWidth="10" strokeLinecap="round" strokeOpacity="0.38" />
              <path d="M655 102 C692 129 717 168 729 210 C737 239 730 269 703 286 C675 303 637 292 616 267 C593 239 587 201 599 168 C609 137 627 116 655 102 Z" fill="#b8cac6" stroke="#879c97" strokeWidth="2" opacity="0.78" />
              <path d="M756 82 C795 104 814 137 810 174 C806 214 769 240 731 232 C692 224 678 178 696 143 C710 116 727 96 756 82 Z" fill="#c1d0cb" stroke="#879c97" strokeWidth="2" opacity="0.78" />
              <path d="M830 236 C878 238 920 253 958 286" fill="none" stroke="#8fb0ba" strokeWidth="5" strokeLinecap="round" strokeDasharray="9 11" />
              <path d="M104 420 C233 463 381 477 514 450 C648 424 764 448 917 405" fill="none" stroke="#77908b" strokeOpacity="0.45" strokeWidth="2" />
            </svg>

            {dict.areas.map((area, index) => {
              const positions = [
                { left: "9%", top: "67%" },
                { left: "20%", top: "55%" },
                { left: "34%", top: "65%" },
                { left: "60%", top: "29%" },
                { left: "73%", top: "18%" },
                { left: "79%", top: "62%" },
                { left: "87%", top: "79%" },
              ];
              return (
                <span key={area} className="absolute text-[11px] font-extrabold uppercase text-slate-500/75" style={positions[index]}>
                  {area}
                </span>
              );
            })}

            {visiblePoints.map((point) => {
              const isActive = point.id === activePoint?.id;
              const color = point.category === "company" ? "bg-[#0b4fa3]" : "bg-[#d71920]";
              return (
                <button
                  key={point.id}
                  type="button"
                  onMouseEnter={() => setActiveId(point.id)}
                  onFocus={() => setActiveId(point.id)}
                  onClick={() => setActiveId(point.id)}
                  className={`absolute z-10 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-2 border-white shadow-[0_12px_26px_rgba(15,23,42,0.28)] transition hover:scale-110 ${color} ${isActive ? "scale-125 ring-4 ring-slate-950/15" : ""}`}
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                  aria-label={`${point.title}, ${point.region}`}
                >
                  <MapPin className="h-4 w-4 text-white" />
                </button>
              );
            })}

            {activePoint && (
              <div
                className="pointer-events-none absolute z-20 hidden w-[270px] border border-slate-200 bg-white p-4 shadow-[0_18px_46px_rgba(15,23,42,0.18)] md:block"
                style={{
                  left: `${activePoint.x}%`,
                  top: `${activePoint.y}%`,
                  transform: activePoint.x > 62 ? "translate(calc(-100% - 18px), -50%)" : "translate(18px, -50%)",
                }}
              >
                <p className={`mb-3 h-1 w-12 ${activePoint.category === "company" ? "bg-[#0b4fa3]" : "bg-[#d71920]"}`} />
                <h5 className="text-base font-extrabold leading-tight text-slate-950">{activePoint.title}</h5>
                <p className="mt-2 text-xs font-bold uppercase text-slate-500">{activePoint.area}</p>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-700">{activePoint.scope}</p>
              </div>
            )}
          </div>

          <div className="relative mt-5 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <p className="text-sm font-semibold text-slate-600">{dict.hint}</p>
            <Link to="/projects" className="btn-secondary bg-white/80">
              {dict.details} <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
