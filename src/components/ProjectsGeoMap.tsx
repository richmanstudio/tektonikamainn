import "leaflet/dist/leaflet.css";

import L, { type LatLngBoundsExpression, type Map as LeafletMap } from "leaflet";
import { ArrowRight, BriefcaseBusiness, Building2, Crosshair, Layers, MapPinned } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
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
  lon: number;
  lat: number;
  area: string;
  precision: "site" | "district" | "region";
};

const pointGeoPositions: Record<string, Pick<MapPoint, "lon" | "lat" | "area" | "precision">> = {
  "Участки Амхалга и Немту-Си": { lon: 136.4, lat: 52.9, area: "Амхалга / Немту-Си", precision: "district" },
  "Люгинская площадь": { lon: 135.9, lat: 51.6, area: "Люгинская площадь", precision: "district" },
  "Участок Осенний": { lon: 133.9, lat: 45.1, area: "Приморье", precision: "district" },
  "Чульбатканская площадь": { lon: 136.0, lat: 53.0, area: "Чульбаткан", precision: "district" },
  "Месторождение Сухой Лог": { lon: 115.7, lat: 58.4, area: "Бодайбинский район", precision: "district" },
  "Фланги месторождения «Северное»": { lon: 125.5, lat: 58.3, area: "Южная Якутия", precision: "district" },
  "Нижний Биркачан": { lon: 159.889, lat: 63.919, area: "Нижний Биркачан", precision: "site" },
};

const fallbackPositions = [
  { lon: 136.8, lat: 51.8, area: "Дальний Восток", precision: "region" as const },
  { lon: 135.1, lat: 48.5, area: "Хабаровский край", precision: "region" as const },
  { lon: 132.0, lat: 44.8, area: "Приморье", precision: "region" as const },
  { lon: 129.7, lat: 62.0, area: "Якутия", precision: "region" as const },
  { lon: 118.0, lat: 58.0, area: "Восточная Сибирь", precision: "region" as const },
];

const copy = {
  ru: {
    eyebrow: "География работ",
    title: "Проекты на детальной карте Сибири и Дальнего Востока",
    text: "Карта показывает фактическую географию работ на топографической подложке: рельеф, реки, населенные пункты и транспортные ориентиры помогают быстрее считать масштаб территории.",
    company: "Проекты компании",
    team: "Опыт сотрудников",
    all: "Все точки",
    legendCompany: "ООО «ТЕКТОНИКА»",
    legendTeam: "Опыт сотрудников",
    selected: "Выбранная точка",
    route: "Сибирь — Якутия — Колыма — Приамурье — Приморье",
    mapLabel: "Топографическая карта работ",
    details: "Открыть проекты",
    hint: "Наводите на маркеры, кликайте по списку или меняйте слой фильтра",
    source: "Картографическая подложка: Esri World Physical Map. Координаты отдельных участков уточняются по проектной документации.",
    precision: {
      site: "точка участка",
      district: "район работ",
      region: "региональная привязка",
    },
  },
  en: {
    eyebrow: "Work geography",
    title: "Projects on a detailed map of Siberia and the Far East",
    text: "The map shows project geography on a topographic base: relief, rivers, settlements and transport references make the operating scale easier to read.",
    company: "Company projects",
    team: "Team experience",
    all: "All points",
    legendCompany: "TEKTONIKA LLC",
    legendTeam: "Team experience",
    selected: "Selected point",
    route: "Siberia - Yakutia - Kolyma - Amur region - Primorye",
    mapLabel: "Topographic work map",
    details: "Open projects",
    hint: "Hover markers, click the list or switch the layer filter",
    source: "Base map: Esri World Physical Map. Exact coordinates for selected sites are refined against project documentation.",
    precision: {
      site: "site point",
      district: "work district",
      region: "regional reference",
    },
  },
  zh: {
    eyebrow: "工作地域",
    title: "西伯利亚与远东项目详图",
    text: "地图以地形底图展示项目地理范围：地貌、河流、居民点和交通参照让区域尺度更清晰。",
    company: "公司项目",
    team: "团队经验",
    all: "全部点位",
    legendCompany: "TEKTONIKA",
    legendTeam: "团队经验",
    selected: "选中点位",
    route: "西伯利亚 - 雅库特 - 科雷马 - 阿穆尔 - 滨海",
    mapLabel: "地形工作地图",
    details: "打开项目",
    hint: "悬停标记、点击列表或切换筛选",
    source: "底图：Esri World Physical Map。部分点位坐标以项目资料为准。",
    precision: {
      site: "区块点位",
      district: "工作区域",
      region: "区域定位",
    },
  },
};

const initialBounds: LatLngBoundsExpression = [
  [43.2, 108.5],
  [65.2, 162.8],
];

