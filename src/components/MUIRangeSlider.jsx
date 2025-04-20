import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';
import useIsMobile from './useIsMobile';

const MUIRangeSlider = () => {
    const images = [
        {
          link: '/products?category=clothes',
          desktopimg: 'https://nobero.com/cdn/shop/files/175.jpg?v=1738312472',
          mobileimg: 'https://nobero.com/cdn/shop/files/196.jpg?v=1738312464&width=720',
        },
        {
            link: '/products?category=clothes',
          desktopimg: 'https://nobero.com/cdn/shop/files/177.jpg?v=1738312471',
          mobileimg: 'https://nobero.com/cdn/shop/files/WhatsApp_Image_2025-03-25_at_7.36.14_PM_3.jpg?v=1742914223&width=720',
        },
        {
           link: '/products?event=sale',
          desktopimg: 'https://inhouse-eshop.fly.storage.tigris.dev/desktop-3.jpg',
          mobileimg: 'https://inhouse-eshop.fly.storage.tigris.dev/desktop-3.jpg',
        },
        {
            link: '/products?category=clothes',
          desktopimg: 'https://nobero.com/cdn/shop/files/WhatsApp_Image_2025-03-25_at_7.36.14_PM_2.jpg?v=1742914224',
          mobileimg: 'https://nobero.com/cdn/shop/files/Mobile_-_Homepage_Banners-35.jpg?v=1742983769&width=720',
        },
      ];
      

    const [currentIndex, setCurrentIndex] = useState(0);
    const isMobile = useIsMobile();
    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%', // Full width
                height: 500, // Fixed height of 500px
                overflow: 'hidden', // Prevent overflow if image is larger than the container
            }}
        >
            <ArrowBackIosNewIcon onClick={prevImage} className="slider-next-btn slider-btn"/>
           
            <img
                src={isMobile ? images[currentIndex].mobileimg : images[currentIndex].desktopimg}
                alt={`Slider ${currentIndex}`}
                onClick={handleClick}
                style={{
                    width: '100%', // Full width of the container
                    height: '100%', // Full height of the container
                    objectFit: 'cover', // Ensure the image covers the container
                }}
            />
            
            <ArrowForwardIosIcon onClick={nextImage} className="slider-prev-btn slider-btn" />
        </Box>
    );
};

export default MUIRangeSlider;
