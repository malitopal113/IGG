"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Image from "next/image";

/** ---- Sekmeler ---- */
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

/** URL hash'ten aktif sekme okuma/yazma */
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

/** Sol-üst diyagonal kavisli kapak (McLaren tarzı) */
function CornerCap() {
  // Ölçeklenebilir olması için viewBox kullanıyoruz; CSS ile boyutlandırıyoruz.
  return (
    <svg
      className="absolute left-0 top-0 z-30 h-[80px] w-[110px] sm:h-[90px] sm:w-[120px] md:h-[150px] md:w-[220px]"
      viewBox="0 0 420 110"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Beyaz kapak: üst çizgiden başlayıp sola doğru kavisle inen bezier */}
      <path d="M0 0 H420 C300 0 170 55 0 110 L0 0 Z" fill="white" />
    </svg>
  );
}

export default function TextilePage() {
  const { active, setActive } = useTabState();
  const activeTab = useMemo(() => TABS.find((t) => t.key === active)!, [active]);
  const isOverview = active === "overview";

  // Overview görsel preload
  useEffect(() => {
    const t = TABS.find((x) => x.key === "overview");
    if (t?.image) {
      const img = new window.Image();
      img.src = t.image;
    }
  }, []);

  // Mobil dropdown state
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [active]);

  return (
    <main className="w-full bg-white text-white">
      {/* Header sabitse üstte çakışmayı önle: projenin globalinde --header-h tanımlayabilirsin */}
      <div className="mt-[var(--header-h,80px)]" />

      {/* ===== HERO ===== */}
      {isOverview ? (
        <section className="relative isolate">
          {/* Sol-üst diyagonal kapak (hero içinde, header'a girmiyor) */}
          <CornerCap />

          <div className="relative w-full overflow-hidden">
            <div className="relative h-[58vh] min-h-[420px] lg:h-[52vh]">
              {/* Arkaplan görsel – “alana sığsın” diye kadrajı biraz üstte tuttuk */}
              <Image
                src={activeTab.image!}
                alt={activeTab.alt || "Overview"}
                fill
                sizes="100vw"
                className="object-cover object-[50%_88%]"
                priority
              />
              {/* Kontrast için koyu degrade */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-transparent" />

              {/* Metin */}
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
          {/* Sol-üst diyagonal kapak */}
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

      {/* ===== SUB-MENU (sticky) – header'dan bağımsız, altında başlar ===== */}
      <nav
        aria-label="Textile sub navigation"
        className="sticky top-[var(--header-h,80px)] z-30 bg-white text-[#1a1a1a] shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.06)]"
      >
        <div className="mx-auto w-full max-w-none px-0 xl:max-w-[1200px] xl:px-6">
          {/* Desktop (≥1024px) — 15.6” ekranlarda taşma yapmaması için sıkı tipografi */}
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

          {/* Mobile (≤1023px) */}
          <div className="lg:hidden">
            <MobileDropdown open={open} setOpen={setOpen} active={active} setActive={setActive} />
          </div>
        </div>
        <div className="h-px w-full bg-black/10" />
      </nav>

      {/* ===== İçerik placeholder ===== */}
      <section id={`panel-${active}`} role="tabpanel" aria-labelledby={active}>
        <div className="mx-auto max-w-[1200px] px-6 py-12">
          <div className="rounded-xl border border-black/10 bg-black/[0.03] p-6 text-sm text-zinc-700">
            Aktif sekme: <span className="font-medium text-black">{activeTab.label}</span>. Alt içerik burada görünecek.
          </div>
        </div>
      </section>

      {/* Basit fade-up animasyonları */}
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

/** Mobile dropdown */
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
