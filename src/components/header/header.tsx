"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* --------- NAV DATA --------- */
const NAV = [
  {
    label: "Hakkında",
    banner: {
      href: "/hakkinda",
      title: "Hakkında",
      image:
        "https://cdn.koc.com.tr/cmscontainer/kocholding/media/koc/menu-img/hakkinda_2.jpg?ext=.jpg",
    },
    columns: [
      [
        { label: "Biz Kimiz?", href: "/hakkinda/biz-kimiz" },
        { label: "Tarihçe", href: "/hakkinda/tarihce" },
        { label: "Yönetim Kurulu", href: "/hakkinda/yonetim-kurulu" },
        { label: "Organizasyon Şeması", href: "/hakkinda/organizasyon-semasi" },
      ],
      [
        {
          label: "Etik İlkeler ve Uyum Politikaları",
          href: "/hakkinda/etik-ilkeler-ve-uyum-politikalari",
        },
      ],
    ],
  },
  {
    label: "Faaliyet Alanları",
    banner: {
      href: "/faaliyet-alanlari",
      title: "Faaliyet Alanları",
      image:
        "https://cdn.koc.com.tr/cmscontainer/kocholding/media/koc/menu-img/faaliyet_alanlari_2.jpg?ext=.jpg",
    },
    columns: [
      [
        { label: "Sektörler", href: "/faaliyet-alanlari/sektorler" },
        { label: "Şirketler", href: "/faaliyet-alanlari/sirketler" },
        { label: "Markalar", href: "/faaliyet-alanlari/markalar" },
        { label: "Uluslararası Ağ", href: "/faaliyet-alanlari/uluslararasi-ag" },
      ],
      [{ label: "Yabancı Ortaklar", href: "/faaliyet-alanlari/yabanci-ortaklar" }],
    ],
  },
  {
    label: "Yatırımcı İlişkileri",
    banner: {
      href: "/yatirimci-iliskileri",
      title: "Yatırımcı İlişkileri",
      image:
        "https://cdn.koc.com.tr/cmscontainer/kocholding/media/koc/menu-img/yatirimci-iliskileri-menu.jpg?ext=.jpg",
    },
    columns: [
      [
        { label: "Ana Sayfa", href: "/yatirimci-iliskileri" },
        { label: "Neden IGG?", href: "/yatirimci-iliskileri/neden-igg" },
        { label: "IGG Hakkında", href: "/yatirimci-iliskileri/igg-hakkinda" },
        {
          label: "Hisse Senedi ve Yatırımcı Bilgisi",
          href: "/yatirimci-iliskileri/hisse-senedi-ve-yatirimci-bilgisi",
        },
      ],
      [
        { label: "Sunumlar ve Bültenler", href: "/yatirimci-iliskileri/sunumlar-ve-bultenler" },
        { label: "Finansal Bilgiler", href: "/yatirimci-iliskileri/finansal-bilgiler" },
        { label: "Duyuru ve Yayınlar", href: "/yatirimci-iliskileri/duyuru-ve-yayinlar" },
        { label: "Raporlar", href: "/yatirimci-iliskileri/raporlar" },
      ],
      [
        { label: "Yatırımcı Seti", href: "/yatirimci-iliskileri/yatirimci-seti" },
        { label: "Kurumsal Yönetim", href: "/yatirimci-iliskileri/kurumsal-yonetim" },
        { label: "Takvim", href: "/yatirimci-iliskileri/takvim" },
        { label: "İletişim", href: "/yatirimci-iliskileri/iletisim" },
      ],
    ],
  },
  {
    label: "IGG'de Hayat",
    banner: {
      href: "/kocta-hayat",
      title: "IGG'de Hayat",
      image:
        "https://cdn.koc.com.tr/cmscontainer/kocholding/media/koc/menu-img/koc_ta_hayat.jpg?ext=.jpg",
    },
    columns: [[
      { label: "İçinde IGG Var", href: "/kocta-hayat/icinde-igg-var" },
      { label: "IGG'li Olmak", href: "/kocta-hayat/iggli-olmak" },
      { label: "Endüstri İlişkileri", href: "/kocta-hayat/endustri-iliskileri" },
    ]],
  },
  {
    label: "Sürdürülebilirlik",
    banner: {
      href: "/surdurulebilirlik",
      title: "Sürdürülebilirlik",
      image:
        "https://cdn.koc.com.tr/cmscontainer/kocholding/media/koc/menu-img/surdurulebilirlik.jpg?ext=.jpg",
    },
    columns: [
      [
        { label: "Geleceğe. Birlikte", href: "/surdurulebilirlik" },
        { label: "İş için. Birlikte", href: "/surdurulebilirlik/is-icin-birlikte" },
        { label: "İnsan için. Birlikte", href: "/surdurulebilirlik/insan-icin-birlikte" },
        { label: "Dünya için. Birlikte", href: "/surdurulebilirlik/dunya-icin-birlikte" },
      ],
      [
        { label: "Toplum için. Birlikte", href: "/surdurulebilirlik/toplum-icin-birlikte" },
        { label: "Politika ve Raporlar", href: "/surdurulebilirlik/politika-ve-raporlar" },
        { label: "Vakfımız", href: "/surdurulebilirlik/vakif" },
        { label: "Müzeler", href: "/surdurulebilirlik/muzeler" },
      ],
      [{ label: "Sponsorluklar", href: "/surdurulebilirlik/sponsorluklar" }],
    ],
  },
  {
    label: "Medya Merkezi",
    banner: {
      href: "/medya-merkezi",
      title: "Medya Merkezi",
      image:
        "https://cdn.koc.com.tr/cmscontainer/kocholding/media/koc/menu-img/medya_merkezi.jpg?ext=.jpg",
    },
    columns: [[
      { label: "Haberler", href: "/medya-merkezi/haberler" },
      { label: "Basın Bültenleri", href: "/medya-merkezi/basin-bultenleri" },
      { label: "Bizden Haberler", href: "/medya-merkezi/bizden-haberler" },
      { label: "Kılavuzlar", href: "/medya-merkezi/kilavuzlar" },
    ]],
  },
] as const;

