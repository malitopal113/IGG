"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";


/* ---------- NAV DATA ---------- */
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
        {
          label: "Sunumlar ve Bültenler",
          href: "/yatirimci-iliskileri/sunumlar-ve-bultenler",
        },
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
    columns: [
      [
        { label: "İçinde IGG Var", href: "/kocta-hayat/icinde-igg-var" },
        { label: "IGG'li Olmak", href: "/kocta-hayat/iggli-olmak" },
        { label: "Endüstri İlişkileri", href: "/kocta-hayat/endustri-iliskileri" },
      ],
    ],
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
    columns: [
      [
        { label: "Haberler", href: "/medya-merkezi/haberler" },
        { label: "Basın Bültenleri", href: "/medya-merkezi/basin-bultenleri" },
        { label: "Bizden Haberler", href: "/medya-merkezi/bizden-haberler" },
        { label: "Kılavuzlar", href: "/medya-merkezi/kilavuzlar" },
      ],
    ],
  },
] as const;

/* ---------- UTILS ---------- */
function classNames(...arr: Array<string | false | null | undefined>) {
  return arr.filter(Boolean).join(" ");
}

/* ---------- COMPONENT ---------- */
export default function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [animSeed, setAnimSeed] = React.useState(0); // her açılışta animasyonu tetiklemek için
  const pathname = usePathname();
  const headerRef = React.useRef<HTMLElement | null>(null);

  // scroll state
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // route change -> close
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

  // tıklayınca aç/kapa + her açılışta animasyon seed yükselt
  const toggleMenu = (idx: number) => {
    setOpenIndex((s) => {
      const next = s === idx ? null : idx;
      if (next !== null) setAnimSeed((n) => n + 1);
      return next;
    });
  };

  // Link rengi: panel açıkken siyah; değilse scrolled veya transparent
  const linkColor =
    openIndex !== null
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
          "fixed inset-x-0 top-0 z-[60] transition-all",
          scrolled || openIndex !== null
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
                <Image src="/assets/menu/logo.svg" alt="IGG" width={120} height={32} priority className="h-20 w-auto" />
              </Link>

              <button
                onClick={() => setMobileOpen((s) => !s)}
                className={classNames(
                  "lg:hidden inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm cursor-pointer",
                  scrolled || openIndex !== null ? "border-black/10" : "border-white/30",
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

    return (
      <li key={item.label} className="relative">
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
          {/* Sadece label altında çizgi */}
          <span
            className={classNames(
              "relative",
              active &&
                "after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-full after:bg-[#F9423A]"
            )}
          >
            {item.label}
          </span>

          {/* Ok: active ise #F9423A */}
          <svg
            width="15" height="15" viewBox="0 0 20 20" aria-hidden="true"
            className={classNames(active ? "text-[#F9423A]" : "text-[#F9423A]")}
          >
            <path d="M5 7l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </li>
    );
  })}
</ul>


            {/* Right: EN + search */}
            <div className={classNames("ml-auto flex items-center gap-2", linkColor)}>
              <Link href="/en" className="hidden sm:inline text-sm font-medium">
                EN
              </Link>
              <button
                onClick={() => setSearchOpen(true)}
                className={classNames(
                  "inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm cursor-pointer",
                  scrolled || openIndex !== null ? "border-black/10" : "border-white/30"
                )}
                aria-label="Arama"
              >
                🔍
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* FULL-WIDTH MEGA PANEL (header ALTINDA, en üstten aşağı açılır) */}
      {openIndex !== null && (
        <MegaPanelTop
          key={`panel-${openIndex}-${animSeed}`}
          item={NAV[openIndex]}
          onClose={() => setOpenIndex(null)}
        />
      )}

      {/* MOBILE OFF-CANVAS */}
      <MobileOffCanvas open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* SEARCH POPUP (desktop) */}
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
                <input
                  type="text"
                  name="keyword"
                  className="flex-1 outline-none"
                  placeholder="Aramak istediğiniz kelimeyi girin"
                />
                <button type="submit" className="px-4 rounded-md border text-sm cursor-pointer">
                  ARA
                </button>
              </label>
            </form>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx global>{`
        @keyframes megaslideTop {
          from { transform: translateY(-24px); opacity: 0; }
          to   { transform: translateY(0);      opacity: 1; }
        }
      `}</style>
    </>
  );
}

