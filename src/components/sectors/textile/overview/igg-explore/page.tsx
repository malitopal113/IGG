import MainIntro from "./MainIntro";
import HomePageItem from "./HomePageItem";

export default function Page() {
  return (
    <div >
      
      
        <MainIntro  />
       <HomePageItem
        image="/assets/sectors/textile/explore/1.png"
        titleLeft="TRANSFER"
        titleRight="SERVICES"
        desc="International chauffeurs for a Premium service - airports, hotels, venues … business or leisure"
        scale={0.7}
        titleTranslateX={44}
        pinDurationMultiplier={1.6}
        imageTargetScale = {1.12}   // daha fazla yanlara genişlesin
        imageGrowthStart = {0.00}   // hemen başlasın
        imageGrowthEnd = {1.00}     // biraz daha uzun sürsün
        imageGrowthCurve = {1.25}
        imageOffsetY = {-20}
      />
       <HomePageItem
        image="/assets/sectors/textile/explore/2.png"
        titleLeft="TRANSFER"
        titleRight="SERVICES"
        desc="International chauffeurs for a Premium service - airports, hotels, venues … business or leisure"
        scale={0.6}
        titleTranslateX={84}
        pinDurationMultiplier={1.6}
         imageTargetScale = {1.12}   
        imageGrowthStart = {0.00}   
        imageGrowthEnd = {1.00}     
        imageGrowthCurve = {1.25}
        imageOffsetY = {-20}
        />
         <HomePageItem
        image="/assets/sectors/textile/explore/3.png"
        titleLeft="TRANSFER"
        titleRight="SERVICES"
        desc="International chauffeurs for a Premium service - airports, hotels, venues … business or leisure"
        scale={0.6}
        titleTranslateX={84}
        pinDurationMultiplier={1.6}
         imageTargetScale = {1.12}   
        imageGrowthStart = {0.00}   
        imageGrowthEnd = {0.80}     
        imageGrowthCurve = {1.25}
        imageOffsetY = {-20}
        />
         <HomePageItem
        image="/assets/sectors/textile/explore/4.png"
        titleLeft="TRANSFER"
        titleRight="SERVICES"
        desc="International chauffeurs for a Premium service - airports, hotels, venues … business or leisure"
        scale={0.6}
        titleTranslateX={84}
        pinDurationMultiplier={1.6}
         imageTargetScale = {1.12}   
        imageGrowthStart = {0.00}   
        imageGrowthEnd = {0.80}     
        imageGrowthCurve = {1.25}
        imageOffsetY = {-20}
        />
         <HomePageItem
        image="/assets/sectors/textile/explore/5.png"
        titleLeft="TRANSFER"
        titleRight="SERVICES"
        desc="International chauffeurs for a Premium service - airports, hotels, venues … business or leisure"
        scale={0.6}
        titleTranslateX={84}
        pinDurationMultiplier={1.6}
         imageTargetScale = {1.12}   
        imageGrowthStart = {0.00}   
        imageGrowthEnd = {0.80}     
        imageGrowthCurve = {1.25}
        imageOffsetY = {-20}
        />
        
    </div>
  );
}
