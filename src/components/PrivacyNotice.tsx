import { AnimatePresence, motion } from "framer-motion";
import { FileCheck2, ShieldCheck } from "lucide-react";
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
            className="max-h-[92vh] w-full max-w-4xl overflow-y-auto bg-white text-slate-950 shadow-2xl"
          >
            <div className="grid gap-0 lg:grid-cols-[260px_1fr]">
              <div className="bg-slate-950 p-7 text-white">
                <div className="mb-8 flex h-14 w-14 items-center justify-center bg-[#0b4fa3]">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#93c5fd]">ООО «ТЕКТОНИКА»</p>
                <h2 id="privacy-notice-title" className="mt-4 text-3xl font-extrabold leading-tight">
                  {text.title}
                </h2>
                <p className="mt-6 text-sm leading-6 text-slate-300">{text.note}</p>
              </div>

              <div className="p-6 md:p-8">
                <p className="text-lg font-semibold leading-8 text-slate-800">{text.lead}</p>
                <ul className="mt-6 grid gap-3">
                  {text.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                      <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0b4fa3]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 border border-slate-200 bg-slate-50 p-5">
                  <div className="mb-3 text-sm font-extrabold uppercase tracking-[0.14em] text-slate-500">
                    {text.lawIntro}
                  </div>
                  <div className="grid gap-2">
                    {text.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-bold leading-6 text-[#0b4fa3] underline decoration-[#0b4fa3]/30 underline-offset-4 hover:text-[#083d7d]"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <button type="button" onClick={() => close("reviewed")} className="btn-primary">
                    {text.accept}
                  </button>
                  <button
                    type="button"
                    onClick={() => close("not-reviewed")}
                    className="inline-flex items-center justify-center border border-slate-300 bg-white px-7 py-4 text-sm font-bold text-slate-950 transition hover:border-[#d71920] hover:text-[#d71920]"
                  >
                    {text.decline}
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
