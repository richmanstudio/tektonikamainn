import ru from "./ru";
import en from "./en";
import type { Dictionary } from "../types";

const zh: Dictionary = {
  ...en,
  langLabel: "中文",
  common: { ...en.common, all: "全部", readMore: "了解更多", contact: "联系我们", discuss: "洽谈合作", shown: "显示", back: "返回", home: "返回首页", search: "搜索", searchPlaceholder: "搜索服务、项目、文章或页面", noResults: "未找到结果" },
  company: { ...en.company, name: "TEKTONIKA 有限责任公司", city: "哈巴罗夫斯克", address: "俄罗斯哈巴罗夫斯克市 Kim Yu Chen 街65号326室，680000", description: "面向地下资源勘查的地质与地球物理调查、野外作业、无人机、测绘和室内处理。" },
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
  servicePage: { ...en.servicePage, title: "TEKTONIKA 服务", text: "地质与地球物理调查完整周期：从野外路线和测量到解释、三维模型和报告。" },
  projects: { ...en.projects, title: "项目", text: "公司项目和团队项目分开展示。页眉链接可直接打开相应类型和地区筛选。", company: "公司项目", team: "团队项目", regions: "地区", years: "年份", count: "项目数量" },
  research: { ...en.research, title: "科研活动", text: "关于方法、数据解释、无人机和实验室测量的应用文章流。", articlesTitle: "科研文章", read: "阅读文章" },
  media: { ...en.media, title: "媒体", photos: "照片", emptyTitle: "相册待更新" },
  careers: { ...en.careers, title: "招聘", search: "职位搜索", placeholder: "例如：厨师", howTitle: "如何申请" },
  contacts: { ...en.contacts, title: "联系方式", address: "地址", phone: "电话", sendTitle: "发送消息", name: "姓名", subject: "主题", message: "消息", sending: "发送中...", send: "发送消息" },
  about: { ...en.about, title: "关于 TEKTONIKA", legal: "法律信息", address: "地址" },
  footer: { ...en.footer, navigation: "导航", contacts: "联系方式", rights: "版权所有。", privacy: "隐私政策", agreement: "用户协议" },
  admin: { ...en.admin, title: "管理面板", loginTitle: "编辑登录", login: "登录名", password: "密码", enter: "登录", wrong: "登录名或密码错误", exit: "退出", draftTitle: "内容草稿", save: "保存草稿" },
  legal: { privacyTitle: "隐私政策", privacyText: "我们重视保护您的个人数据。", agreementTitle: "用户协议", agreementText: "本协议规定用户与 TEKTONIKA 之间的关系。" },
  notFound: { title: "页面未找到", text: "请求的页面不存在或已移动。" },
};

export default zh;
