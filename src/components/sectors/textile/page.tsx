"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Image from "next/image";

/** ---- Tabs ---- */
type TabKey =
  | "overview"
  | "racing-merchandise"
  | "workwear"
  | "military-police-security-wear"
  | "corporate-wear-uniforms"
  | "promotional-wear-accessories"
  | "sports-teamwear";

type Tab = { key: TabKey; label: string; image?: string; alt?: string };

const TABS: Tab[] = [
  { key: "overview", label: "Overview", image: "/assets/sectors/textile/overview.png", alt: "Overview" },
  { key: "racing-merchandise", label: "Racing & Merchandise" },
  { key: "workwear", label: "Workwear" },
  { key: "military-police-security-wear", label: "Military, Police & Security Wear" },
  { key: "corporate-wear-uniforms", label: "Corporate Wear & Uniforms" },
  { key: "promotional-wear-accessories", label: "Promotional Wear & Accessories" },
  { key: "sports-teamwear", label: "Sports & Teamwear" },
];

const DEFAULT_TAB: TabKey = "overview";

/** ---- URL hash tab state ---- */
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

/** ---- Corner cap (diagonal) ---- */
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

/** ---- OVERVIEW content (intro + blocks) ---- */
const OVERVIEW_INTRO: string[] = [
  "Designed by a team of visionary engineers and designers, IGG Textile Division represents a new standard in fabric innovation — precise, sustainable, and built for performance. Modern yet timeless, it unites craftsmanship with advanced technology under one purpose: redefining textile excellence.",
  "Innovative yet practical. Every process is optimized for quality, efficiency, and environmental responsibility... creating the ideal environment for producing high-performance fabrics that empower industries worldwide. The division perfectly embodies IGG’s commitment to progress without compromise.",
];

type Block = {
  title: string;
  body: string;
  image: string;
  alt: string;
  reverse?: boolean; // true → image right, text left
  level?: 2 | 3; // h2 / h3
};

const OVERVIEW_BLOCKS: Block[] = [
  {
    title: "Innovation and craftsmanship in harmony",
    body:
      "The collaboration between IGG’s global design experts and advanced textile engineers has created a production environment that blends precision with creativity. Within IGG’s Textile Division, every stage — from material research to final fabrication — reflects the same dedication to perfection. It’s a seamless harmony between technology and craftsmanship that defines the spirit of IGG.",
    image: "/assets/sectors/textile/overview/mtc-hero.png",
    alt: "MTC exterior by the lake",
    level: 2,
  },
  {
    title: "Where innovation takes shape",
    body:
      "Producing advanced textiles is a meticulous and demanding process. Yet inside IGG’s state-of-the-art facilities, there’s an atmosphere of calm precision and purpose. Every roll of fabric follows a carefully optimized path through technology-driven production lines. Each material is crafted with exceptional attention to detail — engineered, tested, and refined by our skilled team using the latest innovations to ensure unmatched quality and performance.",
    image: "/assets/sectors/textile/overview/mpc.png",
    alt: "MPC production line",
    reverse: true,
    level: 3,
  },
  {
    title: "Redefining perfection",
    body:
      "Perfection often begins with challenging convention. At IGG Textile Division, our engineers and designers constantly question the ordinary to achieve the extraordinary. When a process or pattern doesn’t meet our exacting standards, we don’t compromise — we reinvent. From rethinking fabric structures to recalibrating production techniques, every refinement is made to ensure flawless symmetry, efficiency, and quality. Because at IGG, perfection is never an accident — it’s a decision.",
    image: "/assets/sectors/textile/overview/blueprint.png",
    alt: "MTC blueprint",
    level: 3,
  },
  {
    title: "Sculpted by air",
    body:
      "The wind tunnel. Every McLaren is shaped by the critical knowledge we gain here. By the relentless study of how air interacts with the car's body. And the meticulous honing of each curve, hollow, pinch and plane. The aim is simple: to improve aerodynamic performance. From increasing downforce to boost grip and stability. To reducing drag that unlocks faster acceleration.",
    image: "/assets/sectors/textile/overview/wind-tunnel.jpg",
    alt: "Wind tunnel",
    reverse: true,
    level: 2,
  },
];

