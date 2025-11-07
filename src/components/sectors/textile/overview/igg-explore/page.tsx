import MainIntro from "./MainIntro";
import HomePageItem from "./HomePageItem";

export default function Page() {
  return (
    <div >
      
      
        <MainIntro  />
        <HomePageItem
        image="https://asl.partners/view/uploads/2024/01/image-3.jpeg"
        titleLeft="TRANSFER"
        titleRight="SERVICES"
        desc="International chauffeurs for a Premium service - airports, hotels, venues … business or leisure"
        scale={0.5}             // opsiyonel
        titleTranslateX={84}    // opsiyonel
      />

    </div>
  );
}
