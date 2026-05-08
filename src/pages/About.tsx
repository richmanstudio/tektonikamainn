import { motion } from "framer-motion";
import { Building2, MapPin, Users } from "lucide-react";
import logo from "../assets/logo.png";
import fieldImg from "../assets/presentation/image5.png";
import Layout from "../layouts/MainLayout";
import { company } from "../content/siteData";
import { useI18n } from "../i18n";

export default function About() {
  const { t } = useI18n();

  return (
    <Layout>
      <section className="bg-white">
        <div className="site-container grid gap-10 py-16 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="kicker-line mb-5" />
            <h1 className="text-4xl font-extrabold leading-tight text-slate-950 md:text-6xl">{t.about.title}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              {t.about.p1}
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              {t.about.p2}
            </p>
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="corporate-card overflow-hidden">
            <img src={fieldImg} alt="Полевой лагерь геофизической партии" className="h-[460px] w-full object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="section-band bg-slate-100">
        <div className="site-container grid gap-5 md:grid-cols-4">
          {t.facts.map((fact: any) => (
            <div key={fact.label} className="corporate-card p-6">
              <div className="text-3xl font-extrabold text-[#0b4fa3]">{fact.value}</div>
              <p className="mt-3 text-sm font-semibold uppercase leading-6 tracking-wide text-slate-500">{fact.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-band bg-white">
        <div className="site-container grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="corporate-card p-7">
            <img src={logo} alt="Логотип ТЕКТОНИКА" className="mb-8 h-24 w-auto" />
            <h2 className="text-3xl font-extrabold text-slate-950">{t.about.legal}</h2>
            <dl className="mt-6 grid gap-4 text-sm">
              <div className="grid gap-1 border-b border-slate-200 pb-3"><dt className="font-semibold text-slate-500">{t.about.inn}</dt><dd>{company.inn} / {company.kpp}</dd></div>
              <div className="grid gap-1 border-b border-slate-200 pb-3"><dt className="font-semibold text-slate-500">{t.about.ogrn}</dt><dd>{company.ogrn}</dd></div>
              <div className="grid gap-1 border-b border-slate-200 pb-3"><dt className="font-semibold text-slate-500">{t.about.account}</dt><dd>{company.account}</dd></div>
              <div className="grid gap-1"><dt className="font-semibold text-slate-500">{t.about.address}</dt><dd>{t.company.address}</dd></div>
            </dl>
          </div>
          <div className="grid gap-5">
            {t.about.cards.map((item: any, index: number) => {
              const Icon = [Users, Building2, MapPin][index];
              return (
                <article key={item.title} className="corporate-card p-7">
                  <Icon className="h-8 w-8 text-[#0b4fa3]" />
                  <h3 className="mt-5 text-2xl font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
