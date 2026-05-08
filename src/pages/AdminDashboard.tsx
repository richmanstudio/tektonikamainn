import { Database, LockKeyhole, LogOut, Plus, RefreshCw, Save, ShieldCheck, Trash2 } from "lucide-react";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import { useI18n } from "../i18n";
import api from "../utils/api";

type CmsEntry = {
  id: number;
  collection: string;
  slug: string;
  language: string;
  title: string;
  payload: Record<string, any>;
  status: "draft" | "published";
  sort_order: number;
};

type FormState = {
  id?: number;
  collection: string;
  slug: string;
  language: string;
  title: string;
  status: "draft" | "published";
  sort_order: number;
  payloadText: string;
};

const emptyForm: FormState = {
  collection: "research",
  slug: "",
  language: "ru",
  title: "",
  status: "published",
  sort_order: 100,
  payloadText: "{\n  \"excerpt\": \"\",\n  \"date\": \"\",\n  \"tag\": \"\"\n}",
};

export default function AdminDashboard() {
  const { t } = useI18n();
  const [token, setToken] = useState(() => sessionStorage.getItem("tektonika-admin-token") || "");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [entries, setEntries] = useState<CmsEntry[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [collection, setCollection] = useState("all");
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
    } catch {
      setError("API недоступен или токен устарел. Проверь backend и авторизацию.");
    }
  };

  useEffect(() => {
    loadEntries();
  }, [token]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    try {
      const response = await api.post<{ token: string }>("/auth/login", { username: login, password });
      sessionStorage.setItem("tektonika-admin-token", response.data.token);
      setToken(response.data.token);
      setPassword("");
    } catch {
      setError(t.admin.wrong);
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
      payloadText: JSON.stringify(entry.payload, null, 2),
    });
  };

  const resetForm = () => setForm(emptyForm);

  const saveEntry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");
    let payload: Record<string, any>;
    try {
      payload = JSON.parse(form.payloadText);
    } catch {
      setError("Payload должен быть валидным JSON.");
      return;
    }

    const data = {
      collection: form.collection,
      slug: form.slug,
      language: form.language,
      title: form.title,
      status: form.status,
      sort_order: Number(form.sort_order),
      payload,
    };

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
    } catch {
      setError("Не удалось сохранить запись. Проверь slug, JSON и соединение с API.");
    }
  };

  const deleteEntry = async (entry: CmsEntry) => {
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
    () => entries.filter((entry) => collection === "all" || entry.collection === collection),
    [collection, entries]
  );
  const collections = useMemo(() => ["all", ...Array.from(new Set(entries.map((entry) => entry.collection)))], [entries]);

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
        <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl items-center gap-10 lg:grid-cols-[1fr_480px]">
          <div>
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center bg-[#0b4fa3]">
              <LockKeyhole className="h-7 w-7" />
            </div>
            <h1 className="max-w-2xl text-5xl font-extrabold leading-tight md:text-7xl">{t.admin.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Рабочий вход через FastAPI. После авторизации панель управляет MySQL-записями, которые читает основной сайт.
            </p>
          </div>
          <form onSubmit={handleLogin} className="bg-white p-8 text-slate-950 shadow-2xl">
            <h2 className="text-3xl font-extrabold">{t.admin.loginTitle}</h2>
            <div className="mt-8 grid gap-4">
              <input value={login} onChange={(event) => setLogin(event.target.value)} placeholder={t.admin.login} className="border border-slate-300 px-4 py-3 outline-none focus:border-[#0b4fa3]" />
              <input value={password} onChange={(event) => setPassword(event.target.value)} placeholder={t.admin.password} type="password" className="border border-slate-300 px-4 py-3 outline-none focus:border-[#0b4fa3]" />
              {error && <div className="border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</div>}
              <button type="submit" className="btn-primary">
                <ShieldCheck className="h-4 w-4" />
                {t.admin.enter}
              </button>
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
          <div>
            <div className="text-sm font-bold uppercase tracking-[0.16em] text-[#0b4fa3]">TEKTONIKA CMS</div>
            <h1 className="mt-2 text-3xl font-extrabold">{t.admin.title}</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={initDatabase} className="inline-flex items-center gap-2 border border-slate-300 bg-white px-4 py-3 text-sm font-bold">
              <Database className="h-4 w-4" />
              Init DB
            </button>
            <button type="button" onClick={loadEntries} className="inline-flex items-center gap-2 border border-slate-300 bg-white px-4 py-3 text-sm font-bold">
              <RefreshCw className="h-4 w-4" />
              Обновить
            </button>
            <button type="button" onClick={logout} className="inline-flex items-center gap-2 border border-slate-300 bg-white px-4 py-3 text-sm font-bold">
              <LogOut className="h-4 w-4" />
              {t.admin.exit}
            </button>
          </div>
        </div>
      </header>

      <section className="site-container grid gap-6 py-10 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="grid content-start gap-5">
          {(message || error) && (
            <div className={`border p-4 text-sm font-semibold ${error ? "border-red-200 bg-red-50 text-red-700" : "border-green-200 bg-green-50 text-green-700"}`}>
              {error || message}
            </div>
          )}

          <div className="bg-white p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-extrabold">Контент</h2>
              <select value={collection} onChange={(event) => setCollection(event.target.value)} className="border border-slate-300 px-3 py-2 text-sm font-bold">
                {collections.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="grid max-h-[70vh] gap-3 overflow-y-auto">
              {visibleEntries.map((entry) => (
                <article key={entry.id} className="border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <button type="button" onClick={() => selectEntry(entry)} className="min-w-0 text-left">
                      <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#0b4fa3]">
                        {entry.collection} · {entry.language} · {entry.status}
                      </div>
                      <h3 className="mt-2 text-lg font-extrabold">{entry.title}</h3>
                      <p className="mt-1 truncate text-sm text-slate-500">{entry.slug}</p>
                    </button>
                    <button type="button" onClick={() => deleteEntry(entry)} className="shrink-0 p-2 text-red-600 hover:bg-red-50" aria-label="Удалить">
                      <Trash2 className="h-5 w-5" />
                    </button>
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
            <button type="button" onClick={resetForm} className="inline-flex items-center gap-2 border border-slate-300 px-3 py-2 text-sm font-bold">
              <Plus className="h-4 w-4" />
              Новая
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Collection" value={form.collection} onChange={(value) => setForm((prev) => ({ ...prev, collection: value }))} />
            <Input label="Slug" value={form.slug} onChange={(value) => setForm((prev) => ({ ...prev, slug: value }))} />
            <Input label="Language" value={form.language} onChange={(value) => setForm((prev) => ({ ...prev, language: value }))} />
            <Input label="Sort order" type="number" value={String(form.sort_order)} onChange={(value) => setForm((prev) => ({ ...prev, sort_order: Number(value) }))} />
            <label className="grid gap-2">
              <span className="text-sm font-bold text-slate-600">Status</span>
              <select value={form.status} onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value as FormState["status"] }))} className="border border-slate-300 px-4 py-3 outline-none focus:border-[#0b4fa3]">
                <option value="published">published</option>
                <option value="draft">draft</option>
              </select>
            </label>
            <Input label="Title" value={form.title} onChange={(value) => setForm((prev) => ({ ...prev, title: value }))} />
          </div>

          <label className="mt-4 grid gap-2">
            <span className="text-sm font-bold text-slate-600">Payload JSON</span>
            <textarea
              value={form.payloadText}
              onChange={(event) => setForm((prev) => ({ ...prev, payloadText: event.target.value }))}
              rows={14}
              className="w-full resize-none border border-slate-300 px-4 py-3 font-mono text-sm outline-none focus:border-[#0b4fa3]"
            />
          </label>

          <button type="submit" className="btn-primary mt-5">
            <Save className="h-4 w-4" />
            {form.id ? "Сохранить изменения" : "Создать запись"}
          </button>
        </form>
      </section>
    </main>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-slate-600">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} type={type} className="border border-slate-300 px-4 py-3 outline-none focus:border-[#0b4fa3]" />
    </label>
  );
}
