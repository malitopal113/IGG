"use client";

import { useCallback, useMemo, useState, useId } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  cubicBezier,
  useReducedMotion,
} from "framer-motion";
import type { Variants, Easing } from "framer-motion";

type NewsItem = {
  title: string;
  description: string;
  href: string;
  alt: string;
  imgWide: string;
  imgSquare: string;
};

const ORANGE = "#FFBF00";
const EASE_OUT: Easing = cubicBezier(0.16, 1, 0.3, 1);

const container: Variants = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const ITEMS: NewsItem[] = [
  {
    title: "THE BEST MOMENTS FROM THE ITALIAN GRAND PRIX",
    description:
      "Team dinners, Alex Dunne’s guest appearance, and Lando’s Valentino Rossi-inspired jacket: A fly on the wall look at this weekend's action on and off-track",
    href: "/racing/formula-1/2025/italian-grand-prix/the-best-moments/",
    alt: "The best moments from the Italian Grand Prix",
    imgWide:
      "https://mclaren.bloomreach.io/cdn-cgi/image/width=1080,height=810,fit=crop,quality=80,format=webp/delivery/resources/content/gallery/mclaren-racing/formula-1/2025/2025-schedule/italian-gp/sunday/reaction/best-moments-wide.jpg",
    imgSquare:
      "https://mclaren.bloomreach.io/cdn-cgi/image/width=750,height=1000,fit=crop,quality=80,format=webp/delivery/resources/content/gallery/mclaren-racing/formula-1/2025/2025-schedule/italian-gp/sunday/reaction/best-moments-square.jpg",
  },
  {
    title: "2025 ITALIAN GRAND PRIX – McLAREN RACE REPORT",
    description: `"We finish the final European double-header with more important and valuable points"`,
    href: "/racing/formula-1/2025/italian-grand-prix/race-report/",
    alt: "2025 Italian Grand Prix – McLAREN Race Report",
    imgWide:
      "https://mclaren.bloomreach.io/cdn-cgi/image/width=1080,height=810,fit=crop,quality=80,format=webp/delivery/resources/content/gallery/mclaren-racing/formula-1/2025/2025-schedule/italian-gp/sunday/report/2234147398.jpg",
    imgSquare:
      "https://mclaren.bloomreach.io/cdn-cgi/image/width=750,height=1000,fit=crop,quality=80,format=webp/delivery/resources/content/gallery/mclaren-racing/formula-1/2025/2025-schedule/italian-gp/sunday/report/report-hero.jpg",
  },
  {
    title: "2025 ITALIAN GRAND PRIX – McLAREN QUALIFYING REPORT",
    description: `"It’s a long race, a lot can happen, but Sunday is usually our strength, so I’m excited"`,
    href: "/racing/formula-1/2025/italian-grand-prix/2025-italian-grand-prix-qualifying-report/",
    alt: "2025 Italian Grand Prix – McLAREN Qualifying Report",
    imgWide:
      "https://mclaren.bloomreach.io/cdn-cgi/image/width=1080,height=810,fit=crop,quality=80,format=webp/delivery/resources/content/gallery/mclaren-racing/formula-1/2025/2025-schedule/italian-gp/saturday/report/op---2233998243.jpg",
    imgSquare:
      "https://mclaren.bloomreach.io/cdn-cgi/image/width=750,height=1000,fit=crop,quality=80,format=webp/delivery/resources/content/gallery/mclaren-racing/formula-1/2025/2025-schedule/italian-gp/saturday/report/hero-square.jpg",
  },
  {
    title: "2025 ITALIAN GRAND PRIX – McLAREN PRACTICE REPORT",
    description:
      `"We've still got a few things to improve, but it’s good we’re still at the top of the timings despite that"`,
    href: "/racing/formula-1/2025/italian-grand-prix/2025-italian-grand-prix-practice-report/",
    alt: "2025 Italian Grand Prix – McLAREN Practice Report",
    imgWide:
      "https://mclaren.bloomreach.io/cdn-cgi/image/width=1080,height=810,fit=crop,quality=80,format=webp/delivery/resources/content/gallery/mclaren-racing/formula-1/2025/2025-schedule/italian-gp/friday/report/ln-2233834769.jpg",
    imgSquare:
      "https://mclaren.bloomreach.io/cdn-cgi/image/width=750,height=1000,fit=crop,quality=80,format=webp/delivery/resources/content/gallery/mclaren-racing/formula-1/2025/2025-schedule/italian-gp/friday/report/ln-2233834769---square.jpg",
  },
];

type SectionVars = React.CSSProperties & { ["--papaya"]: string };
const sectionStyle: SectionVars = {
  ["--papaya"]: ORANGE,
  paddingBlockStart: "clamp(5.5rem, 4.26761rem + 3.28638vw, 9rem)",
  paddingBlockEnd: "clamp(5rem, 4.64789rem + 0.938967vw, 6rem)",
  color: "rgb(17,19,20)",
};

