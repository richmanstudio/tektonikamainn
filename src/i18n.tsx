import { createContext, type ReactNode, useContext, useMemo, useState } from "react";

export type Lang = "ru" | "en" | "zh";

type Dictionary = Record<string, any>;

const dictionaries = {
  ru: {
    langLabel: "RU",
    common: {
      all: "Все",
      readMore: "Подробнее",
      contact: "Связаться",
      discuss: "Обсудить сотрудничество",
      shown: "Показано",
      back: "Назад",
      home: "Вернуться на главную",
      search: "Поиск",
      searchPlaceholder: "Введите услугу, проект, статью или раздел",
      noResults: "Ничего не найдено",
    },
    company: {
      name: "ООО «ТЕКТОНИКА»",
      city: "Хабаровск",
      address: "680000, Хабаровский край, г. Хабаровск, ул. Ким Ю Чена, д. 65, офис 326",
      description: "Геолого-геофизические исследования, полевые работы, БПЛА, топография и камеральная обработка для задач изучения недр.",
    },
    nav: [
      { to: "/", label: "Главная" },
      { to: "/services", label: "Услуги" },
      { to: "/projects", label: "Проекты" },
      { to: "/about", label: "О компании" },
      { to: "/media", label: "Медиа" },
      { to: "/research", label: "Научная деятельность" },
      { to: "/careers", label: "Карьера" },
    ],
    header: {
      materials: "Материалы о компании",
      farEast: "Работа на Дальнем Востоке",
      research: "Научная деятельность",
      suppliers: "Поставщикам и партнерам",
      geophysics: "Геофизика",
      projects: "Проекты",
      uav: "БПЛА и топография",
      projectCompany: "Проекты компании",
      projectTeam: "Проекты сотрудников",
      khabarovsk: "Хабаровский край",
      primorye: "Приморский край",
    },
    home: {
      heroSlides: [
        {
          title: "Геолого-геофизические исследования",
          text: "Полевые работы, БПЛА и камеральная обработка для изучения недр на Дальнем Востоке.",
          chip: "Комплекс работ: геология, геофизика, топография, БПЛА и отчетность",
        },
        {
          title: "Полевые партии для сложных территорий",
          text: "Команда работает в условиях удаленных участков, коротких сезонов и высокой ответственности за данные.",
          chip: "Маршруты, опробование, измерения и контроль качества в одном цикле",
        },
        {
          title: "БПЛА и камеральная интерпретация",
          text: "Собственные беспилотные решения, обработка данных и выпуск материалов для технических решений.",
          chip: "Аэромагниторазведка, ортофотопланы, модели и графические приложения",
        },
      ],
      aboutTitle: "«ТЕКТОНИКА» — инженерная команда полного цикла",
      aboutText:
        "Компания основана в 2024 году после реорганизации ООО «ГЕПАРТ». Костяк команды работает вместе более 15 лет и выполняет полевой, камеральный и производственный контур геолого-геофизических работ.",
      factTitles: ["Опыт и происхождение", "Стабильная команда", "Собственное производство"],
      cycleTitle: "Основа производственного цикла",
      cycleText: "Технологии подбираются под участок: от маршрутов и измерений до обработки и выпуска графических приложений.",
      serviceTitle: "Услуги без лишних слоев",
      serviceText: "Направления показаны как производственная система: от задачи и поля до данных, моделей и отчетности.",
      projectsTitle: "Проекты и география",
      projectsText: "Разделены работы компании и опыт сотрудников: Хабаровский край, Приморье, Чукотка, Магаданская область, Якутия.",
      careersTitle: "Перспективы без границ",
      careersText: "Мы ищем специалистов для полевых задач и поддерживаем проектную занятость.",
      vacanciesTitle: "Актуальные вакансии",
      vacanciesText: "Повар полевой кухни, геофизик полевой партии и оператор БПЛА",
    },
    facts: [
      { value: "2024", label: "год основания ООО «ТЕКТОНИКА»" },
      { value: "15+", label: "лет команда работает вместе" },
      { value: "70%", label: "комплектующих БПЛА собственного производства" },
      { value: "ДФО", label: "ключевая территория полевых работ" },
    ],
    services: [
      {
        title: "Геологическое изучение",
        accent: "green",
        items: ["Геологические маршруты", "Литохимические пробы по вторичным ореолам", "Штуфное опробование"],
        description: "Полевые партии проводят маршруты, опробование, документацию выработок и подготовку материалов для геологических отчетов.",
      },
      {
        title: "Магниторазведка",
        accent: "blue",
        items: ["Наземная магниторазведка", "Аэромагниторазведка с БПЛА", "Сети 100x20, 200x20, 400x25 м"],
        description: "Съемка на наземных и беспилотных платформах для поисковых и опережающих геолого-геофизических работ.",
      },
      {
        title: "Электроразведка",
        accent: "yellow",
        items: ["СГ-ВП и МКП-ВП", "ЭРА 625 Гц", "ЗСБ / МПП с аппаратурой Цикл 8R"],
        description: "Комплексы сопротивления, вызванной поляризации и электромагнитного зондирования с последующей интерпретацией.",
      },
      {
        title: "Топография и БПЛА",
        accent: "red",
        items: ["Ортофотопланы", "Лидарная съемка", "Уточнение геодезической сети"],
        description: "Топографо-геодезические работы выполняются совместно с партнерской организацией и с применением беспилотных систем.",
      },
      {
        title: "Камеральная обработка",
        accent: "gray",
        items: ["Оцифровка фондовых материалов", "Интерпретация данных", "Zond, Roes, CasCad 3D"],
        description: "Обработка полевых данных, построение 1D/2D/3D моделей и выпуск отчетов с графическими приложениями.",
      },
      {
        title: "Лабораторные измерения",
        accent: "green",
        items: ["Магнитная восприимчивость", "Каппаметрия", "ВП и кажущееся сопротивление по образцам"],
        description: "Измерение физических свойств образцов для уточнения интерпретации и параметров геофизических моделей.",
      },
      {
        title: "Собственная сборка БПЛА",
        accent: "blue",
        items: ["3D-принтеры", "ЧПУ-резка карбоновых деталей", "До 70% комплектующих собственного производства"],
        description: "Компания развивает внутренний цех сборки и обслуживания беспилотных платформ для полевых задач.",
      },
    ],
    servicePage: {
      title: "Услуги ООО «ТЕКТОНИКА»",
      text: "Полный цикл геолого-геофизических исследований: от полевого маршрута и измерений до интерпретации, 3D-моделей и отчетных материалов.",
      designTitle: "Проектирование комплекса под участок",
      designText: "Методы подбираются под геологическую задачу, сеть наблюдений, доступность территории и формат отчетности.",
      dataTitle: "Данные готовы к защите и передаче",
      dataText: "Камеральный блок готовит модели, карты, разрезы и графические приложения для технических и управленческих решений.",
      ctaTitle: "Нужна смета или состав работ?",
      ctaText: "Отправьте вводные по участку, и команда подготовит предложение.",
    },
    projects: {
      title: "Проекты",
      text: "Разделение на проекты компании и проекты сотрудников. Фильтры открываются напрямую из шапки по типу работ и региону.",
      company: "Проекты компании",
      team: "Проекты сотрудников",
      regions: "Регионы",
      years: "Годы",
      count: "Показано проектов",
      groups: [
        {
          type: "Проекты компании",
          projects: [
            { title: "Участки Амхалга и Немту-Си", client: "ООО «ГЕПАРТ»", region: "Хабаровский край", year: 2024, scope: "Аэромагниторазведка БПЛА, электроразведка МКП-ВП, наземная магниторазведка, отчет с графическими приложениями." },
            { title: "Люгинская площадь", client: "ООО «Полюс Геосервис»", region: "Хабаровский край", year: 2024, scope: "Геохимические поиски по ВОР, магниторазведка по сети 400x25 м, электроразведка МКП-ВП." },
            { title: "Участок Осенний", client: "АО «ГРК «АИР»", region: "Приморский край", year: 2024, scope: "Опережающие геолого-геофизические поисковые работы на основе аэромагниторазведки БПЛА." },
          ],
        },
        {
          type: "Проекты сотрудников",
          projects: [
            { title: "Чульбатканская площадь", client: "ООО «Удинск Золото»", region: "Хабаровский край", year: 2021, scope: "Геохимические поиски, наземная и аэро-магниторазведка БПЛА, электроразведка МКП-ВП, гравиметрия." },
            { title: "Месторождение Сухой Лог", client: "ООО «СЛ Золото»", region: "Красноярский край", year: 2019, scope: "Комплекс геофизических работ: магниторазведка, электроразведка МКП-ВП, отчет с графическими приложениями." },
            { title: "Фланги месторождения «Северное»", client: "АО «Полюс Алдан»", region: "Республика Саха (Якутия)", year: 2019, scope: "Магниторазведка, электроразведка СГ-ВП и МКП-ВП, камеральная обработка и отчетность." },
            { title: "Нижний Биркачан", client: "ООО «Омолонская золоторудная компания»", region: "Магаданская область", year: 2018, scope: "Магниторазведка, электроразведка СГ-БИЭП и подготовка отчетных материалов." },
          ],
        },
      ],
    },
    research: {
      title: "Научная деятельность",
      text: "Лента прикладных статей о методиках, интерпретации данных, БПЛА и лабораторных измерениях.",
      articlesTitle: "Научные статьи",
      read: "Читать статью",
      articles: [
        { date: "07.05.2026", tag: "Методика", title: "Контроль качества полевых геофизических данных", excerpt: "Как выстроить проверку измерений в маршруте, на профиле и при передаче материалов в камеральный блок.", author: "Инженерный отдел" },
        { date: "18.04.2026", tag: "БПЛА", title: "Аэромагниторазведка БПЛА на удаленных участках", excerpt: "Практический подход к подготовке платформы, сети наблюдений и контролю стабильности съемки.", author: "Лаборатория БПЛА" },
        { date: "02.03.2026", tag: "Интерпретация", title: "1D, 2D и 3D модели в камеральной обработке", excerpt: "Когда достаточно профильной модели, а когда требуется объемная интерпретация и сопоставление с фондовыми материалами.", author: "Камеральный блок" },
        { date: "15.02.2026", tag: "Лаборатория", title: "Физические свойства образцов как опора интерпретации", excerpt: "Каппаметрия, вызванная поляризация и сопротивление образцов помогают уточнять параметры геофизической модели.", author: "Лаборатория" },
      ],
    },
    media: {
      title: "Медиа",
      text: "Фотографии организованы по альбомам и годам. Текущие материалы сайта находятся в альбоме 2024, альбом 2025 подготовлен под новое пополнение.",
      album2024: "Полевой сезон 2024",
      album2025: "Полевой сезон 2025",
      photos: "Фотографий",
      emptyTitle: "Альбом готов к наполнению",
      emptyText: "Фотографии сезона 2025 можно добавить в отдельную папку и подключить к этому разделу.",
    },
    careers: {
      title: "Карьера",
      text: "Отклики принимаются по телефону и электронной почте. Вакансии можно будет управлять через будущую админ-панель.",
      search: "Поиск вакансий",
      placeholder: "Например: повар",
      howTitle: "Как откликнуться",
      howText: "Напишите на почту или позвоните. Укажите вакансию, опыт работы, готовность к полевым выездам и удобный способ связи.",
      benefits: ["Официальное трудоустройство", "Оплата проезда до места работ и обратно", "Спецодежда, СИЗ и компенсация медосмотра"],
    },
    vacancies: [
      { id: "cook", title: "Повар (полевая кухня)", location: "Полевые работы", salary: "150 000 ₽", type: "Вахта / сезон", description: "Мы ищем повара на полевые работы. Предоставляем официальное трудоустройство, оплату проезда до места работ и обратно, полный комплект спецодежды и СИЗ, компенсацию медосмотра." },
      { id: "geophysicist", title: "Геофизик полевой партии", location: "Хабаровск / выездные проекты", salary: "по итогам собеседования", type: "Проектная работа", description: "Полевые измерения, контроль качества данных, первичная обработка и участие в подготовке отчетных материалов." },
      { id: "uav", title: "Оператор БПЛА", location: "Выездные проекты", salary: "по итогам собеседования", type: "Проектная работа", description: "Подготовка беспилотной платформы, выполнение съемки, передача материалов в камеральный блок и техническое обслуживание." },
    ],
    contacts: {
      title: "Контакты",
      text: "Офис ООО «ТЕКТОНИКА» находится в Хабаровске. Свяжитесь с командой для обсуждения участка, состава работ и сроков.",
      address: "Адрес",
      phone: "Телефон",
      sendTitle: "Отправить сообщение",
      sendText: "Опишите задачу, регион и желаемый формат результата.",
      success: "Сообщение отправлено. Мы свяжемся с вами.",
      error: "Не удалось отправить сообщение. Попробуйте связаться по телефону или почте.",
      name: "Ваше имя",
      email: "E-mail",
      subject: "Тема",
      message: "Сообщение",
      sending: "Отправка...",
      send: "Отправить сообщение",
    },
    about: {
      title: "О компании ООО «ТЕКТОНИКА»",
      p1: "Компания основана в 2024 году в результате реорганизации ООО «ГЕПАРТ». Коллектив работал в «ГЕПАРТ» с момента образования компании в 2015 году на руководящих и инженерных позициях и участвовал практически во всех ее проектах.",
      p2: "Сегодня ООО «ТЕКТОНИКА» выполняет широкий спектр геолого-геофизических исследований, занимается топографией и внедряет технологии с применением БПЛА.",
      legal: "Юридическая информация",
      inn: "ИНН / КПП",
      ogrn: "ОГРН",
      account: "Расчетный счет",
      address: "Адрес",
      cards: [
        { title: "Команда", text: "Постоянный штат работает вместе более 15 лет и закрывает полевой, камеральный и производственный контуры." },
        { title: "Производство БПЛА", text: "Собственный цех оснащен 3D-принтерами, ЧПУ-станками, осциллографами и паяльными станциями промышленного класса." },
        { title: "География", text: "В опыте команды проекты в Хабаровском, Приморском краях, Чукотском АО, Магаданской, Амурской областях и Якутии." },
      ],
    },
    footer: {
      navigation: "Навигация",
      contacts: "Контакты",
      rights: "Все права защищены.",
      privacy: "Политика конфиденциальности",
      agreement: "Пользовательское соглашение",
    },
    admin: {
      title: "Панель администратора",
      loginTitle: "Вход для редактора",
      loginText: "Фронтенд-заготовка под будущий backend на Python и MySQL. Сейчас авторизация проверяется локально.",
      login: "Логин",
      password: "Пароль",
      enter: "Войти",
      wrong: "Неверный логин или пароль",
      exit: "Выйти",
      dashboardText: "Здесь подготовлены разделы, которые позже будут подключены к API: страницы, проекты, статьи, вакансии и медиа.",
      sections: ["Страницы сайта", "Проекты", "Научные статьи", "Вакансии", "Медиа-альбомы"],
      draftTitle: "Черновик контента",
      save: "Сохранить черновик",
    },
    legal: {
      privacyTitle: "Политика конфиденциальности",
      privacyText: "Мы заботимся о защите ваших персональных данных.",
      agreementTitle: "Пользовательское соглашение",
      agreementText: "Настоящее соглашение регулирует отношения между пользователем и ООО «Тектоника».",
    },
    notFound: {
      title: "Страница не найдена",
      text: "К сожалению, запрашиваемая страница не существует или была перемещена.",
    },
  },
  en: {} as Dictionary,
  zh: {} as Dictionary,
};

