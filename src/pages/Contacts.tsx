import emailjs from "@emailjs/browser";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FileUp, Mail, MapPin, Phone, Send } from "lucide-react";
import { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../layouts/MainLayout";
import { company } from "../content/siteData";
import { serviceCatalog } from "../content/serviceCatalog";
import { useI18n } from "../i18n";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  region: string;
  message: string;
  website: string;
};

const emptyForm: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  region: "",
  message: "",
  website: "",
};

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "",
};

const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;

export default function Contacts() {
  const { lang, t } = useI18n();
  const [searchParams] = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const reduceMotion = useReducedMotion();
  const [formData, setFormData] = useState<FormState>(emptyForm);
  const [attachmentName, setAttachmentName] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    const requestedService = searchParams.get("service") || "";
    if (requestedService) setFormData((prev) => ({ ...prev, service: requestedService }));
  }, [searchParams]);

  const labels = {
    ru: {
      company: "Компания",
      phone: "Телефон",
      service: "Направление работ",
      servicePlaceholder: "Выберите направление",
      region: "Регион / объект работ",
      brief: "Опишите задачу, сроки и ожидаемый результат",
      attachment: "Приложить ТЗ или документ",
      attachmentHint: "PDF, DOC/DOCX, XLS/XLSX, JPG/PNG — до 5 МБ",
      consent: "Отправляя форму, вы соглашаетесь с обработкой данных в соответствии с политикой конфиденциальности.",
      configError: "Форма временно недоступна: не настроен почтовый транспорт.",
      fileTooLarge: "Файл больше 5 МБ. Уменьшите размер или отправьте его напрямую на e-mail.",
    },
    en: {
      company: "Company",
      phone: "Phone",
      service: "Work scope",
      servicePlaceholder: "Choose a service",
      region: "Project region / site",
      brief: "Describe the task, timeline and expected result",
      attachment: "Attach scope or project document",
      attachmentHint: "PDF, DOC/DOCX, XLS/XLSX, JPG/PNG — up to 5 MB",
      consent: "By submitting this form, you agree to personal data processing under the privacy policy.",
      configError: "The form is temporarily unavailable: mail transport is not configured.",
      fileTooLarge: "The file is larger than 5 MB. Reduce it or email the attachment directly.",
    },
    zh: {
      company: "公司",
      phone: "电话",
      service: "工作方向",
      servicePlaceholder: "选择服务",
      region: "项目地区 / 作业区",
      brief: "请描述任务、周期和预期成果",
      attachment: "上传技术任务书或项目文件",
      attachmentHint: "PDF、DOC/DOCX、XLS/XLSX、JPG/PNG — 最大 5 MB",
      consent: "提交表单即表示您同意按照隐私政策处理个人数据。",
      configError: "表单暂时不可用：邮件服务尚未配置。",
      fileTooLarge: "文件超过 5 MB。请压缩文件或直接通过电子邮件发送。",
    },
  }[lang];

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setValidationError("");
    if (!file) {
      setAttachmentName("");
      return;
    }
    if (file.size > MAX_ATTACHMENT_BYTES) {
      event.target.value = "";
      setAttachmentName("");
      setValidationError(labels.fileTooLarge);
      return;
    }
    setAttachmentName(file.name);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current || status === "sending") return;
    if (formData.website) return;
    setValidationError("");

    if (!emailJsConfig.serviceId || !emailJsConfig.templateId || !emailJsConfig.publicKey) {
      setStatus("error");
      setValidationError(labels.configError);
      return;
    }

    setStatus("sending");
    try {
      await emailjs.sendForm(emailJsConfig.serviceId, emailJsConfig.templateId, formRef.current, { publicKey: emailJsConfig.publicKey });
      setFormData(emptyForm);
      setAttachmentName("");
      formRef.current.reset();
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
        <div className="site-container grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="grid content-start gap-5">
            {[
              { icon: MapPin, title: t.contacts.address, text: t.company.address },
              { icon: Phone, title: t.contacts.phone, text: company.phones.join(", ") },
              { icon: Mail, title: "E-mail", text: company.email },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="corporate-card p-6">
                  <Icon className="h-7 w-7 text-[#0b4fa3]" aria-hidden="true" />
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
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="corporate-card bg-slate-50 p-6 md:p-8" noValidate={false}>
            <h2 className="text-3xl font-extrabold text-slate-950">{t.contacts.sendTitle}</h2>
            <p className="mt-3 text-slate-600">{t.contacts.sendText}</p>

            <div aria-live="polite" aria-atomic="true">
              <AnimatePresence>
                {status === "success" && (
                  <motion.div initial={reduceMotion ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0 }} className="mt-5 border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
                    {t.contacts.success}
                  </motion.div>
                )}
                {(status === "error" || validationError) && (
                  <motion.div initial={reduceMotion ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0 }} className="mt-5 border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                    {validationError || t.contacts.error}{" "}
                    <a href={`mailto:${company.email}?subject=${encodeURIComponent(formData.company ? `Запрос от ${formData.company}` : "Запрос с сайта ООО ТЕКТОНИКА")}`} className="underline underline-offset-4">
                      {lang === "ru" ? "Написать напрямую" : lang === "zh" ? "直接写邮件" : "Email directly"}
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Field label={t.contacts.name} htmlFor="lead-name">
                <input id="lead-name" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required className="form-control" />
              </Field>
              <Field label={labels.company} htmlFor="lead-company">
                <input id="lead-company" name="company" autoComplete="organization" value={formData.company} onChange={handleChange} required className="form-control" />
              </Field>
              <Field label={t.contacts.email} htmlFor="lead-email">
                <input id="lead-email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} required type="email" className="form-control" />
              </Field>
              <Field label={labels.phone} htmlFor="lead-phone">
                <input id="lead-phone" name="phone" autoComplete="tel" value={formData.phone} onChange={handleChange} required type="tel" className="form-control" />
              </Field>
              <Field label={labels.service} htmlFor="lead-service">
                <select id="lead-service" name="service" value={formData.service} onChange={handleChange} required className="form-control">
                  <option value="">{labels.servicePlaceholder}</option>
                  {serviceCatalog.map((service) => <option key={service.slug} value={service.slug}>{service.title[lang]}</option>)}
                </select>
              </Field>
              <Field label={labels.region} htmlFor="lead-region">
                <input id="lead-region" name="region" value={formData.region} onChange={handleChange} required className="form-control" />
              </Field>
            </div>

            <Field label={labels.brief} htmlFor="lead-message" className="mt-5">
              <textarea id="lead-message" name="message" value={formData.message} onChange={handleChange} required rows={7} className="form-control resize-y" />
            </Field>

            <div className="mt-5">
              <label htmlFor="lead-attachment" className="inline-flex cursor-pointer items-center gap-3 border border-dashed border-slate-400 bg-white px-4 py-3 font-bold text-slate-700 transition hover:border-[#0b4fa3] hover:text-[#0b4fa3] focus-within:ring-2 focus-within:ring-[#0b4fa3] focus-within:ring-offset-2">
                <FileUp className="h-5 w-5" aria-hidden="true" />
                <span>{attachmentName || labels.attachment}</span>
                <input id="lead-attachment" name="attachment" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png" onChange={handleFile} className="sr-only" />
              </label>
              <p className="mt-2 text-xs text-slate-500">{labels.attachmentHint}</p>
            </div>

            <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="lead-website">Website</label>
              <input id="lead-website" name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={handleChange} />
            </div>

            <p className="mt-5 text-xs leading-5 text-slate-500">{labels.consent}</p>
            <button type="submit" disabled={status === "sending"} className="btn-primary mt-5 disabled:cursor-not-allowed disabled:opacity-60">
              <Send className="h-4 w-4" aria-hidden="true" />
              {status === "sending" ? t.contacts.sending : t.contacts.send}
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}

function Field({ label, htmlFor, children, className = "" }: { label: string; htmlFor: string; children: React.ReactNode; className?: string }) {
  return (
    <label htmlFor={htmlFor} className={`grid gap-2 ${className}`}>
      <span className="text-sm font-bold text-slate-700">{label}</span>
      {children}
    </label>
  );
}
