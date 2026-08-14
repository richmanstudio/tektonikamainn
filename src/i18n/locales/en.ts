import ru from "./ru";
import type { Dictionary } from "../types";

const en: Dictionary = {
  ...ru,
  langLabel: "EN",
  common: { ...ru.common, all: "All", readMore: "Read more", contact: "Contact us", discuss: "Discuss cooperation", shown: "Shown", back: "Back", home: "Back to home", search: "Search", searchPlaceholder: "Search for a service, project, article or page", noResults: "No results found" },
  company: { ...ru.company, name: "TEKTONIKA LLC", city: "Khabarovsk", address: "Office 326, 65 Kim Yu Chen St., Khabarovsk, Russia, 680000", description: "Geological and geophysical surveys, field operations, UAV, topography and office processing for subsurface exploration." },
  nav: [
    { to: "/", label: "Home" }, { to: "/services", label: "Services" }, { to: "/projects", label: "Projects" }, { to: "/about", label: "Company" }, { to: "/media", label: "Media" }, { to: "/research", label: "Research" }, { to: "/careers", label: "Careers" },
  ],
  header: { materials: "Company materials", farEast: "Work in the Far East", research: "Research", suppliers: "Suppliers and partners", geophysics: "Geophysics", projects: "Projects", uav: "UAV and topography", projectCompany: "Company projects", projectTeam: "Team projects", khabarovsk: "Khabarovsk Krai", primorye: "Primorsky Krai" },
  home: {
    heroSlides: [
      { title: "Geological and geophysical surveys", text: "Field operations, UAV and office processing for subsurface exploration in the Russian Far East.", chip: "Full cycle: geology, geophysics, topography, UAV and reporting" },
      { title: "Field crews for challenging territories", text: "The team works on remote sites, short field seasons and data-critical assignments.", chip: "Routes, sampling, measurements and quality control in one cycle" },
      { title: "UAV and office interpretation", text: "In-house UAV solutions, data processing and deliverables for engineering decisions.", chip: "Aeromagnetics, orthophotos, models and graphic appendices" },
    ],
    aboutTitle: "TEKTONIKA is a full-cycle engineering team",
    aboutText: "The company was founded in 2024 after the reorganization of GEPART LLC. The core team has worked together for more than 15 years and covers field, office and production workflows.",
    factTitles: ["Experience and origin", "Stable team", "In-house production"],
    cycleTitle: "The basis of the production cycle",
    cycleText: "Technologies are selected for each site: from routes and measurements to processing and graphic deliverables.",
    serviceTitle: "Services without extra layers",
    serviceText: "The service lines are shown as a production system: from task and field to data, models and reporting.",
    projectsTitle: "Projects and geography",
    projectsText: "Company projects and team experience are separated: Khabarovsk Krai, Primorye, Chukotka, Magadan Region and Yakutia.",
    careersTitle: "Opportunities without borders",
    careersText: "We are looking for specialists for field tasks and support project-based employment.",
    vacanciesTitle: "Open vacancies",
    vacanciesText: "Field kitchen cook, field geophysicist and UAV operator",
  },
  facts: [
    { value: "2024", label: "year TEKTONIKA LLC was founded" }, { value: "15+", label: "years the team has worked together" }, { value: "70%", label: "of UAV components made in-house" }, { value: "FEFD", label: "key fieldwork territory" },
  ],
  services: [
    { ...ru.services[0], title: "Geological studies", items: ["Geological routes", "Lithochemical sampling", "Rock sample documentation"], description: "Field crews conduct routes, sampling, outcrop documentation and prepare materials for geological reports." },
    { ...ru.services[1], title: "Magnetic surveying", items: ["Ground magnetic surveying", "UAV aeromagnetics", "100x20, 200x20, 400x25 m grids"], description: "Ground and UAV surveys for exploration and advance geological-geophysical works." },
    { ...ru.services[2], title: "Electrical prospecting", items: ["IP and multi-electrode IP", "ERA 625 Hz", "TEM / MPP with Cycle 8R equipment"], description: "Resistivity, induced polarization and electromagnetic sounding systems with further interpretation." },
    { ...ru.services[3], title: "Topography and UAV", items: ["Orthophoto maps", "LiDAR surveying", "Geodetic network refinement"], description: "Topographic and geodetic works with partner support and UAV systems." },
    { ...ru.services[4], title: "Office processing", items: ["Digitizing archive materials", "Data interpretation", "Zond, Roes, CasCad 3D"], description: "Processing field data, building 1D/2D/3D models and preparing reports with graphic appendices." },
    { ...ru.services[5], title: "Laboratory measurements", items: ["Magnetic susceptibility", "Kappametry", "IP and apparent resistivity on samples"], description: "Measuring physical properties of samples to refine interpretation and model parameters." },
    { ...ru.services[6], title: "In-house UAV assembly", items: ["3D printers", "CNC carbon part cutting", "Up to 70% of components made in-house"], description: "The company develops an internal workshop for UAV assembly and maintenance." },
  ],
  servicePage: { title: "TEKTONIKA services", text: "A full cycle of geological and geophysical surveys: from field routes and measurements to interpretation, 3D models and reports.", designTitle: "Designing a method package for the site", designText: "Methods are selected for the geological task, observation grid, site accessibility and reporting format.", dataTitle: "Data ready for review and transfer", dataText: "The office team prepares models, maps, sections and graphic appendices for technical and management decisions.", ctaTitle: "Need an estimate or work scope?", ctaText: "Send initial site data and the team will prepare a proposal." },
  projects: { ...ru.projects, title: "Projects", text: "Company projects and team projects are separated. Header links open the page with the right type and region filter.", company: "Company projects", team: "Team projects", regions: "Regions", years: "Years", count: "Projects shown" },
  research: { ...ru.research, title: "Research", text: "A feed of applied articles on methods, data interpretation, UAV and laboratory measurements.", articlesTitle: "Research articles", read: "Read article" },
  media: { ...ru.media, title: "Media", text: "Photos are organized by albums and years. The section contains materials from field seasons, expeditions and production work.", album2024: "Field season 2024", album2025: "Field season 2025", photos: "Photos", emptyTitle: "Album awaiting new materials", emptyText: "New field materials will appear here after editorial selection." },
  careers: { ...ru.careers, title: "Careers", text: "Applications are accepted by phone and email. Candidates can indicate their experience, desired role and preferred contact method.", search: "Vacancy search", placeholder: "Example: cook", howTitle: "How to apply", howText: "Email or call us. Mention the vacancy, your experience, fieldwork availability and preferred contact method.", benefits: ["Official employment", "Travel to and from the work site paid", "Workwear, PPE and medical check compensation"] },
  vacancies: [
    { id: "cook", title: "Cook (field kitchen)", location: "Field work", salary: "150,000 RUB", type: "Shift / season", description: "We are looking for a cook for field operations. Official employment, paid travel, workwear, PPE and medical check compensation are provided." },
    { id: "geophysicist", title: "Field geophysicist", location: "Khabarovsk / field projects", salary: "by interview", type: "Project work", description: "Field measurements, data quality control, primary processing and participation in report preparation." },
    { id: "uav", title: "UAV operator", location: "Field projects", salary: "by interview", type: "Project work", description: "UAV platform preparation, surveys, material transfer to the office team and technical maintenance." },
  ],
  contacts: { ...ru.contacts, title: "Contacts", text: "TEKTONIKA office is located in Khabarovsk. Contact the team to discuss the site, work scope and timeline.", address: "Address", phone: "Phone", sendTitle: "Send a message", sendText: "Describe the task, region and desired deliverable format.", success: "Message sent. We will contact you.", error: "Message could not be sent. Please contact us by phone or email.", name: "Your name", subject: "Subject", message: "Message", sending: "Sending...", send: "Send message" },
  about: { ...ru.about, title: "About TEKTONIKA LLC", p1: "The company was founded in 2024 after the reorganization of GEPART LLC. The team had worked at GEPART since its foundation in 2015 in management and engineering roles and participated in almost all its projects.", p2: "Today TEKTONIKA performs a wide range of geological and geophysical surveys, works with topography and implements UAV-based technologies.", legal: "Legal information", account: "Settlement account", address: "Address", cards: [{ title: "Team", text: "The permanent team has worked together for more than 15 years and covers field, office and production workflows." }, { title: "UAV production", text: "The workshop is equipped with 3D printers, CNC machines, oscilloscopes and industrial soldering stations." }, { title: "Geography", text: "The team has project experience in Khabarovsk and Primorsky Krai, Chukotka, Magadan and Amur Regions, and Yakutia." }] },
  footer: { navigation: "Navigation", contacts: "Contacts", rights: "All rights reserved.", privacy: "Privacy policy", agreement: "User agreement" },
  admin: { ...ru.admin, title: "Admin panel", loginTitle: "Editor login", loginText: "Closed section for managing website materials. Access is available only to authorized users.", login: "Login", password: "Password", enter: "Sign in", wrong: "Wrong login or password", exit: "Log out", dashboardText: "Content management sections: pages, projects, articles, vacancies and media.", sections: ["Site pages", "Projects", "Research articles", "Vacancies", "Media albums"], draftTitle: "Content draft", save: "Save draft" },
  legal: { privacyTitle: "Privacy policy", privacyText: "We care about protecting your personal data.", agreementTitle: "User agreement", agreementText: "This agreement governs the relationship between the user and TEKTONIKA LLC." },
  notFound: { title: "Page not found", text: "The requested page does not exist or has been moved." },
};

export default en;
