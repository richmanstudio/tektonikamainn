import { ArrowRight, CheckCircle2, FileCheck2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { serviceCatalogBySlug, type ServiceSlug } from "../content/serviceCatalog";
import Layout from "../layouts/MainLayout";
import { useI18n } from "../i18n";

export default function ServiceLanding() {
  const { slug = "" } = useParams();
  const { lang } = useI18n();
  const service = serviceCatalogBySlug[slug as ServiceSlug];

  if (!service) {
    return (
      <Layout>
        <section className="site-container py-24">
          <h1 className="text-4xl font-extrabold">Услуга не найдена</h1>
          <Link to="/services" className="btn-primary mt-8">Вернуться к услугам</Link>
        </section>
      </Layout>
    );
  }

  const title = service.title[lang];
  const description = service.description[lang];
  const intro = service.intro[lang];
  const benefits = service.benefits[lang];
  const deliverables = service.deliverables[lang];

  const labels = {
    ru: { capabilities: "Что выполняем", result: "Что получает заказчик", cta: "Обсудить задачу", back: "Все услуги" },
    en: { capabilities: "Capabilities", result: "Client deliverables", cta: "Discuss a project", back: "All services" },
    zh: { capabilities: "服务内容", result: "交付成果", cta: "讨论项目", back: "全部服务" },
  }[lang];

  return (
    <Layout>
      <article>
        <header className="technical-surface text-white">
          <div className="site-container py-16 md:py-24">
            <Link to="/services" className="text-sm font-bold uppercase tracking-[0.16em] text-blue-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
              ← {labels.back}
            </Link>
            <h1 className="mt-7 max-w-5xl text-4xl font-extrabold leading-tight md:text-6xl">{title}</h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-200">{description}</p>
          </div>
        </header>

        <section className="section-band bg-white">
          <div className="site-container grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="max-w-3xl text-xl leading-9 text-slate-700">{intro}</p>
              <h2 className="mt-12 text-3xl font-extrabold text-slate-950">{labels.capabilities}</h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {benefits.map((item) => (
                  <li key={item} className="corporate-card flex gap-3 p-5 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0b4fa3]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="corporate-card h-fit bg-slate-50 p-7" aria-labelledby="service-deliverables-title">
              <FileCheck2 className="h-8 w-8 text-[#0b4fa3]" aria-hidden="true" />
              <h2 id="service-deliverables-title" className="mt-5 text-2xl font-extrabold text-slate-950">{labels.result}</h2>
              <ul className="mt-5 grid gap-3">
                {deliverables.map((item) => (
                  <li key={item} className="border-b border-slate-200 pb-3 text-slate-700 last:border-0">{item}</li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="bg-slate-950 py-14 text-white">
          <div className="site-container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.18em] text-blue-300">TEKTONIKA</div>
              <h2 className="mt-3 text-3xl font-extrabold">{title}</h2>
            </div>
            <Link to={`/contacts?service=${encodeURIComponent(service.slug)}`} className="btn-primary">
              {labels.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </article>
    </Layout>
  );
}
