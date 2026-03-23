import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  canonical?: string;
  noIndex?: boolean;
  // Article-specific
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  // Breadcrumb
  breadcrumbs?: { name: string; url: string }[];
  // FAQ
  faq?: { question: string; answer: string }[];
}

const BASE_URL  = "https://swissfitclub.com";
const SITE_NAME = "Swiss Fit Club";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;

const DEFAULTS: Required<Omit<SEOProps, "article" | "breadcrumbs" | "faq" | "noIndex">> = {
  title:       `${SITE_NAME} | Beylikdüzü Premium Fitness & Spor Salonu`,
  description: "Swiss Fit Club — Beylikdüzü ve Beykent'in premium fitness merkezi. Modern ekipmanlar, profesyonel eğitmenler, grup dersleri. Beykent Paradise AVM.",
  keywords:    "Beylikdüzü spor salonu, Beykent fitness, Beykent spor salonu, personal trainer Beylikdüzü",
  ogImage:     DEFAULT_IMAGE,
  ogType:      "website",
  canonical:   BASE_URL,
};

/* ── Helpers ──────────────────────────────────────────── */
function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function setJsonLd(id: string, data: object) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data, null, 2);
}

function removeJsonLd(id: string) {
  document.getElementById(id)?.remove();
}

/* ── SEOHead ──────────────────────────────────────────── */
export function SEOHead({
  title,
  description,
  keywords,
  ogImage,
  ogType  = "website",
  canonical,
  noIndex = false,
  article,
  breadcrumbs,
  faq,
}: SEOProps) {
  const location = useLocation();
  const pageUrl  = `${BASE_URL}${location.pathname}`;

  const resolvedTitle       = title       ? `${title} | ${SITE_NAME}` : DEFAULTS.title;
  const resolvedDescription = description ?? DEFAULTS.description;
  const resolvedImage       = ogImage     ?? DEFAULTS.ogImage;
  const resolvedCanonical   = canonical   ?? pageUrl;
  const resolvedKeywords    = keywords    ?? DEFAULTS.keywords;

  useEffect(() => {
    /* ── Primary ── */
    document.title = resolvedTitle;
    setMeta("description",           resolvedDescription);
    setMeta("keywords",              resolvedKeywords);
    setMeta("robots",                noIndex ? "noindex, nofollow" : "index, follow");
    setLink("canonical",             resolvedCanonical);

    /* ── Open Graph ── */
    setMeta("og:title",              resolvedTitle,       "property");
    setMeta("og:description",        resolvedDescription, "property");
    setMeta("og:url",                resolvedCanonical,   "property");
    setMeta("og:type",               ogType,              "property");
    setMeta("og:image",              resolvedImage,       "property");
    setMeta("og:image:width",        "1200",              "property");
    setMeta("og:image:height",       "630",               "property");
    setMeta("og:site_name",          SITE_NAME,           "property");
    setMeta("og:locale",             "tr_TR",             "property");

    /* ── Twitter ── */
    setMeta("twitter:card",          "summary_large_image");
    setMeta("twitter:title",         resolvedTitle);
    setMeta("twitter:description",   resolvedDescription);
    setMeta("twitter:image",         resolvedImage);

    /* ── Article meta (Open Graph) ── */
    if (article) {
      if (article.publishedTime) setMeta("article:published_time", article.publishedTime, "property");
      if (article.modifiedTime)  setMeta("article:modified_time",  article.modifiedTime,  "property");
      if (article.author)        setMeta("article:author",         article.author,         "property");
      if (article.section)       setMeta("article:section",        article.section,        "property");
      article.tags?.forEach((tag, i) => {
        let el = document.querySelector<HTMLMetaElement>(`meta[property="article:tag"][data-idx="${i}"]`);
        if (!el) {
          el = document.createElement("meta");
          el.setAttribute("property", "article:tag");
          el.setAttribute("data-idx", String(i));
          document.head.appendChild(el);
        }
        el.content = tag;
      });
    }

    /* ── Article Schema ── */
    if (article) {
      setJsonLd("ld-article", {
        "@context": "https://schema.org",
        "@type":    "Article",
        "headline": resolvedTitle,
        "description": resolvedDescription,
        "image":    resolvedImage,
        "url":      resolvedCanonical,
        "datePublished": article.publishedTime,
        "dateModified":  article.modifiedTime ?? article.publishedTime,
        "author": {
          "@type": "Person",
          "name":  article.author ?? "Swiss Fit Club",
        },
        "publisher": {
          "@type": "Organization",
          "name":  SITE_NAME,
          "logo": {
            "@type": "ImageObject",
            "url":   `${BASE_URL}/logo.png`,
          },
        },
        "mainEntityOfPage": {
          "@type": "@id",
          "@id":   resolvedCanonical,
        },
        "articleSection": article.section,
        "keywords":       article.tags?.join(", "),
      });
    } else {
      removeJsonLd("ld-article");
    }

    /* ── Breadcrumb Schema ── */
    if (breadcrumbs?.length) {
      setJsonLd("ld-breadcrumb", {
        "@context":        "https://schema.org",
        "@type":           "BreadcrumbList",
        "itemListElement": breadcrumbs.map((bc, i) => ({
          "@type":    "ListItem",
          "position": i + 1,
          "name":     bc.name,
          "item":     bc.url,
        })),
      });
    } else {
      removeJsonLd("ld-breadcrumb");
    }

    /* ── FAQ Schema ── */
    if (faq?.length) {
      setJsonLd("ld-faq", {
        "@context":   "https://schema.org",
        "@type":      "FAQPage",
        "mainEntity": faq.map(({ question, answer }) => ({
          "@type":           "Question",
          "name":            question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text":  answer,
          },
        })),
      });
    } else {
      removeJsonLd("ld-faq");
    }
  }, [
    resolvedTitle, resolvedDescription, resolvedKeywords,
    resolvedImage, resolvedCanonical, ogType, noIndex,
    article, breadcrumbs, faq,
  ]);

  return null;
}

export default SEOHead;
