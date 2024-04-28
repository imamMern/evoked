'use client'
import Image from 'next/image';
import banner from '@/public/assets/banner.png';
import arrow from '@/public/assets/arrowRight.svg';
import checkmart from '@/public/assets/checkmart.svg';
import { useDarkMode } from '@/utils/DarkModeContext';
import CheckMart from '@/utils/CheckMart';
import ArrowRight from '@/utils/ArrowRight';

const Hero = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  let Lists = [
    { name: "Smell delicious, get compliments with iconic designer-like scents at wallet-friendly prices" },
    { name: "Eau De Parfum, Lasts 24h on average (2-3x longer than typical designer scents)" },
    { name: "Vegan-Friendly, Suitable for all skin types, Hand-mixed in small batches" },
    { name: "Try 100% risk-free first, then decide with our 30-day money back promise" },
  ];
  return (
    <section className={`relative ${isDarkMode ? 'bg-[#171717] duration-300' : 'bg-[#F4F4F4] duration-300'} `}>
     
     <div className="max-w-container mx-auto flex items-center gap-x-[95px] ">
        <div className="w-1/2 pr-10 py-[84px]">
          <h1 className={`${isDarkMode ? 'text-white duration-300' : 'text-[color:var(--Brand,#28282A)] duration-300'} text-[58px] not-italic font-bold leading-[130%] uppercase`}>
            Your secret to elevate every beginning.
          </h1>
          <p className={`${isDarkMode ? 'text-[#FFFFFFCC] duration-300' : 'text-[color:var(--brand-70,rgba(40,40,42,0.70))] duration-300'} text-[28px] not-italic font-medium leading-[normal] mt-[20px]`}>Take on the world with scents that put you in the spotlight.</p>

          <button className={`flex cursor-auto flex-col items-start gap-5 p-5 rounded-md border  border-solid mt-[40px] ${isDarkMode ? 'border-[#fff] duration-300' : 'border-[color:var(--Brand,#28282A)] duration-300'} `}>
            {/* Add your content inside this div */}
           
              {Lists.map((list) => (
                 <div className="flex items-center gap-2.5">
                 {/* <Image src={checkmart} alt="Checkmark Icon" /> */}
                  <CheckMart color={isDarkMode ? 'white' : '#28282A'} />
                 <span key={list.name} className={`text-lg not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'} `}>{list.name}</span>
                 </div>
              ))}
                
           
           
          </button>
          <button className={`mt-[40px] flex items-center gap-2.5 px-[30px] py-[18px] rounded-[var(--md,8px)] border  border-solid  ${isDarkMode ? 'border-[#28282A] bg-white shadow-[4px_4px_0px_0px_#fff]' : 'border-white bg-[#171717] shadow-[4px_4px_0px_0px_#171717]'}`}>
            <span className={`text-[22px] not-italic font-semibold leading-[normal] ${isDarkMode ? 'text-[#171717]' : 'text-white'}`}>Build Your Set & Save</span>
            {/* <Image src={arrow} alt="Arrow Right" /> */}
            <ArrowRight color={ isDarkMode ? '#171717' : 'white'} />
          </button>
        </div>
        <div className={`absolute top-0 right-0 border-l-[2px]  ${isDarkMode ? 'border-white' : 'border-[#171717]'} `}>
          <Image className=' h-[708px]' src={banner} alt='Hero'  />
        </div>
      </div>
      <div className={`h-[2px] w-full ${isDarkMode ? 'bg-white' : 'bg-[#171717]'}`}></div>
    </section>
  );
};

export default Hero;
