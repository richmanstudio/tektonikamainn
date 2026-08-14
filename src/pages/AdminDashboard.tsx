import { Database, LockKeyhole, LogOut, Plus, RefreshCw, Save, ShieldCheck, Trash2 } from "lucide-react";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import type { CmsCollection, CmsEntry, CmsLanguage, CmsStatus } from "../content/cmsTypes";
import { useI18n } from "../i18n";
import api from "../utils/api";

type Payload = Record<string, unknown>;

type FormState = {
  id?: number;
  collection: CmsCollection;
  slug: string;
  language: CmsLanguage;
  title: string;
  status: CmsStatus;
  sort_order: number;
  payload: Payload;
};

const collections: CmsCollection[] = ["projects", "research", "vacancies", "services", "pages", "media"];
const languages: CmsLanguage[] = ["ru", "en", "zh"];

const payloadDefaults: Record<CmsCollection, Payload> = {
  projects: { client: "", region: "", year: new Date().getFullYear(), type: "Проекты компании", scope: "", result: "", technologies: [] },
  research: { date: "", tag: "", excerpt: "", author: "", body: "", sourceUrl: "", pdfUrl: "" },
  vacancies: { location: "", salary: "", type: "", description: "", requirements: [] },
  services: { description: "", accent: "blue", items: [] },
  pages: { text: "", eyebrow: "", ctaLabel: "", ctaHref: "" },
  media: { image: "", caption: "", year: String(new Date().getFullYear()) },
};

function makeEmptyForm(collection: CmsCollection = "research"): FormState {
  return {
    collection,
    slug: "",
    language: "ru",
    title: "",
    status: "published",
    sort_order: 100,
    payload: structuredClone(payloadDefaults[collection]),
  };
}

