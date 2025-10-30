"use client";

import { useLayoutEffect, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

interface SlideItem {
  title: string;
  description: string;
  image: string;
  href: string;
}

const slides: SlideItem[] = [
  {
    title: "Racing & Merchandise",
    description:
      "High-performance custom merchandise and apparel solutions for motorsport teams and brands. Focused on quality, speed, and iconic branding.",
    image: "/assets/sectors/racing-merchandise.png",
    href: "/sectors/textile?racing-merchandise#tab=racing-merchandise",
  },
  {
    title: "Workwear",
    description:
      "Durable, functional, and comfortable workwear with modern textile technology, strong branding options, and safety-focused materials.",
    image: "/assets/sectors/workwear.png",
    href: "/sectors/textile?racing-merchandise#tab=workwear",
  },
  {
    title: "Military, Police & Security Wear",
    description:
      "Purpose-built technical uniforms and gear for military, police, and security organizations. Advanced materials for safety and performance.",
    image: "/assets/sectors/military-police-security-wear.png",
    href: "/sectors/textile?racing-merchandise#tab=military-police-security-wear",
  },
  {
    title: "Corporate Wear & Uniforms",
    description:
      "Smart, high-quality corporate uniforms for a unified brand identity. Stylish, easy-care fabrics for every professional environment.",
    image: "/assets/sectors/corporate-wear-uniforms.png",
    href: "/sectors/textile?racing-merchandise#tab=corporate-wear-uniforms",
  },
  {
    title: "Promotional Wear & Accessories",
    description:
      "Creative and high-durability promotional wear, accessories, and giveaways to elevate your brand in any campaign.",
    image: "/assets/sectors/promotional-wear-accessories.png",
    href: "/sectors/textile?racing-merchandise#tab=promotional-wear-accessories",
  },
  {
    title: "Sports & Teamwear",
    description:
      "Performance-driven sportswear and multi-sport team kits, engineered for comfort, movement, and branding impact.",
    image: "/assets/sectors/sports-teamwear.png",
    href: "/sectors/textile?racing-merchandise#tab=sports-teamwear",
  },
];

export default function Sectors() {
  const [current, setCurrent] = useState(0);

  // Window width takibi
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Sliding indicator (desktop)
  const listRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ top: 0, height: 0 });

  const computePos = (idx: number) => {
    const el = itemRefs.current[idx];
    if (!listRef.current || !el) return { top: 0, height: 0 };
    return { top: el.offsetTop, height: el.offsetHeight };
  };

  useLayoutEffect(() => {
    const id = requestAnimationFrame(() => {
      setIndicator(computePos(current));
    });
    return () => cancelAnimationFrame(id);
  }, [current]);

  useEffect(() => {
    const onResize = () => setIndicator(computePos(current));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [current]);

  // SLIDE INDEX
  const goTo = (idx: number) => setCurrent(idx);

  // Oklar ile ileri - geri slide
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  // Discover butonu
  const handleDirectLink = (href: string) => {
    window.location.href = href;
  };

  // Buradaki padding sol tarafta md:pl-28 (7rem), xl'da daha fazla olabilir
  // Sağ tarafta aynı oranı kullanarak yaslanmayan padding uygulanır.
  const sidePadding = windowWidth > 1280 ? "6rem" : windowWidth > 976 ? "3rem" : "10vw";

  return (
    <section id="categoriestextile" className="relative w-screen min-h-screen h-[100dvh] font-roboto text-white overflow-hidden">
      {/* Background slides */}
      <div className="relative w-screen h-full min-h-screen overflow-hidden">
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
              width: "100vw",
              height: "100vh"
            }}
          />
        ))}

        <div className="absolute inset-0 bg-[#0a2340]/60 z-10 w-screen h-screen" />

        {/* Sol başlıklar (responsive) */}
        {windowWidth > 976 ? (
          <div className="absolute z-20 left-12 xl:left-24 top-16 md:top-50 text-white max-w-md">
            <div className="text-3xl md:text-5xl font-semibold opacity-90 mb-10">Our Activity Fields</div>
            <div className="relative pl-8 xl:pl-14 md:pl-10 border-l-[3px] border-white" ref={listRef}>
              <span
                className="absolute -left-[3px] top-0 w-[7px] bg-white transition-all duration-300 ease-out"
                style={{ top: indicator.top, height: indicator.height }}
                aria-hidden
              />
              <div className="space-y-3 md:space-y-3.5">
                {slides.map((s, i) => {
                  const active = i === current;
                  return (
                    <button
                      key={s.title}
                      ref={(el) => {
                        itemRefs.current[i] = el;
                      }}
                      onClick={() => goTo(i)}
                      className={`text-left block w-full transition cursor-pointer ${
                        active
                          ? "text-white font-semibold text-2xl md:text-5xl whitespace-nowrap"
                          : "text-white/80 font-semibold text-xl md:text-3xl hover:text-white whitespace-nowrap"
                      }`}
                    >
                      {s.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute inset-x-0 mt-10 z-20 flex justify-center">
            <span className="text-white text-4xl sm:text-5xl font-semibold">
              Our Activity Fields
            </span>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            className={`
              absolute z-20 top-1/2 -translate-y-1/2 w-screen 
              flex flex-col items-center
              px-6
              ${windowWidth <= 976 
                ? 'left-1/2 -translate-x-1/2 text-center pt-24 max-w-[88vw]'
                : 'right-0 max-w-3xl text-right items-end'}
              will-change-transform will-change-opacity
            `}
            style={{
              paddingLeft: windowWidth > 976 ? sidePadding : "10vw",
              paddingRight: windowWidth > 976 ? sidePadding : "10vw",
              ...(windowWidth > 976 && { right: 0, left: "auto", transform: "translateY(-50%)" }),
              ...(windowWidth <= 976 && { left: "50%", transform: "translate(-50%, -50%)" })
            }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-4 drop-shadow text-white text-center mx-auto">
              {slides[current].title}
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl leading-relaxed mb-6 opacity-95 max-w-2xl mx-auto md:mx-0 text-white text-center">
              {slides[current].description}
            </p>
            <button
              onClick={() => handleDirectLink(slides[current].href)}
              className="inline-block bg-[#0C1C8C] hover:bg-white hover:text-[#0C1C8C] text-white cursor-pointer px-10 py-4 font-bold text-lg sm:text-xl rounded transition-colors duration-500 text-center mx-auto"
              style={{ border: "none" }}
            >
              Discover
            </button>
          </motion.div>
        </AnimatePresence>

        {windowWidth <= 976 && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30"
              style={{border: "none", background: "none", padding: 0}}
            >
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <path d="M44 54L18 30L44 6" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30"
              style={{border: "none", background: "none", padding: 0}}
            >
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <path d="M16 6L42 30L16 54" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        )}
      </div>
    </section>
  );
}
