"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
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
  overview: {
    intro: [],
    blocks: [],
  },
  "racing-merchandise": {
    intro: [
      "Built around speed, precision and brand passion, our Racing & Merchandise program blends technical fabrics with premium finishing for teams and fans alike.",
      "From track-ready layers to collectible lifestyle apparel, we deliver consistent fit, rich color accuracy and durable prints for elite partners.",
    ],
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
        image: "/assets/sectors/textile/racing/identity.png",
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
    intro: [
      "Workwear that stands up to demanding environments without compromising comfort or brand standards.",
      "We combine abrasion resistance, smart storage and easy-care finishes to keep teams productive and presentable.",
    ],
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
        image: "/assets/sectors/textile/workwear/workwear2.png",
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
    intro: [
      "Mission-ready apparel systems designed for reliability, mobility and discretion.",
      "We integrate near-infrared (NIR) considerations, low-noise trims and adaptive pocketing to support diverse missions.",
    ],
    blocks: [
      {
        title: "Mobility under load",
        body:
          "Gusseted constructions and 4-way stretch panels maintain movement with gear. Reinforced belt paths and bar-tacks resist stress over time.",
        image: "/assets/sectors/textile/mps/mobility.jpg",
        alt: "Mobility",
        level: 2,
      },
      {
        title: "Low-profile, high control",
        body:
          "Quiet hook-and-loop, covered zips and matte snaps reduce signature. Fabric options include NIR-aware shades and quick-dry knits for extended wear.",
        image: "/assets/sectors/textile/mps/lowprofile.jpg",
        alt: "Low profile",
        reverse: true,
        level: 3,
      },
      {
        title: "Standardized, then specialized",
        body:
          "A common fit block ensures consistency; add-on modules adapt garments to role-specific carry and climate without redesign.",
        image: "/assets/sectors/textile/mps/modular.jpg",
        alt: "Modular",
        level: 3,
      },
    ],
  },


  "corporate-wear-uniforms": {
    intro: [
      "Brand-right, comfortable uniforms that scale across roles and regions.",
      "Color accuracy, consistent fit and easy maintenance make daily wear effortless for teams and operations.",
    ],
    blocks: [
      {
        title: "Consistent fit at scale",
        body:
          "We maintain size grids with graded ease for different roles — front-of-house, back-office and field teams — to keep silhouettes aligned across sites.",
        image: "/assets/sectors/textile/corporate/fit.jpg",
        alt: "Fit",
        level: 2,
      },
      {
        title: "Fabric that works",
        body:
          "Wrinkle-resistant blends with mechanical stretch, stain shields and anti-pilling finishes keep garments neat with minimal care.",
        image: "/assets/sectors/textile/corporate/fabric.jpg",
        alt: "Fabric",
        reverse: true,
        level: 3,
      },
      {
        title: "Identity in the details",
        body:
          "Piping, contrast plackets and custom hardware express brand language subtly. Embroidery and transfer options are tuned to each fabric.",
        image: "/assets/sectors/textile/corporate/details.jpg",
        alt: "Details",
        level: 3,
      },
    ],
  },


  "promotional-wear-accessories": {
    intro: [
      "Giveaways and retail-ready promos that feel premium and last longer.",
      "From tees to caps and totes, we prioritize hand-feel, color and print durability to elevate brand perception.",
    ],
    blocks: [
      {
        title: "Premium basics, better prints",
        body:
          "Ring-spun cottons and combed blends improve drape and softness. Discharge, water-based and hybrid inks deliver color without heavy hand.",
        image: "/assets/sectors/textile/promo/basics.jpg",
        alt: "Basics",
        level: 2,
      },
      {
        title: "Accessories that travel",
        body:
          "Structured caps, panels and brims maintain form; woven labels and jacquard tapes add perceived value while withstanding daily wear.",
        image: "/assets/sectors/textile/promo/accessories.jpg",
        alt: "Accessories",
        reverse: true,
        level: 3,
      },
      {
        title: "Fast campaigns, low MOQs",
        body:
          "Modular color sets and ready trims support quick campaign launches with controlled unit cost — ideal for events and seasonal spikes.",
        image: "/assets/sectors/textile/promo/fast.jpg",
        alt: "Fast",
        level: 3,
      },
    ],
  },


  "sports-teamwear": {
    intro: [
      "Athlete-led performance wear for training, travel and matchday.",
      "Moisture-wicking meshes, zoned ventilation and bonded seams keep athletes moving in comfort.",
    ],
    blocks: [
      {
        title: "Move, breathe, repeat",
        body:
          "Mapped ventilation and knit structures enhance airflow where it counts. Lightweight blends wick fast and dry quicker between sessions.",
        image: "/assets/sectors/textile/sports/breathe.jpg",
        alt: "Breathability",
        level: 2,
      },
      {
        title: "Precision patterns",
        body:
          "Ergonomic pattern blocks, raglan/saddle sleeves and split hems reduce restriction — tested with feedback loops from squads.",
        image: "/assets/sectors/textile/sports/pattern.jpg",
        alt: "Pattern",
        reverse: true,
        level: 3,
      },
      {
        title: "Unified identity",
        body:
          "Crest, numbering and league marks are color-matched and wash-tested across sets to keep squads looking consistent home and away.",
        image: "/assets/sectors/textile/sports/identity.jpg",
        alt: "Identity",
        level: 3,
      },
    ],
  },

  // E-Gaming uses same content as racing-merchandise
  "e-gaming": JSON.parse(JSON.stringify({
    intro: [
      "Built around speed, precision and brand passion, our Racing & Merchandise program blends technical fabrics with premium finishing for teams and fans alike.",
      "From track-ready layers to collectible lifestyle apparel, we deliver consistent fit, rich color accuracy and durable prints for elite partners.",
    ],
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

  // Towel & Home uses same content as workwear
  "towel-home": JSON.parse(JSON.stringify({
    intro: [
      "Workwear that stands up to demanding environments without compromising comfort or brand standards.",
      "We combine abrasion resistance, smart storage and easy-care finishes to keep teams productive and presentable.",
    ],
    blocks: [
      {
        title: "Built to last",
        body:
          "Reinforced seams, ripstop panels and durable hardware extend lifecycle in high-wear zones. Garments are lab-tested for tear strength and colorfastness to meet daily use.",
        image: "/assets/sectors/textile/workwear/durable.jpg",
        alt: "Durable workwear",
        level: 2,
      },
      {
        title: "Utility with comfort",
        body:
          "Stretch zones and articulated knees increase range of motion. Breathable back yokes and mesh linings regulate temperature across shifts and seasons.",
        image: "/assets/sectors/textile/workwear/utility.jpg",
        alt: "Utility",
        reverse: true,
        level: 3,
      },
      {
        title: "Simple care, fast turnaround",
        body:
          "Easy-care coatings reduce shrink and wrinkle. Our modular patterns and color libraries shorten sampling and reorder lead times across sizes.",
        image: "/assets/sectors/textile/workwear/care.jpg",
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

  const [headerH, setHeaderH] = useState<number>(80);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hdr =
      (document.querySelector('header[role="banner"]') as HTMLElement) ||
      (document.querySelector("header") as HTMLElement);

    const measure = () => {
      const h = hdr ? hdr.getBoundingClientRect().height : 80;
      setHeaderH(h);
      document.documentElement.style.setProperty("--header-h", `${h}px`);
      const y = window.scrollY || 0;
      document.documentElement.classList.toggle("igg-header-hidden", y > 50);
      const topPx = y > 50 ? 0 : h;
      document.documentElement.style.setProperty("--subnav-top", `${topPx}px`);
    };

    const onScroll = () => {
      const y = window.scrollY || 0;
      document.documentElement.classList.toggle("igg-header-hidden", y > 50);
      const topPx = y > 50 ? 0 : headerH;
      document.documentElement.style.setProperty("--subnav-top", `${topPx}px`);
    };

    measure();
    window.addEventListener("load", measure);
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("load", measure);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
    };
  }, [headerH]);

  useEffect(() => {
    if (typeof window !== "undefined" && "Image" in window) {
      const t = TABS.find((x) => x.key === "overview");
      if (t?.image) {
        const img = new window.Image();
        img.src = t.image;
      }
    }
  }, []);

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

      {/* SUB MENU (sticky + horizontal scroll) */}
<nav
  aria-label="Textile sub navigation"
  className="sticky z-30 bg-white text-[#1a1a1a] shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.06)]"
  style={{ top: "var(--subnav-top, var(--header-h, 80px))" }}
>
  <div className="w-full">
    <div className="hidden lg:block py-5">
      <div
        className="subnav-tabs-container"
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "nowrap",
          overflowX: "auto",
          paddingBottom: "18px",
          gap: "34px",
          paddingRight: "10px",
        }}
      >
        {TABS.map((tab) => {
          const isActive = tab.key === active;
          return (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`shrink-0 relative uppercase hover:cursor-pointer font-bold transition-colors text-[15px] tracking-[0.12em] py-1.5 ${
                isActive
                  ? "text-[#1a1a1a]"
                  : "text-slate-400 hover:text-slate-800"
              }`}
              title={tab.label}
              style={{
                flex: "1 1 0",
                minWidth: "0",
                textAlign: "center"
              }}
            >
              {tab.label}
              {isActive && (
                <span className="absolute inset-x-0 -bottom-[10px] mx-auto h-[2px] w-full max-w-[96px] bg-[#1a1a1a]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
    <div className="lg:hidden">
      <MobileDropdown
        open={open}
        setOpen={setOpen}
        active={active}
        setActive={setActive}
      />
    </div>
  </div>
  <div className="h-px w-full bg-black/10 " />
  <style jsx global>{`
    header[role="banner"], header { transition: transform 280ms ease; will-change: transform;}
    html.igg-header-hidden header[role="banner"], html.igg-header-hidden header {transform: translateY(-100%);} 
    @media (min-width: 1920px) {
      .subnav-tabs-container {
        width: 100vw;
        max-width: 100vw;
        margin-left: calc(-1 * ((100vw - 100%) / 2));
        margin-right: 0;
        overflow-x: visible !important;
        justify-content: space-between !important;
        gap: 28px !important;
        padding-left: 32px;
        padding-right: 32px;
      }
      .subnav-tabs-container button {
        flex: 1 1 0;
        min-width: 0;
        text-align: center;
      }
    }
    @media (max-width: 1919.98px) {
      .subnav-tabs-container {
        max-width: 100%;
        overflow-x: auto !important;
        justify-content: flex-start !important;
        gap: 34px !important;
        padding-left: 0;
        padding-right: 0;
      }
    }
    @media (min-width: 1920px) {
      .subnav-tabs-container::-webkit-scrollbar {
        display: none;
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
            <IntroText paragraphs={content.intro} />
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

/* MobileDropdown ve diğer yardımcı fonksiyonlar aşağıda aynen bırak */

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
          className={`h-4 w-4 shrink-0 transition-transform duration-300 mr-2 ${
            open ? "rotate-180" : "rotate-0"
          }`}
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
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          open ? "max-h-[1000px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"
        }`}
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
          paddingLeft: "8.5rem",
          paddingRight: "8.5rem",
          width: "100%",
          gap: "9.5rem",
          marginTop: "2rem",
          marginBottom: "2rem",
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
              fontSize: "2.8rem",
              lineHeight: "3rem",
              color: "#363f44",
              fontFamily: "'mclaren-bespoke', Courier New, Arial",
              marginBottom: "1.5rem",
              textAlign: "left",
              
            }}
          >
            {block.title}
          </Heading>
          <p
            style={{
              fontSize: "1.4rem",
              lineHeight: "2.5rem",
              color: "#363f44",
              textAlign: "left",
              marginTop: 0,
              marginBottom: 0,
              overflowWrap: "break-word",
              fontFamily: "Noto-Sans, source-han-sans, sans-serif",
              paddingTop: "0.5rem",
            }}
          >
            {block.body}
          </p>
        </div>
      </section>
    </>
  );
}