dictionaries.en = {
  ...dictionaries.ru,
  langLabel: "EN",
  common: { ...dictionaries.ru.common, all: "All", readMore: "Read more", contact: "Contact us", discuss: "Discuss cooperation", shown: "Shown", back: "Back", home: "Back to home", search: "Search", searchPlaceholder: "Search for a service, project, article or page", noResults: "No results found" },
  company: { ...dictionaries.ru.company, name: "TEKTONIKA LLC", city: "Khabarovsk", address: "Office 326, 65 Kim Yu Chen St., Khabarovsk, Russia, 680000", description: "Geological and geophysical surveys, field operations, UAV, topography and office processing for subsurface exploration." },
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
    { ...dictionaries.ru.services[0], title: "Geological studies", items: ["Geological routes", "Lithochemical sampling", "Rock sample documentation"], description: "Field crews conduct routes, sampling, outcrop documentation and prepare materials for geological reports." },
    { ...dictionaries.ru.services[1], title: "Magnetic surveying", items: ["Ground magnetic surveying", "UAV aeromagnetics", "100x20, 200x20, 400x25 m grids"], description: "Ground and UAV surveys for exploration and advance geological-geophysical works." },
    { ...dictionaries.ru.services[2], title: "Electrical prospecting", items: ["IP and multi-electrode IP", "ERA 625 Hz", "TEM / MPP with Cycle 8R equipment"], description: "Resistivity, induced polarization and electromagnetic sounding systems with further interpretation." },
    { ...dictionaries.ru.services[3], title: "Topography and UAV", items: ["Orthophoto maps", "LiDAR surveying", "Geodetic network refinement"], description: "Topographic and geodetic works with partner support and UAV systems." },
    { ...dictionaries.ru.services[4], title: "Office processing", items: ["Digitizing archive materials", "Data interpretation", "Zond, Roes, CasCad 3D"], description: "Processing field data, building 1D/2D/3D models and preparing reports with graphic appendices." },
    { ...dictionaries.ru.services[5], title: "Laboratory measurements", items: ["Magnetic susceptibility", "Kappametry", "IP and apparent resistivity on samples"], description: "Measuring physical properties of samples to refine interpretation and model parameters." },
    { ...dictionaries.ru.services[6], title: "In-house UAV assembly", items: ["3D printers", "CNC carbon part cutting", "Up to 70% of components made in-house"], description: "The company develops an internal workshop for UAV assembly and maintenance." },
  ],
  servicePage: { title: "TEKTONIKA services", text: "A full cycle of geological and geophysical surveys: from field routes and measurements to interpretation, 3D models and reports.", designTitle: "Designing a method package for the site", designText: "Methods are selected for the geological task, observation grid, site accessibility and reporting format.", dataTitle: "Data ready for review and transfer", dataText: "The office team prepares models, maps, sections and graphic appendices for technical and management decisions.", ctaTitle: "Need an estimate or work scope?", ctaText: "Send initial site data and the team will prepare a proposal." },
  projects: { ...dictionaries.ru.projects, title: "Projects", text: "Company projects and team projects are separated. Header links open the page with the right type and region filter.", company: "Company projects", team: "Team projects", regions: "Regions", years: "Years", count: "Projects shown" },
  research: { ...dictionaries.ru.research, title: "Research", text: "A feed of applied articles on methods, data interpretation, UAV and laboratory measurements.", articlesTitle: "Research articles", read: "Read article" },
  media: { ...dictionaries.ru.media, title: "Media", text: "Photos are organized by albums and years. Current materials are in the 2024 album, and 2025 is prepared for future updates.", album2024: "Field season 2024", album2025: "Field season 2025", photos: "Photos", emptyTitle: "Album ready for content", emptyText: "Photos for the 2025 season can be added to a separate folder and connected to this section." },
  careers: { ...dictionaries.ru.careers, title: "Careers", text: "Applications are accepted by phone and email. Vacancies will later be managed through the admin panel.", search: "Vacancy search", placeholder: "Example: cook", howTitle: "How to apply", howText: "Email or call us. Mention the vacancy, your experience, fieldwork availability and preferred contact method.", benefits: ["Official employment", "Travel to and from the work site paid", "Workwear, PPE and medical check compensation"] },
  vacancies: [
    { id: "cook", title: "Cook (field kitchen)", location: "Field work", salary: "150,000 RUB", type: "Shift / season", description: "We are looking for a cook for field operations. Official employment, paid travel, workwear, PPE and medical check compensation are provided." },
    { id: "geophysicist", title: "Field geophysicist", location: "Khabarovsk / field projects", salary: "by interview", type: "Project work", description: "Field measurements, data quality control, primary processing and participation in report preparation." },
    { id: "uav", title: "UAV operator", location: "Field projects", salary: "by interview", type: "Project work", description: "UAV platform preparation, surveys, material transfer to the office team and technical maintenance." },
  ],
  contacts: { ...dictionaries.ru.contacts, title: "Contacts", text: "TEKTONIKA office is located in Khabarovsk. Contact the team to discuss the site, work scope and timeline.", address: "Address", phone: "Phone", sendTitle: "Send a message", sendText: "Describe the task, region and desired deliverable format.", success: "Message sent. We will contact you.", error: "Message could not be sent. Please contact us by phone or email.", name: "Your name", subject: "Subject", message: "Message", sending: "Sending...", send: "Send message" },
  about: { ...dictionaries.ru.about, title: "About TEKTONIKA LLC", p1: "The company was founded in 2024 after the reorganization of GEPART LLC. The team had worked at GEPART since its foundation in 2015 in management and engineering roles and participated in almost all its projects.", p2: "Today TEKTONIKA performs a wide range of geological and geophysical surveys, works with topography and implements UAV-based technologies.", legal: "Legal information", account: "Settlement account", address: "Address", cards: [{ title: "Team", text: "The permanent team has worked together for more than 15 years and covers field, office and production workflows." }, { title: "UAV production", text: "The workshop is equipped with 3D printers, CNC machines, oscilloscopes and industrial soldering stations." }, { title: "Geography", text: "The team has project experience in Khabarovsk and Primorsky Krai, Chukotka, Magadan and Amur Regions, and Yakutia." }] },
  footer: { navigation: "Navigation", contacts: "Contacts", rights: "All rights reserved.", privacy: "Privacy policy", agreement: "User agreement" },
  admin: { ...dictionaries.ru.admin, title: "Admin panel", loginTitle: "Editor login", loginText: "Frontend foundation for the future Python and MySQL backend. Authentication is local for now.", login: "Login", password: "Password", enter: "Sign in", wrong: "Wrong login or password", exit: "Log out", dashboardText: "Sections prepared for API integration: pages, projects, articles, vacancies and media.", sections: ["Site pages", "Projects", "Research articles", "Vacancies", "Media albums"], draftTitle: "Content draft", save: "Save draft" },
  legal: { privacyTitle: "Privacy policy", privacyText: "We care about protecting your personal data.", agreementTitle: "User agreement", agreementText: "This agreement governs the relationship between the user and TEKTONIKA LLC." },
  notFound: { title: "Page not found", text: "The requested page does not exist or has been moved." },
};

