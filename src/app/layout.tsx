import type { Metadata } from "next";
import { Cabin } from "next/font/google";

import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";




const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cabin",
});
export const metadata: Metadata = {
  title: "IGG",
  description: "IGG kurumsal web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cabin.variable}>
      <body
        className="font-sans overflow-x-hidden" style={{ fontFamily: "'Cabin', sans-serif" }}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
