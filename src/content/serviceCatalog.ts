import type { CmsLanguage } from "./cmsTypes";

export const SERVICE_SLUGS = [
  "geological-surveys",
  "magnetic-surveys",
  "electrical-surveys",
  "uav-aerial-surveys",
  "topographic-surveys",
  "laboratory-measurements",
  "geophysical-data-processing",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

type LocalizedCopy = Record<CmsLanguage, string>;

export type ServiceLanding = {
  slug: ServiceSlug;
  title: LocalizedCopy;
  description: LocalizedCopy;
  intro: LocalizedCopy;
  benefits: Record<CmsLanguage, string[]>;
  deliverables: Record<CmsLanguage, string[]>;
  keywords: LocalizedCopy;
};

export const serviceCatalog: ServiceLanding[] = [
  {
    slug: "geological-surveys",
    title: { ru: "Геологические исследования", en: "Geological surveys", zh: "地质调查" },
    description: {
      ru: "Полевые геологические исследования, маршруты, документация, опробование и подготовка материалов для геологоразведочных проектов.",
      en: "Field geological surveys, mapping routes, documentation, sampling and engineering-ready geological deliverables.",
      zh: "野外地质调查、路线填图、编录、采样及面向勘探项目的成果交付。",
    },
    intro: {
      ru: "Организуем полный полевой цикл: от подготовки маршрутов и программы работ до контроля качества данных и итоговых материалов.",
      en: "We run the full field cycle from survey planning and routes to data quality control and final geological materials.",
      zh: "我们提供从调查设计、路线部署到数据质量控制和最终地质成果的完整野外工作流程。",
    },
    benefits: {
      ru: ["Полевые маршруты и геологическое картирование", "Документация обнажений и горных выработок", "Отбор и систематизация проб", "Контроль качества полевых данных"],
      en: ["Field routes and geological mapping", "Outcrop and excavation logging", "Sampling and sample management", "Field data quality control"],
      zh: ["野外路线与地质填图", "露头与工程编录", "采样与样品管理", "野外数据质量控制"],
    },
    deliverables: {
      ru: ["Полевые журналы и базы данных", "Карты и схемы", "Каталог проб", "Технический отчёт"],
      en: ["Field logs and databases", "Maps and schemes", "Sample catalogue", "Technical report"],
      zh: ["野外记录与数据库", "图件与示意图", "样品目录", "技术报告"],
    },
    keywords: { ru: "геологические исследования, геологоразведка, полевые геологические работы", en: "geological surveys, exploration geology, field geology Russia", zh: "地质调查, 地质勘探, 俄罗斯野外地质" },
  },
  {
    slug: "magnetic-surveys",
    title: { ru: "Магниторазведка", en: "Magnetic surveys", zh: "磁法勘探" },
    description: {
      ru: "Наземная и БПЛА-магниторазведка для поисковых и картировочных задач с обработкой и интерпретацией данных.",
      en: "Ground and UAV magnetic surveys for exploration and mapping with processing and interpretation.",
      zh: "面向找矿与制图任务的地面及无人机磁法勘探，并提供数据处理与解释。",
    },
    intro: { ru: "Выполняем магнитные съёмки с контролем качества, привязкой, обработкой и подготовкой карт аномального магнитного поля.", en: "We deliver magnetic acquisition, positioning, QC, processing and anomaly mapping as one workflow.", zh: "我们将磁测采集、定位、质量控制、处理和异常图件制作整合为统一流程。" },
    benefits: { ru: ["Наземная и аэромагнитная съёмка", "Высокоточная навигация", "Контроль вариаций и качества", "Интерпретация аномалий"], en: ["Ground and UAV acquisition", "High-accuracy positioning", "Variation and QC control", "Magnetic anomaly interpretation"], zh: ["地面与无人机磁测", "高精度定位", "日变与质量控制", "磁异常解释"] },
    deliverables: { ru: ["База наблюдений", "Карты магнитного поля", "Карты аномалий", "Интерпретационные схемы"], en: ["Observation database", "Magnetic field maps", "Anomaly maps", "Interpretation schemes"], zh: ["观测数据库", "磁场图", "异常图", "解释图件"] },
    keywords: { ru: "магниторазведка, аэромагниторазведка БПЛА, магнитная съемка", en: "magnetic survey, UAV aeromagnetic survey, magnetic exploration Russia", zh: "磁法勘探, 无人机航磁, 俄罗斯磁测" },
  },
  {
    slug: "electrical-surveys",
    title: { ru: "Электроразведка", en: "Electrical surveys", zh: "电法勘探" },
    description: { ru: "Электроразведочные работы, полевые измерения и интерпретация для решения поисковых и инженерно-геологических задач.", en: "Electrical geophysical surveys, field measurements and interpretation for exploration and engineering tasks.", zh: "用于找矿及工程任务的电法地球物理测量、野外采集与解释。" },
    intro: { ru: "Подбираем методику под геологическую задачу, организуем измерения и доводим данные до интерпретационной модели.", en: "We select the method for the geological target, acquire the data and carry it through to an interpretation model.", zh: "我们根据地质目标选择方法，完成数据采集并形成解释模型。" },
    benefits: { ru: ["Методика под конкретную задачу", "Полевой контроль качества", "1D/2D/3D обработка", "Совместная интерпретация с другими методами"], en: ["Target-driven survey design", "Field quality control", "1D/2D/3D processing", "Integrated interpretation"], zh: ["面向目标的方法设计", "野外质量控制", "1D/2D/3D 处理", "多方法综合解释"] },
    deliverables: { ru: ["Полевые данные", "Разрезы и модели", "Карты параметров", "Интерпретационный отчёт"], en: ["Field data", "Sections and models", "Parameter maps", "Interpretation report"], zh: ["野外数据", "剖面与模型", "参数图", "解释报告"] },
    keywords: { ru: "электроразведка, геофизические исследования, электротомография", en: "electrical geophysical survey, resistivity survey, exploration geophysics", zh: "电法勘探, 电阻率测量, 地球物理勘探" },
  },
  {
    slug: "uav-aerial-surveys",
    title: { ru: "БПЛА и аэрогеофизика", en: "UAV and airborne geophysics", zh: "无人机与航空地球物理" },
    description: { ru: "БПЛА-съёмка для геофизики, картографии и мониторинга удалённых территорий.", en: "UAV acquisition for geophysics, mapping and remote-area monitoring.", zh: "用于地球物理、制图和偏远地区监测的无人机采集。" },
    intro: { ru: "Используем БПЛА там, где важны плотность данных, скорость работ и снижение рисков для полевой команды.", en: "We use UAV platforms where dense data, fast deployment and reduced field exposure matter.", zh: "在需要高密度数据、快速部署并降低野外人员风险的场景中使用无人机平台。" },
    benefits: { ru: ["Работа в труднодоступной местности", "Высокая плотность наблюдений", "Гибкая высота и маршруты", "Связка с геофизикой и топографией"], en: ["Remote terrain operations", "Dense observation grids", "Flexible altitude and routing", "Integrated geophysics and mapping"], zh: ["偏远地形作业", "高密度观测", "灵活航高与航线", "地球物理与测绘一体化"] },
    deliverables: { ru: ["Траектории и телеметрия", "Ортофотопланы", "Геофизические grids", "Карты и модели"], en: ["Flight tracks and telemetry", "Orthomosaics", "Geophysical grids", "Maps and models"], zh: ["航迹与遥测", "正射影像", "地球物理网格", "图件与模型"] },
    keywords: { ru: "БПЛА геофизика, аэрогеофизика, беспилотная съемка", en: "UAV geophysics, airborne geophysical survey, drone mapping Russia", zh: "无人机地球物理, 航空地球物理, 无人机测绘" },
  },
  {
    slug: "topographic-surveys",
    title: { ru: "Топографические и геодезические работы", en: "Topographic and geodetic surveys", zh: "地形与测地工作" },
    description: { ru: "Топографическая съёмка и геодезическое обеспечение полевых и геологоразведочных работ.", en: "Topographic surveying and geodetic support for field and exploration projects.", zh: "为野外与勘探项目提供地形测量及测地支持。" },
    intro: { ru: "Создаём точную пространственную основу для геологии, геофизики и проектных решений.", en: "We create the spatial reference required for geology, geophysics and engineering decisions.", zh: "为地质、地球物理及工程决策建立精确空间基准。" },
    benefits: { ru: ["Планово-высотное обоснование", "Топографическая съёмка", "Привязка геофизических профилей", "Подготовка цифровых моделей"], en: ["Horizontal and vertical control", "Topographic acquisition", "Geophysical line positioning", "Digital terrain models"], zh: ["平面与高程控制", "地形采集", "地球物理测线定位", "数字地形模型"] },
    deliverables: { ru: ["Топопланы", "Каталоги координат", "ЦМР/ЦММ", "GIS-слои"], en: ["Topographic plans", "Coordinate catalogues", "DTM/DSM", "GIS layers"], zh: ["地形图", "坐标目录", "DTM/DSM", "GIS 图层"] },
    keywords: { ru: "топографическая съемка, геодезические работы, геодезия геологоразведка", en: "topographic survey, geodetic survey, exploration surveying", zh: "地形测量, 测地工作, 勘探测量" },
  },
  {
    slug: "laboratory-measurements",
    title: { ru: "Лабораторные измерения", en: "Laboratory measurements", zh: "实验室测量" },
    description: { ru: "Измерение физических свойств образцов для геофизической интерпретации и контроля моделей.", en: "Physical-property measurements of samples for geophysical interpretation and model control.", zh: "测量样品物性参数，用于地球物理解释与模型约束。" },
    intro: { ru: "Связываем полевые аномалии с измеряемыми свойствами пород и повышаем обоснованность интерпретации.", en: "We connect field anomalies with measured rock properties to strengthen interpretation confidence.", zh: "将野外异常与实测岩石物性联系起来，提高解释可靠性。" },
    benefits: { ru: ["Контроль качества образцов", "Стандартизированные измерения", "Связка с полевыми данными", "Подготовка статистики"], en: ["Sample quality control", "Standardized measurements", "Field-data integration", "Statistical summaries"], zh: ["样品质量控制", "标准化测量", "与野外数据结合", "统计汇总"] },
    deliverables: { ru: ["Таблицы измерений", "Статистические выборки", "Графики распределений", "Материалы для интерпретации"], en: ["Measurement tables", "Statistical datasets", "Distribution plots", "Interpretation inputs"], zh: ["测量表", "统计数据集", "分布图", "解释输入资料"] },
    keywords: { ru: "лабораторные геофизические измерения, физические свойства пород", en: "rock physical properties, geophysical laboratory measurements", zh: "岩石物性, 地球物理实验室测量" },
  },
  {
    slug: "geophysical-data-processing",
    title: { ru: "Камеральная обработка и интерпретация", en: "Geophysical processing and interpretation", zh: "地球物理数据处理与解释" },
    description: { ru: "Камеральная обработка геолого-геофизических данных, 1D/2D/3D моделирование, карты, разрезы и техническая отчётность.", en: "Geological and geophysical data processing, 1D/2D/3D modelling, mapping, sections and technical reporting.", zh: "地质与地球物理数据处理、1D/2D/3D 建模、图件、剖面及技术报告。" },
    intro: { ru: "Превращаем разрозненные полевые данные в согласованный набор карт, моделей и выводов для принятия инженерных решений.", en: "We turn raw field datasets into coherent maps, models and conclusions ready for engineering decisions.", zh: "将原始野外数据转化为一致的图件、模型和结论，支持工程决策。" },
    benefits: { ru: ["Единая система координат и QC", "1D/2D/3D моделирование", "Совместная интерпретация методов", "Воспроизводимый workflow обработки"], en: ["Coordinate harmonization and QC", "1D/2D/3D modelling", "Integrated method interpretation", "Reproducible processing workflow"], zh: ["坐标统一与质量控制", "1D/2D/3D 建模", "多方法综合解释", "可复现处理流程"] },
    deliverables: { ru: ["Обработанные базы данных", "Карты и разрезы", "3D-модели", "Технический отчёт"], en: ["Processed databases", "Maps and sections", "3D models", "Technical report"], zh: ["处理后数据库", "图件与剖面", "3D 模型", "技术报告"] },
    keywords: { ru: "обработка геофизических данных, интерпретация геофизики, 3D моделирование", en: "geophysical data processing, geophysical interpretation, 3D modelling", zh: "地球物理数据处理, 地球物理解释, 3D 建模" },
  },
];

export const serviceCatalogBySlug = Object.fromEntries(serviceCatalog.map((service) => [service.slug, service])) as Record<ServiceSlug, ServiceLanding>;
