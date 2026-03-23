import React, { useState, useEffect, useCallback } from "react";

/* ══════════════════════════════════════════════════════
   CONFIG — .env dosyasına taşıyın:
   VITE_API_URL=https://api.swissfitclub.com
══════════════════════════════════════════════════════ */
const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

/* ── Types ────────────────────────────────────────────── */
interface Post {
  id: string;
  title: string;
  seoTitle: string;
  metaDesc: string;
  slug: string;
  category: string;
  content: string;
  date: string;
  status: "published" | "draft";
}
type PostForm = Omit<Post, "id">;

interface AuthUser {
  id: number;
  username: string;
  role: string;
}

/* ── Token helpers ────────────────────────────────────── */
const TOKEN_KEY = "sfc_admin_token";
const getToken  = ()          => localStorage.getItem(TOKEN_KEY);
const setToken  = (t: string) => localStorage.setItem(TOKEN_KEY, t);
const clearToken = ()         => localStorage.removeItem(TOKEN_KEY);

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (res.status === 401) {
    clearToken();
    window.location.reload();
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message ?? `HTTP ${res.status}`);
  }
  return res.json();
}

/* ── Fonts ────────────────────────────────────────────── */
if (typeof document !== "undefined" && !document.getElementById("sfc-fonts")) {
  const l = document.createElement("link");
  l.id = "sfc-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&family=Share+Tech+Mono&display=swap";
  document.head.appendChild(l);
}

const CSS = `
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:#0d0d0d;color:#f0f0f0;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
  @keyframes spin{to{transform:rotate(360deg)}}
  .fu{animation:fadeUp .5s cubic-bezier(.22,1,.36,1) both}
  .d1{animation-delay:.06s}.d2{animation-delay:.12s}.d3{animation-delay:.18s}.d4{animation-delay:.26s}
  input,textarea{outline:none;font-family:inherit;}
  button{cursor:pointer;font-family:inherit;}
  ::-webkit-scrollbar{width:3px}
  ::-webkit-scrollbar-track{background:#111}
  ::-webkit-scrollbar-thumb{background:#e82727;border-radius:2px}
  input[type=date]::-webkit-calendar-picker-indicator{filter:invert(1) sepia(1) saturate(5) hue-rotate(310deg);opacity:.5}
  .spinner{width:16px;height:16px;border:2px solid #ffffff44;border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite;display:inline-block;}
`;

const RED = "#e82727";
const ff  = "'Barlow', sans-serif";
const ffC = "'Barlow Condensed', sans-serif";
const ffM = "'Share Tech Mono', monospace";

const inputStyle: React.CSSProperties = {
  width: "100%", background: "#0a0a0a", border: "1px solid #2a2a2a",
  borderRadius: 6, padding: "11px 14px", color: "#f0f0f0",
  fontSize: 14, fontFamily: ff, transition: "border-color .2s",
};
const labelStyle: React.CSSProperties = {
  display: "block", fontFamily: ffM, fontSize: 10, color: "#444",
  letterSpacing: "0.1em", marginBottom: 6,
};

