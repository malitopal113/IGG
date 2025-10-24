"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Image from "next/image";

/** -----------------------------------------------------------------------
 *  TABS
 * --------------------------------------------------------------------- */
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

/** “Next chapter” background images (her sekmenin sonunda kullanılan arka plan) */
const NEXT_BG: Record<TabKey, string> = {
  overview: "/assets/sectors/textile/next/overview.jpg",
  "racing-merchandise": "/assets/sectors/textile/next/racing-merchandise.jpg",
  workwear: "/assets/sectors/textile/next/workwear.jpg",
  "military-police-security-wear": "/assets/sectors/textile/next/military-police-security-wear.jpg",
  "corporate-wear-uniforms": "/assets/sectors/textile/next/corporate-wear-uniforms.jpg",
  "promotional-wear-accessories": "/assets/sectors/textile/next/promotional-wear-accessories.jpg",
  "sports-teamwear": "/assets/sectors/textile/next/sports-teamwear.jpg",
};

/** -----------------------------------------------------------------------
 *  URL HASH TAB STATE
 * --------------------------------------------------------------------- */
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

/** -----------------------------------------------------------------------
 *  CORNER CAP (sol-üst diyagonal)
 * --------------------------------------------------------------------- */
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

/** -----------------------------------------------------------------------
 *  CONTENT MODEL
 * --------------------------------------------------------------------- */
type Block = {
  title: string;
  body: string;
  image: string; // /assets/... ile başlayan yol
  alt: string;
  reverse?: boolean;
};

type Content = {
  intro: string[];
  blocks: Block[];
};

/** -----------------------------------------------------------------------
 *  CONTENT — TÜM SEKME METİNLERİ VE GÖRSELLERİ
 *
 *  🔧 DÜZENLEME YERİ:
 *  - Aşağıdaki her sekmenin altındaki `intro` paragraflarını ve `blocks` içindeki
 *    `title`, `body`, `image`, `alt` alanlarını düzenleyebilirsin.
 *  - ÖNERİLEN KLASÖRLER:
 *    /public/assets/sectors/textile/<tab>/<dosyalar>.jpg|png
 *    Örn: /assets/sectors/textile/racing/hero-1.jpg
 * --------------------------------------------------------------------- */
