'use client'
import { useDarkMode } from '@/utils/DarkModeContext';
import { Love } from '@/utils/Love';
import Slider from '@/utils/Slider'
import Star from '@/utils/Star';
import React from 'react'
import "slick-carousel/slick/slick.css";
const Carousel = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    return (
        <div className={`py-[100px] ${isDarkMode ? 'bg-[#171717] duration-300' : 'bg-white duration-300'}`}>
            <div className="max-w-container mx-auto relative">
                <h2 className={`text-5xl not-italic font-bold leading-[normal] uppercase ${isDarkMode ? 'text-white': 'text-[color:var(--Brand,#28282A)]'}`}>They tried it, now they are obsessed</h2>
                <div className="flex items-center gap-x-[10px] mt-[30px] mb-[52px]">
                    <Star color={isDarkMode ? 'white' : '#28282A'}/>
                    <Star color={isDarkMode ? 'white' : '#28282A'}/>
                    <Star color={isDarkMode ? 'white' : '#28282A'}/>
                    <Star color={isDarkMode ? 'white' : '#28282A'}/>
                    <Star color={isDarkMode ? 'white' : '#28282A'}/>
                </div>
                <div className="inline-block absolute top-0 right-0 z-10">
                <Love color={isDarkMode ? 'white' : '#28282A'}/>
                </div>
            </div>

      <div className={`${isDarkMode ? 'bg-[#28282A] duration-300' : 'bg-[#F4F4F4] duration-300'} relative z-20`}>
      <div className='max-w-container mx-auto'>
          <div className="py-[60px] ">
          <Slider/>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Carousel