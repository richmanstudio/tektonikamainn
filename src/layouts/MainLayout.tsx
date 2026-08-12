import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PrivacyNotice from "../components/PrivacyNotice";
import { useI18n } from "../i18n";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  const location = useLocation();
  const [showTop, setShowTop] = useState(false);
  const { lang } = useI18n();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-md focus:bg-[#0b4fa3] focus:px-4 focus:py-2 focus:text-white">
        {lang === "ru" ? "Перейти к содержимому" : lang === "zh" ? "跳到内容" : "Skip to content"}
      </a>
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          id="main-content"
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={location.pathname === "/" ? "min-h-screen" : "min-h-screen pt-36"}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-md bg-[#0b4fa3] text-white shadow-lg transition hover:bg-[#083d7d]"
            aria-label={lang === "ru" ? "Наверх" : lang === "zh" ? "返回顶部" : "Back to top"}
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
      <PrivacyNotice />
    </>
  );
}
