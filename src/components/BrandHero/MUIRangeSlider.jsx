import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import useIsMobile from "../useIsMobile";

const MUIRangeSlider = () => {
  const images = [
    {
      link: "/products?category=electronics",
      desktopimg: "https://inhouse-eshop.t3.storage.dev/desktop-1.png",
      tabimg: "https://inhouse-eshop.t3.storage.dev/tab-1.png",
      mobileimg: "https://inhouse-eshop.t3.storage.dev/mobile-1.png",
    },
    {
      link: "/products?category=clothes",
      desktopimg: "https://inhouse-eshop.t3.storage.dev/desktop-2.png",
      tabimg: "https://inhouse-eshop.t3.storage.dev/tab-2.png",
      mobileimg: "https://inhouse-eshop.t3.storage.dev/mobile-2.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile();
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  const handleClick = () => {
    window.location.href = images[currentIndex].link;
  };

  // Set up automatic image change every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(nextImage, 10000); // 10000ms = 10 seconds
    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  return (
    <Box
      className="slider-box"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%", // Full width
        height: 500, // Fixed height of 500px
        overflow: "hidden", // Prevent overflow if image is larger than the container
      }}
    >
      <ArrowBackIosNewIcon
        onClick={prevImage}
        className="slider-next-btn slider-btn"
      />

      <img
        src={
          isMobile
            ? images[currentIndex].mobileimg
            : images[currentIndex].desktopimg
        }
        alt={`Slider ${currentIndex}`}
        onClick={handleClick}
        style={{
          width: "100%", // Full width of the container
          height: "100%", // Full height of the container
          objectFit: "cover", // Ensure the image covers the container
        }}
      />

      <ArrowForwardIosIcon
        onClick={nextImage}
        className="slider-prev-btn slider-btn"
      />
    </Box>
  );
};

export default MUIRangeSlider;
