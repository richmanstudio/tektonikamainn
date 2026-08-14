import { motion, useReducedMotion } from "framer-motion";
import { Activity, ArrowRight, Database, Factory, FlaskConical, Mountain, Plane, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import labImg from "../assets/presentation/image10.webp";
import topoImg from "../assets/presentation/image3.webp";
import { useCmsContent } from "../cms";
import { SERVICE_SLUGS } from "../content/serviceCatalog";
import Layout from "../layouts/MainLayout";
import { useI18n } from "../i18n";

const accentClasses: Record<string, string> = {
  blue: "bg-[#0b4fa3]",
  red: "bg-[#d71920]",
  yellow: "bg-[#f1c40f]",
  gray: "bg-slate-500",
  green: "bg-[#218c54]",
};

const icons = [Mountain, Activity, Zap, Plane, Factory, FlaskConical, Database];

export default function Services() {
  const { t } = useI18n();
  const cms = useCmsContent();
  const reduceMotion = useReducedMotion();
  const page = cms.pages.services;
  const pageTitle = page?.title || t.servicePage.title;
  const pageText = page?.text || t.servicePage.text;

  return (
    <Layout>
      <section className="technical-surface text-white">
        <div className="site-container py-16 md:py-24">
          {page?.eyebrow && <div className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-blue-200">{page.eyebrow}</div>}
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">{pageTitle}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{pageText}</p>
        </div>
      </section>

      <section className="section-band bg-white" aria-labelledby="services-list-title">
        <div className="site-container">
          <h2 id="services-list-title" className="sr-only">{pageTitle}</h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cms.services.map((service, index) => {
              const Icon = icons[index] || Factory;
              const slug = service.slug?.startsWith("service-") ? SERVICE_SLUGS[index] : service.slug || SERVICE_SLUGS[index];
              const accent = accentClasses[service.accent] || accentClasses.blue;
              return (
                <motion.article
                  key={`${service.slug}-${index}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={reduceMotion ? undefined : { delay: index * 0.03 }}
                  className="corporate-card overflow-hidden"
                >
                  <div className={`h-2 ${accent}`} aria-hidden="true" />
                  <div className="p-6">
                    <Icon className="h-8 w-8 text-[#0b4fa3]" aria-hidden="true" />
                    <h3 className="mt-5 text-2xl font-bold text-slate-950">{service.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
                    <ul className="mt-5 grid gap-2">
                      {service.items.map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-slate-700">
                          <span className={`mt-2 h-2 w-2 shrink-0 ${accent}`} aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {slug && (
                      <Link to={`/services/${slug}`} className="mt-6 inline-flex items-center gap-2 font-bold text-[#0b4fa3] underline-offset-4 hover:underline">
                        {t.common.readMore} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-band bg-slate-100">
        <div className="site-container grid gap-8 lg:grid-cols-2">
          <article className="corporate-card overflow-hidden bg-white">
            <img src={topoImg} alt="Карта регионов работ" className="h-72 w-full object-cover" loading="lazy" decoding="async" />
            <div className="p-7">
              <h2 className="text-2xl font-bold text-slate-950">{t.servicePage.designTitle}</h2>
              <p className="mt-3 leading-7 text-slate-600">{t.servicePage.designText}</p>
            </div>
          </article>
          <article className="corporate-card overflow-hidden bg-white">
            <img src={labImg} alt="Лабораторное оборудование" className="h-72 w-full object-cover" loading="lazy" decoding="async" />
            <div className="p-7">
              <h2 className="text-2xl font-bold text-slate-950">{t.servicePage.dataTitle}</h2>
              <p className="mt-3 leading-7 text-slate-600">{t.servicePage.dataText}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="site-container flex flex-col gap-5 border-t border-slate-200 pt-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-950">{t.servicePage.ctaTitle}</h2>
            <p className="mt-2 text-slate-600">{t.servicePage.ctaText}</p>
          </div>
          <Link to={page?.ctaHref || "/contacts"} className="btn-primary">
            {page?.ctaLabel || t.common.contact} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
