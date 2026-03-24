import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo.png";

/* ── Fonts (inject once) ──────────────────────────────── */
if (typeof document !== "undefined" && !document.getElementById("sfc-fonts")) {
  const l = document.createElement("link");
  l.id = "sfc-fonts";
  l.rel = "stylesheet";
  l.href =
    "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&family=Share+Tech+Mono&display=swap";
  document.head.appendChild(l);
}

const RED = "#e82727";
const ffC = "'Barlow Condensed', sans-serif";
const ff  = "'Barlow', sans-serif";

const navLinks: { to: string; label: string }[] = [
  { to: "/",              label: "Ana Sayfa"        },
  { to: "/kuluplerimiz",  label: "Kulüplerimiz"     },
  { to: "/grup-dersleri", label: "Grup Derslerimiz" },
  { to: "/hizmetlerimiz", label: "Hizmetlerimiz"    },
  { to: "/blog",          label: "Blog"             },
  { to: "/iletisim",      label: "İletişim"         },
];

/* ── NavLink ──────────────────────────────────────────── */
interface NavLinkProps {
  to: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}

function NavLink({ to, label, active, onClick }: NavLinkProps) {
  const [hov, setHov] = useState(false);
  const on = active || hov;
  return (
    <Link
      to={to}
      onClick={onClick}
      style={{
        position: "relative",
        padding: "6px 16px",
        fontFamily: ffC,
        fontWeight: 700,
        fontSize: 14,
        letterSpacing: "0.1em",
        color: active ? RED : hov ? "#1a1a2e" : "#6b7280",
        textDecoration: "none",
        transition: "color .2s",
        display: "inline-block",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {label}
      <span
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          height: 2,
          background: RED,
          width: on ? "75%" : "0%",
          transition: "width .25s cubic-bezier(.22,1,.36,1)",
          display: "block",
          borderRadius: 1,
        }}
      />
    </Link>
  );
}

/* ── CTA Button ───────────────────────────────────────── */
interface CtaBtnProps {
  onClick?: () => void;
  full?: boolean;
}

function CtaBtn({ onClick, full = false }: CtaBtnProps) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      to="/iletisim"
      onClick={onClick}
      style={{ textDecoration: "none", display: full ? "block" : "inline-block" }}
    >
      <button
        style={{
          background: hov ? "#c0211f" : RED,
          color: "#fff",
          border: "none",
          borderRadius: 6,
          padding: full ? "13px 24px" : "9px 22px",
          fontFamily: ffC,
          fontWeight: 800,
          fontSize: 13,
          letterSpacing: "0.12em",
          cursor: "pointer",
          transition: "all .2s",
          width: full ? "100%" : "auto",
          marginTop: full ? 8 : 0,
          boxShadow: "0 2px 8px rgba(232,39,39,0.2)",
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        HEMEN BAŞLA
      </button>
    </Link>
  );
}

/* ── Header ───────────────────────────────────────────── */
const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        fontFamily: ff,
        background: scrolled ? "rgba(255,255,255,0.95)" : "#ffffff",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${scrolled ? "#e8e4df" : "#f0ece7"}`,
        transition: "background .3s, border-color .3s, box-shadow .3s",
        boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.06)" : "none",
      }}
    >
      {/* Top red micro-stripe */}
      <div
        style={{
          height: 2,
          background: RED,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
        }}
      />

      {/* Main bar */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="Swiss Fit Club"
            style={{
              height: 120,
              width: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </Link>

        {/* Desktop nav */}
        <nav
          style={{ display: "flex", alignItems: "center", gap: 4 }}
          className="sfc-desktop-nav"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              label={link.label}
              active={location.pathname === link.to}
            />
          ))}
          <div style={{ marginLeft: 12 }}>
            <CtaBtn />
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          style={{
            background: "none",
            border: `1px solid ${mobileOpen ? RED + "44" : "#d5d0ca"}`,
            borderRadius: 6,
            padding: "7px 9px",
            color: mobileOpen ? RED : "#6b7280",
            cursor: "pointer",
            transition: "all .2s",
            display: "none",
          }}
          className="sfc-mobile-btn"
          aria-label="Menüyü aç/kapat"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "#ffffff",
              borderBottom: "1px solid #e8e4df",
              overflow: "hidden",
            }}
          >
            <nav
              style={{
                maxWidth: 1200,
                margin: "0 auto",
                padding: "12px 24px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {navLinks.map((link, i) => {
                const active = location.pathname === link.to;
                return (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "11px 14px",
                        borderRadius: 6,
                        background: active ? RED + "08" : "transparent",
                        borderLeft: `2px solid ${active ? RED : "transparent"}`,
                        fontFamily: ffC,
                        fontWeight: 700,
                        fontSize: 15,
                        letterSpacing: "0.08em",
                        color: active ? RED : "#6b7280",
                        textDecoration: "none",
                        transition: "all .15s",
                      }}
                    >
                      {active && (
                        <span style={{ color: RED, fontSize: 10 }}>●</span>
                      )}
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navLinks.length * 0.04 }}
              >
                <CtaBtn onClick={() => setMobileOpen(false)} full />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          .sfc-desktop-nav { display: none !important; }
          .sfc-mobile-btn  { display: block !important; }
        }
      `}</style>
    </header>
  );
};

export default Header;