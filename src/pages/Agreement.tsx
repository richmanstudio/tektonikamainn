import Layout from "../layouts/MainLayout";
import { useI18n } from "../i18n";

const sections = {
  ru: [
    ["1. Предмет соглашения", "Сайт предоставляет пользователю информационные материалы о компании, услугах, проектах, вакансиях и контактах."],
    ["2. Использование сайта", "Пользователь обязуется использовать сайт законно, не нарушать работу интерфейса и не отправлять вредоносные данные через формы."],
    ["3. Контент", "Материалы сайта носят информационный характер. Коммерческие условия уточняются индивидуально при обращении в компанию."],
    ["4. Обратная связь", "При отправке формы пользователь подтверждает корректность предоставленных контактных данных."],
    ["5. Изменения", "Администрация может обновлять сайт, структуру страниц и условия использования без предварительного уведомления."],
  ],
  en: [
    ["1. Subject", "The website provides information about the company, services, projects, vacancies and contacts."],
    ["2. Website use", "The user agrees to use the website lawfully, not disrupt the interface and not send malicious data through forms."],
    ["3. Content", "Website materials are informational. Commercial terms are clarified individually when contacting the company."],
    ["4. Feedback", "By sending a form, the user confirms that the provided contact data is correct."],
    ["5. Changes", "The administration may update the website, page structure and terms of use without prior notice."],
  ],
  zh: [
    ["1. 协议内容", "网站提供关于公司、服务、项目、职位和联系方式的信息。"],
    ["2. 网站使用", "用户同意合法使用网站，不干扰界面运行，不通过表单发送恶意数据。"],
    ["3. 内容", "网站材料仅供参考。商务条件将在联系公司时单独确认。"],
    ["4. 反馈", "提交表单即表示用户确认所提供的联系方式正确。"],
    ["5. 变更", "管理方可在不提前通知的情况下更新网站、页面结构和使用条款。"],
  ],
};

export default function Agreement() {
  const { lang, t } = useI18n();

  return (
    <Layout>
      <section className="technical-surface text-white">
        <div className="site-container py-16 md:py-24">
          <h1 className="text-4xl font-extrabold md:text-6xl">{t.legal.agreementTitle}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{t.legal.agreementText}</p>
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
