import { Activity, ArrowRight, ChevronRight, Database, FlaskConical, MapPin, Mountain, Plane, Zap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import dronePrepImg from "../assets/presentation/image14.jpeg";
import modelImg from "../assets/presentation/image15.jpg";
import uavImg from "../assets/presentation/image6.png";
import fieldImg from "../assets/presentation/image5.png";
import labImg from "../assets/presentation/image10.png";
import heroFieldImg from "../assets/presentation/image5.png";
import heroDroneImg from "../assets/presentation/image14.jpeg";
import heroTopoImg from "../assets/presentation/image3.jpeg";
import Layout from "../layouts/MainLayout";
import { useI18n } from "../i18n";

const heroImages = [heroFieldImg, heroDroneImg, heroTopoImg];
const serviceIcons = [Mountain, Activity, Zap, Plane, Database, FlaskConical];

export default function Home() {
  const { t } = useI18n();
  const [activeSlide, setActiveSlide] = useState(0);
  const featuredProjects = useMemo(() => t.projects.groups.flatMap((group: any) => group.projects).slice(0, 3), [t]);
  const slide = t.home.heroSlides[activeSlide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % t.home.heroSlides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [t.home.heroSlides.length]);

  const goNext = () => setActiveSlide((current) => (current + 1) % t.home.heroSlides.length);

  return (
    <Layout>
      <section className="relative min-h-[760px] overflow-hidden bg-black text-white lg:min-h-screen">
        {heroImages.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={slide.title}
            className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${activeSlide === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/62 to-black/30" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black to-transparent" />

        <div className="site-container relative flex min-h-[760px] flex-col justify-end pb-10 pt-40 lg:min-h-screen">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-extrabold leading-[0.98] tracking-[-0.02em] sm:text-7xl lg:text-[104px]">
              {slide.title}
            </h1>
            <p className="mt-7 max-w-2xl text-xl font-semibold leading-8 text-white/78">
              {slide.text}
            </p>
          </div>

          <div className="mt-12 grid max-w-[850px] gap-3 md:grid-cols-[1fr_108px]">
            <Link to="/services" className="hero-chip">
              <span className="flex h-11 w-11 items-center justify-center bg-[#0b4fa3] text-white"><ChevronRight className="h-6 w-6" /></span>
              <span>{slide.chip}</span>
            </Link>
            <button type="button" onClick={goNext} className="hero-chip place-items-center">
              <ArrowRight className="h-9 w-9 text-white" />
              <span className="sr-only">Next slide</span>
            </button>
          </div>

          <div className="mt-10 flex items-center justify-end gap-8">
            <div className="hidden items-center gap-6 text-white/75 sm:flex">
              {t.home.heroSlides.map((_: any, index: number) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className={`h-4 w-4 rounded-full border transition ${
                    activeSlide === index ? "border-white bg-[#0b4fa3] ring-4 ring-white/25" : "border-white/60 bg-white/60"
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
            <button type="button" onClick={goNext} aria-label="Next slide">
              <ArrowRight className="h-14 w-14 text-white" />
            </button>
          </div>
        </div>
      </section>

      <section className="bg-[#f2f2f2] py-20 md:py-28">
        <div className="site-container grid gap-8 lg:grid-cols-[0.95fr_1.45fr]">
          <div className="max-w-xl">
            <h2 className="text-4xl font-extrabold leading-tight tracking-[-0.01em] text-slate-950 md:text-5xl">
              {t.home.aboutTitle}
            </h2>
            <p className="mt-8 text-xl leading-8 text-slate-800">
              {t.home.aboutText}
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {t.facts.slice(0, 3).map((fact: any, index: number) => (
              <article key={fact.label} className={`min-h-[285px] p-8 ${index === 2 ? "bg-slate-950 text-white" : "bg-white text-slate-950"}`}>
                <h3 className="text-2xl font-extrabold leading-tight">{t.home.factTitles[index]}</h3>
                <div className="mt-16">
                  <span className="block text-7xl font-extrabold tracking-[-0.05em]">{fact.value}</span>
                  <span className={`mt-4 block max-w-[230px] text-sm font-bold uppercase leading-5 ${index === 2 ? "text-white/80" : "text-slate-700"}`}>{fact.label}</span>
                </div>
                <Link to="/about" className={`mt-7 inline-flex items-center gap-3 text-lg font-bold ${index === 2 ? "text-white" : "text-slate-950"}`}>
                  {t.common.readMore} <span className="bg-[#0b4fa3] p-1 text-white"><ChevronRight className="h-5 w-5" /></span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="site-container">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-4xl font-extrabold text-slate-950 md:text-5xl">{t.home.cycleTitle}</h2>
            <p className="mt-7 text-xl leading-8 text-slate-800">
              {t.home.cycleText}
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {[
              { title: t.services[1].title, text: t.services[1].description, image: modelImg, link: "/services", color: "bg-[#0b4fa3]" },
              { title: t.services[0].title, text: t.services[0].description, image: fieldImg, link: "/services", color: "bg-[#218c54]" },
              { title: t.services[5].title, text: t.services[5].description, image: labImg, link: "/services", color: "bg-[#d71920]" },
            ].map((item) => (
              <Link key={item.title} to={item.link} className="group block">
                <img src={item.image} alt={item.title} className="h-[330px] w-full object-cover transition duration-500 group-hover:brightness-90" />
                <div className="grid grid-cols-[4px_1fr_42px] gap-8 border-b border-slate-200 py-8">
                  <span className={item.color} />
                  <div>
                    <h3 className="text-3xl font-extrabold leading-tight text-slate-950">{item.title}</h3>
                    <p className="mt-5 text-lg leading-7 text-slate-700">{item.text}</p>
                  </div>
                  <ChevronRight className="mt-2 h-7 w-7 text-[#0b4fa3]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-950 py-20 text-white md:py-28">
        <img src={dronePrepImg} alt="Подготовка БПЛА" className="absolute inset-0 h-full w-full object-cover opacity-42" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/86 to-slate-950/35" />
        <div className="site-container relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="text-4xl font-extrabold leading-tight md:text-5xl">{t.home.serviceTitle}</h2>
            <p className="mt-7 text-xl leading-8 text-white/78">
              {t.home.serviceText}
            </p>
            <Link to="/services" className="btn-primary mt-10">
              {t.nav[1].label} <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
            {t.services.slice(0, 6).map((service: any, index: number) => {
              const Icon = serviceIcons[index];
              return (
                <article key={service.title} className="border-t border-white/24 pt-6">
                  <Icon className="h-8 w-8 text-[#93c5fd]" />
                  <h3 className="mt-5 text-2xl font-extrabold">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/70">{service.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f2f2f2] py-20 md:py-28">
        <div className="site-container">
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-4xl font-extrabold text-slate-950 md:text-5xl">{t.home.projectsTitle}</h2>
              <p className="mt-5 max-w-2xl text-xl leading-8 text-slate-800">
                {t.home.projectsText}
              </p>
            </div>
            <Link to="/projects" className="btn-secondary">
              {t.nav[2].label} <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <article key={project.title} className="min-h-[315px] bg-white p-8">
                <div className="mb-10 flex items-center justify-between text-sm font-bold text-slate-500">
                  <span>{project.year}</span>
                  <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-[#d71920]" />{project.region}</span>
                </div>
                <h3 className="text-3xl font-extrabold leading-tight text-slate-950">{project.title}</h3>
                <p className="mt-4 text-lg font-bold text-[#0b4fa3]">{project.client}</p>
                <p className="mt-6 text-base leading-7 text-slate-700">{project.scope}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="site-container grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <h2 className="text-4xl font-extrabold leading-tight text-slate-950 md:text-5xl">{t.home.careersTitle}</h2>
            <p className="mt-7 text-xl leading-8 text-slate-800">
              {t.home.careersText}
            </p>
            <Link to="/careers" className="btn-primary mt-10">
              {t.nav[6].label} <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="relative min-h-[480px] overflow-hidden">
            <img src={uavImg} alt="БПЛА в полевых условиях" className="h-full min-h-[480px] w-full object-cover" />
            <Link to="/careers" className="absolute left-10 top-10 max-w-md bg-[#0b4fa3] p-10 text-white">
              <span className="flex items-center justify-between gap-8 text-3xl font-extrabold">{t.home.vacanciesTitle} <ChevronRight className="h-8 w-8" /></span>
              <span className="mt-14 block text-xl font-semibold leading-8">{t.home.vacanciesText}</span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