function normalizeCategory(group: string): MapPoint["category"] {
  const value = group.toLowerCase();
  return value.includes("сотруд") || value.includes("team") || value.includes("团队") ? "team" : "company";
}

function buildMapPoints(groups: ProjectGroup[]) {
  let fallbackIndex = 0;
  return groups.flatMap((group) =>
    group.projects.map((project, index) => {
      const fallback = fallbackPositions[fallbackIndex++ % fallbackPositions.length];
      const position = pointGeoPositions[project.title] || fallback;
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

function markerIcon(point: MapPoint, active: boolean) {
  const color = point.category === "company" ? "#2f8cff" : "#d71920";
  const size = active ? 30 : 22;
  return L.divIcon({
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: `
      <span style="
        width:${size}px;
        height:${size}px;
        display:block;
        border-radius:999px;
        border:3px solid #ffffff;
        background:${color};
        box-shadow:0 0 0 ${active ? "12px" : "7px"} rgba(47,140,255,0.16), 0 14px 34px rgba(0,0,0,0.35);
      "></span>
    `,
  });
}

function formatCoord(value: number) {
  return value.toFixed(3).replace(/\.?0+$/, "");
}

export default function ProjectsGeoMap({ groups, lang }: { groups: ProjectGroup[]; lang: Lang }) {
  const dict = copy[lang] || copy.ru;
  const points = useMemo(() => buildMapPoints(groups), [groups]);
  const [filter, setFilter] = useState<"all" | "company" | "team">("all");
  const visiblePoints = points.filter((point) => filter === "all" || point.category === filter);
  const [activeId, setActiveId] = useState(() => visiblePoints[0]?.id || "");
  const activePoint = visiblePoints.find((point) => point.id === activeId) || visiblePoints[0];
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerLayerRef = useRef<L.LayerGroup | null>(null);

  const setFiltered = (nextFilter: "all" | "company" | "team") => {
    setFilter(nextFilter);
    const nextPoint = points.find((point) => nextFilter === "all" || point.category === nextFilter);
    setActiveId(nextPoint?.id || "");
  };

  useEffect(() => {
    if (!mapElementRef.current || mapRef.current) return;

    const map = L.map(mapElementRef.current, {
      attributionControl: false,
      zoomControl: false,
      scrollWheelZoom: false,
      maxBoundsViscosity: 0.45,
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 8,
      minZoom: 2,
    }).addTo(map);

    map.fitBounds(initialBounds, { padding: [24, 24] });
    markerLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markerLayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const layer = markerLayerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();
    visiblePoints.forEach((point) => {
      const marker = L.marker([point.lat, point.lon], {
        icon: markerIcon(point, activePoint?.id === point.id),
        keyboard: true,
        title: point.title,
      });
      marker.on("mouseover focus click", () => setActiveId(point.id));
      marker.bindTooltip(`<strong>${point.title}</strong><br>${point.area}`, {
        direction: "top",
        offset: [0, -14],
        opacity: 0.95,
        className: "tektonika-map-tooltip",
      });
      layer.addLayer(marker);
    });

    if (visiblePoints.length) {
      const bounds = L.latLngBounds(visiblePoints.map((point) => [point.lat, point.lon] as [number, number]));
      map.fitBounds(bounds.pad(0.32), { paddingTopLeft: [28, 28], paddingBottomRight: [28, 28], maxZoom: 6, animate: true });
    } else {
      map.fitBounds(initialBounds, { padding: [24, 24] });
    }
  }, [visiblePoints, activePoint?.id]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !activePoint) return;
    map.panTo([activePoint.lat, activePoint.lon], { animate: true, duration: 0.45 });
  }, [activePoint?.id]);

  return (
    <div className="mb-16 overflow-hidden border border-slate-800 bg-slate-950 shadow-[0_28px_90px_rgba(15,23,42,0.22)]">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(11,79,163,0.34),transparent_26%),radial-gradient(circle_at_92%_28%,rgba(215,25,32,0.12),transparent_23%)]" />
        <div className="relative grid gap-7 border-b border-white/10 p-6 text-white sm:p-8 lg:grid-cols-[1fr_auto] lg:p-10">
          <div className="max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#7cc7ff]">{dict.eyebrow}</p>
            <h3 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">{dict.title}</h3>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/70">{dict.text}</p>
          </div>

          <div className="grid gap-2 sm:grid-cols-3 lg:min-w-[520px] lg:self-end">
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
                    ? "border-[#7cc7ff] bg-[#0b4fa3] text-white shadow-[0_16px_38px_rgba(11,79,163,0.35)]"
                    : "border-white/15 bg-white/[0.04] text-white/72 hover:border-white/35 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                {item.label}
                <span className="text-xs text-white/65">{item.value === "all" ? points.length : points.filter((point) => point.category === item.value).length}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative grid gap-0 lg:grid-cols-[minmax(0,1fr)_390px]">
          <div className="relative overflow-hidden bg-[#071421] p-4 sm:p-6 lg:p-8">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(9,19,32,0.92),rgba(14,35,48,0.78))]" />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#7cc7ff]">{dict.route}</p>
                <h4 className="mt-2 text-2xl font-extrabold text-white">{dict.mapLabel}</h4>
              </div>
              <div className="flex flex-wrap gap-3 text-xs font-bold text-white/75">
                <span className="inline-flex items-center gap-2"><span className="h-3 w-3 bg-[#2f8cff]" />{dict.legendCompany}</span>
                <span className="inline-flex items-center gap-2"><span className="h-3 w-3 bg-[#d71920]" />{dict.legendTeam}</span>
              </div>
            </div>

            <div className="relative mt-6 h-[420px] overflow-hidden border border-white/10 bg-slate-950 shadow-[0_22px_70px_rgba(0,0,0,0.32)] sm:h-[520px] lg:h-[610px]">
              <div ref={mapElementRef} className="h-full w-full" aria-label={dict.mapLabel} />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(7,20,33,0.18),transparent_22%,transparent_78%,rgba(7,20,33,0.14))]" />
              <div className="pointer-events-none absolute left-4 top-4 border border-white/15 bg-slate-950/75 px-4 py-3 text-xs font-bold text-white/78 backdrop-blur">
                <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-[#7cc7ff]" />
                {visiblePoints.length} / {points.length}
              </div>
            </div>

            <div className="relative mt-5 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold text-white/75">{dict.hint}</p>
                <p className="mt-2 text-xs font-semibold text-white/45">{dict.source}</p>
              </div>
              <Link to="/projects" className="inline-flex items-center justify-center gap-3 border border-white/15 bg-white px-7 py-4 text-sm font-bold text-slate-950 transition hover:border-[#7cc7ff] hover:text-[#0b4fa3]">
                {dict.details} <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <aside className="relative border-t border-white/10 bg-white p-6 text-slate-950 lg:border-l lg:border-t-0 lg:p-8">
            {activePoint && (
              <article>
                <div className="flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.14em] text-[#0b4fa3]">
                  <span className={`flex h-10 w-10 items-center justify-center text-white ${activePoint.category === "company" ? "bg-[#0b4fa3]" : "bg-[#d71920]"}`}>
                    {activePoint.category === "company" ? <Building2 className="h-5 w-5" /> : <BriefcaseBusiness className="h-5 w-5" />}
                  </span>
                  {dict.selected}
                </div>
                <h4 className="mt-7 text-3xl font-extrabold leading-tight">{activePoint.title}</h4>
                <p className="mt-3 text-sm font-extrabold uppercase tracking-[0.08em] text-slate-500">{activePoint.area}</p>
                <p className="mt-5 text-base font-bold text-[#0b4fa3]">{activePoint.client}</p>
                <p className="mt-5 text-base leading-7 text-slate-700">{activePoint.scope}</p>
                <div className="mt-7 grid grid-cols-2 gap-3 text-sm font-bold">
                  <span className="border border-slate-200 bg-slate-50 px-4 py-3">{activePoint.region}</span>
                  <span className="border border-slate-200 bg-slate-50 px-4 py-3">{activePoint.year}</span>
                </div>
                <div className="mt-7 grid gap-3 border-t border-slate-200 pt-6 text-sm font-bold text-slate-500">
                  <span className="flex items-center gap-3">
                    <Crosshair className="h-5 w-5 text-[#0b4fa3]" />
                    {formatCoord(activePoint.lat)}°N / {formatCoord(activePoint.lon)}°E
                  </span>
                  <span className="flex items-center gap-3">
                    <Layers className="h-5 w-5 text-[#0b4fa3]" />
                    {dict.precision[activePoint.precision]}
                  </span>
                </div>
              </article>
            )}

            <div className="mt-8 border-t border-slate-200 pt-6">
              <div className="mb-4 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500">
                <MapPinned className="h-4 w-4 text-[#0b4fa3]" />
                {visiblePoints.length} / {points.length}
              </div>
              <div className="grid max-h-[310px] gap-2 overflow-y-auto pr-1">
                {visiblePoints.map((point) => (
                  <button
                    key={point.id}
                    type="button"
                    onClick={() => setActiveId(point.id)}
                    className={`grid grid-cols-[8px_1fr] gap-3 border px-3 py-3 text-left text-sm transition ${
                      activePoint?.id === point.id ? "border-[#0b4fa3] bg-[#eef6ff]" : "border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    <span className={`mt-1 h-2 w-2 rounded-full ${point.category === "company" ? "bg-[#0b4fa3]" : "bg-[#d71920]"}`} />
                    <span>
                      <span className="block font-extrabold text-slate-950">{point.title}</span>
                      <span className="mt-1 block text-xs font-bold text-slate-500">{point.region}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
