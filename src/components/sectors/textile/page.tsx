"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import Image from "next/image";
import OverviewHero from "./overview/OverviewHero";
import CategoriesTextile from "./overview/CategoriesTextile";
import IGGExplore from "./overview/explore";


/* =========================
   TABS
========================= */
type TabKey =
  | "overview"
  | "racing-merchandise"
  | "workwear"
  | "military-police-security-wear"
  | "corporate-wear-uniforms"
  | "promotional-wear-accessories"
  | "sports-teamwear"
  | "e-gaming"
  | "towel-home";

type Tab = { key: TabKey; label: string; image?: string; alt?: string };

const TABS: Tab[] = [
  { key: "overview", label: "Overview", image: "/assets/sectors/textile/overview.png", alt: "Overview hero image" },
  { key: "racing-merchandise", label: "Racing & Merchandise", alt: "Racing merchandise" },
  { key: "workwear", label: "Workwear", alt: "Workwear" },
  { key: "military-police-security-wear", label: "Military, Police & Security", alt: "Military police security" },
  { key: "corporate-wear-uniforms", label: "Corporate & Uniforms", alt: "Corporate uniforms" },
  { key: "promotional-wear-accessories", label: "Promotional & Accessories", alt: "Promotional accessories" },
  { key: "sports-teamwear", label: "Sports & Teamwear", alt: "Sports teamwear" },
  { key: "e-gaming", label: "E-Gaming", alt: "E-Gaming apparel" },
  { key: "towel-home", label: "Towel & Home", alt: "Towel and home textiles" },
];

const DEFAULT_TAB: TabKey = "overview";

const NEXT_BG: Record<TabKey, string> = {
  overview: "/assets/sectors/textile/next/overview.jpg",
  "racing-merchandise": "/assets/sectors/textile/next/racing-merchandise.jpg",
  workwear: "/assets/sectors/textile/next/workwear.jpg",
  "military-police-security-wear": "/assets/sectors/textile/next/military-police-security-wear.jpg",
  "corporate-wear-uniforms": "/assets/sectors/textile/next/corporate-wear-uniforms.jpg",
  "promotional-wear-accessories": "/assets/sectors/textile/next/promotional-wear-accessories.jpg",
  "sports-teamwear": "/assets/sectors/textile/next/sports-teamwear.jpg",
  "e-gaming": "/assets/sectors/textile/next/racing-merchandise.jpg",
  "towel-home": "/assets/sectors/textile/next/workwear.jpg",
};