export default function Abilities() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const count = ITEMS.length;

  const next = useCallback(() => setActive((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setActive((i) => (i - 1 + count) % count), [count]);

  const activeItem = useMemo(() => ITEMS[active], [active]);
  const prefersReduced = useReducedMotion();
  const pad2 = (n: number) => n.toString().padStart(2, "0");
  const linePatternId = useId();

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0.01 : 0.45, ease: EASE_OUT } },
  };
  const imageFx: Variants = {
    enter: { opacity: 0, scale: 1.12, transition: { duration: 0.001 } },
    center: { opacity: 1, scale: 1, transition: { duration: prefersReduced ? 0.01 : 0.6, ease: EASE_OUT } },
    exit:   { opacity: 0, scale: 1.2, transition: { duration: prefersReduced ? 0.01 : 0.4, ease: EASE_OUT } },
  };

  return (
    <section id="abilities" className="relative overflow-hidden  " style={sectionStyle}>
      {/* bg pattern */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.12]" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <pattern id={linePatternId} patternUnits="userSpaceOnUse" width="10" height="10">
            <rect x="4.5" y="-214.49" width="1" height="438.97" transform="translate(-2.07 5) rotate(-45)" fill="currentColor" />
            <rect x="4.5" y="-204.49" width="1" height="438.97" transform="translate(-9.14 7.93) rotate(-45)" fill="currentColor" />
            <rect x="4.5" y="-224.49" width="1" height="438.97" transform="translate(5 2.07) rotate(-45)" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${linePatternId})`} />
      </svg>

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* header + nav */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mb-2 md:mb-5 flex items-start justify-between"
        >
          <motion.div variants={fadeUp}>
            {/* <h3 className="text-[clamp(2rem,2rem+1.2vw,2.5rem)] font-black leading-none tracking-tight">
              Our Abilities
            </h3> */}
            <div className="mt-2 text-[clamp(2rem,2rem+0.6vw,3rem)] font-semibold tracking-wide">
              <span className="text-[color:#FFBF00] font-extrabold">Our Abilities</span>
            </div>
          </motion.div>

          {/* DESKTOP segmented nav (aynen) */}
          {/* {(() => {
            const isPrevDisabled = active === 0;
            const isNextDisabled = active === count - 1;

            const baseBtn =
              "relative group inline-flex h-9 w-14 items-center justify-center  select-none overflow-hidden cursor-pointer";

            const prevClasses = isPrevDisabled
              ? `${baseBtn} bg-white text-neutral-400`
              : `${baseBtn} bg-[color:var(--papaya)] text-white`;

            const nextClasses = isNextDisabled
              ? `${baseBtn} bg-white text-neutral-400`
              : `${baseBtn} bg-[color:var(--papaya)] text-white`;

            return (
              <motion.div variants={fadeUp} className="hidden md:flex items-center mr-25">
                <button
                  type="button"
                  aria-label="Previous"
                  aria-disabled={isPrevDisabled}
                  onClick={() => !isPrevDisabled && prev()}
                  className={prevClasses}
                  title="Previous"
                >
                  {!isPrevDisabled && (
                    <span className="absolute inset-0 -z-0 origin-left scale-x-0 bg-[#111314] transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  )}
                  <svg viewBox="0 0 24 24" className="relative z-10 h-4 w-4 transition-colors duration-300 group-hover:text-[color:var(--papaya)]">
                    <path d="M10.02,10.67c-.73,.74-.73,1.93,0,2.67l7.98,8-2.66,2.67L6.03,14.67c-.07-2.73,0-2.73,0-5.33L15.34,0l2.66,2.67-7.98,8Z" fill="currentColor"/>
                  </svg>
                </button>
                <span className="h-9 w-px bg-black/10 -mx-px" />
                <button
                  type="button"
                  aria-label="Next"
                  aria-disabled={isNextDisabled}
                  onClick={() => !isNextDisabled && next()}
                  className={nextClasses}
                  title="Next"
                >
                  {!isNextDisabled && (
                    <span className="absolute inset-0 -z-0 origin-right scale-x-0 bg-[#111314] transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  )}
                  <svg viewBox="0 0 24 24" className="relative z-10 h-4 w-4 transition-colors duration-300 group-hover:text-[color:var(--papaya)]">
                    <path d="M13.98,13.33c.73-.74,.73-1.93,0-2.67L6,2.67,8.66,0l9.31,9.33c.07,2.73,0,2.73,0,5.33l-9.31,9.33-2.66-2.67,7.98-8Z" fill="currentColor"/>
                  </svg>
                </button>
              </motion.div>
            );
          })()} */}

          {/* MOBIL prev/next — başlıkla aynı satırda sağda */}
          {/* <div className="md:hidden flex items-center gap-0 self-start">
            <button
              onClick={prev}
              className="h-8 w-10 flex items-center justify-center bg-white text-neutral-600 active:opacity-90"
              aria-label="Previous"
              title="Previous"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4">
                <path d="M10.02,10.67c-.73,.74-.73,1.93,0,2.67l7.98,8-2.66,2.67L6.03,14.67c-.07-2.73,0-2.73,0-5.33L15.34,0l2.66,2.67-7.98,8Z" fill="currentColor"/>
              </svg>
            </button>
            <button
              onClick={next}
              className="h-8 w-10 flex items-center justify-center bg-[color:var(--papaya)] text-white active:opacity-90"
              aria-label="Next"
              title="Next"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4">
                <path d="M13.98,13.33c.73-.74,.73-1.93,0-2.67L6,2.67,8.66,0l9.31,9.33c.07,2.73,0,2.73,0,5.33l-9.31,9.33-2.66-2.67,7.98-8Z" fill="currentColor"/>
              </svg>
            </button>
          </div> */}
        </motion.div>

        {/* image + cards */}
        <div className="grid grid-cols-1 items-start gap-0 lg:grid-cols-[minmax(880px,1fr)_minmax(520px,0.9fr)]">
          {/* LEFT IMAGE */}
          <div className="relative lg:pr-0 lg:-ml-8 xl:-ml-12 2xl:-ml-20 md:mb-0 mb-[110px]">
            <div className="relative min-h-[560px] h-[clamp(560px,40vw,750px)] overflow-hidden z-0">
              <svg aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.10]" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <rect width="100%" height="100%" fill={`url(#${linePatternId})`} />
              </svg>

              <AnimatePresence mode="popLayout" initial={false}>
                <motion.picture key={active} variants={imageFx} initial="enter" animate="center" exit="exit" className="absolute inset-0">
                  <source media="(min-width: 768px)" srcSet={activeItem.imgWide} />
                  <img src={activeItem.imgSquare} alt={activeItem.alt} className="h-full w-full object-cover" />
                </motion.picture>
              </AnimatePresence>
            </div>

            {/* MOBIL overlay kart — daha aşağı, daha az overlap */}
            <motion.div
              className="md:hidden absolute left-3 right-3 -bottom-[110px] z-20 rounded-sm border border-black/10 bg-white/95 backdrop-blur-sm p-4 shadow h-[180px] cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={(_, info) => {
                if (info.offset.x < -120) next();
                else if (info.offset.x > 120) prev();
              }}
            >
              <div className="text-[10px] font-semibold tracking-widest text-[color:var(--papaya)]">
                {pad2(active + 1)}
                <span className="mx-1 text-neutral-300">/</span>
                {pad2(ITEMS.length)}
              </div>

              <Link href={activeItem.href} className="block mt-1 h-[calc(100%-18px)] overflow-hidden">
                <h6 className="text-[0.98rem] font-extrabold leading-6 text-black line-clamp-2">
                  {activeItem.title}
                </h6>
                <p className="mt-2 text-[0.92rem] leading-6 text-neutral-700 line-clamp-3">
                  {activeItem.description}
                </p>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT CARDS — desktop */}
          <div className="relative z-10 mt-4 lg:mt-6 hidden md:block">
            <ul className="flex flex-col">
              {ITEMS.map((it, i) => {
                const isHover = hovered === i;
                return (
                  <li key={it.href} className="relative w-100">
                    <Link
                      href={it.href}
                      className="group relative block"
                      onMouseEnter={() => { setActive(i); setHovered(i); }}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => { setActive(i); setHovered(i); }}
                      onBlur={() => setHovered(null)}
                    >
                      <div className="relative rounded-sm border border-black/10 bg-white pl-15 pr-20 lg:pr-14 py-8 lg:h-[142px] shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                        <div className="pointer-events-none absolute top-0 right-full h-full overflow-visible">
                          <motion.span
                            className="relative block h-full bg-[color:var(--papaya)]"
                            animate={{ width: isHover && !prefersReduced ? 12 : 0 }}
                            transition={{ duration: 0.2, ease: EASE_OUT }}
                            style={{ zIndex: 30 }}
                          />
                        </div>

                        <div className="relative pr-8">
                          <h6 className="line-clamp-2 text-[0.95rem] font-extrabold tracking-[0.02em] leading-6 text-black">
                            {it.title}
                          </h6>
                          <p className="mt-2 line-clamp-2 text-[0.9rem] leading-6 text-neutral-600">
                            {it.description}
                          </p>
                        </div>

                        <motion.svg
                          viewBox="0 0 24 24"
                          className="pointer-events-none absolute right-3 top-3 h-5 w-5 text-neutral-700 group-hover:text-[color:var(--papaya)]"
                          animate={
                            isHover && !prefersReduced
                              ? { rotate: 45, x: [0, 4, 0] }
                              : { rotate: 0, x: 0 }
                          }
                          transition={{
                            rotate: { duration: 0.22, ease: EASE_OUT },
                            x: {
                              duration: 1.5,
                              ease: "easeInOut",
                              repeat: isHover && !prefersReduced ? Infinity : 0,
                              repeatType: "mirror",
                            },
                          }}
                          style={{ zIndex: 31 }}
                        >
                          <path d="M.89,23.26L22.14,2.01m0,0l-.97-.97H1.3m20.83,.97l.97,.97V23.51" fill="none" stroke="currentColor" strokeWidth="2"/>
                        </motion.svg>
                      </div>
                    </Link>
                    {i < ITEMS.length - 1 && <div className="h-px bg-black/10" />}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
