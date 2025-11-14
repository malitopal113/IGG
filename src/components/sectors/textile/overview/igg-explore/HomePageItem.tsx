"use client";

import React, { useEffect, useRef, useState } from "react";

interface HomePageItemProps {
  image: string;
  titleLeft: string;
  titleRight: string;
  desc?: string;
  scale?: number; // initial scale (0..1)
  titleTranslateX?: number; // percent
  pinDurationMultiplier?: number;
  imageTargetScale?: number;   // final büyüklük (default 1.10 gibi)
  imageGrowthStart?: number;   // büyümenin başladığı progress (0..1)
  imageGrowthEnd?: number;     // büyümenin bittiği progress (0..1)
  imageGrowthCurve?: number;
  imageOffsetY?: number;   // eğri (1 düz, >1 daha yavaş başlar)
}

const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function HomePageItem({
  image,
  titleLeft,
  titleRight,
  desc = "",
  scale = 0.5,
  titleTranslateX = 84,
  pinDurationMultiplier = 1.6,
  imageTargetScale = 1.12,   // daha fazla yanlara genişlesin
  imageGrowthStart = 0.00,   // hemen başlasın
  imageGrowthEnd = 0.80,     // biraz daha uzun sürsün
  imageGrowthCurve = 1.25,
  imageOffsetY = -20  // büyüme ilk kısımda yavaş, sonra hızlanır

}: HomePageItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const [progress, setProgress] = useState(0); // scroll progress 0 → 1

  /** Scroll hesaplama */
  const tick = () => {
    const container = containerRef.current;
    if (!container) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    const rect = container.getBoundingClientRect();
    const winH = window.innerHeight;
    const sectionHeight = Math.max(container.offsetHeight, 1);

    const start = window.scrollY + rect.top - winH;
    const baseMax = sectionHeight + winH;
    const maxScroll = baseMax * pinDurationMultiplier;

    const scrolled = window.scrollY - start;
    const rawProgress = clamp(scrolled / maxScroll);

    setProgress((prev) => (Math.abs(prev - rawProgress) > 0.001 ? rawProgress : prev));
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [pinDurationMultiplier]);

  /** Values */
  const eased = easeOutCubic(progress);

  // image zoom
  const norm = clamp((eased - imageGrowthStart) / (imageGrowthEnd - imageGrowthStart));
const curve = Math.pow(norm, imageGrowthCurve); // 1: lineer, >1: başta yavaş
const imageScale = scale + curve * (imageTargetScale - scale);
  const imageStyle: React.CSSProperties = {
    transform: `scale(${imageScale})`,
    willChange: "transform",
    transition: "transform 0s",
  };

  // Left & right title slide
  const leftX = -titleTranslateX * (1 - eased);
  const rightX = titleTranslateX * (1 - eased);

  const titleFontSize = "clamp(36px, 7.8vw, 90px)";

  const leftStyle: React.CSSProperties = {
    transform: `translateX(${leftX}%)`,
    fontSize: titleFontSize,
    whiteSpace: "nowrap",
  };

  const rightStyle: React.CSSProperties = {
    transform: `translateX(${rightX}%)`,
    fontSize: titleFontSize,
    whiteSpace: "nowrap",
  };

  /** Description animation (resmin altında!) */
  const descThreshold = 0.55;
  const descProgress = clamp((eased - descThreshold) / (1 - descThreshold));
  const descAnimated = easeOutCubic(descProgress);

  const descStyle: React.CSSProperties = {
    opacity: descAnimated,
    transform: `translateY(${(1 - descAnimated) * 40}px)`,
    transition: "opacity 0s, transform 0s",
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0b0b0b] text-white"
      style={{ height: "300vh" }}
    >
      {/* Sticky animation layer */}
      <div
        ref={stickyRef}
        className="sticky top-[110px] h-[calc(100vh-110px)] flex items-center justify-center overflow-visible"
      >
        <div className="relative w-full max-w-[1400px] px-6">

          {/* IMAGE */}
          <div className="w-full flex justify-center pointer-events-none">
            <div
              className="relative overflow-visible"
              style={{
                width: "900px",
                maxWidth: "82vw",
              }}
            >
              {/* img tag */}
              <img
                src={image}
                alt={`${titleLeft} ${titleRight}`}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  transformOrigin: "center center",
                  ...imageStyle,
                }}
              />
            </div>
          </div>

          {/* LEFT TITLE */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none" style={{ width: "50%" }}>
            <div className="text-white font-light leading-none" style={{ ...leftStyle, textAlign: "left", paddingLeft: "10vw" }}>
              {titleLeft}
            </div>
          </div>

          {/* RIGHT TITLE */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" style={{ width: "50%" }}>
            <div className="text-white font-light leading-none" style={{ ...rightStyle, textAlign: "right", paddingRight: "10vw" }}>
              {titleRight}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Description artık RESMİN ALTINDA */}
      <div className="w-full flex justify-center mt-10" style={descStyle}>
        <div className="text-center w-[520px] max-w-[90%]">
          <p className="text-sm md:text-base text-white/90 leading-relaxed font-light">{desc}</p>
          <div className="mt-6">
            <a className="inline-block text-lg md:text-xl font-medium tracking-wide" href="#">
              MORE <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
