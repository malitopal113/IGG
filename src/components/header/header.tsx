"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  {
    label: "Hakkında",
    banner: {
      href: "/hakkinda",
      title: "Hakkında",
      image: "/assets/menu/hakkinda.jpg",
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
      image: "/assets/menu/faaliyet.jpg",
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
      image: "/assets/menu/yatirimci.jpg",
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
      href: "/iggde-hayat",
      title: "IGG'de Hayat",
      image: "/assets/menu/iggde-hayat.jpg",
    },
    columns: [[
      { label: "İçinde IGG Var", href: "/iggde-hayat/icinde-igg-var" },
      { label: "IGG'li Olmak", href: "/iggde-hayat/iggli-olmak" },
      { label: "Endüstri İlişkileri", href: "/iggde-hayat/endustri-iliskileri" },
    ]],
  },
  {
    label: "Sürdürülebilirlik",
    banner: {
      href: "/surdurulebilirlik",
      title: "Sürdürülebilirlik",
      image: "/assets/menu/surdurulebilirlik.jpg",
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
      image: "/assets/menu/medya.jpg",
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
      {/* --- içerik senin gönderdiğinle aynı kalıyor --- */}
    </header>
  );
}