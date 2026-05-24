import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, ShieldCheck } from "lucide-react";
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
          className="fixed inset-0 z-[120] flex items-end bg-slate-950/72 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-notice-title"
        >
          <motion.section
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="w-full rounded-t-[28px] border-t border-white/20 bg-white text-slate-950 shadow-2xl"
          >
            <div className="site-container py-6 md:py-8">
              <div className="grid gap-6 xl:grid-cols-[1fr_360px] xl:items-end">
                <div>
                  <div className="mb-5 flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0b4fa3] text-white shadow-lg shadow-[#0b4fa3]/25">
                      <ShieldCheck className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#0b4fa3]">ООО «ТЕКТОНИКА»</p>
                      <h2 id="privacy-notice-title" className="mt-2 text-2xl font-extrabold leading-tight text-slate-950 md:text-3xl">
                        {text.title}
                      </h2>
                      <p className="mt-2 max-w-4xl text-sm font-semibold leading-6 text-slate-700 md:text-base">
                        {text.lead}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
                    <ul className="grid gap-2 text-sm leading-6 text-slate-600 md:grid-cols-2">
                      {text.items.slice(0, 4).map((item) => (
                        <li key={item} className="border-l-2 border-[#0b4fa3] pl-3">
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
                        {text.lawIntro}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {text.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold leading-5 text-[#0b4fa3] transition hover:border-[#0b4fa3]"
                          >
                            <span>{link.label}</span>
                            <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-950/10">
                  <p className="text-sm font-semibold leading-6 text-slate-600">{text.note}</p>
                  <button type="button" onClick={() => close("reviewed")} className="btn-primary min-h-[52px] rounded-2xl">
                    {text.accept}
                  </button>
                  <button
                    type="button"
                    onClick={() => close("not-reviewed")}
                    className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-7 py-4 text-sm font-bold text-slate-950 transition hover:border-[#d71920] hover:text-[#d71920]"
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
