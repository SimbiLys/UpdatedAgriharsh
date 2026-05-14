import { useState, useRef, useEffect } from "react";

/* ─── Inline SVG icons — monochrome stroke only, no color ─── */
const Icon = ({ name, size = 20, className = "" }) => {
    const icons = {
        farm: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M3 10l9-7 9 7M5 21V10M19 21V10" /><rect x="9" y="15" width="6" height="6" /></svg>,
        factory: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 21h20M5 21V8l7 4V8l7 4V3" /><path d="M5 12v3M12 12v3M19 12v3" /></svg>,
        warehouse: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21V7l9-4 9 4v14" /><path d="M9 21v-6h6v6" /><path d="M3 10h18" /></svg>,
        truck: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" /><path d="M16 8h4l3 5v4h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
        clipboard: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /><path d="m9 12 2 2 4-4" /></svg>,
        search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>,
        store: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9,22 9,12 15,12 15,22" /></svg>,
        upload: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>,
        check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
        x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
        warning: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
        copy: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>,
        arrowLeft: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>,
        arrowRight: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
        mapPin: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
        user: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
        leaf: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>,
        external: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>,
        building: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>,
        file: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
        wallet: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" /><path d="M4 6v12c0 1.1.9 2 2 2h14v-4" /><circle cx="18" cy="12" r="2" /></svg>,
        logout: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>,
        plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
        chevronDown: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>,
        info: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>,
    };
    return <span className={`inline-flex items-center justify-center ${className}`}>{icons[name] || null}</span>;
};

