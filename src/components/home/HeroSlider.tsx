"use client";
import React from "react";
import Link from "next/link";
import { latoBadge } from "@/app/font"; // Lato sadece badge için
import type Carousel from "bootstrap/js/dist/carousel";
import { FaArrowRight } from "react-icons/fa";

type Slide = {
  id: string;
  subtitle: string;
  title: string;
  desc: string;
  ctaLabel: string;
  ctaHref: string;
  imgDesktop: string;
  imgTablet: string;
  imgMobile: string;
};

// TODO: Kendi görsellerini /public/assets/slider altına koy.
// Örn: /public/assets/slider/slide1.jpg
const SLIDES: Slide[] = [
  {
    id: "1",
    subtitle: "IGG Stories",
    title: "Global Trading & EPCM Expertise",
    desc:
      "From trading networks to EPCM services, IGG provides reliable solutions that connect businesses across industries and continents.",
    ctaLabel: "Read story",
    ctaHref: "/newsroom/business/defender-octa-jlr",
    imgDesktop: "/assets/slider/igg-trade-slider3.png", // ← burayı kendi yolunla değiştir
    imgTablet:  "/assets/slider/igg-trade-slider3.png",
    imgMobile:  "/assets/slider/igg-trade-slider3.png",
  },
  {
    id: "2",
    subtitle: "IGG Stories",
    title: "Innovating Textile Solutions",
    desc:
      "IGG combines expertise and technology to deliver sustainable, high-quality textile products that meet global standards.",
    ctaLabel: "Read story",
    ctaHref: "/newsroom/community/ihcl-skilling-talent",
    imgDesktop: "/assets/slider/igg-textile-slider2.png",
    imgTablet:  "/assets/slider/igg-textile-slider2.png",
    imgMobile:  "/assets/slider/igg-textile-slider2.png",
  },
  {
    id: "3",
    subtitle: "IGG Stories",
    title: "Shaping Future Athletes",
    desc:
      "Through innovative sports management projects, IGG supports young talents and builds strong foundations for tomorrow’s champions.",
    ctaLabel: "Read Story",
    ctaHref: "/newsroom/business/tata-power-renewable-solar-rooftop",
    imgDesktop: "/assets/slider/igg-textile-slider1.png",
    imgTablet:  "/assets/slider/igg-textile-slider1.png",
    imgMobile:  "/assets/slider/igg-textile-slider1.png",
  },
];

