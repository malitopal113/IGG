"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

type NavLink = { label: string; href: string };
type NavItem = {
  label: string;
  banner: { href: string; title: string; image: string };
  columns: NavLink[][];
};

const NAV: NavItem[] = [
  {
    label: "About Us",
    banner: {
      href: "/about-us",
      title: "About Us",
      image:
        "https://cdn.koc.com.tr/cmscontainer/kocholding/media/koc/menu-img/hakkinda_2.jpg?ext=.jpg",
    },
    columns: [
      [
        { label: "Our History", href: "/aboutus/ourhistory" },
        { label: "Mission & Vision", href: "/about-us/mission-vision" },
        { label: "Our Abilities", href: "/#abilities" },
      ],
    ],
  },
  {
    label: "Activity Fields",
    banner: {
      href: "/activity-fields",
      title: "Activity Fields",
      image:
        "https://cdn.koc.com.tr/cmscontainer/kocholding/media/koc/menu-img/faaliyet_alanlari_2.jpg?ext=.jpg",
    },
    columns: [
      [
        { label: "Textile", href: "/sectors/textile" },
        { label: "Trading", href: "/activity-fields/trading" },
        { label: "Sports Management", href: "/activity-fields/sports-management" },
        { label: "EPCM", href: "/activity-fields/epcm" },
      ],
    ],
  },
  {
    label: "Contact Us",
    banner: {
      href: "/contact",
      title: "Contact Us",
      image:
        "https://cdn.koc.com.tr/cmscontainer/kocholding/media/koc/menu-img/medya_merkezi.jpg?ext=.jpg",
    },
    columns: [],
  },
];

function classNames(...arr: Array<string | false | null | undefined>) {
  return arr.filter(Boolean).join(" ");
}

