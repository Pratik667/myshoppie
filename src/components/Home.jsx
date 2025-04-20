import React from "react";
import MUIRangeSlider from './MUIRangeSlider';
import HomeHero from './HomeHero';

const Home = () => {
    return (
        <main id="home" className="home">
            <MUIRangeSlider />
            <HomeHero title="Our Bestseller" type="event" value="bestseller"/>
            <HomeHero title="On Sale" type="event" value="sale"/>
        </main>
    )
}

export default Home;