export default function HeroSliderBS() {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const instRef = React.useRef<Carousel | null>(null);
  const [active, setActive] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);

  const autoRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = (ms = 6000) => {
     stopAuto();
  autoRef.current = setInterval(() => {
    instRef.current?.next();
  }, ms);
  };
  const stopAuto = () => {
    instRef.current?.pause?.();

  if (autoRef.current !== null) {
    clearInterval(autoRef.current);
    autoRef.current = null;
  }

  };

  React.useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    const el = rootRef.current;
    if (!el) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const { default: Carousel } = await import("bootstrap/js/dist/carousel.js");
      const inst = new Carousel(el, {
        interval: false,
        wrap: true,
        pause: false,
        touch: true,
        keyboard: true,
        ride: false,
      });
      instRef.current = inst;
      
      // inst.cycle();

      const onSlid = () => {
        const items = Array.from(el.querySelectorAll<HTMLElement>(".carousel-item"));
        const idx = Math.max(0, items.findIndex((i) => i.classList.contains("active")));
        setActive(idx);
      };

      onSlid();
      el.addEventListener("slid.bs.carousel", onSlid);

      cleanup = () => {
        el.removeEventListener("slid.bs.carousel", onSlid);
        inst.dispose();
        instRef.current = null;
      };
    })();

    return () => {
      stopAuto();     // timer + bootstrap pause
      cleanup?.();
    };
  }, []);

  const total = SLIDES.length;
  // const to = (i: number) => instRef.current?.to(i);
  const next = () => instRef.current?.next();
  const prev = () => instRef.current?.prev();

  const togglePlay = () => {
  if (playing) {
    stopAuto();
    setPlaying(false);
  } else {
    // Bootstrap oto-timer ihtimali kalmasın
    instRef.current?.pause?.();
    startAuto(6000);
    setPlaying(true);
  }
};

  return (
    <section id="heroSlider" className="relative w-screen overflow-hidden">
      <div id="heroCarousel" className="carousel" ref={rootRef}>
        <div className="carousel-inner"
        
        >
          {SLIDES.map((s, i) => (
            <div key={s.id} className={`carousel-item ${i === 0 ? "active" : ""}`}>
              <picture>
                <source media="(min-width: 1200px)" srcSet={s.imgDesktop} />
                <source media="(min-width: 601px)" srcSet={s.imgTablet} />
                <source media="(max-width: 600px)" srcSet={s.imgMobile} />
                <img src={s.imgDesktop} alt={s.title} className="slide-img" />
              </picture>

              <div className="overlay" />

              <div className="fg hero-content">
               <div className="fg-content">
                <div className="container mx-auto  text-white max-w-3xl">
                  {/* Sadece subtitle + title 30px içeri */}
                  
                    <span className={`subtitle-badge ${latoBadge.className}`}>
                      {s.subtitle}
                    </span>
                    <h1 className="text-2xl md:text-4xl font-bold mt-2 leading-tight">
                      {s.title}
                    </h1>
                  

                  {/* Dikey çizgi + açıklama + CTA */}
                  <div className="mt-6 ml-15 flex">
                    <div className="h-auto w-[1px] bg-amber-500 mr-4 line-delay" />
                    <div>
                      <p className="text-white/90 max-w-xl">{s.desc}</p>
                        <Link
  href={s.ctaHref}
  className="cta inline-flex items-center gap-2 mt-6 px-6 py-2 rounded-sm bg-amber-400 text-white font-medium relative overflow-hidden group"
>
  <span className="relative z-10">{s.ctaLabel}</span>
  <FaArrowRight className="cta-arrow text-sm relative z-10" aria-hidden="true" />

  {/* Parlama efekti */}
  <span className="absolute inset-0 bg-gradient-to-r from-amber-500 via-white/40 to-amber-400 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
</Link>

                    </div>
                  </div>
                </div>
               </div>
              </div>
            </div>
          ))}
        </div>

        {/* Oklar */}


        {/* Pause/Play */}


        {/* Göstergeler */}
          <div className="tata-controls">
  <div className="tc-top">
    <span className="tc-count"><strong>{active + 1}</strong> / {total}</span>
  </div>

  <div className="tc-rail">
    <div className="tc-bar" style={{ width: `${((active + 1) / total) * 100}%` }} />
  </div>

  <div className="tc-bottom">
    <div className="tc-left">
    <button onClick={prev} className="tc-link">‹ Prev</button>
  </div>

  <div className="tc-middle">
    <span className="tc-sep">|</span>
    <button onClick={togglePlay} className="tc-link">{playing ? "❚❚" : "▶"}</button>
    <span className="tc-sep">|</span>
  </div>

  <div className="tc-right">
    <button onClick={next} className="tc-link">Next ›</button>
  </div>
  </div>
          </div>
          {/* Scroll Down Arrow */}
<div
  className="arrowSection"
  onClick={() => {
    const el = rootRef.current;
    if (!el) return;
    const y = el.offsetTop + el.offsetHeight; // sliderın bittiği yer
    window.scrollTo({ top: y, behavior: "smooth" });
  }}
>
  <div className="arrowContainer">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</div>
      </div>

      {/* Scoped CSS */}
      <style jsx>{`
        #heroCarousel { height: 100vh; position: relative; }
        @media (min-width: 992px) { #heroCarousel { height: 100vh; } }
        #heroCarousel .carousel-inner { position: relative; height: 100%; height: 100dvh; overflow: hidden; display: flex;  transition: transform 1200ms cubic-bezier(.22,.61,.36,1); will-change: transform;}

        /* SLIDE katmanı: görünmeyenler gerçekten devre dışı */
        #heroCarousel .carousel-item {
          position: absolute;
  inset: 0;
  opacity: 0;
  transition:
    opacity 1200ms ease-in-out,
    transform 1200ms ease-in-out;
        }
        #heroCarousel .carousel-item.active {
          opacity: 1;
  transform: translateX(0);
  z-index: 2;
        }
  #heroCarousel .carousel-item-next.carousel-item-start {
  opacity: 1;
  transform: translateX(5px);
}

/* Prev → soldan geliyor */
#heroCarousel .carousel-item-prev.carousel-item-end {
  opacity: 1;
  transform: translateX(-5px);
}

        #heroCarousel .slide-img { width: 100%; height: 100%; object-fit: cover; display: block; }
        #heroCarousel .overlay { position: absolute; inset: 0; background: rgba(0,0,0,.4); pointer-events: none; }

        /* İçerik yerleşimi */
        #heroCarousel .fg {
          position: absolute; inset: 0;
          display: flex; align-items: flex-start; justify-content: flex-start;
          padding-top: 32vh; /* yukarıdan başlat */
         
        }

        /* Badge (IGG Stories) */
        #heroCarousel .subtitle-badge{
          display:inline-block;
          background:#043A5B;
          color:#FFFFFF;
          font-style: italic;
          font-size:14px;
          line-height:10px;
          padding:4px 8px;
          border-radius:4px;
          letter-spacing:0;
          text-transform:none;
        }

        @keyframes arrowPulse {
  0%   { transform: translateX(0); }
  50%  { transform: translateX(6px); }
  100% { transform: translateX(0); }
}

/* react-icons SVG'si child component olduğu için global yazmalıyız */
:global(.cta-arrow) {
  display: inline-block;
  animation: arrowPulse 1.2s ease-in-out infinite;
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  :global(.cta-arrow) { animation: none; }
}

        /* Kontroller & göstergeler (senin mevcut stillerin) */
        #heroCarousel .control { display: none; }
        #heroCarousel .control.prev { left: 8px; }
        #heroCarousel .control.next { right: 8px; }
        #heroCarousel .pp { position: absolute; left: 12px; bottom: 12px; z-index: 20; width: 36px; height: 36px; border-radius: 9999px; background: rgba(0,0,0,.45); color: #fff; border: none; font-size: 16px; }
        #heroCarousel .indicators { position: absolute; left: 0; right: 0; bottom: 12px; display: flex; align-items: flex-end; justify-content: space-between; z-index: 20; }
        #heroCarousel .indicators .num { color: #fff; margin-left: 16px; }
        #heroCarousel .indicators .dots { display: flex; gap: 0; margin-right: 16px; width: 50%; height: 3px; }
        #heroCarousel .indicators .dots button { height: 3px; border: 0; margin: 0; padding: 0; background: rgba(255,255,255,.6); }
        #heroCarousel .indicators .dots button.active { background: #fff; }
        
        @keyframes fgEnter {
            0%   { opacity: 0; transform: translateY(24px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        #heroCarousel .carousel-item .fg-content {
  opacity: 0;
  transform: translateY(24px);
  margin-left: 1vh;
}
  @media (min-width: 768px) {
  #heroCarousel .carousel-item .fg-content {
    margin-left: 30vh; /* sadece tablet ve üstünde */
  }
}
      #heroCarousel .carousel-item.active .fg-content {
  animation: fgEnter 700ms ease-out 1s forwards;
  padding-right: 20vw;
}
  #heroCarousel .carousel-item .line-delay {
  opacity: 0;
  transform: translateY(24px);
}
#heroCarousel .carousel-item.active .line-delay {
  animation: fgEnter 700ms ease-out 2s forwards; /* 2s delay */
}

/* Hareket azalt tercihi olanlar için animasyonu kapat */
@media (prefers-reduced-motion: reduce) {
  #heroCarousel .carousel-item .fg-content { opacity: 1; transform: none; }
  #heroCarousel .carousel-item.active .fg-content { animation: none; }
}

#heroCarousel .tata-controls{
  position:absolute;
  left:16px;
  bottom:16px;
  width:min(380px, 60vw);
  padding:10px 12px 8px;
  
  border-radius:12px;
  background: rgba(0,0,0,.05);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  color:#fff;
  z-index:20;
}

/* üst satır: sayaç */
#heroCarousel .tc-top{
  display:flex; align-items:center; justify-content:flex-start;
  margin-bottom:6px;
}
#heroCarousel .tc-count{ font-size:14px; opacity:.95; }

/* progress rayı */
#heroCarousel .tc-rail{
  position:relative;
  width:100%;
  height:3px;
  background: rgba(255,255,255,.28);
  border-radius:9999px;
  overflow:hidden;
}
#heroCarousel .tc-bar{
  height:100%;
  background:#ffffff;
  transition: width 600ms ease;
}

/* alt satır: prev | pause | next */
#heroCarousel .tc-bottom{
  display: grid;
  grid-template-columns: 1fr auto 1fr; /* sol | orta | sağ */
  align-items: center;
  column-gap: 12px;
  margin-top: 8px;
}
#heroCarousel .tc-left  { justify-self: start; }
#heroCarousel .tc-middle{ justify-self: center; display:flex; align-items:center; gap:10px; }
#heroCarousel .tc-right { justify-self: end; }

#heroCarousel .tc-link{
  background:none; border:0; padding:0;
  color:#fff; opacity:.9; cursor:pointer;
  font-size:14px; line-height:1; white-space:nowrap; /* ⬅️ taşmayı önle */
}
#heroCarousel .tc-link:hover{ opacity:1; text-decoration: underline; }
#heroCarousel .tc-sep{ color:#fff; opacity:.55; user-select:none; }

/* Mobilde daha kompakt */
@media (max-width: 640px){
  #heroCarousel .tata-controls{
    left:12px; right:12px; width:auto; bottom:12px;
    padding:8px 10px;
  }
  #heroCarousel .tc-count{ font-size:13px; }
  #heroCarousel .tc-link{ font-size:13px; }
}

@media (min-width: 1024px){
  #heroCarousel .tata-controls{
    left: 275px;   /* 16px yerine 275px */
  }
}

/* Scroll Down Arrow (IGG-style) */
#heroCarousel .arrowSection{
  position:absolute;
  bottom:2rem;
  right:15rem;
  z-index:10;
  cursor:pointer;
}
#heroCarousel .arrowContainer{
  display:flex; flex-direction:column; align-items:center; gap:4px;
}
#heroCarousel .arrowContainer span{
  display:block; width:20px; height:20px;
  border-bottom:2px solid #fff; border-right:2px solid #fff;
  transform: rotate(45deg);
  animation: arrowBounce 1.7s infinite;
  opacity:.8;
}
#heroCarousel .arrowContainer span:nth-child(2){ animation-delay:.2s; }
#heroCarousel .arrowContainer span:nth-child(3){ animation-delay:.4s; }
#heroCarousel .arrowContainer span:nth-child(4){ animation-delay:.6s; }

@keyframes arrowBounce{
  0%{   transform: rotate(45deg) translateY(0);   opacity:.4; }
  50%{  transform: rotate(45deg) translateY(0); opacity:1;  }
  100%{ transform: rotate(45deg) translateY(0);   opacity:.4; }
}

/* İstersen mobilde biraz yukarı alalım */
@media (max-width: 640px){
  #heroCarousel .arrowSection{ bottom:7rem; right:1rem; }
}



      `}</style>
    </section>
  );
}
