"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * IGG Header – Koc.com.tr header tasarımına yakın, Tailwind ile.
 * Notlar:
 * - Bootstrap/OWL yok; yalnızca Tailwind + minimal TS/JS.
 * - Mega menüler hover (desktop) ve tıklama (mobile) ile açılır.
 * - Arama popup'ı ve mobil off-canvas menü dahildir.
 * - Logo görsellerini /public altında tutun: /logo.svg, /logo-white.svg
 */

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
];

function classNames(...arr: Array<string | false | null | undefined>) {
  return arr.filter(Boolean).join(" ");
}

export default function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menus on route change
  React.useEffect(() => {
    setMobileOpen(false);
    setOpenIndex(null);
    setSearchOpen(false);
  }, [pathname]);

  return (
    <header
      className={classNames(
        "fixed inset-x-0 top-0 z-50 transition-all",
        scrolled ? "backdrop-blur bg-white/80 shadow-sm" : "bg-transparent"
      )}
      role="banner"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between" aria-label="Main">
          {/* Left: Brand + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center" aria-label="IGG anasayfa">
              {/* Renkli ve beyaz logo versiyonlarını duruma göre gösterebilirsiniz */}
              <img
                src={scrolled ? "/logo.svg" : "/logo-white.svg"}
                alt="IGG"
                className="h-8 w-auto"
              />
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((s) => !s)}
              className="lg:hidden inline-flex items-center justify-center rounded-md border border-black/10 px-3 py-2 text-sm"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label="Menüyü aç/kapat"
            >
              <span className="i-[bars]">☰</span>
            </button>
          </div>

          {/* Center: Desktop navbar */}
          <ul className="hidden lg:flex items-center gap-6">
            {NAV.map((item, idx) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenIndex(idx)}
                onMouseLeave={() => setOpenIndex((s) => (s === idx ? null : s))}
              >
                <button
                  className="inline-flex items-center gap-1 text-sm font-medium hover:text-black/80 focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={openIndex === idx}
                  onClick={() => setOpenIndex((s) => (s === idx ? null : idx))}
                >
                  <span>{item.label}</span>
                  <svg width="12" height="12" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M5 7l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>

                {/* Mega menu */}
                {openIndex === idx && (
                  <div className="absolute left-1/2 top-full w-[64rem] -translate-x-1/2 pt-4">
                    <div className="rounded-2xl border border-black/10 bg-white shadow-xl">
                      <div className="grid grid-cols-12 gap-6 p-6">
                        {/* Banner */}
                        <Link
                          href={item.banner.href}
                          className="col-span-12 lg:col-span-5 overflow-hidden rounded-xl group"
                        >
                          <div
                            className="relative h-40 w-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${item.banner.image})` }}
                            aria-hidden
                          />
                          <div className="p-4">
                            <h3 className="text-lg font-semibold">{item.banner.title}</h3>
                            <span className="text-sm inline-flex items-center gap-1">
                              Daha fazla bilgi
                              <svg width="12" height="12" viewBox="0 0 20 20" aria-hidden="true">
                                <path d="M7 5l6 5-6 5" fill="none" stroke="currentColor" strokeWidth="2" />
                              </svg>
                            </span>
                          </div>
                        </Link>

                        {/* Columns */}
                        <div className="col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                          {item.columns.map((col, ci) => (
                            <ul key={ci} className="space-y-2">
                              {col.map((link) => (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    className="text-sm hover:text-black/80"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Right: EN + Search */}
          <div className="flex items-center gap-2">
            <Link href="/en" className="hidden sm:inline text-sm font-medium">
              EN
            </Link>
            <button
              onClick={() => setSearchOpen(true)}
              className="inline-flex items-center justify-center rounded-md border border-black/10 px-3 py-2 text-sm"
              aria-label="Arama"
            >
              🔍
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        className={classNames(
          "lg:hidden fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] transform bg-white shadow-xl transition-transform",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-black/10">
          <Link href="/" className="flex items-center" aria-label="IGG anasayfa">
            <img src="/logo.svg" alt="IGG" className="h-7 w-auto" />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Kapat"
            className="rounded-md border border-black/10 px-3 py-2 text-sm"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto p-4">
          {/* Arama */}
          <form action="/arama" method="get" className="mb-4">
            <label className="flex items-stretch gap-2 border rounded-lg p-2">
              <input
                type="text"
                name="keyword"
                placeholder="Aramak istediğiniz kelimeyi yazın"
                className="flex-1 outline-none"
              />
              <button type="submit" className="px-3 py-1 rounded-md border text-sm">
                ARA
              </button>
            </label>
          </form>

          <ul className="space-y-2">
            {NAV.map((item, idx) => (
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
                            <Link href={link.href} className="block rounded px-2 py-1 text-sm hover:bg-black/5">
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
              <Link href="/en" className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-black/5">
                EN
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Scrim for mobile & search */}
      {(mobileOpen || searchOpen) && (
        <button
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-label="Kapat"
          onClick={() => {
            setMobileOpen(false);
            setSearchOpen(false);
          }}
        />
      )}

      {/* Search popup (desktop-first) */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 hidden lg:flex items-start justify-center pt-24">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSearchOpen(false)} />
          <div className="relative z-10 w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Bir arama yapın…</h2>
              <button
                onClick={() => setSearchOpen(false)}
                className="rounded-md border border-black/10 px-3 py-1 text-sm"
                aria-label="Kapat"
              >
                KAPAT
              </button>
            </div>
            <form action="/arama" method="get" className="mt-4">
              <label className="flex items-stretch gap-2 border rounded-xl p-2">
                <input
                  type="text"
                  name="keyword"
                  className="flex-1 outline-none"
                  placeholder="Aramak istediğiniz kelimeyi girin"
                />
                <button type="submit" className="px-4 rounded-md border text-sm">
                  ARA
                </button>
              </label>

              {/* Popüler aramalar */}
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
                        <span>{q.label}</span>
                        <span>→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