const CONTENT: Record<TabKey, Content> = {
  /** ---- OVERVIEW (mevcut onaylanan içerik bire bir) ---- */
  overview: {
    intro: [
      "Designed by a team of visionary engineers and designers, IGG Textile Division represents a new standard in fabric innovation — precise, sustainable, and built for performance. Modern yet timeless, it unites craftsmanship with advanced technology under one purpose: redefining textile excellence.",
      "Innovative yet practical. Every process is optimized for quality, efficiency, and environmental responsibility... creating the ideal environment for producing high-performance fabrics that empower industries worldwide. The division perfectly embodies IGG’s commitment to progress without compromise.",
    ],
    blocks: [
      {
        title: "Innovation and craftsmanship in harmony",
        body:
          "The collaboration between IGG’s global design experts and advanced textile engineers has created a production environment that blends precision with creativity. Within IGG’s Textile Division, every stage — from material research to final fabrication — reflects the same dedication to perfection. It’s a seamless harmony between technology and craftsmanship that defines the spirit of IGG.",
        image: "/assets/sectors/textile/overview/mtc-hero.png",
        alt: "MTC exterior by the lake",
      },
      {
        title: "Where innovation takes shape",
        body:
          "Producing advanced textiles is a meticulous and demanding process. Yet inside IGG’s state-of-the-art facilities, there’s an atmosphere of calm precision and purpose. Every roll of fabric follows a carefully optimized path through technology-driven production lines. Each material is crafted with exceptional attention to detail — engineered, tested, and refined by our skilled team using the latest innovations to ensure unmatched quality and performance.",
        image: "/assets/sectors/textile/overview/mpc.png",
        alt: "MPC production line",
        reverse: true,
      },
      {
        title: "Redefining perfection",
        body:
          "Perfection often begins with challenging convention. At IGG Textile Division, our engineers and designers constantly question the ordinary to achieve the extraordinary. When a process or pattern doesn’t meet our exacting standards, we don’t compromise — we reinvent. From rethinking fabric structures to recalibrating production techniques, every refinement is made to ensure flawless symmetry, efficiency, and quality.",
        image: "/assets/sectors/textile/overview/blueprint.png",
        alt: "Blueprint",
      },
    ],
  },

  /** ---- RACING & MERCHANDISE ---- */
  "racing-merchandise": {
    intro: [
      "Engineered for performance and built for identity — IGG Racing & Merchandise delivers apparel and accessories that translate track-bred innovation into everyday expression. Durable, functional, and distinctive.",
      "From premium fabrics to precision finishing, every piece is developed with rigorous attention to comfort, fit, and longevity. We partner with teams and brands to craft collections that feel exceptional — and perform under pressure.",
    ],
    blocks: [
      {
        title: "Performance you can wear",
        body:
          "Our racing-led textiles optimize breathability, stretch, and abrasion resistance. We combine advanced knitting and finishing techniques with ergonomic patterning to deliver comfort that holds up from pit lane to daily life.",
        image: "/assets/sectors/textile/racing/block-1.jpg",
        alt: "Performance fabrics detail",
      },
      {
        title: "Signature details, iconic looks",
        body:
          "Heat-transfer graphics, high-fastness dyes, bonded seams, and laser-cut vents — every detail is purposeful. We align brand language with robust construction so collections look sharp and age beautifully.",
        image: "/assets/sectors/textile/racing/block-2.jpg",
        alt: "Merch design table",
        reverse: true,
      },
      {
        title: "From track to store",
        body:
          "Integrated development — from material sourcing to packaging — ensures reliable timelines and consistent quality. Capsule drops, limited editions, and evergreen lines are executed with the same discipline.",
        image: "/assets/sectors/textile/racing/block-3.jpg",
        alt: "Retail-ready merchandise",
      },
    ],
  },

  /** ---- WORKWEAR ---- */
  workwear: {
    intro: [
      "IGG Workwear is built for demanding environments — combining reinforced construction with fabrics tuned for mobility and endurance. Practicality without compromise.",
      "Each garment is engineered around task-specific needs: tool access, visibility, heat regulation, and protection — so professionals can focus on the job, not the uniform.",
    ],
    blocks: [
      {
        title: "Built to last",
        body:
          "High-tenacity yarns, ripstop structures, and stress-point reinforcements deliver durable uniforms that stand up to daily wear and repeated laundering — extending lifecycle and lowering total cost.",
        image: "/assets/sectors/textile/workwear/block-1.jpg",
        alt: "Heavy-duty fabric close-up",
      },
      {
        title: "Comfort that works",
        body:
          "Articulated knees, gusseted panels, and breathable linings support all-day movement. Smart blends and moisture control keep workers dry and comfortable across shifts and climates.",
        image: "/assets/sectors/textile/workwear/block-2.jpg",
        alt: "Ergonomic patterning",
        reverse: true,
      },
      {
        title: "Compliance-ready",
        body:
          "We align designs with sector standards — visibility, antistatic properties, flame resistance — and validate performance through certified testing protocols and robust quality control.",
        image: "/assets/sectors/textile/workwear/block-3.jpg",
        alt: "Compliance testing",
      },
    ],
  },

  /** ---- MILITARY / POLICE / SECURITY ---- */
  "military-police-security-wear": {
    intro: [
      "Mission-ready apparel where reliability, discretion, and comfort meet. IGG develops tactical textiles engineered for versatility and resilience in the field.",
      "From base layers to outer shells, our systems integrate durability, thermoregulation, and rapid-dry performance — supporting mobility without sacrificing protection.",
    ],
    blocks: [
      {
        title: "Tough where it matters",
        body:
          "Tear-resistant weaves, reinforced seams, and hardware specified for silent operation. Coated finishes add weather resilience while maintaining low-profile aesthetics.",
        image: "/assets/sectors/textile/mps/block-1.jpg",
        alt: "Tactical fabric close-up",
      },
      {
        title: "Adaptive comfort",
        body:
          "Breathable laminates, moisture-wicking linings, and mechanical stretch increase capability during long operations. Ergonomic pockets and modular attachment points streamline loadout.",
        image: "/assets/sectors/textile/mps/block-2.jpg",
        alt: "Tactical patterning",
        reverse: true,
      },
      {
        title: "Standards and consistency",
        body:
          "Batch-to-batch color matching, dimensional stability, and lab-verified performance ensure dependable supply — from small-unit runs to nationwide programs.",
        image: "/assets/sectors/textile/mps/block-3.jpg",
        alt: "Quality inspection",
      },
    ],
  },

  /** ---- CORPORATE WEAR & UNIFORMS ---- */
  "corporate-wear-uniforms": {
    intro: [
      "IGG Corporate Wear blends brand expression with everyday practicality — tailored silhouettes, refined materials, and consistent fits across sizes and roles.",
      "We craft wardrobes that look sharp at first wear and continue to perform — wrinkle resistance, easy care finishes, and long-term shape retention.",
    ],
    blocks: [
      {
        title: "Design with identity",
        body:
          "From custom colorways to signature trims, we translate brand codes into garments that feel premium and cohesive — across retail, hospitality, aviation and more.",
        image: "/assets/sectors/textile/corporate/block-1.jpg",
        alt: "Corporate uniform styles",
      },
      {
        title: "All-day comfort",
        body:
          "Breathable blends, soft-touch linings, and stretch panels support movement through long shifts. Our patterns are graded for inclusive size ranges without losing the look.",
        image: "/assets/sectors/textile/corporate/block-2.jpg",
        alt: "Fitting details",
        reverse: true,
      },
      {
        title: "Scale with quality",
        body:
          "From pilot lots to global rollouts, we maintain color consistency and dimensional stability. Garments arrive ready to wear — labeled, bagged, and serialized for simple distribution.",
        image: "/assets/sectors/textile/corporate/block-3.jpg",
        alt: "Production line",
      },
    ],
  },

  /** ---- PROMOTIONAL WEAR & ACCESSORIES ---- */
  "promotional-wear-accessories": {
    intro: [
      "Promotional ranges that people actually want to keep — soft-hand fabrics, clean prints, and considered shapes elevate giveaways into long-lived brand touchpoints.",
      "We optimize for value without sacrificing feel: smart material choices, efficient embellishment, and packaging that looks good on arrival.",
    ],
    blocks: [
      {
        title: "Better basics",
        body:
          "T-shirts, hoodies, caps, and totes cut with modern proportions. High-fastness inks and precise embroidery hold color and detail through repeated use.",
        image: "/assets/sectors/textile/promo/block-1.jpg",
        alt: "Promo tees and caps",
      },
      {
        title: "Rapid campaigns",
        body:
          "Agile sampling and parallel production tracks mean fast turnarounds for launches and events — with consistent QC across sizes and colorways.",
        image: "/assets/sectors/textile/promo/block-2.jpg",
        alt: "Campaign preparation",
        reverse: true,
      },
      {
        title: "Sustainable choices",
        body:
          "Recycled fibers, organic cotton options, and reduced-plastic packaging make responsible promotions straightforward — with certifications on request.",
        image: "/assets/sectors/textile/promo/block-3.jpg",
        alt: "Sustainable packaging",
      },
    ],
  },

  /** ---- SPORTS & TEAMWEAR ---- */
  "sports-teamwear": {
    intro: [
      "Elite performance starts with fabric. IGG Teamwear combines moisture management, airflow, and stretch recovery to keep athletes focused from warm-up to whistle.",
      "We deliver full-kit solutions — game jerseys, training layers, travel wear — each tuned for comfort, durability, and club identity.",
    ],
    blocks: [
      {
        title: "Play at full speed",
        body:
          "Engineered meshes, zoned ventilation, and quick-dry finishes help regulate temperature through intense sessions, indoors and out.",
        image: "/assets/sectors/textile/sports/block-1.jpg",
        alt: "Breathable mesh detail",
      },
      {
        title: "Fit that moves",
        body:
          "Four-way stretch and ergonomic patterning support natural motion. We offer women’s-specific fits and youth grading for aligned club looks.",
        image: "/assets/sectors/textile/sports/block-2.jpg",
        alt: "Ergonomic jersey",
        reverse: true,
      },
      {
        title: "Club-ready delivery",
        body:
          "Batch personalization, numbering, and crest applications are handled in-line. Consistent color standards keep home, away, and third strips perfectly matched.",
        image: "/assets/sectors/textile/sports/block-3.jpg",
        alt: "Personalization table",
      },
    ],
  },
};

