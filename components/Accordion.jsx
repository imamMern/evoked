"use client"

import { Add, Minus } from '@/utils/AddMinus';
import { useDarkMode } from '@/utils/DarkModeContext';
import React, { useState } from 'react'
import { Collapse } from 'react-collapse';
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import footerLogo from '@/public/assets/footerIcon.svg'
import whiteLogo from '@/public/assets/whiteLogo.svg'
import lightMinus from '@/public/assets/lightMinus.svg'
import lightPlus from '@/public/assets/lightPlus.svg'
import darkMinus from '@/public/assets/darkMinus.svg'
import darkPlus from '@/public/assets/darkPlus.svg'
import Image from 'next/image';
const AccordionItem = ({open, toggle, title, desc}) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <button className={`flex mb-[30px] w-[690px] flex-col items-start gap-x-[15px] mx-auto p-[20px] rounded-[var(--md,8px)] border  border-solid ${isDarkMode ? 'border-[color:var(--black,#fff)] bg-[#28282AB2]' : 'bg-white border-[color:var(--black,#171717)]'}`}>
      <div className="flex flex-col">
      <div onClick={toggle} className={`flex justify-center gap-x-[44px] items-center cursor-pointer`}>
        <p className={` fontFeature text-[22px] not-italic font-medium leading-7 ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}>{title}</p>
        <div className="">
            {/* {open ? <CiSquareMinus className='text-[36px] text-[#171717]' /> : <CiSquarePlus className='text-[36px] text-[#171717]' />} */}
            {/* {open ?  <Minus color={isDarkMode ? 'white': '#171717'} /> : <Add color={isDarkMode ? 'white': '#171717'}/> } */}
            {
              open ? isDarkMode ? <Image src={darkMinus} alt='Minus'/> : <Image src={lightMinus} alt='Minus'/>  : isDarkMode ? <Image src={darkPlus} alt='Plus'/> : <Image src={lightPlus} alt='Minus'/>
            }
        </div>
        </div>
        
{open !== null && (
          <div className={`h-[1px] bg-[rgba(168,168,175,0.7)] transition-height duration-500 ${open ? ' mt-[10px]' : 'opacity-0 '}`}></div>
        )}
        
       
      
      </div>
      <Collapse isOpened={open}>
        
        <div className={`mt-[15px] text-start w-[576.052px] text-[22px] not-italic font-light leading-7 fontFeature ${isDarkMode ? 'text-[#FFFFFFB2]' : 'text-[color:var(--brand-70,rgba(40,40,42,0.70))]'}`}>{desc}</div>
      </Collapse>


    </button>
  )
}


const Accordion = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [open, setOpen]= useState(false)
  const toggle = (index) => {
    if (open === index) { 
      return  setOpen(null); 
    }
    setOpen(index)
  }
    const accordioData = [
        {title:'What is Webflow and why is it the best website builder?', desc:'Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere.'},
        {title:'What is Webflow and why is it the best website builder?', desc:'Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere.'},
        {title:'What is Webflow and why is it the best website builder?', desc:'Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere.'},
        {title:'What is Webflow and why is it the best website builder?', desc:'Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere.'},
    ]
  return (
    <div className={`pt-[80px] pb-[104px] ${isDarkMode ? 'bg-[#171717]' : 'bg-white'}`}>
      <div className="max-w-container mx-auto">
        <div className="pb-[50px]">

        
        <h2 className={` text-center text-5xl not-italic font-bold leading-[130%] uppercase mb-[80px] ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}>FAQ</h2>
      {accordioData.map((item, index) => (
        <AccordionItem
          key={index}
          open={index === open}
          title={item.title}
          desc={item.desc}
          toggle={()=>toggle(index)}
        />
        
      ))
          }
        </div>
        <div className={`w-[1398px] mx-auto h-[1px] ${isDarkMode ? 'bg-white' : 'bg-[#171717]'}`}>
        <div className="flex items-center justify-between pt-[20px]">
            <span className={`fontVariant text-xl not-italic font-bold leading-[140%] ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}>2024 BE EVOKED </span>
            {
              isDarkMode ? <Image className='ml-[150px]' src={whiteLogo} alt='Logo' /> : <Image className='ml-[150px]' src={footerLogo} alt='Logo' />
            }
            
            <span className={`fontVariant text-xl not-italic font-bold leading-[140%] ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}>Terms & Conditions | Privacy Policy</span>
          </div>
        </div>
       
      </div>
      
    </div>
  )
}

export default Accordion