export default function AdminDashboard() {
  const { t } = useI18n();
  const [token, setToken] = useState(() => sessionStorage.getItem("tektonika-admin-token") || "");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [entries, setEntries] = useState<CmsEntry[]>([]);
  const [form, setForm] = useState<FormState>(() => makeEmptyForm());
  const [filterCollection, setFilterCollection] = useState<"all" | CmsCollection>("all");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const authenticated = Boolean(token);

  const authHeaders = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);

  const loadEntries = async () => {
    if (!token) return;
    setError("");
    try {
      const response = await api.get<CmsEntry[]>("/cms/entries", { headers: authHeaders });
      setEntries(response.data);
    } catch (requestError: any) {
      if (requestError?.response?.status === 401) logout();
      setError("API недоступен или токен устарел. Проверь backend и авторизацию.");
    }
  };

  useEffect(() => {
    void loadEntries();
  }, [token]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    try {
      const response = await api.post<{ token: string; expires_in: number }>("/auth/login", { username: login, password });
      sessionStorage.setItem("tektonika-admin-token", response.data.token);
      setToken(response.data.token);
      setPassword("");
    } catch (requestError: any) {
      const retry = requestError?.response?.headers?.["retry-after"];
      setError(requestError?.response?.status === 429 ? `Слишком много попыток входа. Повторите через ${retry || "несколько"} секунд.` : t.admin.wrong);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("tektonika-admin-token");
    setToken("");
    setEntries([]);
  };

  const initDatabase = async () => {
    setError("");
    setMessage("");
    try {
      await api.post("/admin/init-db", {}, { headers: authHeaders });
      setMessage("Структура MySQL проверена и готова.");
    } catch {
      setError("Не удалось инициализировать базу. Проверь .env backend и права MySQL.");
    }
  };

  const selectEntry = (entry: CmsEntry) => {
    setForm({
      id: entry.id,
      collection: entry.collection,
      slug: entry.slug,
      language: entry.language,
      title: entry.title,
      status: entry.status,
      sort_order: entry.sort_order,
      payload: entry.payload,
    });
  };

  const resetForm = (collection: CmsCollection = form.collection) => setForm(makeEmptyForm(collection));

  const changeCollection = (collection: CmsCollection) => {
    setForm((previous) => ({ ...makeEmptyForm(collection), language: previous.language }));
  };

  const updatePayload = (key: string, value: unknown) => {
    setForm((previous) => ({ ...previous, payload: { ...previous.payload, [key]: value } }));
  };

  const saveEntry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");
    const data = { ...form, id: undefined, sort_order: Number(form.sort_order) };
    try {
      if (form.id) {
        await api.put(`/cms/entries/${form.id}`, data, { headers: authHeaders });
        setMessage("Запись обновлена.");
      } else {
        await api.post("/cms/entries", data, { headers: authHeaders });
        setMessage("Запись создана.");
      }
      resetForm();
      await loadEntries();
    } catch (requestError: any) {
      const detail = requestError?.response?.data?.detail;
      setError(typeof detail === "string" ? detail : "Не удалось сохранить запись. Проверь обязательные поля и соединение с API.");
    }
  };

  const deleteEntry = async (entry: CmsEntry) => {
    if (!window.confirm(`Удалить «${entry.title}»?`)) return;
    setError("");
    setMessage("");
    try {
      await api.delete(`/cms/entries/${entry.id}`, { headers: authHeaders });
      setMessage("Запись удалена.");
      await loadEntries();
      if (form.id === entry.id) resetForm();
    } catch {
      setError("Не удалось удалить запись.");
    }
  };

  const visibleEntries = useMemo(
    () => entries.filter((entry) => filterCollection === "all" || entry.collection === filterCollection),
    [filterCollection, entries]
  );

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
        <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl items-center gap-10 lg:grid-cols-[1fr_480px]">
          <div>
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center bg-[#0b4fa3]" aria-hidden="true"><LockKeyhole className="h-7 w-7" /></div>
            <h1 className="max-w-2xl text-5xl font-extrabold leading-tight md:text-7xl">{t.admin.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Закрытая CMS для проектов, услуг, исследований, вакансий, страниц и медиа.</p>
          </div>
          <form onSubmit={handleLogin} className="bg-white p-8 text-slate-950 shadow-2xl">
            <h2 className="text-3xl font-extrabold">{t.admin.loginTitle}</h2>
            <div className="mt-8 grid gap-4">
              <Field label={t.admin.login} htmlFor="admin-login"><input id="admin-login" value={login} onChange={(event) => setLogin(event.target.value)} autoComplete="username" required className="form-control" /></Field>
              <Field label={t.admin.password} htmlFor="admin-password"><input id="admin-password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required minLength={8} type="password" className="form-control" /></Field>
              {error && <div role="alert" className="border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</div>}
              <button type="submit" className="btn-primary"><ShieldCheck className="h-4 w-4" aria-hidden="true" />{t.admin.enter}</button>
            </div>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="site-container flex flex-col gap-5 py-6 md:flex-row md:items-center md:justify-between">
          <div><div className="text-sm font-bold uppercase tracking-[0.16em] text-[#0b4fa3]">TEKTONIKA CMS</div><h1 className="mt-2 text-3xl font-extrabold">{t.admin.title}</h1></div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={initDatabase} className="btn-secondary"><Database className="h-4 w-4" aria-hidden="true" />Init DB</button>
            <button type="button" onClick={() => void loadEntries()} className="btn-secondary"><RefreshCw className="h-4 w-4" aria-hidden="true" />Обновить</button>
            <button type="button" onClick={logout} className="btn-secondary"><LogOut className="h-4 w-4" aria-hidden="true" />{t.admin.exit}</button>
          </div>
        </div>
      </header>

      <section className="site-container grid gap-6 py-10 xl:grid-cols-[0.88fr_1.12fr]">
        <div className="grid content-start gap-5">
          <div aria-live="polite">{(message || error) && <div className={`border p-4 text-sm font-semibold ${error ? "border-red-200 bg-red-50 text-red-700" : "border-green-200 bg-green-50 text-green-700"}`}>{error || message}</div>}</div>
          <div className="bg-white p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-extrabold">Контент</h2>
              <select aria-label="Фильтр коллекции" value={filterCollection} onChange={(event) => setFilterCollection(event.target.value as "all" | CmsCollection)} className="form-control max-w-56">
                <option value="all">all</option>{collections.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
            <div className="grid max-h-[70vh] gap-3 overflow-y-auto pr-1">
              {visibleEntries.map((entry) => (
                <article key={entry.id} className="border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <button type="button" onClick={() => selectEntry(entry)} className="min-w-0 flex-1 text-left focus-visible:outline-offset-4">
                      <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#0b4fa3]">{entry.collection} · {entry.language} · {entry.status}</div>
                      <h3 className="mt-2 text-lg font-extrabold">{entry.title}</h3>
                      <p className="mt-1 truncate text-sm text-slate-500">{entry.slug}</p>
                    </button>
                    <button type="button" onClick={() => void deleteEntry(entry)} className="shrink-0 p-2 text-red-700 hover:bg-red-50" aria-label={`Удалить ${entry.title}`}><Trash2 className="h-5 w-5" /></button>
                  </div>
                </article>
              ))}
              {!visibleEntries.length && <div className="border border-slate-200 p-8 text-center text-slate-500">Записей пока нет.</div>}
            </div>
          </div>
        </div>

        <form onSubmit={saveEntry} className="bg-white p-6">
          <div className="mb-6 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-extrabold">{form.id ? "Редактирование записи" : "Новая запись"}</h2>
            <button type="button" onClick={() => resetForm()} className="btn-secondary"><Plus className="h-4 w-4" aria-hidden="true" />Новая</button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Collection" htmlFor="cms-collection"><select id="cms-collection" value={form.collection} onChange={(event) => changeCollection(event.target.value as CmsCollection)} className="form-control">{collections.map((item) => <option key={item} value={item}>{item}</option>)}</select></Field>
            <Field label="Slug" htmlFor="cms-slug"><input id="cms-slug" value={form.slug} onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") }))} required pattern="[a-z0-9][a-z0-9-]*" className="form-control" /></Field>
            <Field label="Language" htmlFor="cms-language"><select id="cms-language" value={form.language} onChange={(event) => setForm((prev) => ({ ...prev, language: event.target.value as CmsLanguage }))} className="form-control">{languages.map((item) => <option key={item} value={item}>{item}</option>)}</select></Field>
            <Field label="Sort order" htmlFor="cms-sort"><input id="cms-sort" type="number" min={0} value={form.sort_order} onChange={(event) => setForm((prev) => ({ ...prev, sort_order: Number(event.target.value) }))} className="form-control" /></Field>
            <Field label="Status" htmlFor="cms-status"><select id="cms-status" value={form.status} onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value as CmsStatus }))} className="form-control"><option value="published">published</option><option value="draft">draft</option></select></Field>
            <Field label="Title" htmlFor="cms-title"><input id="cms-title" value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} required className="form-control" /></Field>
          </div>

          <div className="mt-7 border-t border-slate-200 pt-7">
            <h3 className="mb-5 text-xl font-extrabold">Поля {form.collection}</h3>
            <PayloadEditor collection={form.collection} payload={form.payload} update={updatePayload} />
          </div>

          <details className="mt-6 border border-slate-200 bg-slate-50 p-4">
            <summary className="cursor-pointer font-bold">Advanced JSON preview</summary>
            <pre className="mt-4 max-h-72 overflow-auto whitespace-pre-wrap text-xs text-slate-600">{JSON.stringify(form.payload, null, 2)}</pre>
          </details>

          <button type="submit" className="btn-primary mt-6"><Save className="h-4 w-4" aria-hidden="true" />{form.id ? "Сохранить изменения" : "Создать запись"}</button>
        </form>
      </section>
    </main>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return <label htmlFor={htmlFor} className="grid gap-2"><span className="text-sm font-bold text-slate-600">{label}</span>{children}</label>;
}

