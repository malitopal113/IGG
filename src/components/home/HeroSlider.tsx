"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

type Slide = {
  id: string;
  title: string;
  desc: string;
  ctaLabel: string;
  ctaHref: string;
  imgDesktop: string;
  imgMobile: string;
};

const SLIDES: Slide[] = [
  {
    id: "s1",
    title: "Koç Gönüllüleri",
    desc: "Eğitimden çevreye, toplumda fırsat eşitliğinden sokak hayvanlarına kadar pek çok alanda yürüttükleri projelerle iyiliği büyüten bir gönüllülük hareketi.",
    ctaLabel: "Koç Gönüllüleri Projelerini Keşfet",
    ctaHref: "https://icindekocvar.com/KocGonulluleriProjeleri",
    imgDesktop: "https://cdn.koc.com.tr/cmscontainer/kocholding/media/koc/00anasayfa/sliders/kocgonulluleri-yatay.jpg?ext=.jpg",
    imgMobile: "https://cdn.koc.com.tr/cmscontainer/kocholding/media/koc/00anasayfa/sliders/kocgonulluleri-dikey.jpg?ext=.jpg",
  },
  {
    id: "s2",
    title: "Geleceğe. Birlikte",
    desc: "Koç Topluluğu’nun sürdürülebilir, kârlı büyüme yaklaşımı olan Geleceğe. Birlikte; gücünü yaratacağımız dönüşümden ve iş birliklerine olan inancımızdan alıyor.",
    ctaLabel: "Bir bakışta Geleceğe.Birlikte",
    ctaHref: "/surdurulebilirlik",
    imgDesktop: "https://cdn.koc.com.tr/cmscontainer/kocholding/media/koc/00anasayfa/sliders/gelecege-birlikte-desktop.jpg?ext=.jpg",
    imgMobile: "https://cdn.koc.com.tr/cmscontainer/kocholding/media/koc/00anasayfa/sliders/gelecege-birlikte-mob.jpg?ext=.jpg",
  },
];

export default function HeroSlider() {
  return (
    <section className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        loop
        autoplay={{ delay: 6000 }}
        navigation
        pagination={{ clickable: true }}
        className="w-full h-[70vh] lg:h-screen"
      >
        {SLIDES.map((s) => (
          <SwiperSlide key={s.id}>
            {/* Desktop/Mobile background */}
            <div className="absolute inset-0 -z-10">
              <div className="hidden lg:block w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${s.imgDesktop})` }} />
              <div className="block lg:hidden w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${s.imgMobile})` }} />
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="max-w-2xl text-white">
                <h2 className="text-3xl md:text-5xl font-bold">{s.title}</h2>
                <p className="mt-4 text-white/90">{s.desc}</p>
                <Link
                  href={s.ctaHref}
                  target={s.ctaHref.startsWith("http") ? "_blank" : "_self"}
                  className="mt-6 inline-block rounded-full bg-white px-6 py-2 text-sm font-medium text-black hover:bg-gray-200"
                >
                  {s.ctaLabel}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
