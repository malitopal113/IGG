import dynamic from "next/dynamic";

const HeroSliderBS = dynamic(() => import("@/components/home/HeroSlider"), {
  ssr: false, // ⬅️ kritik
});

export default function Home() {
  return (
    <div >
      
      <HeroSliderBS />


    </div>
  );
}