export default function TextilePage() {
  const { active, setActive } = useTabState();
  const activeTab = useMemo(() => TABS.find((t) => t.key === active)!, [active]);
  const isOverview = active === "overview";

  // Preload overview image
  useEffect(() => {
    const t = TABS.find((x) => x.key === "overview");
    if (t?.image) {
      const img = new window.Image();
      img.src = t.image;
    }
  }, []);

  // Mobile dropdown state
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [active]);

  return (
    <main className="w-full bg-white text-white">
      {/* push content below fixed header */}
      <div className="mt-[var(--header-h,80px)]" />

      {/* ===== HERO ===== */}
      {isOverview ? (
        <section className="relative isolate">
          <CornerCap />
          <div className="relative w-full overflow-hidden">
            <div className="relative h-[58vh] min-h-[420px] lg:h-[52vh]">
              <Image
                src={activeTab.image!}
                alt={activeTab.alt || "Overview"}
                fill
                sizes="100vw"
                className="object-cover object-[50%_88%]"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-transparent" />
              <div className="relative z-20 mx-auto max-w-[1200px] px-6 pt-40 sm:pt-30 md:pt-34">
                <p className="animate-fadeUp text-lg sm:text-xl md:text-2xl text-white/90">We are IGG.</p>
                <h1 className="animate-fadeUpDelay mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-[64px] leading-[1.05] tracking-[0.04em]">
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
            <div className="mx-auto max-w-[1200px] px-6 py-14 sm:py-16 md:py-20 lg:py-24">
              <p className="animate-fadeUp text-sm sm:text-base text-white/85">We are IGG.</p>
              <h1 className="animate-fadeUpDelay mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-[0.06em] uppercase">
                {activeTab.label}
              </h1>
            </div>
          </div>
        </section>
      )}

      {/* ===== SUB-MENU (sticky) ===== */}
      <nav
        aria-label="Textile sub navigation"
        className="sticky top-[var(--header-h,80px)] z-30 bg-white text-[#1a1a1a] shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.06)]"
      >
        <div className="mx-auto w-full max-w-none px-0 xl:max-w-[1200px] xl:px-6">
          {/* Desktop */}
          <div className="hidden lg:flex items-center justify-between py-4">
            {TABS.map((tab) => {
              const isActiveTab = tab.key === active;
              return (
                <button
                  key={tab.key}
                  role="tab"
                  aria-selected={isActiveTab}
                  aria-controls={`panel-${tab.key}`}
                  onClick={() => setActive(tab.key)}
                  className={[
                    "relative uppercase font-bold",
                    "lg:text-[12px] lg:tracking-[0.10em] lg:px-1.5 lg:py-1.5",
                    "xl:text-[12px] xl:tracking-[0.14em] xl:px-2 xl:py-1.5",
                    "transition-colors outline-none hover:cursor-pointer",
                    isActiveTab ? "text-[#1a1a1a]" : "text-slate-400 hover:text-slate-800",
                  ].join(" ")}
                  style={{ whiteSpace: "nowrap" }}
                  title={tab.label}
                >
                  <span>{tab.label}</span>
                  {isActiveTab && (
                    <span className="absolute inset-x-0 -bottom-[10px] mx-auto h-[2px] w-full max-w-[96px] bg-[#1a1a1a]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile */}
          <div className="lg:hidden">
            <MobileDropdown open={open} setOpen={setOpen} active={active} setActive={setActive} />
          </div>
        </div>
        <div className="h-px w-full bg-black/10" />
      </nav>

      {/* ===== CONTENT ===== */}
      <section id={`panel-${active}`} role="tabpanel" aria-labelledby={active}>
        {active === "overview" ? (
          <>
            <IntroText paragraphs={OVERVIEW_INTRO} />
            {OVERVIEW_BLOCKS.map((b, i) => (
              <ParagraphAsset key={i} block={b} />
            ))}
          </>
        ) : (
          <div className="mx-auto max-w-[1200px] px-6 py-12">
            <h2 className="text-2xl font-semibold text-zinc-800">{activeTab.label}</h2>
            <p className="mt-3 text-[15px] leading-7 text-zinc-700">
              This section will be filled with content using the same image + text layout used on Overview.
            </p>
          </div>
        )}
      </section>

      {/* small fade animations */}
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeUp {
          animation: fadeUp 600ms ease-out both;
        }
        .animate-fadeUpDelay {
          animation: fadeUp 700ms 120ms ease-out both;
        }
      `}</style>
    </main>
  );
}

/** ---- Mobile dropdown ---- */
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
        className="flex w-full items-center gap-2 py-4 px-6 text-slate-500 hover:text-slate-700 hover:cursor-pointer"
      >
        <svg
          className={`h-3 w-3 shrink-0 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
          viewBox="0 0 12 6"
          aria-hidden="true"
        >
          <path d="M.3.3a1 1 0 011.4 0L5.4 4h1.2L10.3.3a1 1 0 011.4 0 1 1 0 010 1.4L7.4 6H4.6L.3 1.7A.9.9 0 010 1 .9.9 0 01.3.3z" />
        </svg>
        <span className="text-[11px] tracking-[0.14em] uppercase font-semibold">Menu</span>
      </button>

      {open && (
        <ul id="textile-mobile-submenu" className="m-0 list-none p-0 pb-4 flex flex-col gap-3 px-6">
          {TABS.map((tab) => {
            const isActiveTab = tab.key === active;
            return (
              <li key={tab.key}>
                <button
                  role="tab"
                  aria-selected={isActiveTab}
                  aria-controls={`panel-${tab.key}`}
                  onClick={() => setActive(tab.key)}
                  className={[
                    "text-left",
                    "text-[12px] tracking-[0.14em] uppercase font-semibold",
                    "hover:text-slate-700 text-slate-500 hover:cursor-pointer",
                    isActiveTab ? "text-[#1a1a1a]" : "",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

/** ---- Overview helpers ---- */
function IntroText({ paragraphs }: { paragraphs: string[] }) {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-10 md:py-12">
      <div className="text-[15px] leading-7 text-zinc-700 space-y-4">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}

function ParagraphAsset({ block }: { block: Block }) {
  const Heading = (block.level === 3 ? "h3" : "h2") as "h2" | "h3";

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-10 md:py-14">
      <div
        className={[
          "grid md:grid-cols-12 items-start gap-6",
          // emulate "row-reverse" look on md+ when reverse
          block.reverse ? "md:[direction:rtl]" : "md:[direction:ltr]",
        ].join(" ")}
      >
        {/* Image */}
        <div className="md:col-span-5 [direction:ltr]">
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src={block.image}
              alt={block.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>
        </div>

        {/* Spacer */}
        <div className="hidden md:block md:col-span-1 [direction:ltr]" />

        {/* Text */}
        <div className="md:col-span-6 [direction:ltr]">
          <Heading className="text-[18px] md:text-[20px] font-semibold tracking-wider uppercase text-slate-700">
            {block.title}
          </Heading>
          <p className="mt-3 text-[14px] leading-7 text-zinc-700">{block.body}</p>
        </div>
      </div>
    </section>
  );
}
