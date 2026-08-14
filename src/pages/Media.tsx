import { Camera, Images, Newspaper } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useCmsContent } from "../cms";
import Layout from "../layouts/MainLayout";
import { useI18n } from "../i18n";

const photoModules2024 = import.meta.glob<{ default: string }>("../assets/photos/season-2024/*.{jpg,JPG,png,PNG,webp}", { eager: true });
const fallback2024 = Object.values(photoModules2024).map((module, index) => ({
  slug: `season-2024-${index + 1}`,
  title: `Полевой сезон 2024 — ${index + 1}`,
  image: module.default,
  year: "2024",
  caption: "",
}));

export default function Media() {
  const { t } = useI18n();
  const cms = useCmsContent();
  const sourceItems = cms.media.length ? cms.media.filter((item) => item.image) : fallback2024;
  const years = useMemo(() => Array.from(new Set(sourceItems.map((item) => item.year || "2024"))).sort((a, b) => Number(b) - Number(a)), [sourceItems]);
  const [activeYear, setActiveYear] = useState(years[0] || "2024");

  useEffect(() => {
    if (!years.includes(activeYear)) setActiveYear(years[0] || "2024");
  }, [activeYear, years]);

  const activeItems = sourceItems.filter((item) => (item.year || "2024") === activeYear);
  const albumTitle = activeYear === "2024" ? t.media.album2024 : activeYear === "2025" ? t.media.album2025 : `${t.media.title} ${activeYear}`;

  return (
    <Layout>
      <section className="technical-surface text-white">
        <div className="site-container py-16 md:py-24">
          <h1 className="text-4xl font-extrabold md:text-6xl">{t.media.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{t.media.text}</p>
        </div>
      </section>

      <section className="bg-white py-8" aria-label={t.media.title}>
        <div className="site-container flex flex-wrap gap-2" role="group" aria-label={t.media.photos}>
          {years.map((year) => (
            <button
              key={year}
              type="button"
              onClick={() => setActiveYear(year)}
              aria-pressed={activeYear === year}
              className={`inline-flex min-h-11 items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold ${activeYear === year ? "bg-[#0b4fa3] text-white" : "border border-slate-300 bg-white text-slate-700"}`}
            >
              <Images className="h-4 w-4" aria-hidden="true" />
              {year}
            </button>
          ))}
        </div>
      </section>

      <section className="section-band bg-slate-100">
        <div className="site-container">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <div className="kicker-line mb-5" aria-hidden="true" />
              <h2 className="text-3xl font-extrabold text-slate-950">{albumTitle}</h2>
              <p className="mt-2 text-slate-600">{t.media.photos}: {activeItems.length}</p>
            </div>
            <Newspaper className="hidden h-10 w-10 text-[#0b4fa3] md:block" aria-hidden="true" />
          </div>

          {activeItems.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {activeItems.map((item, index) => (
                <figure key={item.slug || `${item.image}-${index}`} className="corporate-card overflow-hidden bg-white">
                  <img
                    src={item.image}
                    alt={item.title || `${t.media.photos} ${activeYear}, ${index + 1}`}
                    className="h-64 w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  {(item.caption || (cms.media.length && item.title)) && (
                    <figcaption className="p-4 text-sm leading-6 text-slate-600">{item.caption || item.title}</figcaption>
                  )}
                </figure>
              ))}
            </div>
          ) : (
            <div className="corporate-card bg-white p-10 text-center">
              <Camera className="mx-auto h-10 w-10 text-[#0b4fa3]" aria-hidden="true" />
              <h3 className="mt-5 text-2xl font-bold text-slate-950">{t.media.emptyTitle}</h3>
              <p className="mt-3 text-slate-600">{t.media.emptyText}</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
