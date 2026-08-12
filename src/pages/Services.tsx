import { motion } from "framer-motion";
import { Activity, ArrowRight, Database, Factory, FlaskConical, Mountain, Plane, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import labImg from "../assets/presentation/image10.webp";
import topoImg from "../assets/presentation/image3.webp";
import Layout from "../layouts/MainLayout";
import { useI18n } from "../i18n";

const accentClasses: Record<string, string> = {
  blue: "bg-[#0b4fa3]",
  red: "bg-[#d71920]",
  yellow: "bg-[#f1c40f]",
  gray: "bg-slate-500",
  green: "bg-[#218c54]",
};

const icons = [Mountain, Activity, Zap, Plane, Database, FlaskConical, Factory];

export default function Services() {
  const { t } = useI18n();

  return (
    <Layout>
      <section className="technical-surface text-white">
        <div className="site-container py-16 md:py-24">
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">{t.servicePage.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{t.servicePage.text}</p>
        </div>
      </section>

      <section className="section-band bg-white">
        <div className="site-container grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.services.map((service: any, index: number) => {
            const Icon = icons[index];
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className="corporate-card overflow-hidden"
              >
                <div className={`h-2 ${accentClasses[service.accent]}`} />
                <div className="p-6">
                  <Icon className="h-8 w-8 text-[#0b4fa3]" />
                  <h2 className="mt-5 text-2xl font-bold text-slate-950">{service.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
                  <ul className="mt-5 grid gap-2">
                    {service.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-slate-700">
                        <span className={`mt-2 h-2 w-2 shrink-0 ${accentClasses[service.accent]}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="section-band bg-slate-100">
        <div className="site-container grid gap-8 lg:grid-cols-2">
          <article className="corporate-card overflow-hidden bg-white">
            <img src={topoImg} alt="Карта регионов работ" className="h-72 w-full object-cover" />
            <div className="p-7">
              <h2 className="text-2xl font-bold text-slate-950">{t.servicePage.designTitle}</h2>
              <p className="mt-3 leading-7 text-slate-600">{t.servicePage.designText}</p>
            </div>
          </article>
          <article className="corporate-card overflow-hidden bg-white">
            <img src={labImg} alt="Лабораторное оборудование" className="h-72 w-full object-cover" />
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
          <Link to="/contacts" className="btn-primary">
            {t.common.contact} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
