import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { type ChangeEvent, type FormEvent, useRef, useState } from "react";
import Layout from "../layouts/MainLayout";
import { company } from "../content/siteData";
import { useI18n } from "../i18n";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_labg6pe",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_pf48q3m",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "m4DT1MN15nyCSdWzE",
};

export default function Contacts() {
  const { lang, t } = useI18n();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");
    try {
      await emailjs.sendForm(emailJsConfig.serviceId, emailJsConfig.templateId, formRef.current, {
        publicKey: emailJsConfig.publicKey,
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setStatus("success");
    } catch (error) {
      console.error("EmailJS send failed", error);
      setStatus("error");
    }
  };

  return (
    <Layout>
      <section className="technical-surface text-white">
        <div className="site-container py-16 md:py-24">
          <h1 className="text-4xl font-extrabold md:text-6xl">{t.contacts.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{t.contacts.text}</p>
        </div>
      </section>

      <section className="section-band bg-white">
        <div className="site-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-5">
            {[
              { icon: MapPin, title: t.contacts.address, text: t.company.address },
              { icon: Phone, title: t.contacts.phone, text: company.phones.join(", ") },
              { icon: Mail, title: "E-mail", text: company.email },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="corporate-card p-6">
                  <Icon className="h-7 w-7 text-[#0b4fa3]" />
                  <h2 className="mt-4 text-xl font-bold text-slate-950">{item.title}</h2>
                  <p className="mt-2 leading-7 text-slate-600">{item.text}</p>
                </article>
              );
            })}
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=135.077783%2C48.488285&z=17&pt=135.077783,48.488285,pm2rdl"
              title="Офис ООО ТЕКТОНИКА на карте"
              className="corporate-card h-80 w-full"
              loading="lazy"
            />
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="corporate-card bg-slate-50 p-6 md:p-8">
            <h2 className="text-3xl font-extrabold text-slate-950">{t.contacts.sendTitle}</h2>
            <p className="mt-3 text-slate-600">{t.contacts.sendText}</p>
            <AnimatePresence>
              {status === "success" && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-5 border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
                  {t.contacts.success}
                </motion.div>
              )}
              {status === "error" && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-5 border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                  {t.contacts.error}{" "}
                  <a href={`mailto:${company.email}?subject=${encodeURIComponent(formData.subject || "Запрос с сайта ООО ТЕКТОНИКА")}`} className="underline underline-offset-4">
                    {lang === "ru" ? "Написать напрямую" : lang === "zh" ? "直接写邮件" : "Email directly"}
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="mt-6 grid gap-4">
              <input name="name" value={formData.name} onChange={handleChange} required placeholder={t.contacts.name} className="rounded-md border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#0b4fa3]" />
              <input name="email" value={formData.email} onChange={handleChange} required type="email" placeholder={t.contacts.email} className="rounded-md border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#0b4fa3]" />
              <input name="subject" value={formData.subject} onChange={handleChange} required placeholder={t.contacts.subject} className="rounded-md border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#0b4fa3]" />
              <textarea name="message" value={formData.message} onChange={handleChange} required rows={7} placeholder={t.contacts.message} className="resize-none rounded-md border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#0b4fa3]" />
              <button type="submit" disabled={status === "sending"} className="btn-primary disabled:opacity-60">
                <Send className="h-4 w-4" />
                {status === "sending" ? t.contacts.sending : t.contacts.send}
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