/* ══════════════════════════════════════════════════════
   LOGIN
══════════════════════════════════════════════════════ */
function Login({ onLogin }: { onLogin: (user: AuthUser) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err,      setErr]      = useState("");
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!username || !password) { setErr("Tüm alanları doldurun."); return; }
    setErr(""); setLoading(true);

    try {
      const data = await apiFetch<{ token: string; user: AuthUser }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      setToken(data.token);
      onLogin(data.user);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Giriş başarısız. Tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: ff }}>

      {/* Sol panel */}
      <div style={{ position: "relative" as const, width: "45%", background: "#0a0808", display: "flex", alignItems: "flex-end" as const, overflow: "hidden" }} className="login-left-panel">
        <div style={{ position: "absolute" as const, inset: 0, backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,#e8272706 3px,#e8272706 4px)", pointerEvents: "none" as const }} />
        <div style={{ position: "absolute" as const, bottom: 88, left: 0, right: 0, height: 3, background: RED }} />
        <div style={{ position: "absolute" as const, bottom: 80, left: 0, right: "35%", height: 1, background: RED, opacity: 0.35 }} />
        <div style={{ position: "relative" as const, zIndex: 1, padding: "60px 52px 108px" }}>
          <div style={{ fontFamily: ffC, fontWeight: 900, fontSize: 30, letterSpacing: "0.14em", color: "#f0f0f0", marginBottom: 20 }}>
            SWISS <span style={{ color: RED }}>FIT</span> CLUB
          </div>
          <div style={{ width: 40, height: 3, background: RED, marginBottom: 20 }} />
          <div style={{ fontFamily: ffM, fontSize: 10, color: RED, letterSpacing: "0.16em", marginBottom: 16 }}>
            BEYLİKDÜZÜ'NÜN PREMİUM FITNESS KULÜBÜ
          </div>
          <h2 style={{ fontFamily: ffC, fontWeight: 900, fontSize: 68, lineHeight: 0.93, letterSpacing: "0.04em", color: "#f0f0f0", textShadow: `0 0 60px ${RED}44`, marginBottom: 20 }}>
            YÖNETİM<br />PANELİ
          </h2>
          <p style={{ color: "#4a4a4a", fontSize: 13, lineHeight: 1.7 }}>
            İçerik yönetimi, blog yazıları ve<br />site ayarlarına buradan erişin.
          </p>
        </div>
      </div>

      {/* Sağ form */}
      <div style={{ flex: 1, display: "flex", alignItems: "center" as const, justifyContent: "center" as const, background: "#0d0d0d", padding: "40px 24px" }} className="login-right-panel">
        <div style={{ width: "100%", maxWidth: 400 }} className="fu login-card">
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 26, marginBottom: 14 }}>🔐</div>
            <h1 style={{ fontFamily: ffC, fontWeight: 900, fontSize: 42, letterSpacing: "0.08em", color: "#f0f0f0", marginBottom: 8 }}>GİRİŞ YAP</h1>
            <p style={{ color: "#444", fontSize: 13, lineHeight: 1.6 }}>
              Yetkisiz erişim yasaktır. Lütfen kimlik bilgilerinizi girin.
            </p>
          </div>

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column" as const, gap: 16 }}>
            <div>
              <label style={labelStyle}>KULLANICI ADI</label>
              <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Kullanıcı adınız"
                autoComplete="username"
                style={inputStyle}
                onFocus={e => e.currentTarget.style.borderColor = RED}
                onBlur={e => e.currentTarget.style.borderColor = "#2a2a2a"}
              />
            </div>
            <div>
              <label style={labelStyle}>ŞİFRE</label>
              <div style={{ position: "relative" as const }}>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  style={{ ...inputStyle, paddingRight: 44 }}
                  onFocus={e => e.currentTarget.style.borderColor = RED}
                  onBlur={e => e.currentTarget.style.borderColor = "#2a2a2a"}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  style={{ position: "absolute" as const, right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#444", fontSize: 15, cursor: "pointer" }}
                  aria-label={showPass ? "Şifreyi gizle" : "Şifreyi göster"}
                >
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {err && (
              <div role="alert" style={{ background: "#1a0808", border: `1px solid ${RED}55`, borderLeft: `3px solid ${RED}`, borderRadius: 6, padding: "10px 14px", color: RED, fontSize: 13 }}>
                ⚠ {err}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ background: RED, color: "#fff", border: "none", borderRadius: 6, padding: "13px", fontSize: 13, fontWeight: 700, fontFamily: ffC, letterSpacing: "0.12em", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.8 : 1, marginTop: 4, transition: "background .2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#c0211f"; }}
              onMouseLeave={e => { e.currentTarget.style.background = RED; }}
            >
              {loading ? <><span className="spinner" /> GİRİŞ YAPILIYOR…</> : "GİRİŞ YAP →"}
            </button>
          </form>

          <p style={{ marginTop: 24, fontFamily: ffM, fontSize: 10, color: "#2a2a2a", textAlign: "center" as const, letterSpacing: "0.08em" }}>
            SWISS FIT CLUB — YETKİLİ ERİŞİM
          </p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ADMIN PANEL
══════════════════════════════════════════════════════ */
function Panel({ user, onLogout }: { user: AuthUser; onLogout: () => void }) {
  const [posts,    setPosts]    = useState<Post[]>([]);
  const [editing,  setEditing]  = useState<Post | null>(null);
  const [search,   setSearch]   = useState("");
  const [showForm, setShowForm] = useState(false);
  const [filter,   setFilter]   = useState("all");
  const [toast,    setToast]    = useState<{ msg: string; type: string } | null>(null);
  const [delId,    setDelId]    = useState<string | null>(null);
  const [form,     setForm]     = useState<PostForm>(empty());
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [saving,   setSaving]   = useState(false);

  function empty(): PostForm {
    return { title: "", seoTitle: "", metaDesc: "", slug: "", category: "", content: "", date: new Date().toISOString().split("T")[0], status: "draft" };
  }

  function showT(msg: string, type = "ok") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  function reset() { setForm(empty()); setEditing(null); setShowForm(false); }

  /* ── API: Yazıları çek ── */
  const fetchPosts = useCallback(async () => {
    setLoadingPosts(true);
    try {
      const data = await apiFetch<Post[]>("/admin/posts");
      setPosts(data);
    } catch {
      showT("Yazılar yüklenemedi.", "err");
    } finally {
      setLoadingPosts(false);
    }
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  /* ── Slug üretici ── */
  function slugify(t: string) {
    return t.toLowerCase()
      .replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ş/g,"s")
      .replace(/ı/g,"i").replace(/ö/g,"o").replace(/ç/g,"c")
      .replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  }
  function titleChange(v: string) {
    setForm(f => ({ ...f, title: v, slug: (!f.slug || f.slug === slugify(f.title)) ? slugify(v) : f.slug }));
  }

  /* ── API: Kaydet / Güncelle ── */
  async function save() {
    if (!form.title || !form.slug) { showT("Başlık ve slug zorunludur.", "err"); return; }
    setSaving(true);
    try {
      if (editing) {
        const updated = await apiFetch<Post>(`/admin/posts/${editing.id}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
        setPosts(ps => ps.map(p => p.id === editing.id ? updated : p));
        showT("Yazı güncellendi.");
      } else {
        const created = await apiFetch<Post>("/admin/posts", {
          method: "POST",
          body: JSON.stringify(form),
        });
        setPosts(ps => [created, ...ps]);
        showT("Yazı eklendi.");
      }
      reset();
    } catch (e: unknown) {
      showT(e instanceof Error ? e.message : "Kayıt başarısız.", "err");
    } finally {
      setSaving(false);
    }
  }

  /* ── API: Sil ── */
  async function doDelete(id: string) {
    try {
      await apiFetch(`/admin/posts/${id}`, { method: "DELETE" });
      setPosts(ps => ps.filter(p => p.id !== id));
      setDelId(null);
      showT("Yazı silindi.", "err");
    } catch (e: unknown) {
      showT(e instanceof Error ? e.message : "Silinemedi.", "err");
    }
  }

  /* ── API: Çıkış ── */
  async function logout() {
    try { await apiFetch("/auth/logout", { method: "POST" }); } catch { /* ignore */ }
    clearToken();
    onLogout();
  }

  function startEdit(post: Post) {
    const { id, ...rest } = post; setForm(rest); setEditing(post); setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const published = posts.filter(p => p.status === "published").length;
  const drafts    = posts.filter(p => p.status === "draft").length;
  const cats      = [...new Set(posts.map(p => p.category))].length;

  const filtered = posts.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || p.status === filter;
    return matchSearch && matchFilter;
  });

  const fi: React.CSSProperties = { width: "100%", background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: 6, padding: "10px 14px", color: "#f0f0f0", fontSize: 14, fontFamily: ff, transition: "border-color .2s" };
  const fl: React.CSSProperties = { display: "block", fontFamily: ffM, fontSize: 10, color: "#444", letterSpacing: "0.1em", marginBottom: 5 };
  const formFields: [string, keyof PostForm, string][] = [
    ["SEO BAŞLIK", "seoTitle", "SEO başlık"],
    ["SLUG (URL) *", "slug", "otomatik-slug"],
    ["KATEGORİ", "category", "Rehber, Tavsiye…"],
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d0d", fontFamily: ff }}>

      {/* Toast */}
      {toast && (
        <div className="toast" style={{ position: "fixed" as const, bottom: 20, right: 20, zIndex: 9999, padding: "12px 20px", borderRadius: 6, border: "1px solid", background: toast.type === "err" ? "#1a0808" : "#081208", borderColor: toast.type === "err" ? RED : "#27e87a", fontSize: 13, display: "flex", gap: 10, alignItems: "center" as const, animation: "fadeUp .3s ease", boxShadow: "0 8px 32px #000000aa" }}>
          <span style={{ color: toast.type === "err" ? RED : "#27e87a" }}>{toast.type === "err" ? "✕" : "✓"}</span>
          {toast.msg}
        </div>
      )}

      {/* Silme modal */}
      {delId && (
        <div style={{ position: "fixed" as const, inset: 0, background: "#000000dd", display: "flex", alignItems: "center" as const, justifyContent: "center" as const, zIndex: 999 }}>
          <div style={{ background: "#111", border: "1px solid #2a2a2a", borderTop: `2px solid ${RED}`, borderRadius: 8, padding: 32, maxWidth: 360, width: "90%" }} className="modal-box fu">
            <div style={{ fontSize: 28, color: RED, marginBottom: 12 }}>⚠</div>
            <h3 style={{ fontFamily: ffC, fontWeight: 800, fontSize: 26, color: "#f0f0f0", letterSpacing: "0.06em", marginBottom: 10 }}>YAZIYI SİL</h3>
            <p style={{ color: "#555", fontSize: 13, lineHeight: 1.6, marginBottom: 24 }}>Bu yazı kalıcı olarak silinecek. Emin misiniz?</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" as const }}>
              <button onClick={() => setDelId(null)} style={{ background: "none", border: "none", color: "#444", padding: "9px 14px", fontSize: 13, cursor: "pointer" }}>Vazgeç</button>
              <button onClick={() => doDelete(delId)} style={{ background: RED, color: "#fff", border: "none", borderRadius: 6, padding: "9px 20px", fontSize: 13, fontWeight: 700, fontFamily: ffC, letterSpacing: "0.08em", cursor: "pointer" }}>Evet, Sil</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header style={{ position: "sticky" as const, top: 0, zIndex: 100, background: "#0d0d0dee", backdropFilter: "blur(10px)", borderBottom: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 56, display: "flex", alignItems: "center" as const, justifyContent: "space-between" as const }}>
          <div style={{ display: "flex", alignItems: "center" as const, gap: 16 }}>
            <div style={{ fontFamily: ffC, fontWeight: 900, fontSize: 22, letterSpacing: "0.1em" }}>
              SWISS <span style={{ color: RED }}>FIT</span> CLUB
            </div>
            <span style={{ fontFamily: ffM, fontSize: 10, color: "#2a2a2a", letterSpacing: "0.1em" }}>/ ADMIN</span>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" as const }}>
            <span style={{ fontFamily: ffM, fontSize: 11, color: "#555", background: "#111", border: "1px solid #1e1e1e", borderRadius: 4, padding: "4px 10px" }}>
              {user.username}
            </span>
            <button onClick={logout}
              style={{ fontFamily: ffC, fontWeight: 600, fontSize: 13, letterSpacing: "0.08em", color: "#555", background: "none", border: "1px solid #2a2a2a", borderRadius: 4, padding: "5px 14px", cursor: "pointer", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = RED; e.currentTarget.style.color = RED; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2a2a"; e.currentTarget.style.color = "#555"; }}>
              ÇIKIŞ ↗
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 24px" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 24 }} className="stats-grid fu">
          {[
            { n: posts.length, lbl: "TOPLAM YAZI", acc: false },
            { n: published,    lbl: "YAYINDA",     acc: true  },
            { n: drafts,       lbl: "TASLAK",      acc: false },
            { n: cats,         lbl: "KATEGORİ",    acc: false },
          ].map((s, i) => (
            <div key={i} className={`d${i + 1} stat-card`} style={{ background: "#111", border: `1px solid ${s.acc ? RED + "44" : "#1e1e1e"}`, borderLeft: `3px solid ${s.acc ? RED : "#2a2a2a"}`, borderRadius: 8, padding: "18px 20px" }}>
              <div className="stat-number" style={{ fontFamily: ffC, fontWeight: 900, fontSize: 42, lineHeight: 1, color: s.acc ? RED : "#f0f0f0", marginBottom: 4 }}>{s.n}</div>
              <div style={{ fontFamily: ffM, fontSize: 10, color: "#3a3a3a", letterSpacing: "0.1em" }}>{s.lbl}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center" as const, justifyContent: "space-between" as const, marginBottom: 20 }} className="admin-toolbar fu d2">
          <h1 style={{ fontFamily: ffC, fontWeight: 900, fontSize: 32, letterSpacing: "0.06em" }}>BLOG YÖNETİMİ</h1>
          <button onClick={() => { reset(); setShowForm(true); }}
            style={{ background: RED, color: "#fff", border: "none", borderRadius: 6, padding: "10px 22px", fontFamily: ffC, fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", cursor: "pointer", transition: "background .15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#c0211f"}
            onMouseLeave={e => e.currentTarget.style.background = RED}>
            + YENİ YAZI
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div style={{ background: "#111", border: "1px solid #1e1e1e", borderTop: `2px solid ${RED}`, borderRadius: 8, padding: 24, marginBottom: 20 }} className="form-card fu">
            <div style={{ display: "flex", alignItems: "center" as const, justifyContent: "space-between" as const, marginBottom: 20 }}>
              <h2 style={{ fontFamily: ffC, fontWeight: 800, fontSize: 20, letterSpacing: "0.06em" }}>{editing ? "▶ YAZIYI DÜZENLE" : "▶ YENİ YAZI EKLE"}</h2>
              <button onClick={reset} style={{ background: "none", border: "1px solid #2a2a2a", borderRadius: 4, color: "#444", width: 30, height: 30, cursor: "pointer" }}>✕</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }} className="form-grid">
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={fl}>BAŞLIK *</label>
                <input style={fi} placeholder="Makale başlığı..." value={form.title} onChange={e => titleChange(e.target.value)}
                  onFocus={e => e.currentTarget.style.borderColor = RED} onBlur={e => e.currentTarget.style.borderColor = "#2a2a2a"} />
              </div>
              {formFields.map(([lbl, key, ph]) => (
                <div key={key}>
                  <label style={fl}>{lbl}</label>
                  <input style={fi} placeholder={ph} value={form[key] as string}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    onFocus={e => e.currentTarget.style.borderColor = RED}
                    onBlur={e => e.currentTarget.style.borderColor = "#2a2a2a"} />
                </div>
              ))}
              <div>
                <label style={fl}>TARİH</label>
                <input type="date" style={fi} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                  onFocus={e => e.currentTarget.style.borderColor = RED} onBlur={e => e.currentTarget.style.borderColor = "#2a2a2a"} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={fl}>META AÇIKLAMA</label>
                <input style={fi} placeholder="160 karakter, arama motorları için…" value={form.metaDesc}
                  onChange={e => setForm({ ...form, metaDesc: e.target.value })}
                  onFocus={e => e.currentTarget.style.borderColor = RED} onBlur={e => e.currentTarget.style.borderColor = "#2a2a2a"} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={fl}>İÇERİK</label>
                <textarea rows={9} style={{ ...fi, resize: "vertical" as const, lineHeight: 1.7, paddingTop: 12 }}
                  placeholder="Makale içeriğini buraya yazın…" value={form.content}
                  onChange={e => setForm({ ...form, content: e.target.value })}
                  onFocus={e => e.currentTarget.style.borderColor = RED} onBlur={e => e.currentTarget.style.borderColor = "#2a2a2a"} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const }} className="form-actions">
              <button onClick={save} disabled={saving}
                style={{ background: RED, color: "#fff", border: "none", borderRadius: 6, padding: "10px 22px", fontFamily: ffC, fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.8 : 1, display: "flex", alignItems: "center", gap: 8 }}
                onMouseEnter={e => { if (!saving) e.currentTarget.style.background = "#c0211f"; }}
                onMouseLeave={e => { e.currentTarget.style.background = RED; }}>
                {saving ? <><span className="spinner" />{editing ? "GÜNCELLENİYOR…" : "KAYDEDİLİYOR…"}</> : editing ? "GÜNCELLE" : "KAYDET"}
              </button>
              <button onClick={() => setForm({ ...form, status: form.status === "draft" ? "published" : "draft" })}
                style={{ background: "none", border: `1px solid ${form.status === "draft" ? RED + "55" : "#333"}`, color: form.status === "draft" ? RED : "#555", borderRadius: 6, padding: "10px 18px", fontSize: 12, fontFamily: ffM, letterSpacing: "0.06em", cursor: "pointer" }}>
                {form.status === "draft" ? "● YAYINA AL" : "○ TASLAĞI ÇEVİR"}
              </button>
              <button onClick={reset} style={{ background: "none", border: "none", color: "#444", padding: "10px 14px", fontSize: 13, cursor: "pointer" }}>İptal</button>
            </div>
          </div>
        )}

        {/* Search & Filter */}
        <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" as const }} className="search-filter-row fu d3">
          <div style={{ flex: 1, position: "relative" as const, minWidth: 200 }}>
            <span style={{ position: "absolute" as const, left: 12, top: "50%", transform: "translateY(-50%)", color: "#444", fontSize: 17, pointerEvents: "none" as const }}>⌕</span>
            <input style={{ width: "100%", background: "#111", border: "1px solid #1e1e1e", borderRadius: 6, padding: "10px 14px 10px 36px", color: "#f0f0f0", fontSize: 14, fontFamily: ff, transition: "border-color .2s" }}
              placeholder="Yazı veya kategori ara…" value={search} onChange={e => setSearch(e.target.value)}
              onFocus={e => e.currentTarget.style.borderColor = RED} onBlur={e => e.currentTarget.style.borderColor = "#1e1e1e"} />
          </div>
          <div style={{ display: "flex", gap: 4 }} className="filter-group">
            {(["all", "published", "draft"] as const).map(val => (
              <button key={val} onClick={() => setFilter(val)}
                style={{ background: filter === val ? `${RED}15` : "none", border: `1px solid ${filter === val ? RED + "44" : "#1a1a1a"}`, color: filter === val ? RED : "#444", borderRadius: 4, padding: "8px 14px", fontSize: 11, fontFamily: ffM, letterSpacing: "0.08em", cursor: "pointer" }}>
                {val === "all" ? "TÜMÜ" : val === "published" ? "YAYINDA" : "TASLAK"}
              </button>
            ))}
          </div>
        </div>

        {/* Post list */}
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 6 }} className="fu d4">
          {loadingPosts ? (
            <div style={{ textAlign: "center" as const, padding: "60px 24px" }}>
              <span className="spinner" style={{ width: 24, height: 24, borderWidth: 3 }} />
              <p style={{ color: "#333", fontFamily: ffM, fontSize: 11, letterSpacing: "0.1em", marginTop: 16 }}>YAZILƏR YÜKLENİYOR…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center" as const, padding: "60px 24px", border: "1px dashed #1a1a1a", borderRadius: 8 }}>
              <div style={{ fontSize: 32, opacity: 0.2, marginBottom: 12 }}>◻</div>
              <p style={{ color: "#444", fontFamily: ffM, fontSize: 12, letterSpacing: "0.1em" }}>SONUÇ BULUNAMADI</p>
            </div>
          ) : filtered.map(post => (
            <PostRow key={post.id} post={post} onEdit={startEdit} onDelete={setDelId} />
          ))}
        </div>

        <div style={{ textAlign: "center" as const, marginTop: 48, paddingTop: 20, borderTop: "1px solid #141414", fontFamily: ffM, fontSize: 10, color: "#222", letterSpacing: "0.1em" }}>
          SWISS FIT CLUB © {new Date().getFullYear()} — {user.username.toUpperCase()} · {user.role.toUpperCase()}
        </div>
      </main>
    </div>
  );
}

/* ── Post Row ───────────────────────────────────────── */
function PostRow({ post, onEdit, onDelete }: { post: Post; onEdit: (p: Post) => void; onDelete: (id: string) => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{ display: "flex", alignItems: "center" as const, justifyContent: "space-between" as const, background: hov ? "#161616" : "#111", border: "1px solid", borderLeft: "3px solid", borderColor: hov ? "#2a2a2a" : "#1a1a1a", borderLeftColor: post.status === "published" ? RED : "#2a2a2a", borderRadius: 6, padding: "14px 16px", transition: "all .15s", gap: 12 }}
      className="post-row"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: "#d0d0d0", marginBottom: 6, whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis" }}>{post.title}</div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" as const, flexWrap: "wrap" as const }}>
          <span style={{ fontFamily: ffM, fontSize: 10, padding: "2px 8px", borderRadius: 3, border: "1px solid", background: post.status === "published" ? `${RED}20` : "#ffffff0a", color: post.status === "published" ? RED : "#555", borderColor: post.status === "published" ? `${RED}44` : "#2a2a2a", letterSpacing: "0.08em" }}>
            {post.status === "published" ? "● YAYINDA" : "○ TASLAK"}
          </span>
          <span style={{ fontFamily: ffM, fontSize: 11, color: "#3a3a3a" }}>{post.category}</span>
          <span style={{ fontFamily: ffM, fontSize: 11, color: "#3a3a3a" }}>{post.date}</span>
          <span style={{ fontFamily: ffM, fontSize: 10, color: "#2a2a2a" }}>/{post.slug}</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6 }} className="post-row-actions">
        <ABtn label="DÜZENLE" onClick={() => onEdit(post)} col={RED} />
        <ABtn label="SİL"     onClick={() => onDelete(post.id)} col="#888" />
      </div>
    </div>
  );
}

function ABtn({ label, onClick, col }: { label: string; onClick: () => void; col: string }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick}
      style={{ background: h ? col + "20" : "transparent", border: `1px solid ${h ? col + "55" : "#222"}`, color: h ? col : "#444", borderRadius: 4, padding: "7px 14px", fontSize: 11, fontFamily: ffM, letterSpacing: "0.06em", transition: "all .15s", cursor: "pointer" }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      {label}
    </button>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT — token ile oturumu koru
══════════════════════════════════════════════════════ */
export default function AdminPanel() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [checking, setChecking] = useState(true);

  /* Sayfa yenilense de oturumu koru */
  useEffect(() => {
    const token = getToken();
    if (!token) { setChecking(false); return; }
    apiFetch<AuthUser>("/auth/me")
      .then(u => setUser(u))
      .catch(() => clearToken())
      .finally(() => setChecking(false));
  }, []);

  if (checking) {
    return (
      <div style={{ minHeight: "100vh", background: "#0d0d0d", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span className="spinner" style={{ width: 28, height: 28, borderWidth: 3 }} />
      </div>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {user
        ? <Panel user={user} onLogout={() => setUser(null)} />
        : <Login onLogin={u => setUser(u)} />
      }
    </>
  );
}