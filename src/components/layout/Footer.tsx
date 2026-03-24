import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import logo from "../../assets/logo1.png";

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
const ffM = "'Share Tech Mono', monospace";

const navLinks = [
  { to: "/",              label: "Ana Sayfa"        },
  { to: "/kuluplerimiz",  label: "Kulüplerimiz"     },
  { to: "/grup-dersleri", label: "Grup Derslerimiz" },
  { to: "/hizmetlerimiz", label: "Hizmetlerimiz"    },
  { to: "/blog",          label: "Blog"             },
  { to: "/iletisim",      label: "İletişim"         },
];

const blogLinks = [
  { to: "/blog/beylikduzu-spor-salonu", label: "Beylikdüzü Spor Salonu Rehberi" },
  { to: "/blog/beykent-spor-salonu",    label: "Beykent Spor Salonu Tavsiyesi"  },
  { to: "/blog/grup-dersleri",          label: "Grup Dersleri Rehberi"          },
];

interface SocialItem { Icon: React.ElementType; href: string; label: string; }
interface ContactItem { Icon: React.ElementType; text: string; }

const socials: SocialItem[] = [
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Facebook,  href: "#", label: "Facebook"  },
  { Icon: Youtube,   href: "#", label: "YouTube"   },
];

const contact: ContactItem[] = [
  { Icon: MapPin, text: "Beykent Paradise AVM, Beylikdüzü / İstanbul" },
  { Icon: Phone,  text: "+90 (212) 000 00 00"                         },
  { Icon: Mail,   text: "info@swissfitclub.com"                        },
];

/* ── Social Icon Button ───────────────────────────────── */
function SocialBtn({ Icon, href, label }: SocialItem) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      aria-label={label}
      style={{
        width: 38,
        height: 38,
        borderRadius: "50%",
        border: `1px solid ${hov ? RED + "44" : "#e0dbd5"}`,
        background: hov ? RED + "0a" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: hov ? RED : "#9ca3af",
        transition: "all .2s",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <Icon size={16} />
    </a>
  );
}

/* ── Nav Link ─────────────────────────────────────────── */
function NavLink({ to, label }: { to: string; label: string }) {
  const [hov, setHov] = useState(false);
  return (
    <li style={{ listStyle: "none", marginBottom: 10 }}>
      <Link
        to={to}
        style={{
          display: "block",
          fontFamily: ff,
          fontSize: 13,
          color: hov ? RED : "#6b7280",
          textDecoration: "none",
          padding: "4px 0",
          transition: "color .2s",
          letterSpacing: "0.02em",
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {hov ? "▸ " : "— "}{label}
      </Link>
    </li>
  );
}

/* ── Footer ───────────────────────────────────────────── */
const Footer: React.FC = () => (
  <footer
    style={{
      background: "#ffffff",
      borderTop: "1px solid #e8e4df",
      fontFamily: ff,
      position: "relative" as const,
      overflow: "hidden",
    }}
  >
    {/* Top red stripe */}
    <div
      style={{
        position: "absolute" as const,
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: RED,
      }}
    />

    {/* Main content */}
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "72px 24px 0",
        position: "relative" as const,
        zIndex: 1,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1.4fr",
          gap: 48,
        }}
      >
        {/* Brand column */}
        <div>
          <Link to="/" style={{ textDecoration: "none", display: "inline-block", marginBottom: 16 }}>
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
          <div style={{ width: 40, height: 2, background: RED, marginBottom: 16 }} />
          <p
            style={{
              color: "#6b7280",
              fontSize: 13,
              lineHeight: 1.8,
              maxWidth: 280,
            }}
          >
            Beylikdüzü ve Beykent'in premium fitness deneyimi. Modern ekipmanlar,
            profesyonel eğitmenler ve lüks spor salonu ortamıyla sağlıklı yaşamınıza
            değer katıyoruz.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            {socials.map(({ Icon, href, label }) => (
              <SocialBtn key={label} Icon={Icon} href={href} label={label} />
            ))}
          </div>
        </div>

        {/* Quick Menu */}
        <div>
          <div
            style={{
              fontFamily: ffC,
              fontWeight: 800,
              fontSize: 16,
              letterSpacing: "0.12em",
              color: "#1a1a2e",
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                width: 18,
                height: 2,
                background: RED,
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            HIZLI MENÜ
          </div>
          <ul style={{ padding: 0 }}>
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} label={l.label} />
            ))}
          </ul>
        </div>

        {/* Blog */}
        <div>
          <div
            style={{
              fontFamily: ffC,
              fontWeight: 800,
              fontSize: 16,
              letterSpacing: "0.12em",
              color: "#1a1a2e",
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                width: 18,
                height: 2,
                background: RED,
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            BLOG
          </div>
          <ul style={{ padding: 0 }}>
            {blogLinks.map((l) => (
              <NavLink key={l.to} to={l.to} label={l.label} />
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div
            style={{
              fontFamily: ffC,
              fontWeight: 800,
              fontSize: 16,
              letterSpacing: "0.12em",
              color: "#1a1a2e",
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                width: 18,
                height: 2,
                background: RED,
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            İLETİŞİM
          </div>
          {contact.map(({ Icon, text }) => (
            <div
              key={text}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                marginBottom: 14,
              }}
            >
              <Icon size={15} color={RED} style={{ marginTop: 2, flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>
                {text}
              </span>
            </div>
          ))}

          {/* CTA */}
          <a
            href="/iletisim"
            style={{
              display: "inline-block",
              marginTop: 8,
              background: RED,
              color: "#fff",
              fontFamily: ffC,
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.12em",
              padding: "9px 20px",
              borderRadius: 6,
              textDecoration: "none",
              transition: "all .2s",
              boxShadow: "0 2px 8px rgba(232,39,39,0.2)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#c0211f")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = RED)
            }
          >
            HEMEN BAŞLA →
          </a>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div
      style={{
        borderTop: "1px solid #e8e4df",
        marginTop: 60,
        padding: "20px 24px",
        position: "relative" as const,
        zIndex: 1,
        background: "#faf8f6",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap" as const,
        }}
      >
        <p style={{ fontFamily: ffM, fontSize: 10, color: "#9ca3af", letterSpacing: "0.08em" }}>
          © {new Date().getFullYear()} SWISS FIT CLUB. TÜM HAKLARI SAKLIDIR.
        </p>
        <p style={{ fontFamily: ffM, fontSize: 10, color: "#9ca3af", letterSpacing: "0.1em" }}>
          BEYLİKDÜZÜ'NÜN PREMİUM FITNESS DENEYİMİ
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;