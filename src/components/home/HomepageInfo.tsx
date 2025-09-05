"use client";

import React from "react";

export default function HomepageInfo() {
  return (
    <section data-component="homepage-info">
      <div className="container">
        <div className="intro text-center">
          <h5 className="heading-1">ABOUT INFO GROUP GLOBAL</h5>
          <p className="description">
            INFO GROUP GLOBAL is a corporate company that has been involved in
            trade. Has adopted Quality, Speed and Professionalism as its
            principle. If we express ourselves in one sentence, we say ;
            <br />
            <strong>Global Flexibility!</strong>
          </p>
        </div>

        <div className="industries text-center">
          <h5 className="heading-2">INFO GROUP GLOBALS INDUSTRIES</h5>
          <h5 className="heading-3">SECTORS</h5>
          <div className="separator"></div>
        </div>

        <div className="sectors-grid">
          <div className="sector">
            <img
              src="https://infogroupglobal.com/wp-content/uploads/2023/10/Textile-category-jpg.webp"
              alt="Textile"
            />
            <div className="overlay">
              <span>Textile</span>
              <a href="https://www.infogroupglobal.com/textile">Discover</a>
            </div>
          </div>

          <div className="sector">
            <img
              src="https://infogroupglobal.com/wp-content/uploads/2023/10/Trading-category-jpg.webp"
              alt="Trading"
            />
            <div className="overlay">
              <span>Trading</span>
              <a href="https://www.infogroupglobal.com/trading">Discover</a>
            </div>
          </div>

          <div className="sector">
            <img
              src="https://infogroupglobal.com/wp-content/uploads/2023/10/Energy-Categories-11.png"
              alt="Sports Management"
            />
            <div className="overlay">
              <span>Sports Management</span>
              <a href="https://www.infogroupglobal.com/portfolio/sports-management/">
                Discover
              </a>
            </div>
          </div>

          <div className="sector">
            <img
              src="https://infogroupglobal.com/wp-content/uploads/2025/06/IGG_EPCM-2.webp"
              alt="EPCM"
            />
            <div className="overlay">
              <span>EPCM</span>
              <a href="https://infogroupglobal-epcm.com/">Discover</a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        [data-component="homepage-info"] {
          padding: 100px 0 100px;
        }
        .container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 15px;
        }
        .intro .heading-1 {
          font-weight: 600;
          color: #6f6f6f;
          margin-bottom: 15px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-size: 28px;
        }
        .intro .description {
          color: #232323;
          font-size: 18px;
          line-height: 28px;
        }
        .industries .heading-2 {
          font-weight: 600;
          color: #6f6f6f;
          margin-top: 40px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-size: 15px;
        }
        .industries .heading-3 {
          font-weight: 700;
          color: #232323;
          text-transform: uppercase;
          margin: 10px 0 14px;
          font-size: 36px;
        }
        .separator {
          width: 80px;
          height: 2px;
          margin: 12px auto 40px;
          background: #d8b15a;
        }
        .sectors-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 70px;
        }
        .sector {
          position: relative;
          overflow: hidden;
          border-radius: 4px;
        }
        .sector img {
          width: 100%;
          height: auto;
          display: block;
        }
        .sector .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.1);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sector .overlay span {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          white-space: nowrap;
          opacity: 1;
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 700;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
          transition: transform 0.5s ease, opacity 0.5s ease;
        }
        .sector .overlay a {
          position: absolute;
          left: 50%;
          top: 100% !important; /* kartın en altından başlasın */
          transform: translate(-50%, -50%);
          opacity: 0 !important;
          pointer-events: none;
          color: #232323;
          text-decoration: none;
          padding: 5px 29px;
          border-radius: 999px;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: .5px;
          line-height: inherit;
          background: #fff;
          border: 2px solid #fff;
          transition: top 0.5s ease, opacity 0.5s ease, background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
          will-change: top, opacity, transform;
        }
        .sector:hover .overlay span {
          transform: translate(-50%, calc(-50% - 40px)); /* yukarı kayarak kaybolsun */
          opacity: 0 !important;
        }
        .sector:hover .overlay a {
          top: 50% !important; /* alttan ortaya gelsin */
          opacity: 1 !important;
          pointer-events: auto;
          /* Görsel/renk değişimini burada değil, sadece a:hover'da yapacağız */
          background: #fff;
          border: 2px solid #fff;
          color: #232323;
        }
        /* Sadece linkin üstüne gelince renk/çerçeve değişsin */
        .sector .overlay a:hover {
          background: transparent;
          border-color: #fff;
          color: #fff;
        }
        @media (max-width: 767px) {
          .sectors-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
