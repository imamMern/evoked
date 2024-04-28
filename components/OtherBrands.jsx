"use client"

import { useDarkMode } from '@/utils/DarkModeContext';
import React from 'react'
import Image from 'next/image';
import listLight from '@/public/assets/listLight.png'
import listDark from '@/public/assets/Group 8 (2).png'
import black from '@/public/assets/blackPerfume.png'
import scent from '@/public/assets/scent.png'

const OtherBrands = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
      <div className={`py-[60px] ${isDarkMode ?  'bg-[#28282A]' : 'bg-[#F4F4F4]'}`}>
          <h2 className={`text-center text-5xl not-italic font-bold leading-[normal] uppercase ${isDarkMode ? 'text-white' : 'text-[#28282A]'}`}>Us vs OTHER BRANDS</h2>
          <div className="flex items-center justify-between mt-[50px]">
          <Image src={black} alt='Black'/>
              <Image src={isDarkMode ? listDark : listLight} alt='Lists'/>
              <Image className='mr-[22px]' src={scent} alt='Scent'/>
          </div>
    </div>
  )
}

export default OtherBrands