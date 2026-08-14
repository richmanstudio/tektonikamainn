export type CmsLanguage = "ru" | "en" | "zh";
export type CmsCollection = "projects" | "research" | "vacancies" | "services" | "pages" | "media";
export type CmsStatus = "draft" | "published";

export type CmsEntry<TPayload extends Record<string, unknown> = Record<string, unknown>> = {
  id: number;
  collection: CmsCollection;
  slug: string;
  language: CmsLanguage;
  title: string;
  payload: TPayload;
  status: CmsStatus;
  sort_order: number;
};

export type CmsService = {
  slug: string;
  title: string;
  description: string;
  items: string[];
  accent: string;
};

export type CmsPageBlock = {
  slug: string;
  title: string;
  text: string;
  eyebrow?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type CmsMediaItem = {
  slug: string;
  title: string;
  image?: string;
  caption?: string;
  year?: string;
};
