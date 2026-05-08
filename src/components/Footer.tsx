import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { company } from "../content/siteData";
import { useI18n } from "../i18n";

export default function Footer() {
  const { t } = useI18n();

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
    </footer>
  );
}