function PayloadEditor({ collection, payload, update }: { collection: CmsCollection; payload: Payload; update: (key: string, value: unknown) => void }) {
  const text = (key: string) => String(payload[key] ?? "");
  const lines = (key: string) => Array.isArray(payload[key]) ? (payload[key] as unknown[]).join("\n") : "";
  const LineField = ({ field, label }: { field: string; label: string }) => <Field label={label} htmlFor={`payload-${field}`}><input id={`payload-${field}`} value={text(field)} onChange={(event) => update(field, event.target.value)} className="form-control" /></Field>;
  const TextAreaField = ({ field, label, list = false }: { field: string; label: string; list?: boolean }) => <Field label={label} htmlFor={`payload-${field}`}><textarea id={`payload-${field}`} rows={list ? 5 : 7} value={list ? lines(field) : text(field)} onChange={(event) => update(field, list ? event.target.value.split("\n").map((item) => item.trim()).filter(Boolean) : event.target.value)} className="form-control resize-y" /></Field>;

  if (collection === "projects") return <div className="grid gap-4 md:grid-cols-2"><LineField field="client" label="Заказчик" /><LineField field="region" label="Регион" /><Field label="Год" htmlFor="payload-year"><input id="payload-year" type="number" value={Number(payload.year || new Date().getFullYear())} onChange={(event) => update("year", Number(event.target.value))} className="form-control" /></Field><LineField field="type" label="Тип проекта" /><div className="md:col-span-2"><TextAreaField field="scope" label="Состав работ" /></div><div className="md:col-span-2"><TextAreaField field="result" label="Результат" /></div><div className="md:col-span-2"><TextAreaField field="technologies" label="Технологии — по одной на строку" list /></div></div>;
  if (collection === "research") return <div className="grid gap-4 md:grid-cols-2"><LineField field="date" label="Дата" /><LineField field="tag" label="Тег" /><LineField field="author" label="Автор" /><LineField field="sourceUrl" label="Источник URL" /><LineField field="pdfUrl" label="PDF URL" /><div className="md:col-span-2"><TextAreaField field="excerpt" label="Краткое описание" /></div><div className="md:col-span-2"><TextAreaField field="body" label="Текст" /></div></div>;
  if (collection === "vacancies") return <div className="grid gap-4 md:grid-cols-2"><LineField field="location" label="Локация" /><LineField field="salary" label="Оплата" /><LineField field="type" label="Тип занятости" /><div className="md:col-span-2"><TextAreaField field="description" label="Описание" /></div><div className="md:col-span-2"><TextAreaField field="requirements" label="Требования — по одному на строку" list /></div></div>;
  if (collection === "services") return <div className="grid gap-4 md:grid-cols-2"><LineField field="accent" label="Accent: blue/red/yellow/gray/green" /><div className="md:col-span-2"><TextAreaField field="description" label="Описание" /></div><div className="md:col-span-2"><TextAreaField field="items" label="Работы — по одной на строку" list /></div></div>;
  if (collection === "pages") return <div className="grid gap-4 md:grid-cols-2"><LineField field="eyebrow" label="Eyebrow" /><LineField field="ctaLabel" label="CTA label" /><LineField field="ctaHref" label="CTA URL" /><div className="md:col-span-2"><TextAreaField field="text" label="Текст блока" /></div></div>;
  return <div className="grid gap-4 md:grid-cols-2"><LineField field="image" label="Image URL" /><LineField field="year" label="Год" /><div className="md:col-span-2"><TextAreaField field="caption" label="Подпись / описание" /></div></div>;
}