/** -----------------------------------------------------------------------
 *  NEXT CHAPTER (sekme sonundaki geniş CTA)
 * --------------------------------------------------------------------- */
function NextChapter({ active, setActive }: { active: TabKey; setActive: (k: TabKey) => void }) {
  const idx = TABS.findIndex((t) => t.key === active);
  const next = TABS[(idx + 1) % TABS.length];
  const bg = NEXT_BG[next.key] ?? "/assets/sectors/textile/next/fallback.jpg";

  return (
    <section
      role="button"
      tabIndex={0}
      onClick={() => {
        setActive(next.key);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (setActive(next.key), window.scrollTo({ top: 0, behavior: "smooth" }))}
      className="group relative mt-8 w-full overflow-hidden cursor-pointer select-none outline-none"
      aria-label={`Next chapter: ${next.label}`}
    >
      <Image
        src={bg}
        alt={next.alt ?? next.label}
        fill
        sizes="100vw"
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      <div className="relative z-10 flex items-center w-full px-6 sm:px-10 md:px-16 lg:px-24 py-16 text-white">
        <div className="flex flex-col items-start gap-3 pr-8">
          <span className="text-2xl md:text-4xl leading-none transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
          <p className="text-sm md:text-2xl font-medium tracking-wide">Next chapter</p>
        </div>
        <div className="hidden sm:block mr-8">
          <div className="h-28 w-px bg-white/30 origin-top transition-transform duration-500 group-hover:scale-y-110" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4">
            <span className="block h-[2px] w-8 bg-white/40 transition-all duration-500 group-hover:w-24" />
            <h3
              className="truncate font-light uppercase leading-snug"
              style={{ fontSize: "clamp(20px,5vw,40px)", letterSpacing: "0.08em" }}
            >
              {next.label}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}

/** -----------------------------------------------------------------------
 *  MAIN PAGE
 * --------------------------------------------------------------------- */
export default function TextilePage() {
  const { active, setActive } = useTabState();
  const activeTab = useMemo(() => TABS.find((t) => t.key === active)!, [active]);
  const isOverview = active === "overview";
  const [headerHidden, setHeaderHidden] = useState(false);

  // Overview görsel preload (mevcut davranış)
  useEffect(() => {
    if (typeof window !== "undefined" && "Image" in window) {
      const t = TABS.find((x) => x.key === "overview");
      if (t?.image) {
        const img = new window.Image();
        img.src = t.image;
      }
    }
  }, []);

  /** scroll 50px sonrası header kaybolma (flicker yok) */
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const hide = window.scrollY > 50;
          if (hide !== headerHidden) {
            setHeaderHidden(hide);
            const root = document.documentElement;
            root.style.setProperty("--header-h", hide ? "0px" : "80px");
            if (hide) root.classList.add("hide-main-header");
            else root.classList.remove("hide-main-header");
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerHidden]);

  const content = CONTENT[active];

  return (
    <main className="w-full bg-white text-white">
      {/* fixed header boşluğu */}
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
              <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase">{activeTab.label}</h1>
            </div>
          </div>
        </section>
      )}

      {/* SUB MENU (desktop) — yatay scroll açık; mobil dropdown senin son onayından bağımsızdı */}
      <nav
        className={`sticky bg-white text-[#1a1a1a] shadow-[inset_0_-1px_0_rgba(0,0,0,0.06)] transition-[top] duration-300 ${
          headerHidden ? "top-0 z-[60]" : "top-[var(--header-h,80px)] z-30"
        }`}
      >
        <div className="mx-auto w-full xl:max-w-[1200px] xl:px-6">
          <div className="hidden lg:block">
            <div className="overflow-x-auto whitespace-nowrap scroll-smooth px-2">
              <div className="inline-flex items-center gap-8 py-6 min-w-max">
                {TABS.map((tab) => {
                  const isActive = tab.key === active;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActive(tab.key)}
                      className={`relative uppercase font-bold text-[16px] tracking-[0.12em] transition-colors ${
                        isActive ? "text-[#1a1a1a]" : "text-slate-400 hover:text-slate-800"
                      }`}
                    >
                      {tab.label}
                      {isActive && (
                        <span className="absolute inset-x-0 -bottom-[12px] mx-auto h-[2px] w-full max-w-[96px] bg-[#1a1a1a]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="h-px w-full bg-black/10" />
      </nav>

      {/* CONTENT (intro + 3 blok) */}
      <section id={`panel-${active}`}>
        {content ? (
          <>
            <IntroText paragraphs={content.intro} />
            {content.blocks.map((b, i) => (
              <ParagraphAsset key={i} block={b} />
            ))}
          </>
        ) : (
          <div className="mx-auto max-w-[1200px] px-6 py-12 text-zinc-700">
            <h2 className="text-2xl font-semibold text-zinc-800 text-center">{activeTab.label}</h2>
            <p className="mt-3 text-[15px] leading-7 text-center">
              This section will be filled with content using the same layout used on Overview.
            </p>
          </div>
        )}
      </section>

      {/* NEXT CHAPTER */}
      <NextChapter active={active} setActive={setActive} />

      {/* Header hide animasyonu */}
      <style jsx global>{`
        header[role="banner"] {
          transition: transform 0.3s ease;
        }
        .hide-main-header header[role="banner"] {
          transform: translateY(-100%);
        }
      `}</style>
    </main>
  );
}

/** -----------------------------------------------------------------------
 *  Overview Helpers (tipografi/yerleşim Overview ile aynı)
 * --------------------------------------------------------------------- */
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

function ParagraphAsset({ block }: { block: Block }) {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-10 md:py-14">
      <div
        className={`grid md:grid-cols-12 items-start gap-6 md:min-h-[700px] ${
          block.reverse ? "md:[direction:rtl]" : "md:[direction:ltr]"
        }`}
      >
        {/* Görsel */}
        <div className="md:col-span-5 [direction:ltr] md:flex md:justify-end">
          <div className="relative w-full h-[420px] md:w-[512px] md:h-[700px] overflow-hidden rounded-sm">
            <Image src={block.image} alt={block.alt} fill className="object-cover" />
          </div>
        </div>

        {/* Spacer */}
        <div className="hidden md:block md:col-span-1" />

        {/* Metin (senin hizaların korunuyor) */}
        <div className="md:col-span-6 [direction:ltr] flex items-center md:pt-[6%] lg:pt-[25%]">
          <div className="w-full text-center md:text-left">
            <h2
              className="uppercase font-[300] text-[2.4rem] leading-[3rem] text-slate-700 text-center md:text-left"
              style={{ fontFamily: "mclaren-bespoke, Courier New, Arial" }}
            >
              {block.title}
            </h2>
            <p className="mt-15 text-[1.4rem] leading-[2rem] break-words text-zinc-700 text-start">{block.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