/* =========================
   TAB STATE (URL hash ile)
========================= */
function useTabState() {
  const readFromHash = useCallback((): TabKey | null => {
    if (typeof window === "undefined") return null;
    const m = window.location.hash.match(/tab=([a-z0-9-]+)/i);
    const k = (m?.[1] ?? "") as TabKey;
    return TABS.some((t) => t.key === k) ? k : null;
  }, []);
  const [active, setActive] = useState<TabKey>(readFromHash() || DEFAULT_TAB);

  useEffect(() => {
    const onHash = () => {
      const k = readFromHash();
      if (k && k !== active) setActive(k);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [active, readFromHash]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.hash = `tab=${active}`;
    window.history.replaceState(null, "", url.toString());
  }, [active]);

  return { active, setActive };
}

/* =========================
   CORNER CAP (diagonal)
========================= */
function CornerCap() {
  return (
    <svg
      className="absolute left-0 top-0 z-30 h-[80px] w-[110px] sm:h-[90px] sm:w-[120px] md:h-[150px] md:w-[220px]"
      viewBox="0 0 420 110"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M0 0 H420 C300 0 170 55 0 110 L0 0 Z" fill="white" />
    </svg>
  );
}

/* =========================
   CONTENT TYPES
========================= */
type ContentBlock = {
  title: string;
  body: string;
  image: string;
  alt: string;
  reverse?: boolean;
  level?: 2 | 3;
};

type TabContent = {
  intro: string[];
  blocks: ContentBlock[];
};

/* =========================
   CONTENT BY TAB
========================= */
const CONTENT: Record<TabKey, TabContent> = {
  overview: { intro: [], blocks: [] },

  "racing-merchandise": {
    intro: [],
    blocks: [
      {
        title: "Engineered for performance",
        body:
          "In racing apparel, speed, flexibility, and strong design are at the forefront. In every project, we bring unique styles to life, incorporating sponsor logos and specialized printing techniques. Our production process is managed with discipline and precision, even within short time frames, ensuring that every product captures the true spirit and excitement of racing.",
        image: "/assets/sectors/textile/racing/racing1.png",
        alt: "Engineered performance",
        level: 2,
      },
      {
        title: "Bold identity, crisp details",
        body:
          "Consistency and quality are core values in our work. From small local events to major international competitions, we approach every project with the same attention to detail. Every aspect, from fabric selection to printing methods, is carefully defined to ensure that each product clearly reflects the brand’s identity on the track.",
        image: "/assets/sectors/textile/racing/racing2.png",
        alt: "Identity details",
        reverse: true,
        level: 3,
      },
      {
        title: "From limited drops to full scale",
        body:
          "Our focus on variety and technical details is what sets us apart in the racing category. Flexible patterns, functional fabrics, and modern designs allow us to deliver projects seamlessly. Throughout the process, we maintain transparent communication with our clients. In the end, the final product is more than just apparel – it is a tangible expression of speed and passion.",
        image: "/assets/sectors/textile/racing/racing3.png",
        alt: "Scale",
        level: 3,
      },
    ],
  },

  workwear: {
    intro: [],
    blocks: [
      {
        title: "Built to last",
        body:
          "With our wide range of products in the workwear category, we deliver tailored solutions for the needs of diverse industries. Protection, durability, and functionality are at the heart of every design. Our production process goes beyond manufacturing; we integrate logistics planning to ensure reliable and sustainable outcomes.",
        image: "/assets/sectors/textile/workwear/workwear1.png",
        alt: "Durable workwear",
        level: 2,
      },
      {
        title: "Utility with comfort",
        body:
          "We recognize that each industry has its own specific requirements. That’s why we incorporate features such as high visibility, heat resistance, or chemical resistance into our designs on a project-by-project basis. This approach allows us to maximize workplace safety and efficiency, while maintaining strict standards at every stage through robust quality control mechanisms.",
        image: "/assets/sectors/textile/workwear/workwear22.png",
        alt: "Utility",
        reverse: true,
        level: 3,
      },
      {
        title: "Simple care, fast turnaround",
        body:
          "To respond quickly to demand, we operate with a large production capacity. Our flexible stock solutions allow us to meet needs within short timeframes. Through planned process management, we consistently provide our customers with dependable results. In this way, our workwear stands out not only in the field but also in production and delivery.",
        image: "/assets/sectors/textile/workwear/workwear3.png",
        alt: "Care",
        level: 3,
      },
    ],
  },

  "military-police-security-wear": {
    intro: [],
    blocks: [
      {
        title: "Mobility under load",
        body:
          "We have been providing solutions in the military and security sector for many years. In uniforms, boots, and technical equipment, we prioritize high standards and durability. All materials are carefully selected to withstand harsh conditions, ensuring that our products consistently represent reliability.",
        image: "/assets/sectors/textile/military/military1.png",
        alt: "Mobility",
        level: 2,
      },
      {
        title: "Low-profile, high control",
        body:
          "We apply strict quality control procedures, leaving nothing to chance. It is well known that a fully equipped soldier carries a very heavy load during operational duties. Under such demanding conditions, the lightness, breathability, and comfort of clothing become vital. For this reason, we design our products to be not only durable, but also ergonomic and user-friendly. This enables us to balance functionality and aesthetics while maximizing safety and mobility for personnel in the field.",
        image: "/assets/sectors/textile/military/military2.png",
        alt: "Low profile",
        reverse: true,
        level: 3,
      },
      {
        title: "Standardized, then specialized",
        body:
          "Our capacity planning is managed flexibly according to the scale of each project. We maintain the same discipline in small orders as we do in large-scale productions. With our wide product range, we can easily respond to the needs of different institutions, while regular updates throughout the process ensure that expectations are fully met.",
        image: "/assets/sectors/textile/military/military3.png",
        alt: "Modular",
        level: 3,
      },
    ],
  },

  "corporate-wear-uniforms": {
    intro: [],
    blocks: [
      {
        title: "Consistent fit at scale",
        body:
          "We strengthen the outward identity of brands in the corporate apparel sector. We know how important first impressions are for professionalism and prestige, and we support this perception with our corporate solutions. With our wide range of products, we serve different industries and meet all organizational needs from a single point. We manage every step, from design to logistics, in a planned way. This makes processes easier and more manageable.",
        image: "/assets/sectors/textile/corporate/corporate1.png",
        alt: "Fit",
        level: 2,
      },
      {
        title: "Fabric that works",
        body:
          "In corporate clothing, we bring functionality and consistency together. With our experience across multiple industries, Info Group Global adapts its designs to the unique needs of each sector, offering solutions that reflect both practicality and style. We enrich projects with a variety of fabric, model, and accessory options. We carry out the delivery process in full compliance with the planned schedule.",
        image: "/assets/sectors/textile/corporate/corporate2.png",
        alt: "Fabric",
        reverse: true,
        level: 3,
      },
      {
        title: "Identity in the details",
        body:
          "The corporate clothing solutions we provide can be applied across different sectors. Managing the process from a single center gives organizations both time and cost advantages. With our post-production logistics support, we complete the process as a whole. The result creates added value for brands, both visually and functionally.",
        image: "/assets/sectors/textile/corporate/corporate3.png",
        alt: "Details",
        level: 3,
      },
    ],
  },

  "promotional-wear-accessories": {
    intro: [],
    blocks: [
      {
        title: "Premium basics, better prints",
        body:
          "In the promotional category, we offer solutions that enhance brand visibility. We customize products such as T-shirts, polo shirts, hats, and bags for specific campaigns. Through our printing and embroidery applications, we transform each item into a distinctive design. We also manage delivery processes in line with the planned schedule.",
        image: "/assets/sectors/textile/promotional/promotional1.png",
        alt: "Basics",
        level: 2,
      },
      {
        title: "Accessories that travel",
        body:
          "Diversity and speed are the most prominent features of our promotional projects. The wide range of models we prepare can be adapted to the needs of different campaigns. We provide solutions for every scale, from short-term events to long-term projects, creating a powerful communication tool for brands.",
        image: "/assets/sectors/textile/promotional/promotional2.png",
        alt: "Accessories",
        reverse: true,
        level: 3,
      },
      {
        title: "Fast campaigns, low MOQs",
        body:
          "The customizability of our promotional products is our most significant advantage. We design colors, textures, and printing techniques in harmony with the brand’s identity. Throughout the process, we prioritize timing and feasibility as key criteria. Ultimately, we deliver unique visibility and lasting impact for brands.",
        image: "/assets/sectors/textile/promotional/promotional3.png",
        alt: "Fast",
        level: 3,
      },
    ],
  },

  "sports-teamwear": {
    intro: [],
    blocks: [
      {
        title: "Move, breathe, repeat",
        body:
          "Ergonomics and comfort are top priorities in our sportswear projects. Using technical fabrics, we design products that emphasize freedom of movement and high performance. Through print and logo applications, we bring brand identity to the field. Our solutions serve a wide audience, from professional clubs to educational institutions.",
        image: "/assets/sectors/textile/sports/sports1.png",
        alt: "Breathability",
        level: 2,
      },
      {
        title: "Precision patterns",
        body:
          "In sportswear, visual unity is just as important as performance. With uniforms that embody team spirit, we deliver designs that are both aesthetic and practical. Each project is brought to life with models and application techniques tailored to specific needs. Thanks to regular communication, we ensure transparency at every stage of the process.",
        image: "/assets/sectors/textile/sports/sports2.png",
        alt: "Pattern",
        reverse: true,
        level: 3,
      },
      {
        title: "Unified identity",
        body:
          "The variety of our products and the emphasis we place on technical details set us apart. Across all sports disciplines, our designs provide long-lasting wear and deliver solutions that fully meet expectations. The result is apparel that satisfies both visually and functionally.",
        image: "/assets/sectors/textile/sports/sports3.png",
        alt: "Identity",
        level: 3,
      },
    ],
  },

  // E-Gaming uses same content as racing-merchandise
  "e-gaming": JSON.parse(JSON.stringify({
    intro: [],
    blocks: [
      {
        title: "Engineered for performance",
        body:
          "Moisture management, breathability and lightweight strength come standard. We leverage advanced yarn blends and ergonomic patterning to keep comfort and mobility at the forefront — from pit lane to podium.",
        image: "/assets/sectors/textile/racing/engineered.png",
        alt: "Engineered performance",
        level: 2,
      },
      {
        title: "Bold identity, crisp details",
        body:
          "Sponsor palettes and team marks are reproduced with exacting fidelity across batches. Heat-transfer, silicone, puff and high-density techniques are matched to fabric behavior for sharp, enduring detail.",
        image: "/assets/sectors/textile/racing/identity.png",
        alt: "Identity details",
        reverse: true,
        level: 3,
      },
      {
        title: "From limited drops to full scale",
        body:
          "Whether it’s a capsule drop or a season-long program, our planning and QA frameworks keep quality stable at speed — forecasting, sampling and inline testing at each stage.",
        image: "/assets/sectors/textile/racing/scale.png",
        alt: "Scale",
        level: 3,
      },
    ],
  })),

  // Towel & Home uses same content as workwear (customized)
  "towel-home": JSON.parse(JSON.stringify({
    intro: [],
    blocks: [
      {
        title: "Built to last",
        body:
          "We take pride in delivering hospitality-grade textile solutions that blend comfort, sophistication, and resilience. Specialising in luxury bath towels, spa towels, pool towels, and bed and bath linens, we partner with hotels, resorts, and spas to elevate every guest experience.  Each product is designed to withstand frequent washing—colourfast, absorbent, and quick-drying—ensuring enduring quality and performance. Our textiles redefine luxury by combining plush softness with practical design, enhancing both relaxation and durability.",
        image: "/assets/sectors/textile/towel/towel1.png",
        alt: "Durable workwear",
        level: 2,
      },
      {
        title: "Utility with comfort",
        body:
          "Our home textile offerings are crafted with the same attention to detail and durability found in our hospitality line. Whether it's towels for the bathroom or textiles for the bed, every fibre is selected to deliver elegance and ease of care. High-quality weaving, precise stitching, and design excellence are woven into each product, guaranteeing consistent performance across everyday use. With our home collection, you bring a touch of hotel-style refinement into your daily life.",
        image: "/assets/sectors/textile/towel/towel2.png",
        alt: "Utility",
        reverse: true,
        level: 3,
      },
      {
        title: "Simple care, fast turnaround",
        body:
          "Supported by advanced production techniques and a deep commitment to innovation, we continuously push the boundaries of home textile quality. From precision weaving and finishing to sustainable practices, every step of our process reflects operational excellence. We believe in enriching your living spaces with products that are not only beautiful but built to last, offering both utility and an elevated sense of luxury.",
        image: "/assets/sectors/textile/towel/towel3.png",
        alt: "Care",
        level: 3,
      },
    ],
  })),
};


/* =========================
   NEXT CHAPTER
========================= */
function NextChapter({ active, setActive }: { active: TabKey; setActive: (k: TabKey) => void; }) {
  const idx = TABS.findIndex((t) => t.key === active);
  const nextIdx = (idx + 1) % TABS.length;
  const next = TABS[nextIdx];
  const bg = NEXT_BG[next.key] ?? "/assets/sectors/textile/next/fallback.jpg";

  const goNext = () => {
    setActive(next.key);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && "Image" in window) {
      const img = new window.Image();
      img.src = bg;
    }
  }, [bg]);

  return (
    <section
      role="button"
      tabIndex={0}
      onClick={goNext}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && goNext()}
      className="group relative mt-8 w-full overflow-hidden cursor-pointer select-none outline-none"
      aria-label={`Next chapter: ${next.label}`}
    >
      <div className="absolute inset-0">
        <Image src={bg} alt={next.alt ?? next.label} fill sizes="100vw" className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/0" />
      <div className="relative z-10 flex w-full items-center justify-center sm:justify-start px-6 sm:px-10 md:px-16 lg:px-24 py-16 sm:py-20 lg:py-24 text-white">
        <div className="flex flex-col items-start gap-3 pr-8">
          <span className="text-2xl sm:text-3xl md:text-4xl leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
          <p className="text-sm sm:text-base md:text-2xl font-medium tracking-wide">Next chapter</p>
          <p className="mt-1 text-sm text-white/80 sm:hidden">{next.label}</p>
        </div>
        <div className="relative hidden sm:block mr-8">
          <div className="h-28 w-px bg-white/30 origin-top transition-transform duration-500 group-hover:scale-y-110" />
        </div>
        <div className="hidden sm:block flex-1 min-w-0">
          <div className="flex items-center gap-4">
            <span className="block h-px w-8 bg-white/40 transition-all duration-500 group-hover:w-24" />
            <h3 className="truncate text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-light tracking-widest uppercase">{next.label}</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================
   PAGE
