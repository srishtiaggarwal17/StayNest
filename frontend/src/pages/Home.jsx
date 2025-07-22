import React from "react";
import HeroSection from "@/components/HeroSection";
import ExclusiveOffers from "@/components/ExclusiveOffers";
import LatestHotels from "@/components/LatestHotels";
import Newsletter from "@/components/NewsLetter";

const Home=()=>{
    return(
        <div>
            <HeroSection/>
            <LatestHotels/>
            {/* <ExclusiveOffers/> */}
            <Newsletter/>
        </div>
    )
}

export default Home;