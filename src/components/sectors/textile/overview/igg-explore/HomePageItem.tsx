// src/components/HomePageItem.tsx
"use client";

import React from "react";

type Props = {
  image: string;
  titleLeft: string;
  titleRight: string;
  desc?: string;
  initialTitleOffset?: number; // yüzde cinsinden başlangıç uzaklığı (ör. 84)
  stickyTop?: number; // px header yüksekliği, ör 110
};

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

export default function HomePageItem({
  image,
  titleLeft,
  titleRight,
  desc,
  initialTitleOffset = 84,
  stickyTop = 110,
}: Props) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const progressRef = React.useRef<number>(0); // mutable ref for smoother updates
  const [, forceRerender] = React.useState(0); // to re-render when progress changes
  const touchStartYRef = React.useRef<number | null>(null);

  // sensitivity tuning (smaller -> daha yavaş ilerler)
  const WHEEL_SENS = 0.0016; // deney: 0.0012 .. 0.002
  const TOUCH_SENS = 0.003;

  // RAF loop to update visuals smoothly (keeps re-render)
  React.useEffect(() => {
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      // render tick
      forceRerender((n) => n + 1);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  React.useEffect(() => {
    // Handlers typed explicitly
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 0.1) return;
      const p = progressRef.current;
      if (p < 1 || (p > 0 && e.deltaY < 0)) {
        e.preventDefault();
        const next = clamp(p + e.deltaY * WHEEL_SENS, 0, 1);
        progressRef.current = next;
        forceRerender((n) => n + 1);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches?.[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchStartYRef.current == null) return;
      const y = e.touches?.[0]?.clientY ?? 0;
      const delta = touchStartYRef.current - y;
      const p = progressRef.current;
      if (Math.abs(delta) < 2) return;
      if (p < 1 || (p > 0 && delta < 0)) {
        e.preventDefault();
        const next = clamp(p + delta * TOUCH_SENS, 0, 1);
        progressRef.current = next;
        forceRerender((n) => n + 1);
      }
      touchStartYRef.current = y;
    };

    const onTouchEnd = () => {
      touchStartYRef.current = null;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const p = progressRef.current;
      if (p < 1) {
        const keys = ["PageDown", "PageUp", " ", "ArrowDown", "ArrowUp", "Home", "End"];
        if (keys.includes(e.key)) {
          e.preventDefault();
          let step = 0;
          if (e.key === "PageDown" || e.key === " " || e.key === "ArrowDown") step = 0.12;
          if (e.key === "PageUp" || e.key === "ArrowUp") step = -0.12;
          const next = clamp(p + step, 0, 1);
          progressRef.current = next;
          forceRerender((n) => n + 1);
        }
      }
    };

    // options typed
    const listenerOptions: AddEventListenerOptions = { passive: false };

    // Attach
    window.addEventListener("wheel", onWheel, listenerOptions);
    window.addEventListener("touchstart", onTouchStart, listenerOptions);
    window.addEventListener("touchmove", onTouchMove, listenerOptions);
    window.addEventListener("touchend", onTouchEnd, listenerOptions);
    window.addEventListener("keydown", onKeyDown, listenerOptions);

    // Clean up (same handler references, no casting)
    return () => {
      window.removeEventListener("wheel", onWheel, listenerOptions);
      window.removeEventListener("touchstart", onTouchStart, listenerOptions);
      window.removeEventListener("touchmove", onTouchMove, listenerOptions);
      window.removeEventListener("touchend", onTouchEnd, listenerOptions);
      window.removeEventListener("keydown", onKeyDown, listenerOptions);
    };
  }, []);

  const progress = progressRef.current;

  const leftTranslatePct = -initialTitleOffset * (1 - progress);
  const rightTranslatePct = initialTitleOffset * (1 - progress);
  const imageScale = 1 + 0.14 * progress;
  const titleOpacity = 0.98;
  const descTranslateY = 168 * (1 - progress);
  const descOpacity = clamp(progress * 1.1, 0, 1);

  return (
    <section
      ref={containerRef}
      aria-label="Home page sticky item"
      style={{
        minHeight: `100vh`,
        width: "100%",
        background: "#0b0b0b",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          paddingLeft: "6vw",
          paddingRight: "6vw",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: `${stickyTop}px`,
            height: `calc(100vh - ${stickyTop}px)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: "720px",
              maxWidth: "86vw",
              height: "420px",
              maxHeight: "62vh",
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              transform: `scale(${imageScale})`,
              transition: "transform 120ms linear",
              zIndex: 10,
              boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
            }}
          />

          <div
            style={{
              position: "absolute",
              left: "5vw",
              top: "38%",
              transform: `translateX(${leftTranslatePct}%) translateY(-50%)`,
              transition: "transform 90ms linear",
              fontSize: "8vw",
              lineHeight: 0.9,
              fontWeight: 300,
              letterSpacing: "-0.02em",
              color: "#fff",
              opacity: titleOpacity,
              whiteSpace: "nowrap",
              zIndex: 20,
              pointerEvents: "none",
            }}
          >
            {titleLeft}
          </div>

          <div
            style={{
              position: "absolute",
              right: "5vw",
              top: "38%",
              transform: `translateX(${rightTranslatePct}%) translateY(-50%)`,
              transition: "transform 90ms linear",
              fontSize: "8vw",
              lineHeight: 0.9,
              fontWeight: 300,
              letterSpacing: "-0.02em",
              color: "#fff",
              opacity: titleOpacity,
              whiteSpace: "nowrap",
              zIndex: 20,
              pointerEvents: "none",
              textAlign: "right",
            }}
          >
            {titleRight}
          </div>
        </div>

        <div
          style={{
            marginTop: "28px",
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "6vw",
            transform: `translateY(${descTranslateY}%)`,
            opacity: descOpacity,
            transition: "transform 140ms linear, opacity 140ms linear",
            pointerEvents: descOpacity > 0.1 ? "auto" : "none",
          }}
        >
          <div style={{ maxWidth: "420px", color: "#fff", textAlign: "left" }}>
            {desc && (
              <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.6, fontWeight: 300 }}>
                {desc}
              </p>
            )}
            <div
              style={{
                marginTop: "22px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontWeight: 600,
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <span>MORE</span>
              <svg width="26" height="26" viewBox="0 0 38 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.083 26.2084L26.9163 10.7917" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11.083 10.7917H26.9163V26.2084" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          div[style*="font-size: 8vw"] {
            font-size: 12vw !important;
          }
        }
        @media (max-width: 640px) {
          div[style*="font-size: 8vw"] {
            font-size: 14vw !important;
          }
        }
      `}</style>
    </section>
  );
}
