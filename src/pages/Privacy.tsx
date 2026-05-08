import Layout from "../layouts/MainLayout";
import { useI18n } from "../i18n";

const sections = {
  ru: [
    ["1. Общие положения", "Политика описывает, какие данные сайт может собирать, как они используются и защищаются."],
    ["2. Сбор данных", "Персональные данные передаются пользователем добровольно при заполнении форм. Технические данные могут фиксироваться автоматически."],
    ["3. Цели обработки", "Данные используются для обработки обращений, подготовки ответа, улучшения качества сайта и связи с пользователем."],
    ["4. Передача третьим лицам", "Данные не передаются третьим лицам, кроме случаев, предусмотренных законом или необходимых для обработки обращения."],
    ["5. Cookies", "Сайт может использовать cookies для корректной работы интерфейса и аналитики посещений."],
    ["6. Права пользователя", "Пользователь может запросить сведения о своих данных, исправление, удаление или отзыв согласия на обработку."],
  ],
  en: [
    ["1. General provisions", "This policy explains what data the website may collect, how it is used and protected."],
    ["2. Data collection", "Personal data is provided voluntarily through forms. Technical data may be collected automatically."],
    ["3. Processing purposes", "Data is used to process requests, prepare responses, improve the website and contact the user."],
    ["4. Third parties", "Data is not transferred to third parties except where required by law or necessary to process a request."],
    ["5. Cookies", "The website may use cookies for correct interface operation and visit analytics."],
    ["6. User rights", "The user may request information, correction, deletion or withdrawal of consent for processing."],
  ],
  zh: [
    ["1. 一般条款", "本政策说明网站可能收集哪些数据、如何使用和保护这些数据。"],
    ["2. 数据收集", "个人数据由用户在填写表单时自愿提供。技术数据可能自动收集。"],
    ["3. 处理目的", "数据用于处理请求、准备回复、改进网站并与用户联系。"],
    ["4. 第三方", "除法律要求或处理请求所必需的情况外，数据不会转交第三方。"],
    ["5. Cookies", "网站可能使用 cookies 以保证界面正常工作并进行访问分析。"],
    ["6. 用户权利", "用户可以请求查询、更正、删除数据或撤回处理同意。"],
  ],
};

export default function Privacy() {
  const { lang, t } = useI18n();

  return (
    <Layout>
      <section className="technical-surface text-white">
        <div className="site-container py-16 md:py-24">
          <h1 className="text-4xl font-extrabold md:text-6xl">{t.legal.privacyTitle}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{t.legal.privacyText}</p>
        </div>
      </section>

      <section className="section-band bg-white">
        <div className="site-container max-w-4xl">
          <div className="grid gap-8">
            {sections[lang].map(([title, text]) => (
              <article key={title} className="border-b border-slate-200 pb-6">
                <h2 className="text-2xl font-extrabold text-slate-950">{title}</h2>
                <p className="mt-3 text-lg leading-8 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
