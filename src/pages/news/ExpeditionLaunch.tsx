import React from 'react';
import Layout from '../../layouts/MainLayout';
import hero from '../../assets/abouthero-bg.jpg';
import { useI18n } from '../../i18n';

const ARTICLE = {
  title: 'Открытие нашего портала!',
  date: '01.07.2025',
  hero,
  paragraphs: [
    'Мы рады представить обновлённый корпоративный сайт компании «Тектоника». На нём собрана вся информация об услугах, реализованных проектах и нашей научной деятельности.',
    'Запуская портал, мы стремились сделать его максимально удобным для заказчиков. Теперь вы можете быстро получить сведения о наших компетенциях и оставить заявку на консультацию прямо на сайте.',
    'Сайт будет регулярно пополняться новыми материалами. Следите за обновлениями и присоединяйтесь к нам в путешествии по миру геофизики.',
  ],
} as const;

export default function ExpeditionLaunch() {
  const { lang } = useI18n();
  const article = lang === "en"
    ? {
        title: "Launch of the renewed portal",
        date: ARTICLE.date,
        hero: ARTICLE.hero,
        paragraphs: [
          "We are pleased to present the renewed corporate website of TEKTONIKA. It brings together information about services, completed projects and research activity.",
          "The portal is designed to be useful for customers: competencies are easier to find, and a consultation request can be sent directly from the website.",
          "The website will be updated with new materials. Follow the updates and join us in the world of geophysics.",
        ],
      }
    : lang === "zh"
      ? {
          title: "新版门户上线",
          date: ARTICLE.date,
          hero: ARTICLE.hero,
          paragraphs: [
            "我们很高兴介绍 TEKTONIKA 公司新版网站。网站汇集了服务、已完成项目和科研活动的信息。",
            "该门户旨在方便客户快速了解我们的能力，并可直接在网站上提交咨询请求。",
            "网站将持续更新新材料。请关注更新，与我们一起进入地球物理的世界。",
          ],
        }
      : ARTICLE;

  return (
    <Layout>
      <section className="relative overflow-hidden rounded-lg shadow mb-10">
        <img src={article.hero} alt={article.title} className="w-full h-96 object-cover" />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{article.title}</h1>
          <p className="text-sm">{article.date}</p>
        </div>
      </section>
      <section className="container mx-auto px-4 pb-16">
        {article.paragraphs.map((text, idx) => (
          <p key={idx} className="text-lg leading-relaxed mb-4">
            {text}
          </p>
        ))}
      </section>
    </Layout>
  );
}
