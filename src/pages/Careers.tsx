import { Briefcase, CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { useMemo, useState } from "react";
import Layout from "../layouts/MainLayout";
import { company } from "../content/siteData";
import { useI18n } from "../i18n";

export default function Careers() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => t.vacancies.filter((vacancy: any) => vacancy.title.toLowerCase().includes(query.trim().toLowerCase())),
    [query, t.vacancies]
  );

  return (
    <Layout>
      <section className="technical-surface text-white">
        <div className="site-container py-16 md:py-24">
          <h1 className="text-4xl font-extrabold md:text-6xl">{t.careers.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{t.careers.text}</p>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="site-container">
          <label className="block max-w-xl">
            <span className="mb-2 block text-sm font-semibold text-slate-700">{t.careers.search}</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.careers.placeholder}
              className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-[#0b4fa3]"
            />
          </label>
        </div>
      </section>

      <section className="section-band bg-slate-100">
        <div className="site-container grid gap-5 lg:grid-cols-3">
          {filtered.map((vacancy) => (
            <article key={vacancy.id} className="corporate-card bg-white p-6">
              <Briefcase className="h-8 w-8 text-[#0b4fa3]" />
              <h2 className="mt-5 text-2xl font-bold text-slate-950">{vacancy.title}</h2>
              <div className="mt-4 grid gap-2 text-sm font-semibold text-slate-600">
                <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-[#d71920]" />{vacancy.location}</span>
                <span>{vacancy.type}</span>
                <span className="text-[#218c54]">{vacancy.salary}</span>
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-600">{vacancy.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-band bg-white">
        <div className="site-container grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="kicker-line mb-5" />
            <h2 className="text-3xl font-extrabold text-slate-950 md:text-5xl">{t.careers.howTitle}</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">{t.careers.howText}</p>
          </div>
          <div className="corporate-card p-7">
            <div className="grid gap-5">
              <a href={`mailto:${company.email}`} className="flex gap-4">
                <Mail className="h-6 w-6 text-[#0b4fa3]" />
                <span className="font-semibold">{company.email}</span>
              </a>
              <a href={`tel:${company.phones[1].replace(/\D/g, "")}`} className="flex gap-4">
                <Phone className="h-6 w-6 text-[#0b4fa3]" />
                <span className="font-semibold">{company.phones.join(", ")}</span>
              </a>
              {t.careers.benefits.map((item: string) => (
                <div key={item} className="flex gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#218c54]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
