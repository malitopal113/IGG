"use client";

import { useEffect, useRef, useState } from "react";

const GOLD = "#dca14a";
const GREY = "rgba(255,255,255,0.45)";

// süreler
const INITIAL_HIDE_MS = 3000; // sayfa açıldıktan sonra tüm butonları gizle
const IDLE_HIDE_MS = 5000;    // aktif/hover yoksa 5 sn sonra butonu gizle

const ITEMS = [
  { label: "Lead Stories", targetId: "heroSlider" },
  { label: "Activity Fields", targetId: "sectors" },
  { label: "Scale", targetId: "activity-countries" },
  { label: "Abilities", targetId: "abilities" },
];

export default function ScrollSpyNav() {
  const [activeId, setActiveId] = useState<string>(ITEMS[0].targetId);

  // görünürlük kontrolü için ek durumlar
  const [initialWindow, setInitialWindow] = useState(true);           // ilk 3 sn her şey görünür
  const [hoveredId, setHoveredId] = useState<string | null>(null);    // mouse ile üzerine gelinen
  const [autoShowId, setAutoShowId] = useState<string | null>(null);  // scroll/tık ile görünen
  const idleTimerRef = useRef<number | null>(null);

  // ↓↓↓ YENİ: sayfa altına yaklaşınca tüm bileşeni gizlemek için
  const [nearBottom, setNearBottom] = useState(false);
  useEffect(() => {
    const checkBottom = () => {
      const doc = document.documentElement;
      const reached = window.innerHeight + window.scrollY >= doc.scrollHeight - 30; // 30px eşik
      setNearBottom(reached);
    };
    checkBottom();
    window.addEventListener("scroll", checkBottom, { passive: true });
    window.addEventListener("resize", checkBottom);
    return () => {
      window.removeEventListener("scroll", checkBottom);
      window.removeEventListener("resize", checkBottom);
    };
  }, []);
  // ↑↑↑ YENİ

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveId(id);                 // tek tıkta aktiflik
    setAutoShowId(id);               // anında görünür yap
    resetIdleHide();                 // 5 sn sonra gizle
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // İlk 3 sn sonra butonları topluca gizle
  useEffect(() => {
    const t = window.setTimeout(() => setInitialWindow(false), INITIAL_HIDE_MS);
    return () => clearTimeout(t);
  }, []);

  // IntersectionObserver — aktif section'ı takip (senin ayarın)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && setActiveId(en.target.id)),
      { threshold: 0.45, rootMargin: "-10% 0px -40% 0px" }
    );
    ITEMS.forEach((it) => {
      const el = document.getElementById(it.targetId);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // aktif bölüm değiştiğinde, (ilk 3 sn'lik pencereden sonra) o butonu göster ve zamanlayıcı başlat
  useEffect(() => {
    if (!initialWindow && activeId) {
      setAutoShowId(activeId);
      resetIdleHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, initialWindow]);

  // idle gizleme zamanlayıcısını yenile
  function resetIdleHide() {
    if (idleTimerRef.current) {
      window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
    idleTimerRef.current = window.setTimeout(() => {
      setAutoShowId(null); // hareket yoksa butonu gizle
    }, IDLE_HIDE_MS) as unknown as number;
  }

  // hover handler'ları
  const onEnter = (id: string) => {
    setHoveredId(id);
    // hover varken gizleme sayacı dursun
    if (idleTimerRef.current) {
      window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  };
  const onLeave = (id: string) => {
    setHoveredId((prev) => (prev === id ? null : prev));
    // hover bitti, eğer o bölüm aktifse tekrar sayacı başlat
    if (activeId === id) resetIdleHide();
  };

  return (
    <section
      aria-label="In-page navigation"
      className={[
        "hidden [@media(min-width:1000px)]:block fixed right-10 top-1/2 z-40 hidden -translate-y-1/2 md:block",
        "transition-opacity duration-300",                 // yumuşak gizleme/gösterme
        nearBottom ? "opacity-0 pointer-events-none" : "opacity-100",
      ].join(" ")}
    >
      {/* Küçültülmüş sabit genişlik (senin ayarın) */}
      <div className="relative w-[110px]">
        {ITEMS.map((it) => {
          const active = activeId === it.targetId;

          // butonun görünüp görünmeyeceği:
          const showButton =
            initialWindow || hoveredId === it.targetId || autoShowId === it.targetId;

          return (
            // Satır yüksekliği & aralık (senin ayarın)
            <div
              key={it.targetId}
              className="relative mb-1 h-9"
              onMouseEnter={() => onEnter(it.targetId)}
              onMouseLeave={() => onLeave(it.targetId)}
            >
              {/* Buton (yalnızca gerektiğinde görünür) */}
              <button
                onClick={handleClick(it.targetId)}
                className={[
                  "relative inline-block w-full text-left pl-3 pr-0 py-[10px]",
                  "rounded-[2px] font-lato text-[13px] leading-[1.2] cursor-pointer",
                  "transition-opacity duration-500 ease-out",
                  showButton ? "opacity-100" : "opacity-0 pointer-events-none",
                  active
                    ? "bg-[#043a5b99]/75 text-white font-semibold"
                    : "bg-[#043a5b99]/60 text-[#efefef] hover:text-white",
                ].join(" ")}
              >
                {it.label}
              </button>

              {/* Altın çubuk (konum/kütle senin ayarın) */}
              <span
                style={{ backgroundColor: active ? GOLD : GREY }}
                className={[
                  "absolute right-[2px] top-1/2 -translate-y-1/2 h-[2px] z-10 transition-all duration-300",
                  active ? "w-[20px] opacity-100 h-[3px]" : "w-[14px] opacity-90",
                ].join(" ")}
              />

              {/* Dikey ray (senin ayarın) */}
              <span
                style={{ backgroundColor: active ? GOLD : GREY }}
                className="absolute right-0 top-0 h-full w-[3px] transition-all duration-300"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
