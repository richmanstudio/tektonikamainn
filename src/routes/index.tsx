import React, { type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";

const Home = React.lazy(() => import("../pages/Home"));
const About = React.lazy(() => import("../pages/About"));
const Contacts = React.lazy(() => import("../pages/Contacts"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
const Services = React.lazy(() => import("../pages/Services"));
const ServiceLanding = React.lazy(() => import("../pages/ServiceLanding"));
const Projects = React.lazy(() => import("../pages/Projects"));
const Research = React.lazy(() => import("../pages/Research"));
const Media = React.lazy(() => import("../pages/Media"));
const Careers = React.lazy(() => import("../pages/Careers"));
const Agreement = React.lazy(() => import("../pages/Agreement"));
const Privacy = React.lazy(() => import("../pages/Privacy"));
const NewsExpeditionLaunch = React.lazy(() => import("../pages/news/ExpeditionLaunch"));
const AdminDashboard = React.lazy(() => import("../pages/AdminDashboard"));

function Page({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  return (
    <React.Suspense fallback={<Spinner />}>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
        transition={reduceMotion ? { duration: 0 } : { type: "tween", ease: "easeOut", duration: 0.24 }}
      >
        {children}
      </motion.div>
    </React.Suspense>
  );
}

export default function AppRoutes() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode={reduceMotion ? "sync" : "wait"} initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Page><Home /></Page>} />
        <Route path="/about" element={<Page><About /></Page>} />
        <Route path="/services" element={<Page><Services /></Page>} />
        <Route path="/services/:slug" element={<Page><ServiceLanding /></Page>} />
        <Route path="/projects" element={<Page><Projects /></Page>} />
        <Route path="/research" element={<Page><Research /></Page>} />
        <Route path="/media" element={<Page><Media /></Page>} />
        <Route path="/careers" element={<Page><Careers /></Page>} />
        <Route path="/agreement" element={<Page><Agreement /></Page>} />
        <Route path="/privacy" element={<Page><Privacy /></Page>} />
        <Route path="/media/news/expedition-launch" element={<Page><NewsExpeditionLaunch /></Page>} />
        <Route path="/tektonika-admin" element={<Page><AdminDashboard /></Page>} />
        <Route path="/contacts" element={<Page><Contacts /></Page>} />
        <Route path="*" element={<Page><NotFound /></Page>} />
      </Routes>
    </AnimatePresence>
  );
}
