"use client";

import React from "react";

export default function HomepageInfo() {
  return (
    <section data-component="homepage-info" id="homepage-info">
      <div className="container">
        <div className="industries text-center">
          
          <h5 className="heading-3">SECTORS</h5>
          <div className="separator"></div>
        </div>

        <div className="sectors-grid">
          <div className="sector">
            <img
              src="./assets/home-info/textile2.png"
              alt="Textile"
            />
            <div className="overlay">
              <span>Textile</span>
              <a href="./assets/home-info/textile2.png">Discover</a>
            </div>
          </div>

          <div className="sector">
            <img
              src="./assets/home-info/trading.png"
              alt="Trading"
            />
            <div className="overlay">
              <span>Trading</span>
              <a href="./assets/home-info/trading.png">Discover</a>
            </div>
          </div>

          <div className="sector">
            <img
              src="./assets/home-info/sport.png"
              alt="Sports Management"
            />
            <div className="overlay">
              <span>Sports Management</span>
              <a href="./assets/home-info/sport.png">
                Discover
              </a>
            </div>
          </div>

          <div className="sector">
            <img
              src="./assets/home-info/epcm.png"
              alt="EPCM"
            />
            <div className="overlay">
              <span>EPCM</span>
              <a href="./assets/home-info/epcm.png">Discover</a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        [data-component="homepage-info"] {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
        }
        .container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 60px 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .industries .heading-2 {
          font-weight: 600;
          color: #6f6f6f;
          margin-top: 20px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-size: 13px;
        }
        .industries .heading-3 {
          font-weight: 700;
          color: #232323;
          text-transform: uppercase;
          margin: 45px 0 15px;
          font-size: 30px;
        }
        .separator {
          width: 70px;
          height: 2px;
          margin: 0 auto ;
          background: #d8b15a;
        }
        .sectors-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
          flex: 1;
          align-items: center;
        }
        .sector {
          position: relative;
          overflow: hidden;
          border-radius: 4px;
          height: 280px; /* kartların yüksekliğini artırdım */
        }
        .sector img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
          font-size: clamp(22px, 3vw, 34px);
          font-weight: 700;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
          transition: transform 0.5s ease, opacity 0.5s ease;
        }
        .sector .overlay a {
          position: absolute;
          left: 50%;
          top: 100% !important;
          transform: translate(-50%, -50%);
          opacity: 0 !important;
          pointer-events: none;
          color: #232323;
          text-decoration: none;
          padding: 5px 26px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: .5px;
          line-height: inherit;
          background: #fff;
          border: 2px solid #fff;
          transition: top 0.5s ease, opacity 0.5s ease, background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
          will-change: top, opacity, transform;
        }
        .sector:hover .overlay span {
          transform: translate(-50%, calc(-50% - 30px));
          opacity: 0 !important;
        }
        .sector:hover .overlay a {
          top: 50% !important;
          opacity: 1 !important;
          pointer-events: auto;
          background: #fff;
          border: 2px solid #fff;
          color: #232323;
        }
        .sector .overlay a:hover {
          background: transparent;
          border-color: #fff;
          color: #fff;
        }
        @media (max-width: 991px) {
          .sectors-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .sector { height: 260px; }
          .industries .heading-3 { font-size: 26px; }
        }
        @media (max-width: 767px) {
          .sectors-grid { gap: 18px; }
          .sector { height: 160px; }
          .industries .heading-3 { font-size: 22px; margin: 45px 0 25px; }
          .container {
          
          
          padding: 20px 20px;
          margin-bottom: 40px;
      
        }
          .separator {
          
          margin: 20px auto ;
          
        }
        }
          
      `}</style>
    </section>
  );
}
