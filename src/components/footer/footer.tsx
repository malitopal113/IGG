'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";

function SocialIcons({ className = "h-6 w-6 mb-5 mt-2" }: { className?: string }) {
  const iconProps = { className, strokeWidth: 2, fill: "none", stroke: "currentColor" } as const;
  const icons = [
    { label: "Facebook", href: "#", svg: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /> },
    { label: "LinkedIn", href: "#", svg: (<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>) },
    { label: "Twitter / X", href: "#", svg: <path d="M4 4l7.5 9.5L4 20h3l6-6.5L18.5 20H20l-7-8.5L20 4h-3l-5.5 5.9L6 4H4z" /> },
    { label: "YouTube", href: "#", svg: (<><path d="M23 7s-.2-1.5-.8-2.2c-.8-.9-1.7-.9-2.1-1C17.8 3.5 12 3.5 12 3.5h0s-5.8 0-8.1.3c-.4.1-1.3.1-2.1 1C1.2 5.5 1 7 1 7S.8 8.7.8 10.4v1.2C.8 13.3 1 15 1 15s.2 1.5.8 2.2c.8.9 1.9.9 2.4 1 1.8.2 7.8.3 7.8.3s5.8 0 8.1-.3c.4-.1 1.6-.1 2.4-1 .6-.7.8-2.2.8-2.2s.2-1.7.2-3.4v-1.2C23.2 8.7 23 7 23 7z" /><path d="M10 9.75v5l4.5-2.5z" fill="currentColor" stroke="none" /></>) },
    { label: "Instagram", href: "#", svg: (<><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="3.5" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" /></>) },
    { label: "Contact Us", href: "#", svg: (<><path d="M4 4h16v16H4z" /><path d="M22 6l-10 7L2 6" fill="currentColor" /></>) },
  ];

  return (
    <div className="flex items-center gap-6">
      {icons.map(({ label, href, svg }) => (
        <div key={label} className="relative group">
          <Link href={href} aria-label={label} className="text-white hover:text-gray-300 transition-colors">
            <svg viewBox="0 0 24 24" {...iconProps}>{svg}</svg>
          </Link>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-black bg-gray-300 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function FooterClassic() {
  return (
    <footer className="bg-[#000] text-[#ffffff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top: 4 Columns (3 left, 1 right) */}
        <div className="grid grid-cols-1 md:grid-cols-4  gap-10">
          {/* Business */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Business</h5>
            <ul className="space-y-2">
              {["Technology","Steel","Automotive","Consumer & Retail","Infrastructure","Financial Services","Aerospace & Defence","Tourism & Travel","Telecom & Media","Trading & Investment"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-gray-300 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link href="#" className="text-lg hover:text-gray-300 transition-colors">Browse our brands</Link>
            </div>
          </div>

          {/* Community */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Community</h5>
            <ul className="space-y-2">
              {["Health","Education","Empowerment","Environment"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-gray-300 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h5 className="text-lg font-semibold mb-4">About</h5>
            <ul className="space-y-2">
              {["The IGG group","IGG Sons","Values and Purpose","Leadership","Heritage","Sustainability","Innovation","Sponsorships","Investors","IGG Code of Conduct"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-gray-300 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Newsletter + Logo */}
          <div className="space-y-4">
            <SocialIcons />
            <form className="flex border border-gray-600 rounded overflow-hidden max-w-sm mt-5 ">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email ID to subscribe"
                className="flex-grow px-3 bg-transparent text-sm outline-none placeholder-gray-400 "
                style={{ fontFamily: "'lato', sans-serif", height: "1.75rem", fontWeight: 100 }}
              />
              <button type="submit" className="px-4 bg-gray-700 hover:bg-gray-600 cursor-pointer text-white text-sm">→</button>
            </form>
            <Link href="/" className="flex justify-center items-center gap-3 pt-4 mt-5">
              <Image src="/assets/menu/logo-igg.svg" alt="IGG" width={120} height={32} priority className="h-20 w-auto" />
              
            </Link>
          </div>
        </div>

        {/* Bottom: Legal */}
        <div className="text-center text-sm mt-6 border-t border-gray-700 pt-4">
          ©  Info Global Group Private Limited. All Rights Reserved. <a className="font-bold  text-amber-300" target="_blank" href="https://www.mediawingsup.com/"><span className="font-bold  text-amber-300"></span></a> 
        </div>
      </div>
    </footer>
  );
}
