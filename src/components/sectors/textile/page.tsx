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

/** Her sekme için “Next chapter” arkaplan görseli */
const NEXT_BG: Record<TabKey, string> = {
  overview: "/assets/sectors/textile/next/overview.jpg",
  "racing-merchandise": "/assets/sectors/textile/next/racing-merchandise.jpg",
  workwear: "/assets/sectors/textile/next/workwear.jpg",
  "military-police-security-wear": "/assets/sectors/textile/next/military-police-security-wear.jpg",
  "corporate-wear-uniforms": "/assets/sectors/textile/next/corporate-wear-uniforms.jpg",
  "promotional-wear-accessories": "/assets/sectors/textile/next/promotional-wear-accessories.jpg",
  "sports-teamwear": "/assets/sectors/textile/next/sports-teamwear.jpg",
};

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

/** ---- OVERVIEW content ---- */
const OVERVIEW_INTRO: string[] = [
  "Designed by a team of visionary engineers and designers, IGG Textile Division represents a new standard in fabric innovation — precise, sustainable, and built for performance. Modern yet timeless, it unites craftsmanship with advanced technology under one purpose: redefining textile excellence.",
  "Innovative yet practical. Every process is optimized for quality, efficiency, and environmental responsibility... creating the ideal environment for producing high-performance fabrics that empower industries worldwide. The division perfectly embodies IGG’s commitment to progress without compromise.",
];

type Block = {
  title: string;
  body: string;
  image: string;
  alt: string;
  reverse?: boolean;
  level?: 2 | 3;
};

const OVERVIEW_BLOCKS: Block[] = [
  {
    title: "Innovation and craftsmanship in harmony",
    body:
      "The collaboration between IGG’s global design experts and advanced textile engineers has created a production environment that blends precision with creativity. Within IGG’s Textile Division, every stage — from material research to final fabrication — reflects the same dedication to perfection.",
    image: "/assets/sectors/textile/overview/mtc-hero.png",
    alt: "MTC exterior by the lake",
    level: 2,
  },
  {
    title: "Where innovation takes shape",
    body:
      "Producing advanced textiles is a meticulous and demanding process. Yet inside IGG’s state-of-the-art facilities, there’s an atmosphere of calm precision and purpose.",
    image: "/assets/sectors/textile/overview/mpc.png",
    alt: "MPC production line",
    reverse: true,
    level: 3,
  },
];

/** ---- NEXT CHAPTER ---- */
function NextChapter({
  active,
  setActive,
}: {
  active: TabKey;
  setActive: (k: TabKey) => void;
}) {
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

  /** preload fix (window.Image) */
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
        <Image
          src={bg}
          alt={next.alt ?? next.label}
          fill
          sizes="100vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/0" />

      <div className="relative z-10 flex items-center w-full px-6 sm:px-10 md:px-16 lg:px-24 py-16 sm:py-20 lg:py-24 text-white">
        <div className="flex flex-col items-start gap-3 pr-8">
          <span className="text-2xl sm:text-3xl md:text-4xl leading-none transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
          <p className="text-sm sm:text-base md:text-2xl font-medium tracking-wide">Next chapter</p>
          <p className="mt-1 text-sm text-white/80 sm:hidden">{next.label}</p>
        </div>

        <div className="relative hidden sm:block mr-8">
          <div className="h-28 w-px bg-white/30 origin-top transition-transform duration-500 group-hover:scale-y-110" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4">
            <span className="block h-px w-8 bg-white/40 transition-all duration-500 group-hover:w-24" />
            <h3 className="truncate text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-light tracking-widest uppercase">
              {next.label}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TextilePage() {
  const { active, setActive } = useTabState();
  const activeTab = useMemo(() => TABS.find((t) => t.key === active)!, [active]);
  const isOverview = active === "overview";

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

  return (
    <main className="w-full bg-white text-white">
      <div className="mt-[var(--header-h,80px)]" />

      {/* HERO */}
      {isOverview ? (
        <section className="relative isolate">
          <CornerCap />
          <div className="relative w-full overflow-hidden">
            <div className="relative h-[60vh] min-h-[460px] lg:h-[54vh]">
              <Image
                src={activeTab.image!}
                alt={activeTab.alt || "Overview"}
                fill
                sizes="100vw"
                className="object-cover object-[50%_88%]"
              />
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
              <p className="text-sm sm:text-base text-white/85">We are IGG.</p>
              <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase">
                {activeTab.label}
              </h1>
            </div>
          </div>
        </section>
      )}

      {/* SUB MENU */}
      <nav
        aria-label="Textile sub navigation"
        className="sticky top-[var(--header-h,80px)] z-30 bg-white text-[#1a1a1a] shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.06)]"
      >
        <div className="mx-auto w-full xl:max-w-[1200px] xl:px-6">
          <div className="hidden lg:flex items-center justify-between py-4">
            {TABS.map((tab) => {
              const isActive = tab.key === active;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActive(tab.key)}
                  className={`relative uppercase font-bold transition-colors ${
                    isActive
                      ? "text-[#1a1a1a]"
                      : "text-slate-400 hover:text-slate-800"
                  }`}
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
        <div className="h-px w-full bg-black/10" />
      </nav>

      {/* CONTENT */}
      <section id={`panel-${active}`}>
        {active === "overview" ? (
          <>
            <IntroText paragraphs={OVERVIEW_INTRO} />
            {OVERVIEW_BLOCKS.map((b, i) => (
              <ParagraphAsset key={i} block={b} />
            ))}
          </>
        ) : (
          <div className="mx-auto max-w-[1200px] px-6 py-12 text-zinc-700">
            <h2 className="text-2xl font-semibold text-zinc-800">{activeTab.label}</h2>
            <p className="mt-3 text-[15px] leading-7">
              This section will be filled with content using the same layout used on Overview.
            </p>
          </div>
        )}
      </section>

      {/* NEXT CHAPTER */}
      <NextChapter active={active} setActive={setActive} />
    </main>
  );
}

/** ---- Overview helpers ---- */
function IntroText({ paragraphs }: { paragraphs: string[] }) {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-10">
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
        className={`grid md:grid-cols-12 items-start gap-6 ${
          block.reverse ? "md:[direction:rtl]" : "md:[direction:ltr]"
        }`}
      >
        <div className="md:col-span-5 [direction:ltr]">
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm">
            <Image src={block.image} alt={block.alt} fill className="object-cover" />
          </div>
        </div>
        <div className="hidden md:block md:col-span-1" />
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
