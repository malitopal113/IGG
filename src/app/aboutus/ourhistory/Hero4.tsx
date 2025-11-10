"use client";
import React from "react";
import { latoBadge } from "@/app/font"; // Lato sadece badge için

type Banner = {
  subtitle: string;
  title: string;
  desc: string;
  imgDesktop: string;
  imgTablet: string;
  imgMobile: string;
};

const BANNER: Banner = {
  subtitle: "About Us",
  title: "We are IGG",
  desc:
    "With a commitment to quality, speed, and professionalism, IGG delivers reliable solutions that connect industries across Europe and beyond.",
  imgDesktop: "/assets/aboutus/ourhistory/about-hero1-3.png",
  imgTablet:  "/assets/aboutus/ourhistory/about-hero1-3.png",
  imgMobile:  "/assets/aboutus/ourhistory/about-hero1-3.png",
};

export default function Hero1() {
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <section id="heroSlider4" className="relative w-screen overflow-hidden">
      <div id="heroCarousel" className="carousel" ref={rootRef}>
        <div className="carousel-inner">
          <div className="carousel-item active">
            {/* ---- Görsel ---- */}
            <picture className="hero-picture">
              <source media="(min-width: 1200px)" srcSet={BANNER.imgDesktop} />
              <source media="(min-width: 601px)"  srcSet={BANNER.imgTablet} />
              <source media="(max-width: 600px)"  srcSet={BANNER.imgMobile} />
              <img
                src={BANNER.imgDesktop}   /* fallback */
                alt={BANNER.title}
                className="slide-img"
                decoding="async"
                loading="eager"
                fetchPriority="high"
              />
            </picture>

            <div className="overlay" />

            {/* ---- İçerik ---- */}
            <div className="fg hero-content">
              <div className="fg-content">
                <div className="container mx-auto text-white max-w-3xl">
                  <span className={`subtitle-badge ${latoBadge.className}`}>
                    {BANNER.subtitle}
                  </span>
                  <h1 className="text-2xl md:text-4xl font-bold mt-2 leading-tight">
                    {BANNER.title}
                  </h1>

                  <div className="mt-6 ml-15 flex">
                    <div className="h-auto w-[1px] bg-amber-500 mr-4 line-delay" />
                    <div>
                      <p className="text-white/90 max-w-xl">{BANNER.desc}</p>
                      {/* CTA yok */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ---- /İçerik ---- */}
          </div>
        </div>

        {/* Scroll Down Arrow */}
        
      </div>

      {/* ---- Scoped CSS ---- */}
      <style jsx>{`
        /* YÜKSEKLİK: Mobilde görünmeme sorununa karşı svh + dveh + iOS fallback */
        #heroCarousel {
          position: relative;
          height: 100svh;               /* modern mobil güvenli vh */
          height: 100dvh;               /* modern tarayıcılar */
          min-height: 100svh;
        }
        @supports (-webkit-touch-callout: none) {
          /* eski iOS fallback */
          #heroCarousel { min-height: -webkit-fill-available; }
        }

        #heroCarousel .carousel-inner {
          position: relative;
          height: 100%;
          overflow: hidden;
          display: flex;
        }

        #heroCarousel .carousel-item {
          position: absolute; inset: 0; opacity: 1; transform: translateX(0); z-index: 2;
        }

        /* <picture> ve <img> tam dolum + sağa odak */
        #heroCarousel .hero-picture {
          position: absolute;
          inset: 0;
          display: block;
          width: 100%;
          height: 100%;
        }
        #heroCarousel .slide-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
           object-position: center center;     /* SAĞA ODAK */
          /* iOS çizim tutarlılığı için küçük itici */
          transform: translateZ(0);
        }

        #heroCarousel .overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,.4);
          pointer-events: none;
        }

        /* İçerik yerleşimi (svh ile uyumlu) */
        #heroCarousel .fg {
          position: absolute; inset: 0;
          display: flex; align-items: flex-start; justify-content: flex-start;
          padding-top: 32svh;
        }
        @media (min-width: 768px) {
          #heroCarousel .fg { padding-top: 28svh; }
        }

        /* Badge */
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
          #heroCarousel .carousel-item .fg-content { margin-left: 30vh; }
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
          animation: fgEnter 700ms ease-out 2s forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          #heroCarousel .carousel-item .fg-content { opacity: 1; transform: none; }
          #heroCarousel .carousel-item.active .fg-content { animation: none; }
        }

        /* Scroll Down Arrow */
        #heroCarousel .arrowSection{
          position:absolute;
          bottom:2rem;
          right:24rem;
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
          50%{  transform: rotate(45deg) translateY(0);   opacity:1;  }
          100%{ transform: rotate(45deg) translateY(0);   opacity:.4; }
        }

        /* Küçük ekran ayarları */
        @media (max-width: 640px){
          #heroCarousel .arrowSection{ bottom:7rem; right:1rem; }
          #heroCarousel .slide-img { object-position: 75% center;}
        }
          
      `}</style>
    </section>
  );
}
