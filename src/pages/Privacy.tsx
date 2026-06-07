import Layout from "../layouts/MainLayout";
import { useI18n, type Lang } from "../i18n";

type LegalSection = {
  title: string;
  paragraphs?: string[];
  list?: string[];
};

type PrivacyCopy = {
  lead: string;
  updated: string;
  intro: string;
  quickTitle: string;
  quick: { label: string; value: string }[];
  sections: LegalSection[];
  linksTitle: string;
  links: { label: string; href: string }[];
};

const privacyCopy: Record<Lang, PrivacyCopy> = {
  ru: {
    lead:
      "Настоящая Политика конфиденциальности и обработки персональных данных определяет порядок обработки данных пользователей сайта ООО «ТЕКТОНИКА» и применяется к формам обратной связи, техническим данным браузера, cookies/localStorage и иным сведениям, которые пользователь передает при использовании сайта.",
    updated: "Редакция от 07.06.2026",
    intro:
      "Если пользователь не согласен с условиями Политики, он должен прекратить использование сайта и не направлять обращения через формы. Отправка формы, выбор языка, подтверждение уведомления о конфиденциальности и дальнейшее использование сайта означают ознакомление пользователя с настоящей Политикой в соответствующей части.",
    quickTitle: "Кратко о главном",
    quick: [
      { label: "Оператор", value: "ООО «ТЕКТОНИКА», ИНН 2700023021, ОГРН 1232700019860" },
      { label: "Адрес", value: "680000, Хабаровский край, г. Хабаровск, ул. Ким Ю Чена, д. 65, офис 326" },
      { label: "Контакт", value: "tektonikayur16@gmail.com" },
      { label: "Данные", value: "ФИО/имя, email, тема и текст обращения, технические данные браузера, настройки интерфейса" },
      { label: "Цели", value: "Обработка обращений, связь с пользователем, работа сайта, безопасность и администрирование" },
      { label: "Срок", value: "До достижения целей обработки, отзыва согласия или истечения обязательных сроков хранения" },
    ],
    sections: [
      {
        title: "1. Термины и статус оператора",
        paragraphs: [
          "Оператором персональных данных является ООО «ТЕКТОНИКА» — юридическое лицо, самостоятельно определяющее цели обработки, состав обрабатываемых персональных данных и действия, совершаемые с персональными данными пользователей сайта.",
          "Пользователь — любое лицо, посещающее сайт, просматривающее материалы, использующее формы обратной связи или иные интерактивные элементы сайта.",
          "Персональные данные — любая информация, относящаяся прямо или косвенно к определенному или определяемому физическому лицу. Обработка включает сбор, запись, систематизацию, накопление, хранение, уточнение, использование, передачу, обезличивание, блокирование, удаление и уничтожение данных.",
        ],
      },
      {
        title: "2. Категории обрабатываемых данных",
        list: [
          "Данные, которые пользователь указывает самостоятельно: имя или ФИО, адрес электронной почты, тема обращения, текст сообщения, иные сведения, добровольно включенные пользователем в сообщение.",
          "Технические данные: IP-адрес, сведения о браузере и устройстве, дата и время посещения, адреса просмотренных страниц, источник перехода, данные о технических ошибках и событиях безопасности, если такие сведения фиксируются сервером, хостингом, CMS или сервисами доставки сообщений.",
          "Локальные настройки интерфейса: выбранный язык, статус ознакомления с уведомлением о конфиденциальности, технические идентификаторы cookies/localStorage, необходимые для корректной работы сайта.",
          "Данные администратора CMS: логин, служебные действия в панели управления, технические журналы авторизации и изменения контента, если доступ к панели осуществляется уполномоченным лицом.",
        ],
      },
      {
        title: "3. Данные, которые не запрашиваются сайтом",
        list: [
          "Сайт не предназначен для сбора специальных категорий персональных данных: сведений о расовой или национальной принадлежности, политических взглядах, религиозных или философских убеждениях, состоянии здоровья, интимной жизни.",
          "Сайт не предназначен для сбора биометрических персональных данных.",
          "Пользователь не должен направлять через формы сведения, не относящиеся к цели обращения, включая документы, содержащие избыточные персональные данные третьих лиц.",
        ],
      },
      {
        title: "4. Цели обработки",
        list: [
          "Прием, регистрация и рассмотрение обращений, направленных через формы сайта или по указанным контактам.",
          "Подготовка ответа пользователю, уточнение задачи, региона работ, состава услуг, сроков и формата взаимодействия.",
          "Обеспечение корректной работы сайта, сохранение выбранного языка и статуса уведомления о конфиденциальности.",
          "Защита сайта, CMS, форм обратной связи и инфраструктуры от неправомерного доступа, спама, вредоносных действий и технических сбоев.",
          "Анализ качества работы сайта и улучшение структуры страниц без принятия решений, порождающих юридические последствия для пользователя исключительно на основе автоматизированной обработки.",
          "Исполнение требований законодательства РФ, рассмотрение запросов уполномоченных органов и защита прав и законных интересов Оператора.",
        ],
      },
      {
        title: "5. Правовые основания обработки",
        paragraphs: [
          "Обработка персональных данных осуществляется на основании согласия пользователя, выраженного путем направления формы, выбора соответствующего действия в уведомлении о конфиденциальности или добровольного предоставления данных иным способом.",
          "Обработка также может осуществляться, когда она необходима для рассмотрения обращения пользователя, подготовки ответа, осуществления прав и законных интересов Оператора, исполнения требований законодательства РФ и обеспечения безопасности информационных систем.",
          "Оператор руководствуется Конституцией РФ, Федеральным законом № 152-ФЗ «О персональных данных», Федеральным законом № 149-ФЗ «Об информации, информационных технологиях и о защите информации», Гражданским кодексом РФ и иными применимыми актами.",
        ],
      },
      {
        title: "6. Cookies, localStorage и технические идентификаторы",
        paragraphs: [
          "Сайт может использовать cookies, localStorage и аналогичные технологии для сохранения выбранного языка, статуса уведомления о конфиденциальности, корректной работы интерфейса и защиты от повторяющихся технических действий.",
          "Пользователь может ограничить использование cookies средствами браузера. В этом случае отдельные функции сайта могут работать некорректно: язык и статус уведомления могут не сохраняться, а отдельные элементы интерфейса могут отображаться повторно.",
        ],
      },
      {
        title: "7. Передача третьим лицам и сервисным провайдерам",
        paragraphs: [
          "Оператор не продает персональные данные пользователей и не предоставляет их третьим лицам для самостоятельной рекламы.",
          "Передача данных допускается провайдерам хостинга, домена, технической поддержки, сервисам отправки сообщений, почтовым сервисам, подрядчикам по сопровождению сайта и иным лицам, если это необходимо для работы сайта, обработки обращения, обеспечения безопасности или исполнения закона.",
          "На текущей версии сайта форма обратной связи может использовать сервис доставки электронных сообщений EmailJS. Объем передаваемых данных ограничивается содержанием формы и техническими данными, необходимыми для отправки сообщения.",
        ],
      },
      {
        title: "8. Трансграничная передача",
        paragraphs: [
          "Если технические сервисы, почтовая инфраструктура, хостинг, CDN или сервисы отправки сообщений используют серверы за пределами Российской Федерации, передача данных может иметь трансграничный характер в объеме, необходимом для работы соответствующего сервиса.",
          "Оператор стремится использовать такие сервисы только в объеме, необходимом для работы сайта и обработки обращений. При внедрении собственного backend и MySQL-инфраструктуры перечень сервисов и порядок передачи данных может быть уточнен в новой редакции Политики.",
        ],
      },
      {
        title: "9. Хранение и уничтожение данных",
        list: [
          "Обращения пользователей хранятся в течение срока, необходимого для ответа, последующей деловой коммуникации и защиты прав Оператора, если более длительный срок не требуется законом.",
          "Технические журналы и события безопасности хранятся в сроки, определяемые настройками хостинга, CMS, backend и сервисов безопасности.",
          "Данные подлежат удалению или обезличиванию при достижении целей обработки, отзыве согласия, утрате необходимости обработки или выявлении неправомерной обработки, если сохранение не требуется законодательством РФ.",
        ],
      },
      {
        title: "10. Меры защиты",
        list: [
          "Оператор принимает организационные и технические меры, направленные на защиту персональных данных от неправомерного доступа, уничтожения, изменения, блокирования, копирования, предоставления и распространения.",
          "Доступ к административной панели и служебным данным должен предоставляться только уполномоченным лицам с использованием учетных данных.",
          "При развитии backend-инфраструктуры должны применяться разграничение прав доступа, защита паролей, журналирование действий администратора, резервное копирование и контроль актуальности зависимостей.",
        ],
      },
      {
        title: "11. Права пользователя",
        list: [
          "Получать сведения об обработке своих персональных данных.",
          "Требовать уточнения, блокирования или уничтожения персональных данных, если они являются неполными, устаревшими, неточными, незаконно полученными или не являются необходимыми для заявленной цели обработки.",
          "Отозвать согласие на обработку персональных данных путем направления запроса на email Оператора.",
          "Обжаловать действия или бездействие Оператора в уполномоченный орган по защите прав субъектов персональных данных или в суд.",
        ],
      },
      {
        title: "12. Порядок направления запросов",
        paragraphs: [
          "Запросы по вопросам обработки персональных данных направляются на email: tektonikayur16@gmail.com. В запросе рекомендуется указать ФИО, контакт для ответа, суть требования и сведения, позволяющие идентифицировать обращение пользователя.",
          "Оператор вправе запросить дополнительную информацию для подтверждения связи запроса с конкретным обращением или данными, если это необходимо для защиты прав пользователя и предотвращения неправомерного доступа к сведениям.",
        ],
      },
      {
        title: "13. Изменение Политики",
        paragraphs: [
          "Оператор вправе изменять Политику при изменении функциональности сайта, законодательства, состава используемых сервисов, backend-инфраструктуры или внутренних процедур обработки данных.",
          "Новая редакция вступает в силу с момента размещения на сайте, если иной срок не указан в самой редакции.",
        ],
      },
    ],
    linksTitle: "Нормативная база",
    links: [
      { label: "Конституция РФ, статья 24", href: "https://www.consultant.ru/document/cons_doc_LAW_28399/bcddbd9060e44ed6085b65a1af0fb90aa3ef0175/" },
      { label: "Федеральный закон № 152-ФЗ «О персональных данных»", href: "https://www.consultant.ru/document/cons_doc_LAW_61801/" },
      { label: "Федеральный закон № 149-ФЗ «Об информации...»", href: "https://www.consultant.ru/document/cons_doc_LAW_61798/" },
      { label: "Рекомендации Роскомнадзора по политике оператора", href: "https://rkn.gov.ru/personal-data/p908/" },
    ],
  },
  en: {
    lead:
      "This Privacy and Personal Data Processing Policy explains how TEKTONIKA LLC processes website user data, including contact forms, browser technical data, cookies/localStorage and other information provided through the website.",
    updated: "Version dated 07.06.2026",
    intro:
      "If a user does not accept this Policy, they should stop using the website and not submit forms. Submitting a form, selecting a language, confirming the privacy notice or continuing to use the website means that the user has reviewed this Policy in the relevant part.",
    quickTitle: "Key points",
    quick: [
      { label: "Operator", value: "TEKTONIKA LLC, INN 2700023021, OGRN 1232700019860" },
      { label: "Address", value: "Office 326, 65 Kim Yu Chen St., Khabarovsk, Russia, 680000" },
      { label: "Contact", value: "tektonikayur16@gmail.com" },
      { label: "Data", value: "Name, email, subject, message, browser data, interface settings" },
      { label: "Purposes", value: "Request handling, communication, website operation, security and administration" },
      { label: "Storage", value: "Until purposes are achieved, consent is withdrawn or mandatory retention periods expire" },
    ],
    sections: [
      {
        title: "1. Operator and scope",
        paragraphs: [
          "The personal data operator is TEKTONIKA LLC. This Policy applies to the public website, contact forms, technical logs, local interface settings and CMS-related website administration.",
          "The website is informational and is intended for presenting the company, services, projects, research activity, vacancies and contacts.",
        ],
      },
      {
        title: "2. Data categories",
        list: [
          "Data provided by the user: name, email, subject, message text and other information voluntarily included in a request.",
          "Technical data: IP address, browser and device information, date and time of visit, pages viewed, referrer, error and security events if recorded by hosting, backend, CMS or message delivery services.",
          "Local interface settings: selected language, privacy notice status, cookies/localStorage identifiers required for website operation.",
          "CMS administrator data: login, administrative actions and authorization logs where applicable.",
        ],
      },
      {
        title: "3. Purposes and legal basis",
        list: [
          "Receiving, registering and processing requests.",
          "Preparing a response and discussing the region, scope and format of potential cooperation.",
          "Ensuring website functionality, security, language selection and notice status.",
          "Complying with applicable law and protecting the legitimate interests of the operator.",
        ],
      },
      {
        title: "4. Cookies and localStorage",
        paragraphs: [
          "The website may use cookies, localStorage and similar technologies to store language settings, privacy notice status and technical interface parameters.",
          "The user may restrict cookies in the browser; some website functions may then work incorrectly.",
        ],
      },
      {
        title: "5. Third parties and transfers",
        paragraphs: [
          "The operator does not sell user personal data. Data may be transferred to hosting, email, technical support, message delivery and website maintenance providers where necessary for website operation or request processing.",
          "The current contact form may use EmailJS for message delivery. The transferred scope is limited to the form contents and technical data required to send the message.",
          "If service infrastructure is located outside Russia, such processing may involve cross-border transfer within the limits necessary for the relevant service.",
        ],
      },
      {
        title: "6. Retention and protection",
        paragraphs: [
          "Data is stored until processing purposes are achieved, consent is withdrawn or mandatory legal retention periods expire.",
          "The operator applies organizational and technical measures to protect data from unauthorized access, alteration, disclosure or destruction.",
        ],
      },
      {
        title: "7. User rights",
        list: [
          "Request information about personal data processing.",
          "Request correction, blocking or deletion of inaccurate, outdated, excessive or unlawfully processed data.",
          "Withdraw consent by contacting the operator at tektonikayur16@gmail.com.",
          "Submit a complaint to a competent authority or court.",
        ],
      },
      {
        title: "8. Updates",
        paragraphs: [
          "The operator may update this Policy when website functionality, service providers, backend infrastructure or applicable law changes. The new version applies from publication unless otherwise stated.",
        ],
      },
    ],
    linksTitle: "Legal references",
    links: [
      { label: "Article 24 of the Constitution of the Russian Federation", href: "https://www.consultant.ru/document/cons_doc_LAW_28399/bcddbd9060e44ed6085b65a1af0fb90aa3ef0175/" },
      { label: "Federal Law No. 152-FZ on Personal Data", href: "https://www.consultant.ru/document/cons_doc_LAW_61801/" },
      { label: "Federal Law No. 149-FZ on Information", href: "https://www.consultant.ru/document/cons_doc_LAW_61798/" },
    ],
  },
  zh: {
    lead:
      "本隐私和个人数据处理政策说明 TEKTONIKA 如何处理网站用户数据，包括联系表单、浏览器技术数据、cookies/localStorage 以及用户通过网站提供的其他信息。",
    updated: "版本日期：07.06.2026",
    intro:
      "如果用户不同意本政策，应停止使用网站并不要提交表单。提交表单、选择语言、确认隐私通知或继续使用网站，即表示用户已了解本政策的相关内容。",
    quickTitle: "主要信息",
    quick: [
      { label: "运营者", value: "TEKTONIKA LLC, INN 2700023021, OGRN 1232700019860" },
      { label: "地址", value: "俄罗斯哈巴罗夫斯克市 Kim Yu Chen 街65号326室，680000" },
      { label: "联系", value: "tektonikayur16@gmail.com" },
      { label: "数据", value: "姓名、邮箱、主题、消息、浏览器技术数据、界面设置" },
      { label: "目的", value: "处理请求、联系用户、网站运行、安全与管理" },
      { label: "期限", value: "直到目的实现、同意撤回或法定保存期限届满" },
    ],
    sections: [
      {
        title: "1. 运营者和适用范围",
        paragraphs: [
          "个人数据运营者为 TEKTONIKA LLC。本政策适用于公司网站、联系表单、技术日志、本地界面设置以及 CMS 管理相关流程。",
          "网站用于展示公司、服务、项目、科研活动、招聘和联系方式。",
        ],
      },
      {
        title: "2. 数据类别",
        list: [
          "用户提供的数据：姓名、邮箱、主题、消息文本以及用户自愿在请求中提供的其他信息。",
          "技术数据：IP 地址、浏览器和设备信息、访问时间、页面、来源、错误和安全事件。",
          "本地设置：语言、隐私通知状态、网站运行所需的 cookies/localStorage 标识符。",
          "CMS 管理员数据：登录名、管理操作和授权日志（如适用）。",
        ],
      },
      {
        title: "3. 处理目的和依据",
        list: [
          "接收、登记和处理用户请求。",
          "准备回复并讨论合作地区、服务范围和沟通方式。",
          "保障网站运行、安全、语言设置和通知状态。",
          "遵守适用法律并保护运营者合法权益。",
        ],
      },
      {
        title: "4. Cookies 和 localStorage",
        paragraphs: [
          "网站可使用 cookies、localStorage 和类似技术保存语言、隐私通知状态和界面技术参数。",
          "用户可以在浏览器中限制 cookies，但部分功能可能无法正常工作。",
        ],
      },
      {
        title: "5. 第三方和传输",
        paragraphs: [
          "运营者不会出售用户个人数据。为网站运行、发送消息、技术支持或处理请求所必需时，数据可传输给服务提供商。",
          "当前联系表单可能使用 EmailJS 发送消息，传输范围限于表单内容和发送所需的技术数据。如服务基础设施位于俄罗斯境外，可能涉及跨境传输。",
        ],
      },
      {
        title: "6. 保存、保护和用户权利",
        list: [
          "数据保存至处理目的实现、同意撤回或法定保存期限届满。",
          "运营者采取组织和技术措施保护数据。",
          "用户可请求访问、更正、删除、限制处理或撤回同意，并可通过 email 联系运营者。",
        ],
      },
    ],
    linksTitle: "法律依据",
    links: [
      { label: "俄罗斯联邦宪法第24条", href: "https://www.consultant.ru/document/cons_doc_LAW_28399/bcddbd9060e44ed6085b65a1af0fb90aa3ef0175/" },
      { label: "第152-FZ号《个人数据法》", href: "https://www.consultant.ru/document/cons_doc_LAW_61801/" },
      { label: "第149-FZ号《信息法》", href: "https://www.consultant.ru/document/cons_doc_LAW_61798/" },
    ],
  },
};

