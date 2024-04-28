"use client"

import { useDarkMode } from "@/utils/DarkModeContext";
import kitjack from '@/public/assets/kitjack.png'
import Image from 'next/image';
import ArrowRight from "@/utils/ArrowRight";
import { DownArrow } from "@/utils/Helpers";
const Story = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
      <div className={`py-[100px] ${isDarkMode ? 'bg-primary' : 'bg-white'} `}>
          <div className="max-w-container mx-auto">
              <div className="flex justify-between items-center gap-x-[88px]">
                  <div className="">
                      <div className="flex items-start gap-5">
                      <span className={`text-[28px] not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}>OUR STORY</span> <DownArrow color={isDarkMode ? 'white' : '#28282A'}/>
                      </div>
                      <p className={`w-[780px] pb-[30px] text-5xl pt-[50px] not-italic font-bold leading-[130%] uppercase ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)] '}`}>WE’RE On a mission to help <span className="italic">HUMANS-in-NEED Unlock</span> THEIR MOST CONFIDENT SELF.</p>
                      <span className={`text-xl not-italic font-normal leading-[150%] ${isDarkMode ? 'text-white' : 'text-[color:var(--brand-70,rgba(40,40,42,0.70))]'}`}>10%</span>
                      {/* Button */}
                      <button className={`mt-[80px] flex items-center gap-2.5 px-[30px] py-[18px] rounded-[var(--md,8px)] border  border-solid  ${isDarkMode ? 'border-[#28282A] bg-white shadow-[4px_4px_0px_0px_#fff]' : 'border-white bg-[#171717] shadow-[4px_4px_0px_0px_#171717]'}`}>
            <span className={`text-[22px] not-italic font-semibold leading-[normal] ${isDarkMode ? 'text-[#171717]' : 'text-white'}`}>Build Your Evoked Set</span>
            {/* <Image src={arrow} alt="Arrow Right" /> */}
            <ArrowRight color={ isDarkMode ? '#171717' : 'white'} />
          </button>
                  </div>
                  <div className="">
                      <Image src={kitjack} alt="Image"/> 
                  </div>
              </div>
          </div>
    </div>
  )
}

export default Story