/* ─── Global styles injected once ─── */
const GlobalStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
    *, *::before, *::after { box-sizing: border-box; }
    body { margin: 0; font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
    .font-bebas { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.07em; }
    .font-dmsans { font-family: 'DM Sans', sans-serif; }
    input, select, textarea, button { font-family: 'DM Sans', sans-serif; }
    input::-webkit-inner-spin-button, input::-webkit-outer-spin-button { -webkit-appearance: none; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
    @keyframes spin { to { transform:rotate(360deg); } }
    @keyframes bar { from { width:0 } to { width:65% } }
    .anim-fadeup { animation: fadeUp 0.3s ease both; }
    .anim-spin { animation: spin 0.75s linear infinite; }
    .anim-bar { animation: bar 2.2s ease forwards; }
    .role-tile { transition: border-color 0.15s, background 0.15s; }
    .role-tile:hover { border-color: #1a3d2b !important; background: #f7faf8 !important; }
    .inp { width:100%; padding:10px 14px; border-radius:10px; border:1.5px solid #e5e7eb; font-size:14px; color:#111827; background:#fff; outline:none; transition:border-color 0.15s, box-shadow 0.15s; }
    .inp:focus { border-color:#1a3d2b; box-shadow:0 0 0 3px rgba(26,61,43,0.08); }
    .inp::placeholder { color:#9ca3af; }
    .upload-z { transition: border-color 0.15s, background 0.15s; }
    .upload-z:hover { border-color:#1a3d2b !important; background:#f7faf8 !important; }
    .btn-primary { transition: background 0.15s, transform 0.1s; }
    .btn-primary:hover:not(:disabled) { background: #142e20 !important; }
    .btn-primary:active:not(:disabled) { transform: scale(0.98); }
    .btn-ghost { transition: border-color 0.15s, color 0.15s; }
    .btn-ghost:hover { border-color:#9ca3af !important; color:#374151 !important; }
  `}</style>
);

/* ─── Logo ─── */
const Logo = ({ light = false }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: light ? "rgba(255,255,255,0.12)" : "#1a3d2b",
            border: light ? "1px solid rgba(255,255,255,0.2)" : "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: light ? "#a7f3c8" : "#4ade80",
        }}>
            <Icon name="leaf" size={15} />
        </div>
        <span className="font-bebas" style={{ fontSize: 20, color: light ? "#fff" : "#1a3d2b", letterSpacing: "0.12em" }}>AGRIHASH</span>
    </div>
);

/* ─── Page shell: dark green bg + white card ─── */
const Shell = ({ nav, children }) => (
    <div style={{ minHeight: "100vh", background: "#1a3d2b", display: "flex", flexDirection: "column", fontFamily: "'DM Sans',sans-serif" }}>
        <GlobalStyles />
        {nav}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "24px 16px 64px" }}>
            <div className="anim-fadeup" style={{
                width: "100%", maxWidth: 760,
                background: "#fff",
                borderRadius: 20,
                boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
                overflow: "hidden",
            }}>
                {children}
            </div>
        </div>
    </div>
);

/* ─── Navbars ─── */
const NavSimple = ({ wallet = "0x7e4...3a1c" }) => (
    <div style={{ padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Logo light />
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 100, padding: "6px 14px", color: "rgba(255,255,255,0.75)", fontSize: 13,
            }}>
                <Icon name="wallet" size={13} className="" style={{ opacity: 0.5 }} />
                <span style={{ fontFamily: "monospace" }}>{wallet}</span>
            </div>
            <div style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "rgba(59,130,246,0.18)", border: "1px solid rgba(96,165,250,0.3)",
                borderRadius: 100, padding: "6px 12px",
            }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#60a5fa" }} />
                <span style={{ color: "#93c5fd", fontSize: 12, fontWeight: 500 }}>Base</span>
            </div>
        </div>
    </div>
);

const NavFull = ({ role, wallet = "0x7e4...3a1c" }) => (
    <div style={{ padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Logo light />
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {role && (
                <span style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 100, padding: "5px 12px", color: "rgba(255,255,255,0.65)", fontSize: 12 }}>{role}</span>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 100, padding: "6px 14px" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, fontFamily: "monospace" }}>{wallet}</span>
            </div>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)", padding: 4, display: "flex" }}>
                <Icon name="logout" size={16} />
            </button>
        </div>
    </div>
);

/* ─── Progress bar ─── */
const Progress = ({ step }) => {
    const steps = ["Profile", "Role details", "Documents"];
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "28px 0 20px" }}>
            <span style={{ fontSize: 11, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}>Step {step} of 3</span>
            <div style={{ display: "flex", borderRadius: 100, overflow: "hidden", border: "1.5px solid #e5e7eb", background: "#f3f4f6" }}>
                {steps.map((s, i) => {
                    const done = i + 1 < step;
                    const active = i + 1 === step;
                    return (
                        <div key={s} style={{
                            padding: "8px 28px", fontSize: 13, fontWeight: 500,
                            background: (active || done) ? "#1a3d2b" : "transparent",
                            color: (active || done) ? "#fff" : "#9ca3af",
                            display: "flex", alignItems: "center", gap: 6,
                            transition: "background 0.2s",
                        }}>
                            {done
                                ? <><span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 14, height: 14, borderRadius: "50%", background: "rgba(255,255,255,0.25)" }}><Icon name="check" size={9} /></span> {s}</>
                                : s}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

/* ─── Form field wrapper ─── */
const F = ({ label, optional, hint, children }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>{label}</label>
            {optional && <span style={{ fontSize: 11, color: "#9ca3af" }}>optional</span>}
        </div>
        {hint && <p style={{ fontSize: 12, color: "#9ca3af", marginTop: -2 }}>{hint}</p>}
        {children}
    </div>
);

/* ─── Buttons ─── */
const BtnP = ({ children, onClick, disabled, style: s = {} }) => (
    <button onClick={onClick} disabled={disabled} className="btn-primary" style={{
        display: "flex", alignItems: "center", gap: 8, padding: "10px 24px",
        borderRadius: 10, border: "none", cursor: disabled ? "not-allowed" : "pointer",
        background: disabled ? "#e5e7eb" : "#1a3d2b",
        color: disabled ? "#9ca3af" : "#fff",
        fontSize: 14, fontWeight: 600, letterSpacing: "0.01em",
        ...s,
    }}>{children}</button>
);

const BtnG = ({ children, onClick }) => (
    <button onClick={onClick} className="btn-ghost" style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "10px 18px", borderRadius: 10,
        border: "1.5px solid #e5e7eb", background: "#fff",
        cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#6b7280",
    }}>{children}</button>
);

/* ═══════════════════════════════════════════════════════════════
   PAGE 3 — ROLE SELECTION
═══════════════════════════════════════════════════════════════ */
const ROLES = [
    { id: "farming", icon: "farm", title: "Farming Enterprise", desc: "Grow and register crop batches" },
    { id: "processing", icon: "factory", title: "Agro-Processing", desc: "Buy raw produce, process and resell" },
    { id: "warehouse", icon: "warehouse", title: "Warehouse Enterprise", desc: "Store batches, issue custody receipts" },
    { id: "transport", icon: "truck", title: "Transport Company", desc: "Move batches, sign checkpoints" },
    { id: "inspector", icon: "clipboard", title: "Inspector", desc: "Certify and grade batches" },
    { id: "auditor", icon: "search", title: "Auditor", desc: "Audit full supply chains" },
    { id: "retailer", icon: "store", title: "Retailer", desc: "Buy from the marketplace" },
];

function RoleTile({ role, selected, onSelect }) {
    return (
        <button onClick={() => onSelect(role.id)} className="role-tile" style={{
            textAlign: "left", padding: "18px 16px",
            borderRadius: 14, border: selected ? "2px solid #1a3d2b" : "1.5px solid #e5e7eb",
            background: selected ? "#f0f7f2" : "#fff",
            cursor: "pointer", width: "100%",
        }}>
            <div style={{
                width: 34, height: 34, borderRadius: 8, marginBottom: 12,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: selected ? "rgba(26,61,43,0.12)" : "#f3f4f6",
                color: selected ? "#1a3d2b" : "#6b7280",
            }}>
                <Icon name={role.icon} size={16} />
            </div>
            <p className="font-bebas" style={{ fontSize: 14, color: selected ? "#1a3d2b" : "#111827", marginBottom: 4 }}>
                {role.title.toUpperCase()}
            </p>
            <p style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.5 }}>{role.desc}</p>
        </button>
    );
}

function RoleSelectionPage({ onContinue }) {
    const [selected, setSelected] = useState(null);

    return (
        <Shell nav={<NavSimple />}>
            <div style={{ padding: "0 40px 40px" }}>
                <Progress step={1} />

                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <h1 className="font-bebas" style={{ fontSize: 42, color: "#1a3d2b", marginBottom: 6 }}>What best describes you?</h1>
                    <p style={{ fontSize: 14, color: "#6b7280" }}>Your role determines what you can do on the platform.</p>
                </div>

                {/* Row 1: 4 tiles */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 12 }}>
                    {ROLES.slice(0, 4).map(r => <RoleTile key={r.id} role={r} selected={selected === r.id} onSelect={setSelected} />)}
                </div>

                {/* Row 2: 3 tiles centered */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 32 }}>
                    <div /> {/* spacer to center 3 tiles */}
                    {ROLES.slice(4).map(r => <RoleTile key={r.id} role={r} selected={selected === r.id} onSelect={setSelected} />)}
                </div>

                <BtnP onClick={() => selected && onContinue(selected)} disabled={!selected} style={{ width: "100%", padding: "14px", justifyContent: "center", fontSize: 15 }}>
                    <span className="font-bebas" style={{ fontSize: 17, letterSpacing: "0.1em" }}>CONTINUE</span>
                </BtnP>

                <p style={{ textAlign: "center", fontSize: 12, color: "#9ca3af", marginTop: 14 }}>
                    End consumers need no account. The traceability portal is fully public.
                </p>
            </div>
        </Shell>
    );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE 4 — BASIC PROFILE
═══════════════════════════════════════════════════════════════ */
const COUNTRIES = ["Rwanda", "Kenya", "Uganda", "Tanzania", "Ethiopia", "Nigeria", "Ghana", "South Africa", "Cameroon", "United States", "United Kingdom", "Germany", "France", "Netherlands", "Other"];

function BasicProfilePage({ onContinue, onBack }) {
    const [form, setForm] = useState({ name: "", email: "", country: "", phone: "", bio: "" });
    const [drag, setDrag] = useState(false);
    const [photo, setPhoto] = useState(null);
    const ref = useRef();
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
    const ok = form.name.trim() && form.country;

    return (
        <Shell nav={<NavSimple />}>
            <div style={{ padding: "0 40px 40px" }}>
                <Progress step={1} />

                <div style={{ marginBottom: 28 }}>
                    <h1 className="font-bebas" style={{ fontSize: 40, color: "#1a3d2b", marginBottom: 4 }}>Tell us about yourself</h1>
                    <p style={{ fontSize: 13, color: "#9ca3af" }}>All data stays in your browser until you sign on-chain.</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <F label="Full legal name or business name *">
                        <input className="inp" value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Green Valley Organics Ltd." />
                    </F>

                    <F label="Email address" optional hint="For notifications only — not stored on-chain">
                        <input className="inp" type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="you@company.com" />
                    </F>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <F label="Country / region *">
                            <div style={{ position: "relative" }}>
                                <select className="inp" style={{ paddingRight: 36, appearance: "none", cursor: "pointer" }} value={form.country} onChange={e => set("country", e.target.value)}>
                                    <option value="">Select country…</option>
                                    {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                                </select>
                                <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }}>
                                    <Icon name="chevronDown" size={14} />
                                </span>
                            </div>
                        </F>
                        <F label="Phone number" optional>
                            <input className="inp" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+250 700 000 000" />
                        </F>
                    </div>

                    <F label="Profile photo or company logo" optional>
                        <div
                            onClick={() => ref.current.click()}
                            onDragOver={e => { e.preventDefault(); setDrag(true) }}
                            onDragLeave={() => setDrag(false)}
                            onDrop={e => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f?.type.startsWith("image/")) setPhoto(URL.createObjectURL(f)); }}
                            className="upload-z"
                            style={{
                                border: `2px dashed ${drag ? "#1a3d2b" : "#d1d5db"}`,
                                borderRadius: 12, padding: "28px 20px", textAlign: "center",
                                background: drag ? "#f0f7f2" : "#fafafa", cursor: "pointer",
                            }}
                        >
                            {photo ? (
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                                    <img src={photo} alt="preview" style={{ width: 52, height: 52, borderRadius: 10, objectFit: "cover", border: "1px solid #e5e7eb" }} />
                                    <div style={{ textAlign: "left" }}>
                                        <p style={{ fontSize: 13, fontWeight: 600, color: "#1a3d2b" }}>Photo selected</p>
                                        <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>Will upload to IPFS on submit</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", color: "#9ca3af" }}>
                                        <Icon name="upload" size={18} />
                                    </div>
                                    <p style={{ fontSize: 13, color: "#6b7280" }}>Drop image here or <span style={{ color: "#1a3d2b", fontWeight: 500 }}>click to browse</span></p>
                                    <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>PNG, JPG · max 5MB · Uploads to IPFS</p>
                                </>
                            )}
                            <input ref={ref} type="file" accept="image/*" style={{ display: "none" }} onChange={e => { if (e.target.files[0]) setPhoto(URL.createObjectURL(e.target.files[0])) }} />
                        </div>
                    </F>

                    <F label="Short bio / description" optional>
                        <textarea className="inp" style={{ minHeight: 88, resize: "none" }} value={form.bio} onChange={e => set("bio", e.target.value)} placeholder="Brief description shown on marketplace listings…" />
                    </F>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 32, paddingTop: 24, borderTop: "1px solid #f3f4f6" }}>
                    <p style={{ fontSize: 11, color: "#9ca3af", maxWidth: 280, lineHeight: 1.6 }}>Nothing is sent to any server. All data lives in browser memory until final signing.</p>
                    <div style={{ display: "flex", gap: 10 }}>
                        <BtnG onClick={onBack}><Icon name="arrowLeft" size={13} /> Back</BtnG>
                        <BtnP onClick={() => ok && onContinue(form)} disabled={!ok}>Continue <Icon name="arrowRight" size={13} /></BtnP>
                    </div>
                </div>
            </div>
        </Shell>
    );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE 5 — ROLE DETAILS (Farming Enterprise)
═══════════════════════════════════════════════════════════════ */
const CROPS = ["Wheat", "Corn", "Rice", "Vegetables", "Fruits", "Coffee", "Tea", "Sorghum", "Cassava", "Beans", "Maize", "Soybeans"];
const METHODS = ["Organic", "Conventional", "GAP-certified"];

function RoleDetailsPage({ onContinue, onBack }) {
    const [form, setForm] = useState({ farmName: "", address: "", gps: "", crops: [], farmSize: "", method: "", years: "" });
    const [dropOpen, setDropOpen] = useState(false);
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
    const toggleCrop = c => set("crops", form.crops.includes(c) ? form.crops.filter(x => x !== c) : [...form.crops, c]);
    const ok = form.farmName && form.address;

    return (
        <Shell nav={<NavFull role="Farming Enterprise" />}>
            <div style={{ padding: "0 40px 40px" }}>
                <Progress step={2} />

                <div style={{ marginBottom: 28 }}>
                    <h1 className="font-bebas" style={{ fontSize: 40, color: "#1a3d2b", marginBottom: 4 }}>Farming details</h1>
                    <p style={{ fontSize: 13, color: "#9ca3af" }}>Tell us about your farm operation.</p>
                </div>

                <div style={{ border: "1.5px solid #f3f4f6", borderRadius: 16, padding: "28px 28px", display: "flex", flexDirection: "column", gap: 22 }}>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <F label="Business / farm name *">
                            <div style={{ position: "relative" }}>
                                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }}><Icon name="building" size={14} /></span>
                                <input className="inp" style={{ paddingLeft: 36 }} value={form.farmName} onChange={e => set("farmName", e.target.value)} placeholder="Green Valley Organics" />
                            </div>
                        </F>
                        <F label="Physical address *">
                            <div style={{ position: "relative" }}>
                                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }}><Icon name="mapPin" size={14} /></span>
                                <input className="inp" style={{ paddingLeft: 36 }} value={form.address} onChange={e => set("address", e.target.value)} placeholder="123 Rural Road, Kigali" />
                            </div>
                        </F>
                    </div>

                    <F label="GPS coordinates" optional>
                        <div style={{ position: "relative" }}>
                            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }}><Icon name="mapPin" size={14} /></span>
                            <input className="inp" style={{ paddingLeft: 36 }} value={form.gps} onChange={e => set("gps", e.target.value)} placeholder="38.5816° N, 121.4944° W" />
                        </div>
                        <p style={{ fontSize: 11, color: "#1a3d2b", cursor: "pointer", marginTop: 4 }}>→ Click to auto-detect location</p>
                    </F>

                    <F label="Crop types grown">
                        <div style={{ position: "relative" }}>
                            <div
                                onClick={() => setDropOpen(o => !o)}
                                style={{
                                    minHeight: 44, padding: "8px 12px", borderRadius: 10,
                                    border: `1.5px solid ${dropOpen ? "#1a3d2b" : "#e5e7eb"}`,
                                    background: "#fff", cursor: "pointer", display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center",
                                    boxShadow: dropOpen ? "0 0 0 3px rgba(26,61,43,0.08)" : "none",
                                }}
                            >
                                {form.crops.length === 0 && <span style={{ color: "#9ca3af", fontSize: 14 }}>Select crop types…</span>}
                                {form.crops.map(c => (
                                    <span key={c} style={{
                                        display: "inline-flex", alignItems: "center", gap: 5,
                                        background: "rgba(26,61,43,0.07)", border: "1px solid rgba(26,61,43,0.15)",
                                        color: "#1a3d2b", borderRadius: 100, padding: "2px 10px", fontSize: 12, fontWeight: 500,
                                    }}>
                                        {c}
                                        <span onClick={e => { e.stopPropagation(); toggleCrop(c) }} style={{ cursor: "pointer", opacity: 0.5, display: "inline-flex" }}>
                                            <Icon name="x" size={10} />
                                        </span>
                                    </span>
                                ))}
                            </div>
                            {dropOpen && (
                                <div style={{
                                    position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 20,
                                    background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 12,
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)", overflow: "hidden",
                                }}>
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
                                        {CROPS.filter(c => !form.crops.includes(c)).map(c => (
                                            <button key={c} onClick={() => toggleCrop(c)} style={{
                                                padding: "10px 12px", textAlign: "left", fontSize: 13, color: "#374151",
                                                background: "#fff", border: "none", borderBottom: "1px solid #f3f4f6",
                                                cursor: "pointer", transition: "background 0.1s",
                                            }}
                                                onMouseEnter={e => e.target.style.background = "#f0f7f2"}
                                                onMouseLeave={e => e.target.style.background = "#fff"}
                                            >{c}</button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </F>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <F label="Farm size">
                            <div style={{ position: "relative" }}>
                                <input className="inp" type="number" style={{ paddingRight: 40 }} value={form.farmSize} onChange={e => set("farmSize", e.target.value)} placeholder="75" />
                                <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>ha</span>
                            </div>
                        </F>
                        <F label="Farming method">
                            <div style={{ display: "flex", gap: 6, paddingTop: 2 }}>
                                {METHODS.map(m => (
                                    <button key={m} onClick={() => set("method", m)} style={{
                                        padding: "8px 12px", borderRadius: 100, fontSize: 12, fontWeight: 500, cursor: "pointer",
                                        border: form.method === m ? "1.5px solid #1a3d2b" : "1.5px solid #e5e7eb",
                                        background: form.method === m ? "#1a3d2b" : "#fff",
                                        color: form.method === m ? "#fff" : "#6b7280",
                                        transition: "all 0.15s",
                                    }}>{m}</button>
                                ))}
                            </div>
                        </F>
                    </div>

                    <F label="Years of operation" optional>
                        <input className="inp" type="number" value={form.years} onChange={e => set("years", e.target.value)} placeholder="12" style={{ maxWidth: 160 }} />
                    </F>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 }}>
                    <BtnG onClick={onBack}><Icon name="arrowLeft" size={13} /> Back</BtnG>
                    <BtnP onClick={() => ok && onContinue(form)} disabled={!ok}>Continue <Icon name="arrowRight" size={13} /></BtnP>
                </div>
            </div>
        </Shell>
    );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE 6 — DOCUMENT UPLOAD
═══════════════════════════════════════════════════════════════ */
function UploadSlot({ status, onFile }) {
    const ref = useRef();
    const [drag, setDrag] = useState(false);

    if (status === "success") return (
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: "#f0f7f2", border: "1.5px solid rgba(26,61,43,0.18)", borderRadius: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1a3d2b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff" }}>
                <Icon name="check" size={16} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#1a3d2b" }}>OrganicCert.pdf</p>
                <p style={{ fontSize: 11, color: "#6b7280", marginTop: 2, fontFamily: "monospace" }}>IPFS: QmXyZ3a8f9bKm2ujH…</p>
            </div>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", display: "flex", padding: 4 }}>
                <Icon name="copy" size={14} />
            </button>
        </div>
    );

    if (status === "uploading") return (
        <div style={{ padding: "14px 18px", border: "1.5px solid #e5e7eb", borderRadius: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af" }}><Icon name="file" size={16} /></div>
                <div>
                    <p style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>Uploading to IPFS…</p>
                    <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>Please wait</p>
                </div>
            </div>
            <div style={{ height: 4, background: "#f3f4f6", borderRadius: 4, overflow: "hidden" }}>
                <div className="anim-bar" style={{ height: "100%", background: "#1a3d2b", borderRadius: 4, width: "0%" }} />
            </div>
        </div>
    );

    if (status === "error") return (
        <div style={{ padding: "14px 18px", background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", color: "#ef4444" }}><Icon name="warning" size={16} /></div>
                <div>
                    <p style={{ fontSize: 13, fontWeight: 500, color: "#b91c1c" }}>Upload failed</p>
                    <p style={{ fontSize: 11, color: "#f87171", marginTop: 2 }}>Network error — please retry</p>
                </div>
            </div>
            <button onClick={() => ref.current.click()} style={{
                fontSize: 12, fontWeight: 500, color: "#dc2626", border: "1px solid #fca5a5",
                background: "#fff", borderRadius: 8, padding: "6px 14px", cursor: "pointer",
            }}>Retry upload</button>
            <input ref={ref} type="file" style={{ display: "none" }} onChange={e => onFile(e.target.files[0])} />
        </div>
    );

    return (
        <div
            onClick={() => ref.current.click()}
            onDragOver={e => { e.preventDefault(); setDrag(true) }}
            onDragLeave={() => setDrag(false)}
            onDrop={e => { e.preventDefault(); setDrag(false); onFile(e.dataTransfer.files[0]) }}
            className="upload-z"
            style={{
                border: `2px dashed ${drag ? "#1a3d2b" : "#d1d5db"}`, borderRadius: 12,
                padding: "28px 20px", textAlign: "center", background: drag ? "#f0f7f2" : "#fafafa", cursor: "pointer",
            }}
        >
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", color: "#9ca3af" }}>
                <Icon name="upload" size={18} />
            </div>
            <p style={{ fontSize: 13, color: "#6b7280" }}>Click or <span style={{ color: "#1a3d2b", fontWeight: 500 }}>drag file here</span></p>
            <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>PDF, JPG, PNG · max 10MB</p>
            <input ref={ref} type="file" style={{ display: "none" }} onChange={e => onFile(e.target.files[0])} />
        </div>
    );
}

function DocumentUploadPage({ onContinue, onBack }) {
    const [docs, setDocs] = useState({ biz: null, primary: "success", secondary: null });
    const simulate = key => {
        setDocs(d => ({ ...d, [key]: "uploading" }));
        setTimeout(() => setDocs(d => ({ ...d, [key]: "success" })), 2400);
    };
    const allOk = docs.biz === "success" && docs.primary === "success";

    const Block = ({ k, label, required, hint }) => (
        <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{label} {required && <span style={{ color: "#ef4444" }}>*</span>}</p>
                    {hint && <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{hint}</p>}
                </div>
                {!required && <span style={{ fontSize: 11, color: "#9ca3af", border: "1px solid #e5e7eb", borderRadius: 100, padding: "3px 10px" }}>Optional</span>}
            </div>
            <UploadSlot status={docs[k]} onFile={() => simulate(k)} />
        </div>
    );

    return (
        <Shell nav={<NavFull role="Farming Enterprise" />}>
            <div style={{ padding: "0 40px 40px" }}>
                <Progress step={3} />

                <div style={{ marginBottom: 28 }}>
                    <h1 className="font-bebas" style={{ fontSize: 40, color: "#1a3d2b", marginBottom: 4 }}>Upload your documents</h1>
                    <p style={{ fontSize: 13, color: "#9ca3af" }}>Required for verification. Files go directly to IPFS — never stored on any server.</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <Block k="biz" label="Business registration certificate" required />
                    <div style={{ borderTop: "1px solid #f3f4f6" }} />
                    <Block k="primary" label="Primary certification" required hint="e.g. Organic certificate, HACCP, Inspector accreditation" />
                    <div style={{ borderTop: "1px solid #f3f4f6" }} />
                    <Block k="secondary" label="Secondary document" hint="Any additional supporting document" />
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 32, paddingTop: 24, borderTop: "1px solid #f3f4f6" }}>
                    <p style={{ fontSize: 11, color: "#9ca3af", maxWidth: 280, lineHeight: 1.6 }}>Files go directly from your browser to IPFS via Pinata. AgriHash never receives or stores any document.</p>
                    <div style={{ display: "flex", gap: 10 }}>
                        <BtnG onClick={onBack}><Icon name="arrowLeft" size={13} /> Back</BtnG>
                        <BtnP onClick={() => allOk && onContinue()} disabled={!allOk}>Review &amp; sign <Icon name="arrowRight" size={13} /></BtnP>
                    </div>
                </div>
            </div>
        </Shell>
    );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE 7 — REVIEW & SIGN
═══════════════════════════════════════════════════════════════ */
function ReviewSignPage({ profile, onConfirm, onBack }) {
    const [pending, setPending] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const sign = () => {
        setPending(true);
        setTimeout(() => { setPending(false); setConfirmed(true); setTimeout(onConfirm, 1800); }, 3200);
    };

    return (
        <Shell nav={<NavFull role="Farming Enterprise" />}>
            <div style={{ padding: "40px 40px 40px" }}>
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <h1 className="font-bebas" style={{ fontSize: 42, color: "#1a3d2b", marginBottom: 4 }}>Review and confirm</h1>
                    <p style={{ fontSize: 14, color: "#6b7280" }}>Verify your information before registering on-chain.</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16 }}>
                    {/* Summary */}
                    <div style={{ border: "1.5px solid #e5e7eb", borderRadius: 16, padding: "24px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                            <div>
                                <span style={{ display: "inline-block", background: "#f0f7f2", border: "1px solid rgba(26,61,43,0.2)", color: "#1a3d2b", fontSize: 11, fontWeight: 600, borderRadius: 100, padding: "4px 12px", marginBottom: 10 }}>
                                    Farming Enterprise
                                </span>
                                <h2 className="font-bebas" style={{ fontSize: 26, color: "#1a3d2b", marginBottom: 4 }}>{profile?.name || "Green Valley Organics"}</h2>
                                <p style={{ fontSize: 13, color: "#6b7280" }}>{profile?.country || "Rwanda"}</p>
                                {profile?.email && <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{profile.email}</p>}
                            </div>
                            <div style={{ width: 48, height: 48, borderRadius: 12, background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af" }}>
                                <Icon name="user" size={22} />
                            </div>
                        </div>

                        <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                            {[
                                { name: "Business registration certificate", cid: "QmXyZ3a8f9bKm2ujH…" },
                                { name: "Organic certificate", cid: "QmAbC7d2e1Np8…" },
                            ].map((d, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "#f9fafb", borderRadius: 10 }}>
                                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#1a3d2b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff" }}>
                                        <Icon name="check" size={13} />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ fontSize: 12, fontWeight: 500, color: "#374151", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.name}</p>
                                        <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 2, fontFamily: "monospace" }}>IPFS CID: {d.cid}</p>
                                    </div>
                                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", flexShrink: 0, display: "flex" }}><Icon name="copy" size={13} /></button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tx details */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <div style={{ border: "1.5px solid #e5e7eb", borderRadius: 16, padding: "20px" }}>
                            <p style={{ fontSize: 13, fontWeight: 600, color: "#111827", marginBottom: 14 }}>Transaction details</p>
                            <div style={{ background: "#f9fafb", borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
                                <p style={{ fontSize: 12, color: "#6b7280" }}>Registration transaction</p>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <p style={{ fontSize: 12, color: "#6b7280" }}>Estimated gas fee</p>
                                <div style={{ textAlign: "right" }}>
                                    <p style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>0.0012 ETH</p>
                                    <p style={{ fontSize: 11, color: "#9ca3af" }}>≈ $2.45 USD</p>
                                </div>
                            </div>
                            <div style={{ marginTop: 14, padding: "12px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10 }}>
                                <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                                    <span style={{ color: "#3b82f6", flexShrink: 0, marginTop: 1 }}><Icon name="info" size={13} /></span>
                                    <p style={{ fontSize: 11, color: "#1d4ed8", lineHeight: 1.6 }}>You will sign one transaction in your wallet to register permanently on Base.</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                            <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />
                            </div>
                            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Secured by Base</span>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div style={{ marginTop: 24 }}>
                    {confirmed ? (
                        <div style={{ padding: "16px", background: "#f0f7f2", border: "1.5px solid rgba(26,61,43,0.2)", borderRadius: 12, textAlign: "center" }}>
                            <p style={{ fontSize: 14, fontWeight: 600, color: "#1a3d2b" }}>✓ Transaction confirmed — redirecting to dashboard…</p>
                        </div>
                    ) : pending ? (
                        <div style={{ padding: "24px", border: "1.5px solid #e5e7eb", borderRadius: 12, textAlign: "center" }}>
                            <div className="anim-spin" style={{ width: 32, height: 32, border: "2.5px solid #e5e7eb", borderTopColor: "#1a3d2b", borderRadius: "50%", margin: "0 auto 14px" }} />
                            <p style={{ fontSize: 14, fontWeight: 500, color: "#374151", marginBottom: 10 }}>Transaction submitted — waiting for confirmation on Base…</p>
                            <a href="#" style={{ fontSize: 12, color: "#3b82f6", display: "inline-flex", alignItems: "center", gap: 4, textDecoration: "none" }}>
                                View on Basescan <Icon name="external" size={11} />
                            </a>
                        </div>
                    ) : (
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <BtnG onClick={onBack}><Icon name="arrowLeft" size={13} /> Back</BtnG>
                            <BtnP onClick={sign} style={{ padding: "12px 32px", fontSize: 15 }}>
                                <span className="font-bebas" style={{ fontSize: 16, letterSpacing: "0.08em" }}>SIGN &amp; REGISTER ON-CHAIN</span>
                            </BtnP>
                        </div>
                    )}
                </div>
            </div>
        </Shell>
    );
}

/* ═══════════════════════════════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════════════════════════════ */
function DashboardPage() {
    return (
        <div style={{ minHeight: "100vh", background: "#1a3d2b", fontFamily: "'DM Sans',sans-serif" }}>
            <GlobalStyles />
            <nav style={{ padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <Logo light />
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>0x7e4...3a1c</span>
                    <span style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 100, padding: "5px 12px", color: "rgba(255,255,255,0.65)", fontSize: 12 }}>Farming Enterprise</span>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", background: "rgba(59,130,246,0.18)", border: "1px solid rgba(96,165,250,0.3)", borderRadius: 100, padding: "5px 12px" }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#60a5fa" }} />
                        <span style={{ fontSize: 11, color: "#93c5fd", fontWeight: 500 }}>Base</span>
                    </div>
                </div>
            </nav>
            <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px" }}>
                <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 18, padding: "24px 28px", marginBottom: 24 }}>
                    <h1 className="font-bebas" style={{ fontSize: 30, color: "#fff", marginBottom: 4 }}>You're registered as Farming Enterprise</h1>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>Register your first crop batch or explore the marketplace to get started.</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
                    {[{ l: "Active batches", v: "0" }, { l: "Pending orders", v: "0" }, { l: "AGT earned", v: "0" }, { l: "Reputation", v: "—" }].map(s => (
                        <div key={s.l} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "18px 16px", textAlign: "center" }}>
                            <p style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>{s.l}</p>
                            <p className="font-bebas" style={{ fontSize: 32, color: "#fff" }}>{s.v}</p>
                        </div>
                    ))}
                </div>
                <button style={{
                    width: "100%", padding: "15px", borderRadius: 12, border: "none", cursor: "pointer",
                    background: "#fff", color: "#1a3d2b",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    transition: "background 0.15s",
                }}
                    onMouseEnter={e => e.currentTarget.style.background = "#f0f7f2"}
                    onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                >
                    <Icon name="plus" size={18} className="" />
                    <span className="font-bebas" style={{ fontSize: 17, letterSpacing: "0.08em" }}>REGISTER A NEW BATCH</span>
                </button>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════ */
export default function App() {
    const [step, setStep] = useState("role");
    const [role, setRole] = useState(null);
    const [profile, setProfile] = useState(null);

    return (
        <>
            {step === "role" && <RoleSelectionPage onContinue={r => { setRole(r); setStep("profile") }} />}
            {step === "profile" && <BasicProfilePage onContinue={d => { setProfile(d); setStep("roleDetails") }} onBack={() => setStep("role")} />}
            {step === "roleDetails" && <RoleDetailsPage onContinue={() => setStep("documents")} onBack={() => setStep("profile")} />}
            {step === "documents" && <DocumentUploadPage onContinue={() => setStep("review")} onBack={() => setStep("roleDetails")} />}
            {step === "review" && <ReviewSignPage profile={profile} onConfirm={() => setStep("dashboard")} onBack={() => setStep("documents")} />}
            {step === "dashboard" && <DashboardPage />}
        </>
    );
}