dictionaries.zh = {
  ...dictionaries.en,
  langLabel: "中文",
  common: { ...dictionaries.en.common, all: "全部", readMore: "了解更多", contact: "联系我们", discuss: "洽谈合作", shown: "显示", back: "返回", home: "返回首页", search: "搜索", searchPlaceholder: "搜索服务、项目、文章或页面", noResults: "未找到结果" },
  company: { ...dictionaries.en.company, name: "TEKTONIKA 有限责任公司", city: "哈巴罗夫斯克", address: "俄罗斯哈巴罗夫斯克市 Kim Yu Chen 街65号326室，680000", description: "面向地下资源勘查的地质与地球物理调查、野外作业、无人机、测绘和室内处理。" },
  nav: [
    { to: "/", label: "首页" }, { to: "/services", label: "服务" }, { to: "/projects", label: "项目" }, { to: "/about", label: "公司" }, { to: "/media", label: "媒体" }, { to: "/research", label: "科研" }, { to: "/careers", label: "招聘" },
  ],
  header: { materials: "公司资料", farEast: "远东地区工作", research: "科研活动", suppliers: "供应商与合作伙伴", geophysics: "地球物理", projects: "项目", uav: "无人机与测绘", projectCompany: "公司项目", projectTeam: "团队项目", khabarovsk: "哈巴罗夫斯克边疆区", primorye: "滨海边疆区" },
  home: {
    heroSlides: [
      { title: "地质与地球物理调查", text: "在俄罗斯远东开展野外作业、无人机调查和室内数据处理。", chip: "完整周期：地质、地球物理、测绘、无人机和报告" },
      { title: "面向复杂区域的野外队伍", text: "团队适应偏远矿区、短野外季和高数据责任要求。", chip: "路线、取样、测量和质量控制一体化" },
      { title: "无人机与室内解释", text: "自有无人机方案、数据处理和面向工程决策的成果交付。", chip: "航空磁测、正射影像、模型和图件附件" },
    ],
    aboutTitle: "TEKTONIKA 是全周期工程团队",
    aboutText: "公司于2024年在 GEPART 有限责任公司重组后成立。核心团队合作超过15年，覆盖野外、室内和生产环节。",
    factTitles: ["经验与背景", "稳定团队", "自主生产"],
    cycleTitle: "生产周期基础",
    cycleText: "根据区块选择技术：从路线和测量到处理与图件成果。",
    serviceTitle: "清晰的服务体系",
    serviceText: "服务方向以生产系统呈现：从任务和野外到数据、模型和报告。",
    projectsTitle: "项目与地域",
    projectsText: "公司项目和团队经验分开展示：哈巴罗夫斯克、滨海、楚科奇、马加丹和雅库特。",
    careersTitle: "广阔发展机会",
    careersText: "我们寻找野外任务专家，并支持项目制工作。",
    vacanciesTitle: "当前职位",
    vacanciesText: "野外厨房厨师、野外地球物理师和无人机操作员",
  },
  facts: [
    { value: "2024", label: "TEKTONIKA 成立年份" }, { value: "15+", label: "团队共同工作年限" }, { value: "70%", label: "无人机部件自主生产比例" }, { value: "远东", label: "重点野外工作区域" },
  ],
  servicePage: { ...dictionaries.en.servicePage, title: "TEKTONIKA 服务", text: "地质与地球物理调查完整周期：从野外路线和测量到解释、三维模型和报告。" },
  projects: { ...dictionaries.en.projects, title: "项目", text: "公司项目和团队项目分开展示。页眉链接可直接打开相应类型和地区筛选。", company: "公司项目", team: "团队项目", regions: "地区", years: "年份", count: "项目数量" },
  research: { ...dictionaries.en.research, title: "科研活动", text: "关于方法、数据解释、无人机和实验室测量的应用文章流。", articlesTitle: "科研文章", read: "阅读文章" },
  media: { ...dictionaries.en.media, title: "媒体", photos: "照片", emptyTitle: "相册待更新" },
  careers: { ...dictionaries.en.careers, title: "招聘", search: "职位搜索", placeholder: "例如：厨师", howTitle: "如何申请" },
  contacts: { ...dictionaries.en.contacts, title: "联系方式", address: "地址", phone: "电话", sendTitle: "发送消息", name: "姓名", subject: "主题", message: "消息", sending: "发送中...", send: "发送消息" },
  about: { ...dictionaries.en.about, title: "关于 TEKTONIKA", legal: "法律信息", address: "地址" },
  footer: { ...dictionaries.en.footer, navigation: "导航", contacts: "联系方式", rights: "版权所有。", privacy: "隐私政策", agreement: "用户协议" },
  admin: { ...dictionaries.en.admin, title: "管理面板", loginTitle: "编辑登录", login: "登录名", password: "密码", enter: "登录", wrong: "登录名或密码错误", exit: "退出", draftTitle: "内容草稿", save: "保存草稿" },
  legal: { privacyTitle: "隐私政策", privacyText: "我们重视保护您的个人数据。", agreementTitle: "用户协议", agreementText: "本协议规定用户与 TEKTONIKA 之间的关系。" },
  notFound: { title: "页面未找到", text: "请求的页面不存在或已移动。" },
};

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
}>({ lang: "ru", setLang: () => undefined, t: dictionaries.ru });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem("tektonika-lang") as Lang) || "ru");
  const setLang = (next: Lang) => {
    localStorage.setItem("tektonika-lang", next);
    setLangState(next);
  };
  const value = useMemo(() => ({ lang, setLang, t: dictionaries[lang] }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  return useContext(LanguageContext);
}

export const languages: { code: Lang; label: string }[] = [
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
  { code: "zh", label: "中文" },
];
