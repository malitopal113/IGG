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

const SLIDES: Slide[] = [
  {
    id: "1",
    subtitle: "IGG Stories",
    title: "Rugged Diamond",
    desc:
      "Land Rover's most accomplished Defender, the OCTA, will be soon seen on Indian roads",
    ctaLabel: "Read story",
    ctaHref: "/newsroom/business/defender-octa-jlr",
    imgDesktop:
      "/content/dam/tata/images/newsroom/business/desktop/octa05_slideshow_desktop_1920x1080.jpg",
    imgTablet:
      "/content/dam/tata/images/newsroom/business/tab/octa05_slideshow_tab_768x1024.jpg",
    imgMobile:
      "/content/dam/tata/images/newsroom/business/mobile/octa05_slideshow_mobile_320x568.jpg",
  },
  {
    id: "2",
    subtitle: "IGG Stories",
    title: "Building Tomorrow’s Hospitality Workforce",
    desc:
      "IHCL's skilling programme bridges the talent gap while elevating service standards",
    ctaLabel: "Read story",
    ctaHref: "/newsroom/community/ihcl-skilling-talent",
    imgDesktop:
      "/content/dam/tata/images/newsroom/careers/desktop/ihcl-aguada-skilling_banner_desktop_1920x1080.jpeg",
    imgTablet:
      "/content/dam/tata/images/newsroom/careers/tab/ihcl-aguada-skilling_banner_tab_768x1024.jpeg",
    imgMobile:
      "/content/dam/tata/images/newsroom/careers/mobile/ihcl-aguada-skilling_banner_mobile_320x568.jpeg",
  },
  {
    id: "3",
    subtitle: "IGG Stories",
    title: "Making Energy While The Sun Shines",
    desc:
      "IGG Power Solar Rooftop helps businesses and households harness the power of the sun",
    ctaLabel: "Read Story",
    ctaHref: "/newsroom/business/tata-power-renewable-solar-rooftop",
    imgDesktop:
      "/content/dam/tata/images/newsroom/business/desktop/tata-power-roof-solar2_banner_desktop_1920x1080.jpg",
    imgTablet:
      "/content/dam/tata/images/newsroom/business/tab/tata-power-roof-solar2_banner_tab_768x1024.jpg",
    imgMobile:
      "/content/dam/tata/images/newsroom/business/mobile/tata-power-roof-solar2_banner_mobile_320x568.jpg",
  },
];

export default function HeroSliderBS() {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const instRef = React.useRef<Carousel | null>(null);
  const [active, setActive] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);

  React.useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    const el = rootRef.current;
    if (!el) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const { default: Carousel } = await import("bootstrap/js/dist/carousel.js");
      const inst = new Carousel(el, {
        interval: 3000,
        wrap: true,
        pause: false,
        touch: true,
        keyboard: true,
        ride: false,
      });
      instRef.current = inst;
      inst.cycle();

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
      cleanup?.();
    };
  }, []);

  const total = SLIDES.length;
  const to = (i: number) => instRef.current?.to(i);
  const next = () => instRef.current?.next();
  const prev = () => instRef.current?.prev();
  const togglePlay = () => {
    const inst = instRef.current;
    if (!inst) return;
    if (playing) {
      inst.pause();
      setPlaying(false);
    } else {
      inst.cycle();
      setPlaying(true);
    }
  };

  return (
    <section className="relative w-screen overflow-hidden">
      <div id="heroCarousel" className="carousel" ref={rootRef}>
        <div className="carousel-inner">
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
                <div className="container mx-auto  text-white max-w-3xl">
                  {/* Sadece subtitle + title 30px içeri */}
                  
                    <span className={`subtitle-badge ${latoBadge.className}`}>
                      {s.subtitle}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold mt-2 leading-tight">
                      {s.title}
                    </h1>
                  

                  {/* Dikey çizgi + açıklama + CTA */}
                  <div className="mt-6 ml-15 flex">
                    <div className="h-auto w-[2px] bg-amber-500 mr-4" />
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
          ))}
        </div>

        {/* Oklar */}
        <button className="control prev" onClick={prev} aria-label="Prev">‹</button>
        <button className="control next" onClick={next} aria-label="Next">›</button>

        {/* Pause/Play */}
        <button className="pp" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
          {playing ? "❚❚" : "▶"}
        </button>

        {/* Göstergeler */}
        <div className="indicators">
          <div className="num">
            <strong>{active + 1}</strong>&nbsp;/&nbsp;{total}
          </div>
          <div className="dots">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => to(i)}
                className={i === active ? "active" : ""}
                aria-label={`Slide ${i + 1}`}
                style={{ width: `${100 / total}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scoped CSS */}
      <style jsx>{`
        #heroCarousel { height: 75vh; position: relative; }
        @media (min-width: 992px) { #heroCarousel { height: 90vh; } }
        #heroCarousel .carousel-inner { position: relative; height: 100%; overflow: hidden; display: flex; transition: transform 0.8s ease-in-out;}

        /* SLIDE katmanı: görünmeyenler gerçekten devre dışı */
        #heroCarousel .carousel-item {
          position: absolute;
          inset: 0;
          opacity: 1;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 1200ms ease-in-out;
          z-index: 0;
        }
        #heroCarousel .carousel-item.active {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          z-index: 1;
        }

        #heroCarousel .slide-img { width: 100%; height: 100%; object-fit: cover; display: block; }
        #heroCarousel .overlay { position: absolute; inset: 0; background: rgba(0,0,0,.4); pointer-events: none; }

        /* İçerik yerleşimi */
        #heroCarousel .fg {
          position: absolute; inset: 0;
          display: flex; align-items: flex-start; justify-content: flex-start;
          padding-top: 26vh; /* yukarıdan başlat */
        }

        /* Badge (Tata Stories) */
        #heroCarousel .subtitle-badge{
          display:inline-block;
          background:#043A5B;
          color:#FFFFFF;
          font-style: italic;
          font-size:14px;
          line-height:16px;
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
        #heroCarousel .control { position: absolute; top: 50%; transform: translateY(-50%); z-index: 20; width: 44px; height: 44px; line-height: 44px; text-align: center; border-radius: 9999px; background: rgba(0,0,0,.45); color: #fff; font-size: 28px; border: none; }
        #heroCarousel .control.prev { left: 8px; }
        #heroCarousel .control.next { right: 8px; }
        #heroCarousel .pp { position: absolute; left: 12px; bottom: 12px; z-index: 20; width: 36px; height: 36px; border-radius: 9999px; background: rgba(0,0,0,.45); color: #fff; border: none; font-size: 16px; }
        #heroCarousel .indicators { position: absolute; left: 0; right: 0; bottom: 12px; display: flex; align-items: flex-end; justify-content: space-between; z-index: 20; }
        #heroCarousel .indicators .num { color: #fff; margin-left: 16px; }
        #heroCarousel .indicators .dots { display: flex; gap: 0; margin-right: 16px; width: 50%; height: 3px; }
        #heroCarousel .indicators .dots button { height: 3px; border: 0; margin: 0; padding: 0; background: rgba(255,255,255,.6); }
        #heroCarousel .indicators .dots button.active { background: #fff; }
        #heroCarousel .hero-content {padding-right: 18vw; }
      `}</style>
    </section>
  );
}
