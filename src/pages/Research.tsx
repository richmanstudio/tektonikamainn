import { ArrowRight, CalendarDays, UserRound } from "lucide-react";
import Layout from "../layouts/MainLayout";
import { useI18n } from "../i18n";

export default function Research() {
  const { t } = useI18n();

  return (
    <Layout>
      <section className="technical-surface text-white">
        <div className="site-container py-16 md:py-24">
          <h1 className="text-4xl font-extrabold md:text-6xl">{t.research.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{t.research.text}</p>
        </div>
      </section>

      <section className="section-band bg-white">
        <div className="site-container">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="kicker-line mb-5" />
              <h2 className="text-3xl font-extrabold text-slate-950 md:text-5xl">{t.research.articlesTitle}</h2>
            </div>
            <div className="text-sm font-semibold text-slate-500">{t.research.articles.length} / {t.research.articlesTitle}</div>
          </div>

          <div className="grid gap-5">
            {t.research.articles.map((article: any, index: number) => (
              <article key={article.title} className="group grid gap-6 border-t border-slate-200 py-8 md:grid-cols-[170px_1fr_180px] md:items-start">
                <div className="text-sm font-bold text-slate-500">
                  <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-[#0b4fa3]" />{article.date}</span>
                  <div className="mt-4 inline-block border border-slate-300 px-3 py-1 text-xs uppercase tracking-[0.16em]">{article.tag}</div>
                </div>
                <div>
                  <h2 className="max-w-3xl text-3xl font-extrabold leading-tight text-slate-950 transition group-hover:text-[#0b4fa3]">
                    {article.title}
                  </h2>
                  <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{article.excerpt}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <UserRound className="h-4 w-4 text-[#218c54]" />
                    {article.author}
                  </div>
                </div>
                <button type="button" className="inline-flex items-center gap-3 self-center text-sm font-extrabold uppercase tracking-[0.16em] text-[#0b4fa3]">
                  {t.research.read}
                  <span className="flex h-10 w-10 items-center justify-center bg-[#0b4fa3] text-white transition group-hover:bg-[#083d7d]">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </button>
                {index === 0 && <div className="hidden" />}
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
