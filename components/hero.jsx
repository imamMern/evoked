'use client'
import Image from 'next/image';
import banner from '@/public/assets/banner.png';
import bannerMobile from '@/public/assets/bannerMobile.png';
import arrow from '@/public/assets/arrowRight.svg';
import checkmart from '@/public/assets/checkmart.svg';
import { useDarkMode } from '@/utils/DarkModeContext';
import CheckMart from '@/utils/CheckMart';
import ArrowRight from '@/utils/ArrowRight';

const Hero = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  let Lists = [
    { name: "Smell delicious, get compliments and feel confident daily" },
    { name: "Save up to 90% compared to high-street brands for same quality" },
    { name: "Premium Eau De Parfum perfumes that last 12-24h on average" },
    { name: "Clean and vegan-friendly formula safe for all skin types" },
    { name: "Made in UAE with natural ingredients sourced from France" },
    { name: "Try risk-free first, then decide with 30-day money back promise" },
  ];
  return (
    <section className={`relative lg:pb-0  ${isDarkMode ? 'bg-[#171717] duration-300' : 'bg-[#F4F4F4] duration-300'} `}>
     <div className={`lg:block hidden`}>
     <div className={` w-[100%] mx-auto flex lg:flex-row flex-col md:items-start 2xl:gap-x-[95px] ${isDarkMode ? 'bg-[#171717] duration-300' : 'bg-[#F4F4F4] duration-300'} `}>
        <div className="lg:w-1/2 2xl:pl-[5%] lg:pl-[60px] lg:py-[40px] ">
          <div className=" ">
          <h1 className={`${isDarkMode ? 'lg:text-white duration-300' : 'lg:text-[color:var(--Brand,#28282A)] duration-300'} 2xl:text-[58px] lg:text-[38px] text-white lg:w-[450px] 2xl:w-auto text-center lg:text-start not-italic font-bold leading-[130%] uppercase`}>
          Your SET for<br className="lg:block hidden" />daily confidence 
          </h1>
          <p className={`${isDarkMode ? 'lg:text-[rgba(255,255,255,0.8)] duration-300' : 'lg:text-[color:var(--brand-70,rgba(40,40,42,0.70))] duration-300'} lg:text-[18px]  2xl:text-[24px] text-[16px] text-[#FFFFFFCC] text-center lg:w-auto lg:text-start not-italic font-medium leading-[normal] mt-[20px] lg:mx-0 mx-auto`}>Take on the world with scents that put you in the spotlight.</p>
         </div>
<div className={`lg:w-auto w-[90%] lg:static lg:visible invisible  ${isDarkMode ? 'bg-[#171717] duration-300' : 'bg-[#F4F4F4] duration-300'}`}>
          <div className={`inline-flex cursor-auto flex-col items-start gap-5 p-5 rounded-md border  border-solid lg:mt-[30px] 2xl:mt-[40px] ${isDarkMode ? 'border-[#fff] duration-300' : 'border-[color:var(--Brand,#28282A)] duration-300'} `}>
            {/* Add your content inside this div */}
           
              {Lists.map((list) => (
                 <div className="flex items-center gap-2.5">
                 {/* <Image src={checkmart} alt="Checkmark Icon" /> */}
                  <CheckMart color={isDarkMode ? 'white' : '#28282A'} />
                 <span key={list.name} className={` lg:text-[14px] 2xl:text-lg text-[12px] text-start not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'} `}>{list.name}</span>
                 </div>
              ))}
                
           
           
            </div>
            <div className="lg:pb-0 pb-[35px]">
          <button className={`mt-[40px]  lg:mx-0 mx-auto flex items-center gap-2.5 lg:px-[30px] lg:py-[18px] px-[20px] py-[12px] rounded-[var(--md,8px)] border border-solid  ${isDarkMode ? 'border-[#28282A] bg-white shadow-[4px_4px_0px_0px_#fff]' : 'border-white bg-[#171717] shadow-[4px_4px_0px_0px_#171717]'}`}>
            <span className={`2xl:text-[22px] lg:text-[18px] text-[16px] not-italic font-semibold leading-[normal] ${isDarkMode ? 'text-[#171717]' : 'text-white'}`}>Build Your Set & Save</span>
            {/* <Image src={arrow} alt="Arrow Right" /> */}
            <ArrowRight color={ isDarkMode ? '#171717' : 'white'} />
              </button>
              </div>
            </div>
          </div>
     
        <div className={`lg:w-[55%] h-full 2xl:w-[60%]  ${isDarkMode ? 'lg:border-white' : 'lg:border-[#171717]'} `}>
          <Image className=' h-screen object-cover 2xl:w-full hidden lg:block' src={banner} alt='Hero'  />
          </div>
            
        </div>
      <div className={`h-[1px] overflow-hidden lg:mt-0 mt-[30px] w-full ${isDarkMode ? 'bg-white' : 'bg-[#171717]'}`}></div>
        </div>

        {/* Mobile device (Hero)  */}
        <div className="lg:hidden block pb-[20px]">
          <div className="bg-hero bg-cover bg-center pt-[186px] pb-[180px]">
          <div className="">
          <h1 className={`${isDarkMode ? 'text-white duration-300' : 'text-[color:var(--Brand,#28282A)] duration-300'}  text-white w-[90%] mx-auto text-center md:text-[32px] text-[24px] not-italic font-bold leading-[130%] uppercase`}>
          Your SET for daily confidence 
          </h1>
          <p className={`${isDarkMode ? 'text-[#FFFFFFCC] duration-300' : 'text-[#FFFFFFCC] duration-300'}  text-[16px] md:text-[22px] md:w-auto  text-center  w-[249px] not-italic font-medium leading-[normal] mt-[10px] mx-auto`}>Take on the world with scents that put you in the spotlight.</p>
         </div>
         

          </div>
          <div className={`w-[90%] mt-[30px] flex flex-col justify-center mx-auto  ${isDarkMode ? 'bg-[#171717] duration-300' : 'bg-[#F4F4F4] duration-300'}`}>
          <div className={`inline-flex cursor-auto flex-col justify-center items-start gap-5 p-5 rounded-md border  border-solid ${isDarkMode ? 'border-[#fff] duration-300' : 'border-[color:var(--Brand,#28282A)] duration-300'} `}>
            {/* Add your content inside this div */}
           
              {Lists.map((list) => (
                 <div className="flex items-center gap-2.5">
                 {/* <Image src={checkmart} alt="Checkmark Icon" /> */}
                  <CheckMart color={isDarkMode ? 'white' : '#28282A'} />
                 <span key={list.name} className={` md:text-[16px] text-[12px] text-start not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'} `}>{list.name}</span>
                 </div>
              ))}
                
           
           
            </div>
            <div className="pb-0 ">
          <button className={`mt-[20px] mx-auto flex items-center gap-2.5 lg:px-[30px] lg:py-[18px] px-[20px] py-[12px] rounded-[var(--md,8px)] border border-solid  ${isDarkMode ? 'border-[#28282A] bg-white shadow-[4px_4px_0px_0px_#fff]' : 'border-white bg-[#171717] shadow-[4px_4px_0px_0px_#171717]'}`}>
            <span className={` text-[16px] md:text-[22px] not-italic font-semibold leading-[normal] ${isDarkMode ? 'text-[#171717]' : 'text-white'}`}>Build Your Set</span>
            {/* <Image src={arrow} alt="Arrow Right" /> */}
            <ArrowRight color={ isDarkMode ? '#171717' : 'white'} />
              </button>
              </div>
            </div>
        </div>

    </section>
  );
};

export default Hero;
