"use client";

import { useLayoutEffect, useEffect, useRef, useState } from "react";
import Link from "next/link";

interface SlideItem {
  title: string;
  description: string;
  image: string;
  href: string;
}

const slides: SlideItem[] = [
  {
    title: "Textile",
    description:
      "IGG provides end-to-end textile solutions from design and sourcing to production and global delivery. With a strong supplier network and a focus on quality assurance, we ensure competitive advantage and reliability for our partners in the fashion and home textile industries.",
    image: "/assets/slider/igg-textile-slider2.png",
    href: "/sectors/textile",
  },
  {
    title: "Sports Management",
    description:
      "IGG operates in the sports industry with a global perspective, offering athlete representation, event organization, and sponsorship management. By combining international experience with innovative strategies, we support athletes, clubs, and brands to achieve sustainable success.",
    image: "/assets/slider/igg-textile-slider1.png",
    href: "/sectors/sports-management",
  },
  {
    title: "Trading",
    description:
      "IGG engages in international trading operations across multiple sectors, delivering raw materials, consumer goods, and industrial products. Our agile approach, global connections, and trust-based business model ensure efficiency and long-term partnerships worldwide.",
    image: "/assets/slider/igg-trade-slider3.png",
    href: "/sectors/trading",
  },
  {
    title: "EPCM",
    description:
      "IGG provides comprehensive EPCM (Engineering, Procurement, Construction Management) services for large-scale industrial projects. From feasibility to commissioning, we manage every stage with technical expertise, cost efficiency, and international standards in mind.",
    image: "/assets/slider/igg-textile-slider1.png",
    href: "/sectors/epcm",
  },
    {
    title: "Other",
    description:
      "lorem10lorem10lorem10lorem10lorem10lorem10lorem10lorem10lorem10lorem10lorem10lorem10",
    image: "/assets/slider/igg-trade-slider3.png",
    href: "/sectors/others",
  },
];

export default function Sector() {
  const [current, setCurrent] = useState(0);

  // --- Sliding indicator (single bar that moves up/down) ---
  const listRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
 const [indicator, setIndicator] = useState({ top: 0, height: 0 });

 const [entering, setEntering] = useState(false);

useEffect(() => {
  setEntering(true);
  const id1 = requestAnimationFrame(() => {
    const id2 = requestAnimationFrame(() => {
      setEntering(false);
    });
    return () => cancelAnimationFrame(id2);
  });
  return () => cancelAnimationFrame(id1);
}, [current]);

const computePos = (idx: number) => {
  const el = itemRefs.current[idx];
  if (!listRef.current || !el) return { top: 0, height: 0 };
  return { top: el.offsetTop, height: el.offsetHeight }; // üstten hizalama
};

useLayoutEffect(() => {
  const id = requestAnimationFrame(() => {
    setIndicator(computePos(current));
  });
  return () => cancelAnimationFrame(id);
}, [current]);

// resize/dinamik font yüklemeleri vs. için tekrar ölç
useEffect(() => {
  const onResize = () => setIndicator(computePos(current));
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}, [current]);

  const goTo = (idx: number) => setCurrent(idx);

  return (
    <section id="section3" className="relative w-full h-[calc(100vh-80px)] font-roboto text-[#1D1D1B]">
      {/* Background slides */}
      <div className="relative w-full h-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "top center",
            }}
          />
        ))}

        {/* blue overlay */}
        <div className="absolute inset-0 bg-[#0a2340]/60 z-10" />

        {/* Left title list (Sabancı-style) */}
        <div className="absolute z-20 left-12 md:left-45 top-16 md:top-30 text-white max-w-md">
          <div className="text-3xl md:text-5xl font-semibold opacity-90 mb-10">Our Activity Fields</div>
          <div className="relative pl-8 md:pl-10 border-l-[3px] border-white" ref={listRef}>
            {/* sliding indicator flush with main border */}
            <span
              className="absolute -left-[3px] top-0 w-[7px]  bg-white transition-all duration-300 ease-out"
              style={{ top: indicator.top  , height: indicator.height }}
              aria-hidden
            />

            <div className="space-y-3 md:space-y-3.5">
              {slides.map((s, i) => {
                const active = i === current;
                return (
                  <button
                    key={s.title}
                    ref={(el) => { itemRefs.current[i] = el; }}

                    onClick={() => goTo(i)}
                    className={`text-left block w-full transition cursor-pointer ${
                      active
                        ? "text-white font-semibold text-2xl md:text-5xl whitespace-nowrap"
                        : "text-white/80 font-semibold text-xl md:text-4xl hover:text-white whitespace-nowrap"
                    }`}
                  >
                    {s.title}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right content (title + desc + CTA) */}
        <div 
             className={`
                  absolute z-20 right-1/2 md:right-16 left-1/2 md:left-auto
                  top-[58%] md:top-[56%]  /* biraz daha aşağıda */
                  -translate-y-1/2 -translate-x-1/2 md:translate-x-0
                 text-white max-w-3xl px-6 text-center md:text-right
                  transition-all duration-500 ease-out
                  ${entering ? "opacity-0 -translate-y-6" : "opacity-100 translate-y-0"}
                  `}
                  key={current}  /* content remount = temiz animasyon */
                  >
              <h2 className="text-5xl md:text-6xl font-semibold mb-4 drop-shadow text-center md:text-right ">
              {slides[current].title}
              </h2>
              <p className="text-base md:text-lg leading-relaxed mb-6 opacity-95">
                {slides[current].description}
              </p>
          <Link
            href={slides[current].href}
            className="inline-block bg-[#0C1C8C] hover:bg-white hover:text-[#0C1C8C] text-white px-12 py-5 font-bold text-xl transition-colors duration-500 text-center"
          >
            Discover
          </Link>
        </div>
      </div>
    </section>
  );
}