========================= */
export default function TextilePage() {
  const { active, setActive } = useTabState();
  const activeTab = useMemo(() => TABS.find((t) => t.key === active)!, [active]);
  const isOverview = active === "overview";

  /* Header hide/show (scroll YÖNÜNE DUYARLI) + offsets */
  const [headerH, setHeaderH] = useState<number>(80);
  const lastYRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hdr =
      (document.querySelector('header[role="banner"]') as HTMLElement) ||
      (document.querySelector("header") as HTMLElement);

    const writeVars = (y: number, showHeader: boolean, headerHeight: number) => {
      // header görünür/gizli sınıfı
      document.documentElement.classList.toggle("igg-header-hidden", !showHeader && y > 50);
      // subnav top
      const topPx = showHeader ? headerHeight : (y > 50 ? 0 : headerHeight);
      document.documentElement.style.setProperty("--subnav-top", `${topPx}px`);
    };

    const measure = () => {
      const h = hdr ? hdr.getBoundingClientRect().height : 80;
      setHeaderH(h);
      document.documentElement.style.setProperty("--header-h", `${h}px`);

      const y = window.scrollY || 0;
      // ilk ölçümde: 50 altındaysa göster, üstündeyse aşağı mı yukarı mı bilmiyoruz → varsayılan: aşağı kabul etme, görünür tut
      const showHeader = y <= 50; 
      writeVars(y, showHeader, h);
      lastYRef.current = y;
    };

    const onScroll = () => {
      const exec = () => {
        const y = window.scrollY || 0;
        const prev = lastYRef.current;
        const goingDown = y > prev + 2;   // küçük jitter filtre
        const goingUp = y < prev - 2;

        let showHeader: boolean;
        if (y <= 50) {
          // eşik altında her zaman görünür
          showHeader = true;
        } else {
          // eşik üstünde yön tabanlı
          if (goingUp) showHeader = true;
          else if (goingDown) showHeader = false;
          else {
            // hareket çok küçükse mevcut durumu koru
            const currentlyHidden = document.documentElement.classList.contains("igg-header-hidden");
            showHeader = !currentlyHidden;
          }
        }

        writeVars(y, showHeader, hdr ? hdr.getBoundingClientRect().height : headerH);
        lastYRef.current = y;
        rafRef.current = null;
      };

      if (rafRef.current == null) {
        rafRef.current = window.requestAnimationFrame(exec);
      }
    };

    measure();
    window.addEventListener("load", measure);
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("load", measure);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [headerH]);

  /* Preload hero (safe) */
  useEffect(() => {
    if (typeof window !== "undefined" && "Image" in window) {
      const t = TABS.find((x) => x.key === "overview");
      if (t?.image) {
        const img = new window.Image();
        img.src = t.image;
      }
    }
  }, []);

  /* Mobile dropdown */
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [active]);

  const content = CONTENT[active];

  return (
    <main className="w-full bg-white text-white">
      <div style={{ height: `var(--header-h, ${headerH}px)` }} />

      {isOverview ? (
        <section className="relative isolate">
          <CornerCap />
          <div className="relative w-full overflow-hidden">
            <div className="relative h-[60vh] min-h-[460px] lg:h-[54vh]">
              <Image src={activeTab.image!} alt={activeTab.alt || "Overview"} fill sizes="100vw" className="object-cover object-[50%_88%]" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-transparent" />
              <div className="relative z-20 mx-auto max-w-[1200px] px-6 pt-40">
                <p className="text-lg sm:text-xl md:text-2xl text-white/90">We are IGG.</p>
                <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-[64px] leading-[1.05] tracking-[0.04em]">
                  ADVANCED TEXTILE SOLUTIONS
                </h1>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="relative isolate">
          <CornerCap />
          <div className="relative w-full bg-[linear-gradient(232deg,#181c20,#363f44)]">
            <div className="mx-auto max-w-[1200px] px-6 py-14 md:py-20">
              <p className="text-sm ml-5 sm:text-base text-white/85">We are IGG.</p>
              <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase">
                {activeTab.label}
              </h1>
            </div>
          </div>
        </section>
      )}

{/* SUB MENU (sticky + horizontal scroll kapalı, tam görünür ve sığan linkler) */}
<nav
  aria-label="Textile sub navigation"
  className="sticky z-30 bg-white text-[#1a1a1a] shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.06)]"
  style={{ top: "var(--subnav-top, var(--header-h, 80px))" }}
>
  <div className="w-full">
    <div className="hidden lg:block py-3">
      <div
        className="subnav-tabs-container"
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "nowrap",
          overflowX: "visible",  // Yatay scroll kapalı
          gap: "clamp(15px, 1.5vw, 28px)",  // Daha küçük min gap, responsive artış
          paddingRight: "clamp(12px, 2vw, 32px)",  // Responsive padding
          paddingLeft: "clamp(12px, 2vw, 32px)",   // Responsive padding
          justifyContent: "space-between",  // Linkler geniş ekranda eşit boşlukta
        }}
      >
        {TABS.filter(tab => tab.key !== "overview").map((tab) => {
          const isActive = tab.key === active;
          return (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`shrink-0 relative uppercase hover:cursor-pointer font-bold transition-colors text-[12px] tracking-[0.12em] pb-2.5 pt-3.5 line-clamp-none ${
                isActive ? "text-[#1a1a1a]" : "text-slate-400 hover:text-slate-800"
              }`}
              title={tab.label}
              style={{
                flex: "1 1 auto",   // Butonlar orantılı büyüyüp küçülebilir
                minWidth: "60px",   // Minimum makul genişlik
                whiteSpace: "nowrap",
                textAlign: "center",
                fontFamily: "Noto-Sans, source-han-sans, sans-serif",
                fontWeight: 800,
                letterSpacing: "1px",
                overflow: "visible",
                textOverflow: "clip",  // Yazı kesilmez
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
    <div className="lg:hidden">
      <MobileDropdown open={open} setOpen={setOpen} active={active} setActive={setActive} />
    </div>
  </div>
  <div className="h-px w-full bg-black/10 " />
  <style jsx global>{`
    header[role="banner"], header {
      transition: transform 280ms ease;
      will-change: transform;
    }
    html.igg-header-hidden header[role="banner"],
    html.igg-header-hidden header {
      transform: translateY(-100%);
    }
    @media (min-width: 1000px) {
      .subnav-tabs-container {
        overflow-x: visible !important;  /* Hem tablet hem desktop’ta scroll yok*/
        justify-content: space-between !important;
        gap: clamp(15px, 1.5vw, 28px) !important;
        padding-left: clamp(12px, 2vw, 32px) !important;
        padding-right: clamp(12px, 2vw, 32px) !important;
      }
        
      .subnav-tabs-container button {
        flex: 1 1 auto !important;
        min-width: 60px !important;
        max-width: none !important;
        overflow: visible !important;
        text-overflow: clip !important;
      }
    }
    @media (max-width: 999px) {
      .subnav-tabs-container {
        overflow-x: visible !important; /* Mobilde de scroll kapalı */
        justify-content: flex-start !important;
        gap: 23px !important;
        padding-left: 5px !important;
        padding-right: 5px !important;
      }
      .subnav-tabs-container button {
        max-width: none !important;
        flex: 0 0 auto !important;
      }
    }
  `}</style>
</nav>


      <section id={`panel-${active}`}>
        {isOverview ? (
          <>
            <OverviewHero />
            <CategoriesTextile />
            <IGGExplore />
          </>
        ) : (
          <>
            {content.blocks.map((b, i) => (
              <ParagraphAsset key={`${active}-${i}`} block={b} />
            ))}
          </>
        )}
      </section>

      <NextChapter active={active} setActive={setActive} />
    </main>
  );
}

/* MobileDropdown ve diğer yardımcı fonksiyonlar */
function MobileDropdown({
  open,
  setOpen,
  active,
  setActive,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  active: TabKey;
  setActive: (k: TabKey) => void;
}) {
  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="textile-mobile-submenu"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-start py-5 px-6 text-slate-700 hover:text-slate-900 hover:cursor-pointer border-b border-black/5"
      >
        <svg
          className={`h-4 w-4 shrink-0 transition-transform duration-300 mr-2 ${open ? "rotate-180" : "rotate-0"}`}
          viewBox="0 0 12 6"
          aria-hidden="true"
        >
          <path d="M.3.3a1 1 0 011.4 0L5.4 4h1.2L10.3.3a1 1 0 011.4 0 1 1 0 010 1.4L7.4 6H4.6L.3 1.7A.9.9 0 010 1 .9.9 0 01.3.3z" />
        </svg>
        <span className="text-[16px] tracking-[0.16em] uppercase font-bold text-center">
          Menu
        </span>
      </button>
      <div
        id="textile-mobile-submenu"
        className={`transition-all duration-500 ease-in-out overflow-hidden ${open ? "max-h-[1000px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}`}
      >
        <ul className="m-0 list-none p-0 pb-4 flex flex-col gap-3 px-6">
          {TABS.map((tab) => {
            const isActiveTab = tab.key === active;
            return (
              <li key={tab.key}>
                <button
                  role="tab"
                  aria-selected={isActiveTab}
                  aria-controls={`panel-${tab.key}`}
                  onClick={() => { setActive(tab.key); setOpen(false); }}
                  className={[
                    "text-left",
                    "text-[13px] tracking-[0.14em] uppercase font-semibold",
                    "hover:text-slate-900 text-slate-600 hover:cursor-pointer py-2 transition-colors",
                    isActiveTab ? "text-[#1a1a1a]" : "",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

function IntroText({ paragraphs }: { paragraphs: string[] }) {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-10">
      <div
        className="space-y-4 text-[1.4rem] leading-[1.8rem] text-[#363f44] font-light py-8"
        style={{ fontFamily: "Noto-Sans, source-han-sans, sans-serif", fontWeight: 200 }}
      >
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}

function ParagraphAsset({ block }: { block: ContentBlock }) {
  const Heading = (block.level === 3 ? "h3" : "h2") as "h2" | "h3";
  const isReverse = block.reverse || false;

  return (
    <>
      <style jsx>{`
        @media (max-width: 768px) {
          section[data-paragraphasset] {
            flex-direction: column !important;
            padding-left: 1rem !important;
            padding-right: 1rem !important;
            gap: 1rem !important;
          }
          div[data-img-container] {
            width: 100% !important;
            height: auto !important;
            aspect-ratio: 1 / 1;
            max-width: 100% !important;
            border-radius: 4px;
          }
          div[data-text-container] {
            width: 100% !important;
            padding-top: 1rem;
            justify-content: flex-start !important;
          }
          h2, h3 {
            font-size: 2rem !important;
            line-height: 2.4rem !important;
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          p {
            font-size: 1rem !important;
            line-height: 1.6rem !important;
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
        }
        @media (min-width: 1600px) {
          section[data-paragraphasset] {
            padding-left: 9rem !important;
            padding-right: 9rem !important;
            gap: 12rem !important;
          }
        }
      `}</style>
      <section
        data-paragraphasset
        style={{
          WebkitTextSizeAdjust: "100%",
          lineHeight: 1.15,
          WebkitFontSmoothing: "antialiased",
          WebkitTapHighlightColor: "rgba(0,0,0,0)",
          fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif",
          fontSize: "10px",
          textRendering: "optimizeLegibility",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: isReverse ? "row-reverse" : "row",
          flexWrap: "wrap",
          paddingLeft: "5rem",
          paddingRight: "5rem",
          width: "100%",
          gap: "8.2rem",
          marginTop: "2rem",
          marginBottom: "2rem",
          paddingTop: "4rem",
        }}
      >
        {/* Görsel alanı */}
        <div
          data-img-container
          style={{
            flex: "0 0 auto",
            width: "577px",
            height: "700px",
            position: "relative",
            overflow: "hidden",
            borderRadius: "4px",
            maxWidth: "100%",
          }}
        >
          <Image
            src={block.image}
            alt={block.alt}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 577px"
            priority
          />
        </div>

        {/* Yazı alanı */}
        <div
          data-text-container
          style={{
            flex: "1 1 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: 0,
          }}
        >
          <Heading
            style={{
              textTransform: "uppercase",
              fontWeight: 300,
              fontSize: "44px",
              lineHeight: "3rem",
              color: "#363f44",
              fontFamily: "'mclaren-bespoke', Courier New, Arial",
              marginBottom: "1.5rem",
              textAlign: "left",
              letterSpacing: "0.0rem",
              wordSpacing: "-0.9rem",
            }}
          >
            {block.title}
          </Heading>
          <p
            style={{
              fontSize: "20px",
              lineHeight: "1.8rem",
              color: "#363f44",
              textAlign: "left",
              marginTop: 0,
              marginBottom: 0,
              overflowWrap: "break-word",
              fontFamily: "Noto-Sans, source-han-sans, sans-serif",
              paddingTop: "0.5rem",
              fontWeight: 200,
            }}
          >
            {block.body}
          </p>
        </div>
      </section>
    </>
  );
}
