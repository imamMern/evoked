'use client'

import { useDarkMode } from '@/utils/DarkModeContext';
import React from 'react'
import Image from 'next/image';
import reasonLight from '@/public/assets/reasonLight.png'
import reasonDark from '@/public/assets/reasonDark.png'
import perfume from '@/public/assets/perfume.png'
import spray from '@/public/assets/spray.png'
import star from '@/public/assets/evokeStar.svg'
import { SelfConfidence, SaveMoney, TwentyFour, EcoFriendly, Compostable, Perfume } from '@/utils/ThreeReasons';
const EvokedBrand = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
      <div className={`pb-[200px] ${isDarkMode ? 'bg-[#171717]' : 'bg-white'}`}>
          <div className="max-w-container mx-auto flex items-center justify-center relative">
              <div className={`inline-flex relative z-20 flex-col items-start gap-[61px] p-[70px] rounded-[var(--md,8px)] border border-[color:var(--black,#171717)] border-solid  ${isDarkMode ? 'bg-[#1C1C1D]' : 'bg-[#f4f4f4]'}`}>
                  <div className="flex items-center">
                      <Image src={isDarkMode ? reasonDark : reasonLight} alt='3-reason' />
                      <span className={`text-5xl not-italic font-bold leading-[normal] uppercase ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}>to choose Evoked</span>
                  </div>
                  <div className={`flex items-center gap-[15px] px-[30px] py-5 rounded-[var(--sm,4px)] border  border-solid ${isDarkMode ? 'border-[color:var(--black,#fff)] shadow-[4px_4px_0px_0px_#FFF]' : 'border-[color:var(--black,#171717)] shadow-[4px_4px_0px_0px_#FFF]'}`}>
                      <SelfConfidence color={isDarkMode ? 'white' : '#28282A'} />
                      <span className={` text-[22px] not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white' : 'text-[#28282A]'}`}>Feel confident. Get compliments. Bring your best self daily.</span>
                  </div>
                  <div className={`flex items-center gap-[15px] px-[30px] py-5 rounded-[var(--sm,4px)] border  border-solid ${isDarkMode ? 'border-[color:var(--black,#fff)] shadow-[4px_4px_0px_0px_#FFF]' : 'border-[color:var(--black,#171717)] shadow-[4px_4px_0px_0px_#FFF]'}`}>
                      <TwentyFour color={isDarkMode ? 'white' : '#28282A'} />
                      <span className={` text-[22px] not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white' : 'text-[#28282A]'}`}>Feel confident. Get compliments. Bring your best self daily.</span>
                  </div>
                  <div className={`flex items-center gap-[15px] px-[30px] py-5 rounded-[var(--sm,4px)] border  border-solid ${isDarkMode ? 'border-[color:var(--black,#fff)] shadow-[4px_4px_0px_0px_#FFF]' : 'border-[color:var(--black,#171717)] shadow-[4px_4px_0px_0px_#FFF]'}`}>
                      <SaveMoney color={isDarkMode ? 'white' : '#28282A'} />
                      <span className={` text-[22px] not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white' : 'text-[#28282A]'}`}>Feel confident. Get compliments. Bring your best self daily.</span>
                  </div>
              </div>
              
            <Image className=' w-[490px] ml-[-100px] mt-[-20px] h-[740px] z-40' src={perfume} alt='perfume'/>
            <Image className='absolute bottom-[-80px] z-50 left-[118px]' src={star} alt='star'/>
          </div>
          <div className="mx-auto mt-[193px] relative">
              <h3 className={`text-center text-5xl not-italic font-bold leading-[normal] uppercase ${isDarkMode ? 'text-white' : 'text-[#28282A]'}`}>But wait, there’s more…</h3>
              <div className="flex items-start justify-center gap-[100px] mt-[100px]">
              <div className={`flex flex-col items-center gap-[30px]`}>
                  <button className={`flex items-start gap-2.5 p-2.5 border-solid rounded-[var(--md,8px)] border  ${isDarkMode ? 'border-[color:var(--black,#fff)] shadow-[4px_4px_0px_0px_#fff] bg-[#171717]' : 'border-[color:var(--black,#171717)] shadow-[4px_4px_0px_0px_#171717] bg-white'}`}>
                      <EcoFriendly color={isDarkMode ? 'white' : '#28282A'}/>
                  </button>
                  <p className={`  w-[348px] text-center text-[22px] not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}>No harsh formulas. Vegan-Friendly. Never tested on animals.</p>
              </div>
              <div className={`flex flex-col items-center gap-[30px]`}>
                  <button className={`flex items-start gap-2.5 p-2.5 border-solid rounded-[var(--md,8px)] border  ${isDarkMode ? 'border-[color:var(--black,#fff)] shadow-[4px_4px_0px_0px_#fff] bg-[#171717]' : 'border-[color:var(--black,#171717)] shadow-[4px_4px_0px_0px_#171717] bg-white'}`}>
                      <Compostable color={isDarkMode ? 'white' : '#28282A'}/>
                  </button>
                  <p className={`  w-[348px] text-center text-[22px] not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}>100% sustainably sourced ingredients and packaging.</p>
              </div>
              <div className={`flex flex-col items-center gap-[30px]`}>
                  <button className={`flex items-start gap-2.5 p-2.5 border-solid rounded-[var(--md,8px)] border  ${isDarkMode ? 'border-[color:var(--black,#fff)] shadow-[4px_4px_0px_0px_#fff] bg-[#171717]' : 'border-[color:var(--black,#171717)] shadow-[4px_4px_0px_0px_#171717] bg-white'}`}>
                      <Perfume color={isDarkMode ? 'white' : '#28282A'}/>
                  </button>
                  <p className={` w-[260px] text-center text-[22px] not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}>Try it and love it or
money back guaranteed..</p>
              </div>
              </div>
             <Image className='absolute top-[-90px] right-0' src={spray} alt='Spray' />
          </div>
    </div>
  )
}

export default EvokedBrand