/* ---------- FULL-WIDTH MEGA PANEL (TOP: 0 — header z-[60] üstte kalır) ---------- */
function MegaPanelTop({
  item,
  onClose,
}: {
  item: (typeof NAV)[number];
  onClose: () => void;
}) {
  return (
    <>
      {/* SCRIM: header'ı örtmesin diye z-[40] (panelin ALTINDA) */}
      <button
        aria-label="Kapat"
        onClick={onClose}
        className="fixed inset-0 z-[40] bg-black/40"
      />

      {/* PANEL: header'ın altında z-[50], en üstten aşağı animasyon */}
      <div
        data-mega-panel="true"
        className="fixed inset-x-0 top-25 z-[50] origin-top animate-[megaslideTop_700ms_ease-out_forwards]"
      >
        <div className="w-full bg-white border-t border-black/10 shadow-[0_20px_40px_rgba(0,0,0,.08)]">
          <div className="w-full max-w-none pl-0 pr-4 sm:pr-6 lg:pr-8 xl:pr-12 2xl:pr-16 py-8">
            <div className="grid grid-cols-12 gap-8">
              {/* Sol: büyük görsel + başlık */}
              <Link
  href={item.banner.href}
  className="col-span-12 lg:col-span-4 xl:col-span-5 overflow-hidden group"
  onClick={onClose}
>
  <div className="relative h-[300px] lg:h-[380px] w-full">
    {/* Görsel (hover yok) */}
    <div
      className="absolute inset-0 bg-center bg-cover"
      style={{ backgroundImage: `url(${item.banner.image})` }}
      aria-hidden
    />

    {/* Alttan yukarı gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" aria-hidden />

    {/* Metin overlay */}
    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-8">
      <h3 className="text-white text-4xl lg:text-5xl font-extrabold drop-shadow-md">
        {item.banner.title}
      </h3>

      {/* “Daha fazla bilgi” + sadece buna özel hover */}
<span className="relative mt-3 inline-flex items-center gap-2 text-white/95 text-sm lg:text-md group/daha">
  Daha fazla bilgi
  <svg
    width="16" height="16" viewBox="0 0 20 20" aria-hidden="true"
    className="shrink-0 transition-transform duration-200 group-hover/daha:translate-x-1"
  >
    {/* OK rengi güncellendi */}
    <path d="M7 5l6 5-6 5" fill="none" stroke="#F9423A" strokeWidth="2" />
  </svg>

  {/* Kırmızı çizgi: yazıyla TAM aynı soldan başlasın, biraz daha kalın */}
  <span
    aria-hidden
    className="pointer-events-none absolute -bottom-2 left-0 h-[2px] w-[450px] lg:w-[500px] bg-[#F9423A]"
  />
</span>
    </div>
  </div>
</Link>

              {/* Sağ: akış aşağı -> sonra sağ sütuna; arkaplan yok */}
<div className="col-span-12 lg:col-span-8 xl:col-span-7">
  {/* sütunlar: md'de 2, xl'de 3; dikeyden sağa akar */}
  <div className="columns-1 md:columns-3 xl:columns-2 gap-x-10 [column-fill:_balance]">
    {item.columns.flat().map((link) => (
      <Link
        key={link.href}
        href={link.href}
        onClick={onClose}
        // her bir madde tam blok; satır sonlarında bölünmesin
        className="group block py-3  transition-colors"
        style={{ breakInside: "avoid" }}
      >
        <span className="flex items-center justify-between">
          <span className="text-gray-900">
            {link.label}
          </span>

          {/* OK: varsayılan gri, hover’da #F9423A */}
          <svg
            width="14" height="14" viewBox="0 0 20 20" aria-hidden="true"
            className="ml-3 text-gray-300 group-hover:text-[#F9423A] transition-colors"
          >
            <path d="M7 5l6 5-6 5" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </span>

        {/* Alt çizgi: varsayılan gri, hover’da #F9423A */}
        <span className="block h-px bg-gray-200 mt-3 group-hover:bg-[#F9423A] transition-colors" />
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
            <img src="/assets/menu/logo.svg" alt="IGG" className="h-7 w-auto" />
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
              <input
                type="text"
                name="keyword"
                placeholder="Aramak istediğiniz kelimeyi yazın"
                className="flex-1 outline-none"
              />
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
                            <Link
                              href={link.href}
                              onClick={onClose}
                              className="block rounded px-2 py-1 text-sm hover:bg-black/5"
                            >
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
              <Link
                href="/en"
                onClick={onClose}
                className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-black/5"
              >
                EN
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {open && (
        <button
          className="fixed inset-0 z-[60] bg-black/40 lg:hidden"
          aria-label="Kapat"
          onClick={onClose}
        />
      )}
    </>
  );
}
