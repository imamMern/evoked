'use client'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import '@/app/globals.css'
import video from '@/public/assets/video.png'
import videoDark from '@/public/assets/dark-video.png'
import Image from 'next/image';
import { useDarkMode } from './DarkModeContext';

const Slider = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const Links = [
      {link:video , link2:  videoDark},
      {link:video , link2:  videoDark},
      {link:video , link2:  videoDark},
      {link:video , link2:  videoDark},
      {link:video , link2:  videoDark},
      
  ]
    return (
        <Swiper
        slidesPerView={4}
        spaceBetween={20}
            loop={true}
            allowTouchMove={true}
            scrollbar={{ draggable: true }}
            mousewheel={true}
        className="mySwiper"
        >
            {Links.map((item) => (
                isDarkMode ? <SwiperSlide key={item.link2}><div><Image src={item.link2}/></div></SwiperSlide>
                    :
                <SwiperSlide key={item.link}><div><Image src={item.link}/></div></SwiperSlide>
            ))
            }
        
        
        
      </Swiper>
    );
};

export default Slider;
