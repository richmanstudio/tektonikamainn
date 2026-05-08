// src/routes/index.tsx
import React from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Home from "../pages/Home";
import About from "../pages/About";
import Contacts from "../pages/Contacts";
import NotFound from "../pages/NotFound";
import Spinner from "../components/Spinner";

const Services = React.lazy(() => import("../pages/Services"));
const Projects = React.lazy(() => import("../pages/Projects"));
const Research = React.lazy(() => import("../pages/Research"));
const Media = React.lazy(() => import("../pages/Media"));
const Careers = React.lazy(() => import("../pages/Careers"));
const Agreement = React.lazy(() => import("../pages/Agreement"));
const Privacy = React.lazy(() => import("../pages/Privacy"));
const NewsExpeditionLaunch = React.lazy(
  () => import("../pages/news/ExpeditionLaunch")
);
const AdminDashboard = React.lazy(() => import("../pages/AdminDashboard"));

export default function AppRoutes() {
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };
  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/about"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <About />
            </motion.div>
          }
        />
        <Route
          path="/services"
          element={
            <React.Suspense fallback={<Spinner />}>
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Services />
              </motion.div>
            </React.Suspense>
          }
        />
        <Route
          path="/projects"
          element={
            <React.Suspense fallback={<Spinner />}>
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Projects />
              </motion.div>
            </React.Suspense>
          }
        />
        <Route
          path="/research"
          element={
            <React.Suspense fallback={<Spinner />}>
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Research />
              </motion.div>
            </React.Suspense>
          }
        />
        <Route
          path="/media"
          element={
            <React.Suspense fallback={<Spinner />}>
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Media />
              </motion.div>
            </React.Suspense>
          }
        />
        <Route
          path="/careers"
          element={
            <React.Suspense fallback={<Spinner />}>
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Careers />
              </motion.div>
            </React.Suspense>
          }
        />
        <Route
          path="/agreement"
          element={
            <React.Suspense fallback={<Spinner />}>
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Agreement />
              </motion.div>
            </React.Suspense>
          }
        />
        <Route
          path="/privacy"
          element={
            <React.Suspense fallback={<Spinner />}>
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Privacy />
              </motion.div>
            </React.Suspense>
          }
        />
        <Route
          path="/media/news/expedition-launch"
          element={
            <React.Suspense fallback={<Spinner />}>
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <NewsExpeditionLaunch />
              </motion.div>
            </React.Suspense>
          }
        />
        <Route
          path="/tektonika-admin"
          element={
            <React.Suspense fallback={<Spinner />}>
              <AdminDashboard />
            </React.Suspense>
          }
        />
        <Route
          path="/contacts"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Contacts />
            </motion.div>
          }
        />
        <Route
          path="*"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <NotFound />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
