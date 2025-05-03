import React from "react";
import MUIRangeSlider from '../BrandHero/MUIRangeSlider';
import HomeHero from '../BrandHero/HomeHero';
import OnePlusHero from '../BrandHero/OnePlusHero';

const Home = () => {
    return (
        <main id="home" className="home">
            <MUIRangeSlider />
            <HomeHero title="Our Bestseller" type="event" value="bestseller"/>
            <OnePlusHero />
            <HomeHero title="On Sale" type="event" value="sale"/>
        </main>
    )
}

export default Home;