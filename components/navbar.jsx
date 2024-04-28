"use client"
import React from 'react'
import logo from '@/public/assets/logo.svg'
import Image from 'next/image'
import dark from '@/public/assets/darkmode.png'
import light from '@/public/assets/lightmode.png'
import { useDarkMode } from '@/utils/DarkModeContext'
const Navbar = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
      <nav className='w-full py-[40px] dark:bg-primary bg-white border-b-2 border-b-white border-solid '>
          <div className="max-w-container mx-auto flex justify-between items-center">
              <div className="">
                  <Image src={logo} />
              </div>
              <div className="flex items-center gap-x-[30px]">
                  <button onClick={toggleDarkMode}>
                      <div className={isDarkMode ? 'w-[100px] transition duration-300 h-10 shrink-0 rounded-[106.623px] bg-[#454547] py-[5px] px-[10px] flex items-center justify-between relative' : 'w-[100px] h-10 shrink-0 rounded-[106.623px] bg-[#f4f4f4] transition duration-500 py-[5px] px-[10px] flex items-center justify-between relative'} >
                           {isDarkMode ?  <Image className='absolute transition duration-300 top-[50%] translate-y-[-50%] left-[10px]' src={light}/> : <Image className='absolute top-[50%] transition duration-500 translate-y-[-50%] right-[10px]' src={dark}/>}
       
        
      </div>
     
    </button>
                  <button className='flex justify-center items-center gap-2.5 px-5 py-[18px] dark:bg-white rounded-[var(--md,8px)] dark:border-[color:var(--Brand,#28282A)] shadow-[2px_2px_0px_0px_#FFF] border-[1.5px] border-solid dark:text-[color:var(--Brand,#28282A)] text-base not-italic font-semibold leading-[normal] uppercase'>SHOP NOW</button>
                  {/* <button className="flex justify-center items-center gap-10 ">
                      <span className="flex justify-center items-center gap-2.5 px-5 py-[18px] rounded-[var(--md,8px)] border-[1.5px] border-solid border-white text-white text-base not-italic font-semibold leading-[normal] uppercase shadow-[4px_4px_0px_0px_#FFF]">shop now</span>
              </button> */}
                 
              </div>
          </div>
    </nav>
  )
}

export default Navbar