export default function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [animSeed, setAnimSeed] = React.useState(0);
  const pathname = usePathname();
  const headerRef = React.useRef<HTMLElement | null>(null);

  const [isSearchClosing, setIsSearchClosing] = React.useState(false);

  const closeSearch = () => {
    setIsSearchClosing(true);
    setTimeout(() => {
      setSearchOpen(false);
      setIsSearchClosing(false);
    }, 450);
  };

  // Force white header ONLY on this route
  const forceWhiteHeader =
    pathname?.startsWith("/sectors/textile/overview/igg-explore") ?? false;

  // scroll state: If we're on the igg-explore page, don't attach the listener and force scrolled = true
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    if (forceWhiteHeader) {
      setScrolled(true);
      return;
    }

    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceWhiteHeader]);

  // route change -> close menus/panels
  React.useEffect(() => {
    setMobileOpen(false);
    setOpenIndex(null);
    setSearchOpen(false);
  }, [pathname]);

  // outside click + ESC for mega panel
  React.useEffect(() => {
    if (openIndex === null) return;
    if (typeof document === "undefined") return;
    const onDocClick = (e: MouseEvent) => {
      const root = headerRef.current;
      if (!root) return;
      if (!(e.target instanceof Node)) return;
      const clickedInsideHeader = root.contains(e.target);
      const isPanel =
        (e.target as HTMLElement).closest?.("[data-mega-panel='true']") != null;
      if (!clickedInsideHeader && !isPanel) setOpenIndex(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [openIndex]);

  // menu toggle + animation seed
  const toggleMenu = (idx: number) => {
    setOpenIndex((s) => {
      const next = s === idx ? null : idx;
      if (next !== null) setAnimSeed((n) => n + 1);
      return next;
    });
  };

  // Logo resimleri
  const logoNormal = "/assets/menu/logo-igg.svg";
  const logoAlt = "/assets/menu/logo2.png";

  // Logo değişimi: About Us veya Activity Fields linklerinde logoyu değiştir
  const isAltLogo =
    pathname?.startsWith("/about-us") || pathname?.startsWith("/activity-fields");

  const currentLogo = isAltLogo ? logoAlt : logoNormal;

  // Link rengi yönetimi
  const isTextilePage = pathname?.startsWith("/sectors/textile") ?? false;

  const linkColor = forceWhiteHeader
    ? "text-gray-900 hover:text-gray-700"
    : isTextilePage
    ? "text-black hover:text-gray-800"
    : openIndex !== null
    ? "text-black hover:text-gray-800"
    : scrolled
    ? "text-gray-900 hover:text-gray-700"
    : "text-white hover:text-white/80";

  return (
    <>
      {/* HEADER */}
      <header
        ref={headerRef}
        className={classNames(
          "fixed inset-x-0 top-0 z-[50] transition-all",
          scrolled || openIndex !== null || forceWhiteHeader
            ? "backdrop-blur bg-white shadow-sm"
            : "bg-transparent"
        )}
        role="banner"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 p-5">
          <nav className="flex h-16 items-center" aria-label="Main">
            {/* Left: brand + hamburger */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center" aria-label="IGG anasayfa">
                <Image
                  src={currentLogo}
                  alt="IGG"
                  width={120}
                  height={32}
                  priority
                  className="h-15 w-auto"
                />
              </Link>

              <button
                onClick={() => setMobileOpen((s) => !s)}
                className={classNames(
                  "lg:hidden inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm cursor-pointer",
                  scrolled || openIndex !== null || forceWhiteHeader
                    ? "border-black/10"
                    : "border-white/30",
                  linkColor
                )}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label="Menüyü aç/kapat"
              >
                <span>☰</span>
              </button>
            </div>

            {/* Center: navbar */}
            <ul className="hidden lg:flex flex-1 items-center justify-center gap-6">
              {NAV.map((item, idx) => {
                const base = item.banner.href;
                const activeByPath =
                  pathname === base || (pathname?.startsWith(base + "/") ?? false);
                const active = activeByPath || openIndex === idx;

                const hasPanel = item.columns?.some((col) => col.length > 0);

                return (
                  <li key={item.label} className="relative">
                    {hasPanel ? (
                      <button
                        className={classNames(
                          "inline-flex items-center gap-1 text-base font-medium focus:outline-none cursor-pointer",
                          linkColor
                        )}
                        aria-haspopup="true"
                        aria-expanded={openIndex === idx}
                        aria-controls={`mega-panel-${idx}`}
                        onClick={() => toggleMenu(idx)}
                      >
                        <span
                          className={classNames(
                            "relative",
                            active &&
                              "after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-full after:bg-[#FFBF00]"
                          )}
                        >
                          {item.label}
                        </span>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                          className={classNames(
                            active ? "text-[#FFBF00]" : "text-[#FFBF00]"
                          )}
                        >
                          <path d="M5 7l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </button>
                    ) : (
                      <Link
                        href={item.banner.href}
                        className={classNames(
                          "inline-flex items-center gap-1 text-base font-medium cursor-pointer",
                          linkColor
                        )}
                      >
                        <span
                          className={classNames(
                            "relative",
                            active &&
                              "after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-full after:bg-[#F9423A]"
                          )}
                        >
                          {item.label}
                        </span>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                          className={classNames(
                            active ? "text-[#FFBF00]" : "text-[#FFBF00]"
                          )}
                        >
                          <path d="M5 7l6 5-6 5" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Right: EN + search */}
            <div className={classNames("ml-auto flex items-center gap-4", linkColor)}>
              <Link href="/en" className="hidden sm:inline text-md font-medium">
                EN
              </Link>
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
                className="inline-flex items-center justify-center rounded-full p-2 hover:bg-[#F9423A]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9423A]/40 transition cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="#FFBF00" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20L16.8 16.8" />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* FULL-WIDTH MEGA PANEL */}
      {openIndex !== null && (
        <MegaPanelTop key={`panel-${openIndex}-${animSeed}`} item={NAV[openIndex]} onClose={() => setOpenIndex(null)} />
      )}

      {/* MOBILE OFF-CANVAS */}
      <MobileOffCanvas open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* SEARCH POPUP (desktop) */}
      {(searchOpen || isSearchClosing) && (
        <>
          <button aria-label="Kapat" onClick={closeSearch} className={classNames("fixed inset-0 z-[75] hidden lg:block", isSearchClosing ? "scrim-out" : "scrim-in")} />

          <div className={classNames("fixed inset-x-0 top-0 z-[80] hidden lg:block", "h-[420px] md:h-[460px] lg:h-[520px] xl:h-[560px]", isSearchClosing ? "search-slide-out" : "search-slide-in")}>
            <div className="absolute inset-0 bg-[#FFBF00]" />

            <div className="relative h-full w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 lg:pt-20">
              <div className="flex items-start justify-between">
                <h2 className="text-white text-4xl sm:text-5xl font-extrabold">Search now...</h2>
                <button onClick={closeSearch} aria-label="Kapat" className="fixed top-15 right-15 text-white/90 hover:text-white inline-flex items-center gap-2 text-xl font-bold tracking-wide cursor-pointer">
                  CLOSE <span className="text-base font-bold leading-none">✕</span>
                </button>
              </div>

              <form action="/arama" method="get" className="mt-8">
                <label className="flex items-center bg-white rounded-2xl shadow-xl h-[72px] pl-5 pr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="none" stroke="#FFBF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M20 20L16.8 16.8" />
                  </svg>

                  <input type="text" name="keyword" className="flex-1 h-full bg-transparent outline-none text-lg placeholder:text-gray-400" placeholder="Type the word you want to search for" />

                  <button type="submit" className="ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[#FFBF00] hover:bg-[#F9423A]/10 cursor-pointer">
                    SEARCH
                  </button>
                </label>
              </form>

              <div className="mt-10">
                <p className="text-white text-xl font-semibold">Popular searches:</p>
                <div className="mt-4 flex flex-wrap gap-3 cursor-pointer">
                  <a href="/arama?keyword=faaliyet%20raporu" className="inline-flex items-center gap-2 bg-white rounded-full px-5 py-2 text-xs font-semibold hover:shadow">
                    ACTIVITY REPORT
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="#FFBF00" strokeWidth="2">
                      <path d="M7 5l6 5-6 5" />
                    </svg>
                  </a>
                  <a href="/arama?keyword=s%C3%BCrd%C3%BCr%C3%BClebilirlik" className="inline-flex items-center gap-2 bg-white rounded-full px-5 py-2 text-xs font-semibold hover:shadow">
                    SUSTAINABILITY
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="#FFBF00" strokeWidth="2">
                      <path d="M7 5l6 5-6 5" />
                    </svg>
                  </a>
                  <a href="/arama?keyword=%C5%9Firketler" className="inline-flex items-center gap-2 bg-white rounded-full px-5 py-2 text-xs font-semibold hover:shadow">
                    COMPANIES
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="#FFBF00" strokeWidth="2">
                      <path d="M7 5l6 5-6 5" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Animations */}
      <style jsx global>{`
        @keyframes megaslideTop {
          from {
            transform: translateY(-24px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes megaslideOut {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(-24px);
            opacity: 0;
          }
        }
        @keyframes scrimIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scrimOut {
          from {
            opacity: 1;
            to {
              opacity: 0;
            }
          }
        }

        .search-slide-in {
          animation: megaslideTop 350ms ease-out forwards;
          transform-origin: top;
        }
        .search-slide-out {
          animation: megaslideOut 150ms ease-in forwards;
          transform-origin: top;
        }
        .scrim-in {
          animation: scrimIn 200ms ease-out forwards;
        }
        .scrim-out {
          animation: scrimOut 200ms ease-in forwards;
        }
      `}</style>
    </>
  );
}

/* ---------- FULL-WIDTH MEGA PANEL (TOP) ---------- */
function MegaPanelTop({ item, onClose }: { item: (typeof NAV)[number]; onClose: () => void }) {
  return (
    <>
      <button aria-label="Kapat" onClick={onClose} className="fixed inset-0 z-[40] bg-black/40" />

      <div data-mega-panel="true" className="fixed inset-x-0 top-25 z-[50] origin-top animate-[megaslideTop_700ms_ease-out_forwards]">
        <div className="w-full bg-white border-t border-black/10 shadow-[0_20px_40px_rgba(0,0,0,.08)]">
          <div className="w-full max-w-none pl-0 pr-4 sm:pr-6 lg:pr-8 xl:pr-12 2xl:pr-16 py-8">
            <div className="grid grid-cols-12 gap-8">
              <Link href={item.banner.href} className="col-span-12 lg:col-span-4 xl:col-span-5 overflow-hidden group" onClick={onClose}>
                <div className="relative h-[300px] lg:h-[380px] w-full">
                  <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${item.banner.image})` }} aria-hidden />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" aria-hidden />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-8">
                    <h3 className="text-white text-4xl lg:text-5xl font-extrabold drop-shadow-md">{item.banner.title}</h3>

                    <span className="relative mt-3 inline-flex items-center gap-2 text-white/95 text-sm lg:text-md group/daha">
                      Daha fazla bilgi
                      <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true" className="shrink-0 transition-transform duration-200 group-hover/daha:translate-x-1">
                        <path d="M7 5l6 5-6 5" fill="none" stroke="#FFBF00" strokeWidth="2" />
                      </svg>
                      <span aria-hidden className="pointer-events-none absolute -bottom-2 left-0 h-[2px] w-[450px] lg:w-[500px] bg-[#FFBF00]" />
                    </span>
                  </div>
                </div>
              </Link>

              <div className="col-span-12 lg:col-span-8 xl:col-span-7">
                <div className="columns-1 md:columns-3 xl:columns-1 gap-x-10 [column-fill:_balance]">
                  {item.columns.flat().map((link) => (
                    <Link key={link.href} href={link.href} onClick={onClose} className="group block py-3  transition-colors" style={{ breakInside: "avoid" }}>
                      <span className="flex items-center justify-between">
                        <span className="text-gray-900">{link.label}</span>
                        <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden="true" className="ml-3 text-gray-300 group-hover:text-[#FFBF00] transition-colors">
                          <path d="M7 5l6 5-6 5" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </span>
                      <span className="block h-px bg-gray-200 mt-3 group-hover:bg-[#FFBF00] transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- MOBILE OFF-CANVAS ---------- */
function MobileOffCanvas({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      <div
        id="mobile-menu"
        className={classNames(
          "lg:hidden fixed inset-y-0 left-0 z-[70] w-80 max-w-[85vw] transform bg-white shadow-xl transition-transform",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-black/10">
          <Link href="/" className="flex items-center" aria-label="IGG anasayfa" onClick={onClose}>
            <img src="/assets/menu/logo.svg" alt="IGG" className="h-7 w-auto" />
          </Link>
        </div>

        <div className="overflow-y-auto p-4">
          <form action="/arama" method="get" className="mb-4">
            <label className="flex items-stretch gap-2 border rounded-lg p-2">
              <input type="text" name="keyword" placeholder="Aramak istediğiniz kelimeyi yazın" className="flex-1 outline-none" />
              <button type="submit" className="px-3 py-1 rounded-md border text-sm cursor-pointer">
                ARA
              </button>
            </label>
          </form>

          <ul className="space-y-2">
            {NAV.map((item) => (
              <li key={item.label}>
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-black/5">
                    {item.label}
                    <span className="transition group-open:rotate-180">▾</span>
                  </summary>
                  <div className="mt-2 pl-3">
                    {item.columns.map((col, ci) => (
                      <ul key={ci} className="mb-3 space-y-1">
                        {col.map((link) => (
                          <li key={link.href}>
                            <Link href={link.href} onClick={onClose} className="block rounded px-2 py-1 text-sm hover:bg.black/5">
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                </details>
              </li>
            ))}
            <li>
              <Link href="/en" onClick={onClose} className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-black/5">
                EN
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {open && <button className="fixed inset-0 z-[60] bg-black/40 lg:hidden" aria-label="Kapat" onClick={onClose} />}
    </>
  );
}

