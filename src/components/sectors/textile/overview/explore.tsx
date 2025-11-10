import Image from "next/image";
import Link from "next/link";

export default function IGGExplore() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center w-full max-w-[1500px] mx-auto mt-24 py-8 px-4">
      {/* Görsel */}
      <div className=" lg:w-1/2 flex-shrink-0 mb-10 lg:mb-0 ">
        <picture className="block w-full">
          <img
            src="/assets/sectors/textile-explore.png"
            alt="IGG Brand"
            loading="lazy"
            className="w-full h-auto object-cover rounded"
          />
        </picture>
      </div>

      {/* Metin alanı */}
      <div className="w-full lg:w-2/5 flex flex-col items-start justify-center pl-0 lg:pl-16">
        <h2 className="text-[#171a19] text-3xl md:text-4xl font-light leading-tight mb-10 font-sans">
          IGG BRAND
          <br />
          STORIES
        </h2>

        <p className="text-base md:text-lg font-normal text-[#171a19] mb-12 leading-relaxed">
          Discover the values and vision of InfoGlobal Group (IGG),<br />
          and how they are captured in everything we do and create.<br />
          Discover the values and vision of InfoGlobal Group (IGG),<br />
          and how they are captured in everything we do and create.
        </p>

        <div className="w-full flex">
          <Link
            href="/sectors/textile/overview/igg-explore"
            className="bg-[#14635c] text-white px-12 py-3 rounded text-base font-medium shadow transition-colors hover:bg-[#1b867a] focus:bg-[#1b867a] text-center"
          >
            Explore
          </Link>
        </div>
      </div>
    </section>
  );
}
