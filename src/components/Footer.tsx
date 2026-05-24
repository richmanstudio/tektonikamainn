import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { company } from "../content/siteData";
import { useI18n } from "../i18n";

export default function Footer() {
  const { lang, t } = useI18n();
  const richman = {
    ru: {
      eyebrow: "Digital production",
      title: "Сайт спроектирован и разработан RICHMAN STUDIO",
      learn: "Ознакомиться",
      order: "Заказать сайт",
    },
    en: {
      eyebrow: "Digital production",
      title: "Designed and developed by RICHMAN STUDIO",
      learn: "Learn more",
      order: "Order a website",
    },
    zh: {
      eyebrow: "Digital production",
      title: "网站由 RICHMAN STUDIO 设计与开发",
      learn: "了解更多",
      order: "订购网站",
    },
  }[lang];

  return (
    <footer className="bg-slate-950 text-white">
      <div className="site-container grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="mb-4 text-2xl font-extrabold">{t.company.name}</div>
          <p className="max-w-xl text-sm leading-7 text-slate-300">
            {t.company.description}
          </p>
          <div className="mt-6 grid gap-3 text-sm text-slate-300">
            <span>ИНН {company.inn} / КПП {company.kpp}</span>
            <span>ОГРН {company.ogrn}</span>
            <span>р/с {company.account}</span>
          </div>
        </div>

        <div>
          <div className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#93c5fd]">{t.footer.navigation}</div>
          <ul className="grid gap-2 text-sm text-slate-300">
            {t.nav.map((item: { to: string; label: string }) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#93c5fd]">{t.footer.contacts}</div>
          <ul className="grid gap-4 text-sm text-slate-300">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#93c5fd]" />
              <span>{t.company.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="h-5 w-5 shrink-0 text-[#93c5fd]" />
              <span>{company.phones.join(", ")}</span>
            </li>
            <li className="flex gap-3">
              <Mail className="h-5 w-5 shrink-0 text-[#93c5fd]" />
              <a href={`mailto:${company.email}`} className="hover:text-white">{company.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="site-container flex flex-col gap-2 py-5 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} {t.company.name}. {t.footer.rights}</span>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-white">{t.footer.privacy}</Link>
            <Link to="/agreement" className="hover:text-white">{t.footer.agreement}</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-slate-950">
        <div className="site-container py-5">
          <section className="relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.035] px-5 py-4 shadow-lg shadow-black/20">
            <div className="absolute inset-y-0 right-0 w-1/3 bg-[radial-gradient(circle_at_80%_50%,rgba(11,79,163,0.32),transparent_48%)]" />
            <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#93c5fd]">{richman.eyebrow}</div>
                <h2 className="mt-1 text-lg font-extrabold leading-snug text-white md:text-xl">{richman.title}</h2>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <a
                  href="https://richmanstudio.github.io/richmanstudio"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0b4fa3] px-5 py-3 text-xs font-extrabold text-white transition hover:bg-[#083d7d]"
                >
                  {richman.learn}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="tel:+79144092454"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/8 px-5 py-3 text-xs font-extrabold text-white transition hover:border-white/40 hover:bg-white/12"
                >
                  {richman.order}
                  <Phone className="h-4 w-4" />
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
}
