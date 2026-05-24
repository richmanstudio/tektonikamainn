import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, FileCheck2, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n } from "../i18n";

const STORAGE_KEY = "tektonika-privacy-notice-v1";

const notice = {
  ru: {
    title: "Уведомление о конфиденциальности",
    lead:
      "Перед использованием сайта подтвердите, что вы ознакомились с порядком обработки данных. Сайт может обрабатывать технические данные браузера, сведения из форм обратной связи и локальные настройки интерфейса, необходимые для работы сайта.",
    items: [
      "Мы используем данные только для работы сайта, связи с вами по отправленным формам и обеспечения безопасности сервиса.",
      "Если вы отправляете форму, вы самостоятельно передаете указанные в ней сведения ООО «ТЕКТОНИКА».",
      "Технические идентификаторы, cookies или localStorage могут применяться для сохранения выбранного языка, статуса уведомления и корректной работы интерфейса.",
      "Вы можете не продолжать использование сайта, если не согласны с указанными условиями обработки.",
    ],
    lawIntro: "Правовые основания и справочная база:",
    links: [
      { href: "https://www.consultant.ru/document/cons_doc_LAW_28399/bcddbd9060e44ed6085b65a1af0fb90aa3ef0175/", label: "ст. 24 Конституции РФ" },
      { href: "https://www.consultant.ru/document/cons_doc_LAW_61801/315f051396c88f1e4f827ba3f2ae313d999a1873/", label: "ст. 6 Федерального закона № 152-ФЗ «О персональных данных»" },
      { href: "https://www.consultant.ru/document/cons_doc_LAW_61798/", label: "Федеральный закон № 149-ФЗ «Об информации, информационных технологиях и о защите информации»" },
    ],
    accept: "Ознакомлен",
    decline: "Не ознакомлен",
    note: "До выбора одного из вариантов сайт заблокирован для взаимодействия.",
  },
  en: {
    title: "Privacy notice",
    lead:
      "Before using the website, confirm that you have reviewed how data may be processed. The website may process browser technical data, form submissions and local interface settings required for operation.",
    items: [
      "Data is used for website operation, communication through submitted forms and service security.",
      "When you submit a form, you provide the entered information to TEKTONIKA LLC.",
      "Technical identifiers, cookies or localStorage may be used to store language, notice status and interface settings.",
      "You may stop using the website if you do not accept these processing terms.",
    ],
    lawIntro: "Legal basis and reference materials:",
    links: [
      { href: "https://www.consultant.ru/document/cons_doc_LAW_28399/bcddbd9060e44ed6085b65a1af0fb90aa3ef0175/", label: "Article 24 of the Constitution of the Russian Federation" },
      { href: "https://www.consultant.ru/document/cons_doc_LAW_61801/315f051396c88f1e4f827ba3f2ae313d999a1873/", label: "Article 6 of Federal Law No. 152-FZ on Personal Data" },
      { href: "https://www.consultant.ru/document/cons_doc_LAW_61798/", label: "Federal Law No. 149-FZ on Information and Information Technologies" },
    ],
    accept: "I have reviewed",
    decline: "I have not reviewed",
    note: "The website remains blocked until you choose one of the options.",
  },
  zh: {
    title: "隐私通知",
    lead:
      "在使用网站前，请确认您已了解数据处理方式。网站可能处理浏览器技术数据、反馈表单信息以及网站运行所需的本地界面设置。",
    items: [
      "数据仅用于网站运行、处理您提交的表单以及保障服务安全。",
      "提交表单时，您主动向 TEKTONIKA 提供表单中的信息。",
      "技术标识符、cookies 或 localStorage 可用于保存语言、通知状态和界面设置。",
      "如果您不同意相关处理条件，可以停止使用网站。",
    ],
    lawIntro: "法律依据和参考材料：",
    links: [
      { href: "https://www.consultant.ru/document/cons_doc_LAW_28399/bcddbd9060e44ed6085b65a1af0fb90aa3ef0175/", label: "俄罗斯联邦宪法第24条" },
      { href: "https://www.consultant.ru/document/cons_doc_LAW_61801/315f051396c88f1e4f827ba3f2ae313d999a1873/", label: "俄罗斯联邦第152-FZ号个人数据法第6条" },
      { href: "https://www.consultant.ru/document/cons_doc_LAW_61798/", label: "俄罗斯联邦第149-FZ号信息和信息技术法" },
    ],
    accept: "已了解",
    decline: "未了解",
    note: "在选择其中一个选项之前，网站不可操作。",
  },
};

export default function PrivacyNotice() {
  const { lang } = useI18n();
  const [visible, setVisible] = useState(() => localStorage.getItem(STORAGE_KEY) === null);
  const text = notice[lang];

  useEffect(() => {
    if (!visible) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  const close = (value: "reviewed" | "not-reviewed") => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        value,
        at: new Date().toISOString(),
      })
    );
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/82 px-4 py-6 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-notice-title"
        >
          <motion.section
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="max-h-[92vh] w-full max-w-6xl overflow-y-auto bg-white text-slate-950 shadow-2xl"
          >
            <div className="grid min-h-[640px] lg:grid-cols-[380px_1fr]">
              <div className="relative overflow-hidden bg-slate-950 p-8 text-white md:p-10">
                <div className="absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(circle_at_20%_80%,rgba(11,79,163,0.55),transparent_48%),linear-gradient(135deg,rgba(33,140,84,0.22),transparent_46%)]" />
                <div className="relative">
                  <div className="mb-10 flex h-16 w-16 items-center justify-center bg-[#0b4fa3] shadow-lg shadow-[#0b4fa3]/30">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#93c5fd]">ООО «ТЕКТОНИКА»</p>
                  <h2 id="privacy-notice-title" className="mt-5 max-w-[300px] text-4xl font-extrabold leading-[1.05]">
                    {text.title}
                  </h2>
                  <p className="mt-7 max-w-[280px] text-base leading-7 text-slate-300">{text.note}</p>
                </div>
              </div>

              <div className="p-7 md:p-10 lg:p-12">
                <div className="max-w-3xl">
                  <p className="text-2xl font-extrabold leading-snug text-slate-950">{text.lead}</p>
                </div>

                <ul className="mt-8 grid gap-3 md:grid-cols-2">
                  {text.items.map((item) => (
                    <li key={item} className="flex gap-4 border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#eef5ff] text-[#0b4fa3]">
                        <FileCheck2 className="h-5 w-5" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border border-slate-200 bg-slate-50 p-5 md:p-6">
                  <div className="mb-4 text-sm font-extrabold uppercase tracking-[0.14em] text-slate-500">
                    {text.lawIntro}
                  </div>
                  <div className="grid gap-3 md:grid-cols-3">
                    {text.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex min-h-20 items-start justify-between gap-4 border border-slate-200 bg-white p-4 text-sm font-bold leading-6 text-[#0b4fa3] transition hover:border-[#0b4fa3]"
                      >
                        <span>{link.label}</span>
                        <ExternalLink className="mt-1 h-4 w-4 shrink-0 opacity-60 transition group-hover:opacity-100" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-200 pt-6">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button type="button" onClick={() => close("reviewed")} className="btn-primary min-h-14">
                      {text.accept}
                    </button>
                    <button
                      type="button"
                      onClick={() => close("not-reviewed")}
                      className="inline-flex min-h-14 items-center justify-center border border-slate-300 bg-white px-7 py-4 text-sm font-bold text-slate-950 transition hover:border-[#d71920] hover:text-[#d71920]"
                    >
                      {text.decline}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