/* --------- UTILS --------- */
function classNames(...arr: Array<string | false | null | undefined>) {
  return arr.filter(Boolean).join(" ");
}

/* --------- HEADER --------- */
export default function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const pathname = usePathname();
  const headerRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // rota değişince kapat
  React.useEffect(() => {
    setMobileOpen(false);
    setOpenIndex(null);
    setSearchOpen(false);
  }, [pathname]);

  // dışarı tık + ESC
  React.useEffect(() => {
    if (openIndex === null) return;
    const onDocClick = (e: MouseEvent) => {
      const root = headerRef.current;
      if (!root) return;
      if (!root.contains(e.target as Node)) setOpenIndex(null);
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

  const linkColor = scrolled
    ? "text-gray-900 hover:text-gray-700"
    : "text-white hover:text-white/80";

  return (
    <header
      ref={headerRef}
      className={classNames(
        "fixed inset-x-0 top-0 z-50 transition-all",
        scrolled ? "backdrop-blur bg-white/80 shadow-sm" : "bg-transparent"
      )}
      role="banner"
    >
      {/* container-fluid */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <nav className="flex h-16 items-center" aria-label="Main">
          {/* Sol logo + hamburger */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center" aria-label="IGG anasayfa">
              <img src={scrolled ? "/logo.svg" : "/logo-white.svg"} alt="IGG" className="h-8 w-auto" />
            </Link>

            <button
              onClick={() => setMobileOpen((s) => !s)}
              className={classNames(
                "lg:hidden inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm cursor-pointer",
                scrolled ? "border-black/10" : "border-white/30",
                linkColor
              )}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label="Menüyü aç/kapat"
            >
              <span>☰</span>
            </button>
          </div>

          {/* Orta menü */}
          <ul className="hidden lg:flex flex-1 items-center justify-center gap-6">
            {NAV.map((item, idx) => (
              <li key={item.label} className="relative">
                <button
                  className={classNames(
                    "inline-flex items-center gap-1 text-sm font-medium focus:outline-none cursor-pointer",
                    linkColor
                  )}
                  aria-haspopup="true"
                  aria-expanded={openIndex === idx}
                  onClick={() => setOpenIndex((s) => (s === idx ? null : idx))}
                >
                  <span>{item.label}</span>
                  <svg width="12" height="12" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M5 7l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          {/* Sağ aksiyonlar */}
          <div className={classNames("ml-auto flex items-center gap-2", linkColor)}>
            <Link href="/en" className="hidden sm:inline text-sm font-medium">EN</Link>
            <button
              onClick={() => setSearchOpen(true)}
              className={classNames(
                "inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm cursor-pointer",
                scrolled ? "border-black/10" : "border-white/30"
              )}
              aria-label="Arama"
            >
              🔍
            </button>
          </div>
        </nav>
      </div>

      {/* FULL-WIDTH PANEL */}
      {openIndex !== null && (
        <MegaPanel item={NAV[openIndex]} onClose={() => setOpenIndex(null)} />
      )}

      {/* Mobil off-canvas */}
      <MobileOffCanvas open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Search popup */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] hidden lg:flex items-start justify-center pt-24">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSearchOpen(false)} />
          <div className="relative z-10 w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Bir arama yapın…</h2>
              <button
                onClick={() => setSearchOpen(false)}
                className="rounded-md border border-black/10 px-3 py-1 text-sm cursor-pointer"
                aria-label="Kapat"
              >
                KAPAT
              </button>
            </div>
            <form action="/arama" method="get" className="mt-4">
              <label className="flex items-stretch gap-2 border rounded-xl p-2">
                <input type="text" name="keyword" className="flex-1 outline-none" placeholder="Aramak istediğiniz kelimeyi girin" />
                <button type="submit" className="px-4 rounded-md border text-sm cursor-pointer">ARA</button>
              </label>
              <div className="mt-4">
                <h3 className="mb-2 text-sm font-medium text-black/60">Popüler aramalar:</h3>
                <ul className="flex flex-wrap gap-2">
                  {[
                    { label: "FAALİYET RAPORU", href: "/yatirimci-iliskileri/raporlar" },
                    { label: "SÜRDÜRÜLEBİLİRLİK", href: "/surdurulebilirlik" },
                    { label: "ŞİRKETLER", href: "/faaliyet-alanlari/sirketler" },
                  ].map((q) => (
                    <li key={q.href}>
                      <Link href={q.href} className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs">
                        <span>{q.label}</span><span>→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* animasyon keyframe */}
      <style jsx global>{`
        @keyframes megaslide {
          from { transform: translateY(0.5rem); opacity: 0; }
          to   { transform: translateY(0);      opacity: 1; }
        }
      `}</style>
    </header>
  );
}

/* --------- FULL-WIDTH PANEL COMPONENT --------- */
function MegaPanel({
  item,
  onClose,
}: {
  item: (typeof NAV)[number];
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-x-0 top-16 z-50 origin-top translate-y-2 opacity-0"
      style={{ animation: "megaslide 180ms ease-out forwards" }}
    >
      <div className="w-full bg-white border-t border-black/10 shadow-[0_20px_40px_rgba(0,0,0,.08)]">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Sol büyük görsel */}
            <Link
              href={item.banner.href}
              className="col-span-12 lg:col-span-6 overflow-hidden rounded-2xl group"
              onClick={onClose}
            >
              <div
                className="relative h-[320px] lg:h-[420px] w-full bg-cover bg-center rounded-2xl"
                style={{ backgroundImage: `url(${item.banner.image})` }}
                aria-hidden
              />
              <div className="mt-4">
                <h3 className="text-3xl lg:text-4xl font-bold">{item.banner.title}</h3>
                <span className="mt-2 inline-flex items-center gap-2 text-sm text-gray-700">
                  Daha fazla bilgi
                  <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M7 5l6 5-6 5" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Sağ sütunlar */}
            <div className="col-span-12 lg:col-span-6">
              <div className="grid grid-cols-1">
                {item.columns.map((col, ci) => (
                  <ul key={ci} className="divide-y divide-black/10 rounded-2xl overflow-hidden bg-white">
                    {col.map((link) => (
                      <li key={link.href} className="group">
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className="flex items-center justify-between px-5 py-4 text-[15px] hover:bg-black/[.03]"
                        >
                          <span>{link.label}</span>
                          <svg width="16" height="16" viewBox="0 0 20 20" className="opacity-60 group-hover:opacity-100 transition">
                            <path d="M7 5l6 5-6 5" fill="none" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------- MOBILE OFF-CANVAS --------- */
function MobileOffCanvas({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
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
            <img src="/logo.svg" alt="IGG" className="h-7 w-auto" />
          </Link>
          <button
            onClick={onClose}
            aria-label="Kapat"
            className="rounded-md border border-black/10 px-3 py-2 text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto p-4">
          <form action="/arama" method="get" className="mb-4">
            <label className="flex items-stretch gap-2 border rounded-lg p-2">
              <input type="text" name="keyword" placeholder="Aramak istediğiniz kelimeyi yazın" className="flex-1 outline-none" />
              <button type="submit" className="px-3 py-1 rounded-md border text-sm cursor-pointer">ARA</button>
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
                            <Link href={link.href} onClick={onClose} className="block rounded px-2 py-1 text-sm hover:bg-black/5">
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

      {open && (
        <button className="fixed inset-0 z-[60] bg-black/40 lg:hidden" aria-label="Kapat" onClick={onClose} />
      )}
    </>
  );
}
