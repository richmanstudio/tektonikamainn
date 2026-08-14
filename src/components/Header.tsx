import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, BookOpen, ChevronDown, Menu, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.webp";
import { company } from "../content/siteData";
import { languages, type Lang, useI18n } from "../i18n";
import { useCmsContent } from "../cms";

type SearchItem = { title: string; text: string; to: string; section: string };

export default function Header() {
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { lang, setLang, t } = useI18n();
  const cms = useCmsContent();
  const reduceMotion = useReducedMotion();
  const transparent = pathname === "/" && !scrolled && !open && !megaOpen && !searchOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMegaOpen(false);
    setSearchOpen(false);
    setQuery("");
  }, [pathname]);

  useEffect(() => {
    if (!searchOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSearchOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [searchOpen]);

  const searchItems = useMemo<SearchItem[]>(() => {
    const nav = t.nav.map((item: { to: string; label: string }) => ({ title: item.label, text: t.company.description, to: item.to, section: t.common.search }));
    const services = cms.services.map((service) => ({ title: service.title, text: service.description, to: `/services/${service.slug}`, section: t.nav[1].label }));
    const projects = cms.projectsGroups.flatMap((group: any) => group.projects.map((project: any) => ({ title: project.title, text: `${project.region} · ${project.scope}`, to: `/projects?type=${encodeURIComponent(group.type)}&region=${encodeURIComponent(project.region)}`, section: group.type })));
    const articles = cms.researchArticles.map((article: any) => ({ title: article.title, text: article.excerpt, to: "/research", section: t.research.title }));
    return [...nav, ...services, ...projects, ...articles];
  }, [cms.projectsGroups, cms.researchArticles, cms.services, t]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return searchItems.slice(0, 8);
    return searchItems.filter((item) => `${item.title} ${item.text} ${item.section}`.toLowerCase().includes(normalized)).slice(0, 10);
  }, [query, searchItems]);

  const tone = transparent ? "text-white" : "text-slate-950";
  const activeTone = transparent ? "text-[#93c5fd]" : "text-[#0b4fa3]";
  const utilityTone = transparent ? "text-white/95 drop-shadow-[0_1px_5px_rgba(0,0,0,0.95)]" : "text-slate-600";
  const cityTone = transparent ? "text-white/90" : "text-slate-500";

  return (
    <header onMouseLeave={() => setMegaOpen(false)} className={`fixed inset-x-0 top-0 z-[90] transition ${transparent ? "bg-transparent" : "border-b border-slate-200 bg-[#f2f2f2] shadow-sm"}`}>
      <div className={`site-container hidden h-12 items-center justify-between text-sm font-semibold md:flex ${utilityTone}`}>
        <div className="flex items-center gap-12">
          <Link to="/about" className="inline-flex items-center gap-3 hover:text-[#93c5fd]"><BookOpen className="h-4 w-4" aria-hidden="true" />{t.header.materials}</Link>
          <Link to="/careers" className="inline-flex items-center gap-3 hover:text-[#93c5fd]"><AlertTriangle className="h-4 w-4" aria-hidden="true" />{t.header.farEast}</Link>
        </div>
        <div className="flex items-center gap-12">
          <Link to="/research" className={transparent ? "hover:text-white" : "hover:text-[#0b4fa3]"}>{t.header.research}</Link>
          <Link to="/contacts" className={transparent ? "hover:text-white" : "hover:text-[#0b4fa3]"}>{t.header.suppliers}</Link>
        </div>
      </div>

      <div className="site-container flex h-24 items-center justify-between gap-6">
        <Link to="/" className={`flex min-w-0 items-center gap-4 ${tone}`} aria-label={t.company.name}>
          <img src={logo} alt="" aria-hidden="true" className="h-14 w-auto shrink-0" width="112" height="112" />
          <div className="leading-none"><div className="text-2xl font-extrabold tracking-wide">ТЕКТОНИКА</div><div className={`mt-2 text-xs font-bold uppercase tracking-[0.22em] ${cityTone}`}>{t.company.city}</div></div>
        </Link>

        <nav className={`hidden items-center gap-8 xl:flex ${tone}`} aria-label={lang === "ru" ? "Основная навигация" : lang === "zh" ? "主导航" : "Main navigation"}>
          {t.nav.map((item: { to: string; label: string }) => {
            const active = pathname === item.to;
            return <Link key={item.to} to={item.to} aria-current={active ? "page" : undefined} onMouseEnter={() => setMegaOpen(item.to === "/projects" || item.to === "/services")} className={`text-lg font-bold transition ${transparent ? "hover:text-[#93c5fd]" : "hover:text-[#0b4fa3]"} ${active ? activeTone : ""}`}>{item.label}</Link>;
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <label className="relative">
            <span className="sr-only">Language</span>
            <select value={lang} onChange={(event) => setLang(event.target.value as Lang)} className={`h-11 appearance-none border bg-transparent pl-5 pr-10 text-sm font-bold outline-none ${transparent ? "border-white/45 text-white" : "border-slate-300 text-slate-900"}`}>
              {languages.map((language) => <option key={language.code} value={language.code} className="text-slate-950">{language.label}</option>)}
            </select>
            <ChevronDown className={`pointer-events-none absolute right-3 top-3.5 h-4 w-4 ${transparent ? "text-white" : "text-slate-900"}`} aria-hidden="true" />
          </label>
          <button type="button" onClick={() => setSearchOpen(true)} className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0b4fa3] text-white transition hover:bg-[#083d7d]" aria-label={t.common.search} aria-haspopup="dialog" aria-expanded={searchOpen}>
            <Search className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <button type="button" onClick={() => setOpen((value) => !value)} className={`inline-flex h-11 w-11 items-center justify-center border xl:hidden ${transparent ? "border-white/45 text-white" : "border-slate-300 bg-white text-slate-900"}`} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation">
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {megaOpen && (
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -10 }} transition={reduceMotion ? { duration: 0 } : { duration: 0.18 }} className="absolute left-0 right-0 top-full hidden rounded-b-[18px] bg-[#f2f2f2] py-12 shadow-2xl xl:block">
            <div className="site-container grid grid-cols-3 gap-16 text-slate-600">
              <div>
                <div className="mb-7 text-2xl font-bold text-slate-500">{t.header.geophysics}</div>
                {cms.services.slice(1, 5).map((item) => <Link key={item.slug} to={`/services/${item.slug}`} className="mb-5 block text-lg hover:text-[#0b4fa3]">{item.title}</Link>)}
              </div>
              <div>
                <div className="mb-7 text-2xl font-bold text-slate-500">{t.header.projects}</div>
                <Link to={`/projects?type=${encodeURIComponent(t.projects.groups[0].type)}`} className="mb-5 block text-lg hover:text-[#0b4fa3]">{t.header.projectCompany}</Link>
                <Link to={`/projects?type=${encodeURIComponent(t.projects.groups[1].type)}`} className="mb-5 block text-lg hover:text-[#0b4fa3]">{t.header.projectTeam}</Link>
                <Link to={`/projects?region=${encodeURIComponent("Хабаровский край")}`} className="mb-5 block text-lg hover:text-[#0b4fa3]">{t.header.khabarovsk}</Link>
                <Link to={`/projects?region=${encodeURIComponent("Приморский край")}`} className="mb-5 block text-lg hover:text-[#0b4fa3]">{t.header.primorye}</Link>
              </div>
              <div>
                <div className="mb-7 text-2xl font-bold text-slate-500">{t.header.uav}</div>
                {cms.services.slice(3, 7).map((item) => <Link key={item.slug} to={`/services/${item.slug}`} className="mb-5 block text-lg hover:text-[#0b4fa3]">{item.title}</Link>)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-navigation" initial={reduceMotion ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={reduceMotion ? undefined : { opacity: 0, height: 0 }} className="border-t border-slate-200 bg-[#f2f2f2] xl:hidden" aria-label={lang === "ru" ? "Мобильная навигация" : lang === "zh" ? "移动导航" : "Mobile navigation"}>
            <div className="site-container grid gap-1 py-4">
              {t.nav.map((item: { to: string; label: string }) => <Link key={item.to} to={item.to} aria-current={pathname === item.to ? "page" : undefined} className={`px-1 py-3 text-lg font-bold ${pathname === item.to ? "text-[#0b4fa3]" : "text-slate-900"}`}>{item.label}</Link>)}
              <button type="button" onClick={() => setSearchOpen(true)} className="mt-2 inline-flex items-center gap-3 px-1 py-3 text-left text-lg font-bold text-[#0b4fa3]"><Search className="h-5 w-5" aria-hidden="true" />{t.common.search}</button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduceMotion ? undefined : { opacity: 0 }} className="fixed inset-0 z-[90] bg-slate-950/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="site-search-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setSearchOpen(false); }}>
            <div className="mx-auto mt-20 max-w-4xl bg-white p-6 shadow-2xl md:p-8">
              <div className="mb-5 flex items-center justify-between gap-4">
                <h2 id="site-search-title" className="text-3xl font-extrabold text-slate-950">{t.common.search}</h2>
                <button type="button" onClick={() => setSearchOpen(false)} className="inline-flex h-11 w-11 items-center justify-center border border-slate-300 text-slate-900" aria-label={lang === "ru" ? "Закрыть поиск" : lang === "zh" ? "关闭搜索" : "Close search"}><X className="h-5 w-5" aria-hidden="true" /></button>
              </div>
              <label htmlFor="site-search-input" className="sr-only">{t.common.search}</label>
              <input id="site-search-input" autoFocus type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.common.searchPlaceholder} className="form-control w-full text-lg font-semibold" />
              <div className="mt-6 max-h-[55vh] overflow-y-auto" aria-live="polite">
                {results.length > 0 ? <div className="grid gap-3">{results.map((item) => <Link key={`${item.section}-${item.title}`} to={item.to} className="block border border-slate-200 p-5 transition hover:border-[#0b4fa3] hover:bg-slate-50"><div className="text-xs font-bold uppercase tracking-[0.16em] text-[#0b4fa3]">{item.section}</div><div className="mt-2 text-xl font-extrabold text-slate-950">{item.title}</div><p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{item.text}</p></Link>)}</div> : <div className="border border-slate-200 p-8 text-center text-lg font-semibold text-slate-500">{t.common.noResults}</div>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
