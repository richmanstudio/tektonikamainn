import { Link } from "react-router-dom";
import Layout from "../layouts/MainLayout";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { useI18n } from "../i18n";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <Layout>
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center py-32 bg-gradient-to-b from-white to-primary-50 overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-200/10 rounded-full blur-3xl" />

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-9xl md:text-[12rem] font-extrabold bg-gradient-primary bg-clip-text text-transparent mb-4">
              404
            </h1>
            <div className="w-32 h-1 bg-gradient-primary mx-auto rounded-full" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-primary-900"
          >
            {t.notFound.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-gray-600 mb-12 max-w-md mx-auto"
          >
            {t.notFound.text}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
        <Link
          to="/"
              className="btn-primary inline-flex items-center space-x-2"
        >
              <Home className="w-5 h-5" />
              <span>{t.common.home}</span>
        </Link>
            <button
              onClick={() => window.history.back()}
              className="btn-outline inline-flex items-center space-x-2 text-primary-700 border-primary-700"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{t.common.back}</span>
            </button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
