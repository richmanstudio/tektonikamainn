import { LockKeyhole, LogOut, Newspaper, Save, Settings, ShieldCheck } from "lucide-react";
import { type FormEvent, useState } from "react";
import { useI18n } from "../i18n";

export default function AdminDashboard() {
  const { t } = useI18n();
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem("tektonika-admin") === "true");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [draft, setDraft] = useState("");

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (login === "tektonikadmin" && password === "admin123") {
      sessionStorage.setItem("tektonika-admin", "true");
      setAuthenticated(true);
      setError(false);
      return;
    }
    setError(true);
  };

  const logout = () => {
    sessionStorage.removeItem("tektonika-admin");
    setAuthenticated(false);
    setPassword("");
  };

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
        <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl items-center gap-10 lg:grid-cols-[1fr_480px]">
          <div>
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center bg-[#0b4fa3]">
              <LockKeyhole className="h-7 w-7" />
            </div>
            <h1 className="max-w-2xl text-5xl font-extrabold leading-tight md:text-7xl">{t.admin.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{t.admin.loginText}</p>
          </div>
          <form onSubmit={handleLogin} className="bg-white p-8 text-slate-950 shadow-2xl">
            <h2 className="text-3xl font-extrabold">{t.admin.loginTitle}</h2>
            <div className="mt-8 grid gap-4">
              <input value={login} onChange={(event) => setLogin(event.target.value)} placeholder={t.admin.login} className="border border-slate-300 px-4 py-3 outline-none focus:border-[#0b4fa3]" />
              <input value={password} onChange={(event) => setPassword(event.target.value)} placeholder={t.admin.password} type="password" className="border border-slate-300 px-4 py-3 outline-none focus:border-[#0b4fa3]" />
              {error && <div className="border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{t.admin.wrong}</div>}
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
          <button type="button" onClick={logout} className="inline-flex items-center gap-2 border border-slate-300 px-4 py-3 text-sm font-bold">
            <LogOut className="h-4 w-4" />
            {t.admin.exit}
          </button>
        </div>
      </header>

      <section className="site-container grid gap-6 py-10 lg:grid-cols-[280px_1fr]">
        <aside className="grid content-start gap-2">
          {t.admin.sections.map((section: string, index: number) => (
            <button key={section} type="button" className={`flex items-center gap-3 border px-4 py-4 text-left font-bold ${index === 0 ? "border-[#0b4fa3] bg-[#0b4fa3] text-white" : "border-slate-200 bg-white text-slate-700"}`}>
              {index === 2 ? <Newspaper className="h-5 w-5" /> : <Settings className="h-5 w-5" />}
              {section}
            </button>
          ))}
        </aside>

        <div className="grid gap-6">
          <section className="bg-white p-7">
            <h2 className="text-2xl font-extrabold">{t.admin.draftTitle}</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-600">{t.admin.dashboardText}</p>
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              rows={8}
              placeholder="JSON / Markdown / текст для будущего API"
              className="mt-6 w-full resize-none border border-slate-300 px-4 py-3 font-mono text-sm outline-none focus:border-[#0b4fa3]"
            />
            <button type="button" className="btn-primary mt-5">
              <Save className="h-4 w-4" />
              {t.admin.save}
            </button>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {["Python API", "MySQL", "JWT / sessions"].map((item) => (
              <article key={item} className="border border-slate-200 bg-white p-6">
                <div className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">Ready for backend</div>
                <h3 className="mt-3 text-2xl font-extrabold">{item}</h3>
              </article>
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}
