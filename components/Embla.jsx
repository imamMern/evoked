"use client"

import { useDarkMode } from "@/utils/DarkModeContext";
import '@/app/globals.css'
import useEmblaCarousel from 'embla-carousel-react'
import transform from '@/public/assets/perfumeSlide.png'
import star from '@/public/assets/blackStar.svg'
import Image from 'next/image';
import { Love2, Love3 } from "@/utils/Love";
import { Star1, ThreeDot } from "@/utils/Helpers";
import Star from "@/utils/Star";
import { useEffect } from "react";
const EmblaSlider = () => {
  
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
    const slides = [
        {link:'video' , link2:  'videoDark'},
        {link:'video' , link2:  'videoDark'},
        {link:'video' , link2:  'videoDark'},
        
  ]
  const options = { loop: true }
// const SLIDE_COUNT = 5
// const slides = Array.from(Array(SLIDE_COUNT).keys())
  // const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  useEffect(() => {
    const borderStyles = document.querySelectorAll('.embla__slide');
    borderStyles.forEach(borderStyle => {
      isDarkMode ? borderStyle.style.border = '1px solid #fff' : borderStyle.style.border = '1px solid #171717';
    });
  }, [isDarkMode]);
  return (
    <section className={`pt-[100px] ${isDarkMode ? 'bg-primary' : 'bg-white'}`} >
      <h2 className={`text-5xl not-italic font-bold leading-[normal] uppercase text-center mb-[50px] mx-auto ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}>Hear from our customers</h2>
      <div className="max-w-container mx-auto flex justify-between items-center  mb-[30px]">
        <div className="flex items-center gap-x-[15px]">
          <div className="flex items-center">
          <Star1 color={isDarkMode ? 'white' : '#28282A'}/>
          <Star1 color={isDarkMode ? 'white' : '#28282A'}/>
          <Star1 color={isDarkMode ? 'white' : '#28282A'}/>
          <Star1 color={isDarkMode ? 'white' : '#28282A'}/>
          <Star1 color={isDarkMode ? 'white' : '#28282A'}/>
          </div>
          <span className={`text-2xl not-italic font-medium leading-[27px] ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)] '}`}>(36 Reviews)</span>
        </div>
        <div className="flex items-center gap-x-[20px]">
        <button className={`flex justify-center items-center gap-2.5 px-4 py-2 rounded-[var(--sm,4px)] border  border-solid  text-2xl not-italic font-semibold leading-[27px] ${isDarkMode ? 'text-white border-white' : 'text-[color:var(--Brand,#28282A)] border-[color:var(--black,#171717)]'}`}>
        Write a Review 
          </button>
          <div className={`rounded-[var(--sm,4px)] border  border-solid flex items-start gap-2.5 px-3 py-[11px] ${isDarkMode ? 'border-white' : 'border-[color:var(--black,#171717)]'}`}>
        <ThreeDot color={isDarkMode ?  '#fff' : '#28282A'}/>
          </div>
       </div>
      </div>
    <div className="embla">
    <div className="embla__viewport" ref={emblaRef}>
      <div className="embla__container">
        {slides.map((index) => (
          <div className={`embla__slide ${isDarkMode ? 'bg-[#171717] border-white border border-solid' : 'bg-white border-[#171717] border-solid'}`} key={index}>
            <div className="embla__slide__number flex h-[488px] items-end gap-10">
             <div className="w-[400px] h-full">
                <Image src={transform} className="w-full h-full object-cover" alt="Image" />
                </div>
              <div className="flex flex-col justify-center items-start gap-[52px] self-stretch pl-0 pr-[60px] py-[60px]">
                <span className={`text-5xl not-italic flex gap-x-[6px] font-bold leading-[normal] uppercase ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}>
                <Star color={isDarkMode ? 'white'  : '#2A2A28'} />
                <Star color={isDarkMode ? 'white'  : '#2A2A28'} />
                <Star color={isDarkMode ? 'white'  : '#2A2A28'} />
                <Star color={isDarkMode ? 'white'  : '#2A2A28'} />
                <Star color={isDarkMode ? 'white'  : '#2A2A28'} />
                </span>
                <span className={`text-[32px] not-italic font-bold leading-[18px] ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}>Patricia O'Keefe</span>
                <span className={`w-[600px]  text-[24px] not-italic font-normal leading-[150%] ${isDarkMode ? 'text-white' : 'text-[#28282A]'}`}>Laborum quasi distinctio est et. Sequi omnis molestiae. Officia occaecati voluptatem accusantium. Et corrupti saepe quam.</span>
             
               
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>


      </div>
      <button className={`flex justify-center items-center gap-2.5 px-3 py-2 rounded-[var(--sm,4px)] border  border-solid  text-xl not-italic font-medium leading-[normal] mt-[58px] mx-auto ${isDarkMode ? 'text-white border-[#fff]' : 'text-[color:var(--Primary-Text,#313131)] border-[color:var(--black,#171717)]' }`}>Show more reviews</button>
      </section>
  )
}

export default EmblaSlider