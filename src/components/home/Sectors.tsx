"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
image: "https://www.sabanci.com/en/images/webp/ia_bankacilik.webp",
href: "/sectors/textile",
},
{
title: "Sports Management",
description:
"IGG operates in the sports industry with a global perspective, offering athlete representation, event organization, and sponsorship management. By combining international experience with innovative strategies, we support athletes, clubs, and brands to achieve sustainable success.",
image: "https://www.sabanci.com/en/images/webp/ia_enerji.webp",
href: "/sectors/sports-management",
},
{
title: "Trading",
description:
"IGG engages in international trading operations across multiple sectors, delivering raw materials, consumer goods, and industrial products. Our agile approach, global connections, and trust-based business model ensure efficiency and long-term partnerships worldwide.",
image: "https://www.sabanci.com/en/images/webp/ia_sanayi.webp",
href: "/sectors/trading",
},
{
title: "EPCM",
description:
"IGG provides comprehensive EPCM (Engineering, Procurement, Construction Management) services for large-scale industrial projects. From feasibility to commissioning, we manage every stage with technical expertise, cost efficiency, and international standards in mind.",
image: "https://www.sabanci.com/en/images/webp/ia_dijital.webp",
href: "/sectors/epcm",
},
];

export default function Sector() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="section3" className="relative w-full h-[calc(100vh-80px)] font-roboto text-[#1D1D1B]">
      {/* Title */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 text-[32px] font-semibold tracking-wide">
        Our Activity Fields
      </div>

      {/* Slides */}
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
          >
            <div className="flex items-center justify-center h-full bg-black/40">
              <div className="max-w-4xl px-6 text-center text-white">
                <h2 className="text-4xl md:text-5xl font-medium mb-4 title-I">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl mb-6 leading-relaxed">
                  {slide.description}
                </p>
                <div className="promotion">
                  <Link
                    href={slide.href}
                    className="inline-block bg-[#004f9f] text-white px-8 py-2 rounded-sm hover:bg-[#003f7f] transition"
                  >
                    <em>Discover</em>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 bg-white text-[#1D1D1B] rounded-full w-12 h-12 flex items-center justify-center shadow hover:bg-gray-100 transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-white text-[#1D1D1B] rounded-full w-12 h-12 flex items-center justify-center shadow hover:bg-gray-100 transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`px-4 py-1 text-sm font-medium border transition-all ${
              index === current
                ? "bg-[#004f9f] text-white border-[#004f9f]"
                : "bg-white text-[#1D1D1B] border-gray-300 hover:bg-gray-100"
            }`}
          >
            {slide.title}
          </button>
        ))}
      </div>
    </section>
  );
}
