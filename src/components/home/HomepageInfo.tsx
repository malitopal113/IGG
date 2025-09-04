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
          <h5 className="heading-2">INFO GROUP GLOBAL-S INDUSTRIES</h5>
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
          padding: 60px 0 100px;
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
        }
        .intro .description {
          color: #232323;
          font-size: 16px;
          line-height: 28px;
        }
        .industries .heading-2 {
          font-weight: 600;
          color: #6f6f6f;
          margin-top: 40px;
        }
        .industries .heading-3 {
          font-weight: 700;
          color: #232323;
          text-transform: uppercase;
          margin: 10px 0;
        }
        .separator {
          width: 100px;
          height: 3px;
          margin: 0 auto 40px;
          background: #fac246;
        }
        .sectors-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
        }
        .sector {
          position: relative;
          overflow: hidden;
        }
        .sector img {
          width: 100%;
          height: auto;
          display: block;
        }
        .sector .overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.1);
          color: #fff;
          text-align: center;
          transition: background 0.3s;
        }
        .sector .overlay span {
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 12px;
        }
        .sector .overlay a {
          background: #fff;
          color: #232323;
          text-decoration: none;
          padding: 8px 18px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
        }
        .sector:hover .overlay {
          background: rgba(0, 0, 0, 0.3);
        }
        @media (max-width: 767px) {
          .sectors-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      {/* Additional global styles for homepage-info */}
      <style jsx global>{`
        [data-component="homepage-info"] .heading-1 { text-transform: uppercase; letter-spacing: .06em; font-size: 12px; color: #6f6f6f; }
        [data-component="homepage-info"] .heading-2 { text-transform: uppercase; letter-spacing: .06em; font-size: 12px; color: #6f6f6f; margin-top: 40px; }
        [data-component="homepage-info"] .heading-3 { font-size: 36px; font-weight: 700; color: #232323; margin-bottom: 14px; }
        [data-component="homepage-info"] .pofo-separator { background-color: #d8b15a; width: 80px; height: 2px; margin: 12px auto 40px; }
        /* --- Card title bottom-left, button hidden (like reference) --- */
        [data-component="homepage-info"] .featurebox17 .blog-box-image { position: absolute; inset: 0; }
        [data-component="homepage-info"] .featurebox17 .blog-box-image span { position: absolute; left: 28px; bottom: 28px; font-size: clamp(28px, 4vw, 44px) !important; }
        [data-component="homepage-info"] .featurebox17 .blog-box-content a.btn { display: none; }
        /* --- Card spacing & look --- */
        [data-component="homepage-info"] .featurebox17 { overflow: hidden; border-radius: 4px; }
        [data-component="homepage-info"] .pofo-featurebox-equal-height { margin-top: 10px; }
        /* --- Container width a bit larger like ref --- */
        [data-component="homepage-info"] .wpb_wrapper { max-width: 1200px; }
      `}</style>
    </section>
  );
}