function Section({ section }: { section: LegalSection }) {
  return (
    <article className="border-b border-slate-200 pb-8">
      <h2 className="text-2xl font-extrabold leading-tight text-slate-950">{section.title}</h2>
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="mt-4 text-base leading-8 text-slate-700">
          {paragraph}
        </p>
      ))}
      {section.list && (
        <ul className="mt-4 grid gap-3 text-base leading-7 text-slate-700">
          {section.list.map((item) => (
            <li key={item} className="border-l-2 border-[#0b4fa3] pl-4">
              {item}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default function Privacy() {
  const { lang, t } = useI18n();
  const copy = privacyCopy[lang];

  return (
    <Layout>
      <section className="technical-surface text-white">
        <div className="site-container py-16 md:py-24">
          <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#93c5fd]">{copy.updated}</p>
          <h1 className="mt-4 text-4xl font-extrabold md:text-6xl">{t.legal.privacyTitle}</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-200">{copy.lead}</p>
        </div>
      </section>

      <section className="section-band bg-white">
        <div className="site-container grid gap-10 lg:grid-cols-[360px_1fr]">
          <aside className="h-fit border border-slate-200 bg-slate-50 p-6 lg:sticky lg:top-40">
            <h2 className="text-xl font-extrabold text-slate-950">{copy.quickTitle}</h2>
            <div className="mt-5 grid gap-4">
              {copy.quick.map((item) => (
                <div key={item.label} className="border-b border-slate-200 pb-4">
                  <div className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#0b4fa3]">{item.label}</div>
                  <div className="mt-2 text-sm font-semibold leading-6 text-slate-700">{item.value}</div>
                </div>
              ))}
            </div>
            <h3 className="mt-7 text-sm font-extrabold uppercase tracking-[0.14em] text-slate-500">{copy.linksTitle}</h3>
            <div className="mt-3 grid gap-2">
              {copy.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="text-sm font-bold leading-6 text-[#0b4fa3] hover:text-[#d71920]">
                  {link.label}
                </a>
              ))}
            </div>
          </aside>

          <div>
            <div className="mb-10 border-l-4 border-[#d71920] bg-slate-50 p-6 text-lg font-semibold leading-8 text-slate-800">
              {copy.intro}
            </div>
            <div className="grid gap-8">
              {copy.sections.map((section) => (
                <Section key={section.title} section={section} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
