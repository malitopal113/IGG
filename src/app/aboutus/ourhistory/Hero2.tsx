"use client";
import React from "react";
import { latoBadge } from "@/app/font";

export default function HeroVideo() {
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <section id="heroSlider2" className="relative w-screen overflow-hidden">
      <div id="heroCarousel" className="carousel" ref={rootRef}>
        <div className="carousel-inner">
          <div className="carousel-item active">
            {/* ---- Video Background ---- */}
            <div className="hero-video-wrap">
              <video
                className="slide-video"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="/assets/aboutus/ourhistory/about-hero.png" // video yüklenmeden önce görülecek görsel
              >
                <source src="/assets/aboutus/ourhistory/hero2-video.mp4" type="video/mp4" />
                {/* İstersen webm ekle:
                <source src="/assets/hero/background.webm" type="video/webm" /> */}
              </video>
            </div>

            {/* Overlay */}
            <div className="overlay" />

            {/* ---- Content ---- */}
            <div className="fg hero-content">
              <div className="fg-content">
                <div className="container mx-auto text-white max-w-3xl">
                  
                  <h1 className="text-2xl md:text-5xl font-bold mt-2 leading-tight">
                    Global Flexibility
                  </h1>

                  <div className="mt-6 ml-12 flex">
                    <div className="h-auto w-[1px] bg-amber-500 mr-4 line-delay" />
                    <div>
                      <p className="text-white/90 max-w-xl">
                        INFO GROUP GLOBAL is a corporate company that has been involved in trade. Has adopted Quality, Speed and Professionalism as its principle.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ---- /Content ---- */}
          </div>
        </div>
      </div>

      <style jsx>{`
        #heroCarousel { position: relative; height: 100svh; min-height: 100svh; }
        @supports (-webkit-touch-callout: none){ #heroCarousel { min-height: -webkit-fill-available; } }

        #heroCarousel .carousel-inner {
          position: relative; height: 100%; overflow: hidden; display: flex;
        }

        #heroCarousel .carousel-item {
          position: absolute; inset: 0; opacity: 1; transform: translateX(0); z-index: 2;
        }

        /* Video */
        #heroCarousel .hero-video-wrap {
          position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden;
        }
        #heroCarousel .slide-video {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: center center;
          transform: translateZ(0);
        }

        /* Overlay */
        #heroCarousel .overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,.4);
          pointer-events: none;
        }

        /* İçerik */
        #heroCarousel .fg {
          position: absolute; inset: 0;
          display: flex; align-items: flex-start; justify-content: flex-start;
          padding-top: 32svh;
        }
        @media (min-width: 768px){ #heroCarousel .fg { padding-top: 28svh; } }



        @keyframes fgEnter {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        #heroCarousel .carousel-item .fg-content {
          opacity: 0; transform: translateY(24px); margin-left: 1vh;
        }
        @media (min-width: 768px){
          #heroCarousel .carousel-item .fg-content { margin-left: 30vh; }
        }
        #heroCarousel .carousel-item.active .fg-content {
          animation: fgEnter 700ms ease-out 1s forwards;
          padding-right: 20vw;
        }
        #heroCarousel .carousel-item .line-delay {
          opacity: 0; transform: translateY(24px);
        }
        #heroCarousel .carousel-item.active .line-delay {
          animation: fgEnter 700ms ease-out 2s forwards;
        }
      `}</style>
    </section>
  );
}
