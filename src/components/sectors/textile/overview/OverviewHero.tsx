import React from "react";

export default function OverviewHero() {
  // ID'si categoriestextile olan elemana smooth scroll yapar
  const scrollDown = () => {
    if (typeof window !== "undefined") {
      const el = document.getElementById("categoriestextile");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center bg-white text-gray-900 px-6 sm:px-12 md:px-16 lg:px-24">
      {/* Şeffaf beyaz tonlarda bir SVG arka plan */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 800 600"
        fill="none"
        aria-hidden="true"
      >
        <rect width="800" height="600" fill="white" fillOpacity="0.8" />
        <circle cx="400" cy="300" r="280" fill="white" fillOpacity="0.6" />
        <circle cx="600" cy="150" r="100" fill="white" fillOpacity="0.4" />
        <circle cx="200" cy="450" r="80" fill="white" fillOpacity="0.3" />
      </svg>

      {/* İçerik */}
      <div className="relative z-10 max-w-3xl text-center pt-10">
        <h1 className="mb-8 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          IGG Textile Division
        </h1>
        <p className="mb-4 text-lg sm:text-xl md:text-2xl font-light leading-relaxed">
          Pioneering innovation in high-performance fabrics crafted for tomorrows industries.We combine sustainability with cutting-edge technology to redefine textile excellence.
        </p>
        <p className="mb-4 text-lg sm:text-xl md:text-2xl font-light leading-relaxed">
          Pioneering innovation in high-performance fabrics crafted for tomorrows industries.We combine sustainability with cutting-edge technology to redefine textile excellence.
        </p>
        <p className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed">
          Pioneering innovation in high-performance fabrics crafted for tomorrows industries.We combine sustainability with cutting-edge technology to redefine textile excellence.
        </p>
      </div>

      {/* Büyük animasyonlu aşağı ok */}
      <button
        onClick={scrollDown}
        aria-label="Scroll down"
        className="absolute bottom-12 flex items-center justify-center w-16 h-16 rounded-full text-gray-600 hover:text-gray-900 transition-colors cursor-pointer animate-bounce-slow hover:animate-wiggle"
      >
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <style jsx>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }
        .animate-wiggle {
          animation: wiggle 0.5s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }
      `}</style>
    </section>
  );
}
