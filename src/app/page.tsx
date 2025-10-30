import HeroSliderBS from "@/components/home/HeroSlider";
import HomepageInfo from "@/components/home/HomepageInfo";
import Sector from "@/components/home/Sectors";
import ActivityCountries from "@/components/home/ActivityCountries";
import Abilities from "@/components/home/Abilities";
import ScrollSpyNav from "@/components/home/ScrollSpyNav";

export default function Home() {
  return (
    <div >
      
      <HeroSliderBS  />
      
      <Sector />
      <ActivityCountries />
      <Abilities />

      <ScrollSpyNav />


    </div>
  );
}
