import { Camera, Images, Newspaper } from "lucide-react";
import { useState } from "react";
import Layout from "../layouts/MainLayout";
import { useI18n } from "../i18n";

const photoModules2024 = import.meta.glob<{ default: string }>("../assets/photos/season-2024/*.{jpg,JPG,png,PNG}", { eager: true });
const photos2024 = Object.values(photoModules2024).map((module) => module.default);

export default function Media() {
  const { t } = useI18n();
  const [activeYear, setActiveYear] = useState("2024");
  const albums = [
    { year: "2024", title: t.media.album2024, photos: photos2024 },
    { year: "2025", title: t.media.album2025, photos: [] as string[] },
  ];
  const activeAlbum = albums.find((album) => album.year === activeYear) ?? albums[0];

  return (
    <Layout>
      <section className="technical-surface text-white">
        <div className="site-container py-16 md:py-24">
          <h1 className="text-4xl font-extrabold md:text-6xl">{t.media.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{t.media.text}</p>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="site-container flex flex-wrap gap-2">
          {albums.map((album) => (
            <button
              key={album.year}
              type="button"
              onClick={() => setActiveYear(album.year)}
              className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold ${
                activeYear === album.year ? "bg-[#0b4fa3] text-white" : "border border-slate-300 bg-white text-slate-700"
              }`}
            >
              <Images className="h-4 w-4" />
              {album.year}
            </button>
          ))}
        </div>
      </section>

      <section className="section-band bg-slate-100">
        <div className="site-container">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <div className="kicker-line mb-5" />
              <h2 className="text-3xl font-extrabold text-slate-950">{activeAlbum.title}</h2>
              <p className="mt-2 text-slate-600">{t.media.photos}: {activeAlbum.photos.length}</p>
            </div>
            <Newspaper className="hidden h-10 w-10 text-[#0b4fa3] md:block" />
          </div>

          {activeAlbum.photos.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {activeAlbum.photos.map((src, index) => (
                <figure key={src} className="corporate-card overflow-hidden bg-white">
                  <img src={src} alt={`${t.media.photos} ${activeAlbum.year}, ${index + 1}`} className="h-64 w-full object-cover" loading="lazy" />
                </figure>
              ))}
            </div>
          ) : (
            <div className="corporate-card bg-white p-10 text-center">
              <Camera className="mx-auto h-10 w-10 text-[#0b4fa3]" />
              <h3 className="mt-5 text-2xl font-bold text-slate-950">{t.media.emptyTitle}</h3>
              <p className="mt-3 text-slate-600">{t.media.emptyText}</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
