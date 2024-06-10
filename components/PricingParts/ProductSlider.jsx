"use client";
import { useDarkMode } from "@/utils/DarkModeContext";
import { Box1, Box2, DownArrow2, Plus, Minus, DownArrow1, Star12, Prev, Next, Dropdown, Remove } from "@/utils/Helpers";
import Image from "next/image";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useRouter } from 'next/navigation'
import Router from 'next/router'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

import { usePricing } from "@/utils/PricingContext";
import perfume from '@/public/assets/perfumeCollect.png'
import blue from '@/public/assets/blue.png'
import brown from '@/public/assets/brown.png'
import videoDark from '@/public/assets/dark-video.png'
import prev from '@/public/assets/prev.svg'
import next from '@/public/assets/next.svg'
import addSet from '@/public/assets/addSet.svg'
import { getProduct, updateCart, addToCart, retrieveCart } from "../../utils/shopify"


export default function ProductSlider ({products, collections}) {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const {show1, setShow1,selectedPlan, setSelectedPlan,selectedButton, setSelectedButton, selectedPlan2, setSelectedPlan2, count, setCount, selectedImages, selectedOptions, setSelectedImages, selectedOneTimeItems, setSelectedOneTimeItems, cartItems, setCartItems, selectedProductImages, setSelectedProductImages  } = usePricing();
    const [dropdownOpen1, setDropdownOpen1] = useState(false);
    const [dropdownOpen2, setDropdownOpen2] = useState(false);
    const [initCollection, setInitCollection] = useState("Men's Perfumes");
    const [listProducts, setListProducts] = useState([]);
    const collectionsData = collections.collections.edges.map((x) => { return x.node });
    const [checkout, setCheckout] = useState(false);

    const RenderProducts = () => {
      
      const data =  collectionsData.find((x) => {
          if(x.title == initCollection) {
            return x.products.edges.map((d) => {return d.node})
          }
          
        })
        return data;
    }

    const toggleDropdown1 = () => {
      setDropdownOpen1(!dropdownOpen1);
    };
    
    const toggleDropdown2 = () => {
      setDropdownOpen2(!dropdownOpen2);
    };

   const handleButtonClick = (button, collectionTitle) => {
    
        setSelectedButton(button);
        setInitCollection(collectionTitle)
      };
    useEffect(() => {
      const productsData = RenderProducts();
      setListProducts(productsData);
  
    },[initCollection])

    useEffect(() => {
      console.log("List of products updated:", listProducts);
   },[listProducts])
    
      const Links = [
        {link:perfume , link2:  blue , link3: brown},
        {link:perfume , link2:  blue , link3: brown},
        {link:perfume , link2:  blue , link3: brown},
        {link:perfume , link2:  blue , link3: brown},
        {link:perfume, link2:  blue , link3: brown},
        {link:perfume, link2:  blue , link3: brown},
        {link:perfume, link2:  blue , link3: brown},
        
      ]
      
      const [currentIndex, setCurrentIndex] = useState(Math.floor(Links.length / 2)); // Start with middle slide
      const numberOfBoxes = 3;
      
  const numberOfBoxes2 = 10;
      const handleSlideChange = (swiper) => {
        // Update the currentIndex based on the realIndex provided by Swiper
        setCurrentIndex(swiper.realIndex);
      };
      const handleAddToSet = async(perfume, items) => {
        // Determine the maximum limit based on the selected plan
        let maxLimit = 0;
        if (selectedPlan === '1 Perfume') {
            maxLimit = numberOfBoxes - 2;
        } else if (selectedPlan === '2 Perfumes') {
            maxLimit = numberOfBoxes - 1;
        } else if (selectedPlan === '3 Perfumes') {
            maxLimit = numberOfBoxes;
        }

        
        if (selectedProductImages && selectedProductImages.length < maxLimit) {
            setSelectedProductImages(prevImages => [...prevImages, perfume])
            
                if (selectedImages.length > 0) {
                  
                  let UpdateItem = [{"itemId" : items.variants.edges[2].node.id, "quantity" : "1"}]
                  setCartItems([...cartItems, ...UpdateItem])
                  const newArry = [items]
                  setSelectedImages([...selectedImages, ...newArry]);
                  setCheckout(true);
                } else {
               
                  setCartItems([{"itemId" : items.variants.edges[2].node.id, "quantity" : "1"}])
                  setSelectedImages([items]);
                  setCheckout(true);
                }
                
            } else {
                // Display an alert if the maximum limit of images is reached
                alert('You have reached the maximum limit of Perfumes.');
            }
        
    
        console.log('clicked');
    };
      
    
    const handleAddToSetOneTime = async (perfume, items) => {
      // Calculate the number of selected boxes
      const selectedBoxes = selectedOneTimeItems.length;
      // Determine the maximum limit based on the number of selected boxes
      let maxLimit = numberOfBoxes2 - selectedBoxes;
      
      // Check if the number of selected boxes exceeds the maximum limit
      if (selectedBoxes >= count) {
          // Display an alert if there are no more empty boxes
          alert('You have reached the maximum limit of boxes.');
      } else {
          // Add the new item to both sets if there are empty boxes
         
              if (selectedImages.length > 0) {
                let UpdateItem = [{"itemId" : items.variants.edges[2].node.id, "quantity" : "1"}]
                setCartItems([...cartItems, ...UpdateItem])
                const newArry = [items]
                setSelectedImages([...selectedImages, ...newArry]);
                setCheckout(true);
              } else {
                setCartItems([{"itemId" : items.variants.edges[2].node.id, "quantity" : "1"}])
                setSelectedImages([items]);
                setCheckout(true);
              }
            
          const newArry = [items]
          setSelectedOneTimeItems(prevItems => [...prevItems, perfume]);
          //setSelectedImages(prevImages => [...prevImages, ...newArry]);
      }
    }

    useEffect(() => {
      console.log("dataProduct", cartItems)
      //window.localStorage.setItem("cartItems", JSON.stringify(cartItems))
    },[cartItems])

  return (
    <>
     <div className={` lg:mt-[70px] mt-[30px] lg:border-t-[1px] ${isDarkMode ? 'border-white bg-primary' : 'border-primary bg-[#F4F4F4]'} border-opacity-[0.4] lg:border-b-[1px]`}>
        <div className={`2xl:max-w-container w-[100%] mx-auto md:py-[30px] py-[30px]  lg:py-[50px]`}>
            <div>
              </div>
              <div className="lg:block flex justify-center">
            <span className={`xxl:ml-0 ml-0 lg:ml-[50px] gap-x-[10px] inline-flex items-start gap-2.5 px-2.5 py-2 rounded-[var(--lg,12px)] border ${isDarkMode ? 'border-white' : 'border-[color:var(--black,#171717)]'} border-solid`}>
      <button
        onClick={() => handleButtonClick(1, "Men's Perfumes")}
        className={`${selectedButton === 1 ? ` flex uppercase justify-center items-center gap-2.5 px-5 py-2.5 rounded-[var(--lg,12px)] text-[16px] lg:text-[16px] 2xl:text-lg not-italic font-normal leading-[normal] ${isDarkMode ? 'text-primary bg-white' : 'bg-[#171717] text-white'}` : ` flex justify-center items-center gap-2.5 px-5 py-2.5 rounded-[var(--lg,12px)] uppercase text-[16px] lg:text-[16px] 2xl:text-lg not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white bg-transparent' : 'bg-transparent text-[#28282A]'}`}`}
      >
        Men
              </button>
             
      <button
        onClick={() => handleButtonClick(2, "Women's Perfumes")}
        className={`${selectedButton === 2 ? ` flex uppercase justify-center items-center gap-2.5 px-5 py-2.5 rounded-[var(--lg,12px)] text-[16px] lg:text-[16px] 2xl:text-lg not-italic font-normal leading-[normal] ${isDarkMode ? 'text-primary bg-white' : 'bg-[#171717] text-white'}` : ` flex justify-center items-center gap-2.5 px-5 py-2.5 rounded-[var(--lg,12px)] uppercase text-[16px] lg:text-[16px] 2xl:text-lg not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white bg-transparent' : 'bg-transparent text-[#28282A]'}`}`}
      >
        WOMEN
      </button>
      <button
        onClick={() => handleButtonClick(3, "Unisex Perfumes")}
        className={`${selectedButton === 3 ? ` flex uppercase justify-center items-center gap-2.5 px-5 py-2.5 rounded-[var(--lg,12px)] text-[16px] lg:text-[16px] 2xl:text-lg not-italic font-normal leading-[normal] ${isDarkMode ? 'text-primary bg-white' : 'bg-[#171717] text-white'}` : ` flex justify-center items-center gap-2.5 px-5 py-2.5 rounded-[var(--lg,12px)] uppercase text-[16px] lg:text-[16px] 2xl:text-lg not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white bg-transparent' : 'bg-transparent text-[#28282A]'}`}`}
      >
        UNISEX
              </button>
            </span>
            </div>
            <div className="lg:w-auto md:w-[100%] sm:w-[100%] w-[80%] lg:mx-0 mx-auto">
              {
                selectedButton === 1 | 2 | 3 && (
                  <div className="lg:mt-[80px] mt-[20px]">
                     <Swiper
                     modules={[Navigation]}
                     //navigation
                      navigation={{
                        prevEl: '.swiper-button-prev1',
                        nextEl: '.swiper-button-next1',
                      }}
                      
                      spaceBetween={0}
                      slidesPerView= "auto"
                      loop={true}
                      allowTouchMove={true}
                      centeredSlides={true}
                      scrollbar={{ draggable: true }}
                      mousewheel={true}
                      className="w-full h-full"
                      
                      pagination={{ clickable: true }}
                      onSlideChange={(swiper) => handleSlideChange(swiper)}
                                      initialSlide={currentIndex}
                                      breakpoints={{
                                        640: {
                                          slidesPerView: 2,
                                          spaceBetween: 20,
                                          
                                      },
                                      
                                        768: {
                                          slidesPerView: 3,
                                          spaceBetween: 20,
                                        },
                                        
                                        1024: {
                                          slidesPerView: 4,
                                          spaceBetween: 20,
                                        },
                                        1920: {
                                          slidesPerView: 5,
                                          spaceBetween: 20,
                                        },
                                      }}                
                      >
                      {listProducts?.products?.edges?.length > 0 && listProducts.products.edges.map((item, index) => {
                        
                        
                         let maxLimit = 0;
                         if (selectedPlan === '1 Perfume') {
                             maxLimit = numberOfBoxes - 2;
                         } else if (selectedPlan === '2 Perfumes') {
                             maxLimit = numberOfBoxes - 1;
                         } else if (selectedPlan === '3 Perfumes') {
                             maxLimit = numberOfBoxes;
                         } else {
                           maxLimit = 10
                        }
                        
                      return (
                     
              <SwiperSlide key={selectedButton == item.title} className={`lg:w-full sm:w-[100%] md:w-[100%] w-[70%]  ${index === currentIndex  ? 'focus' : 'blur relative z-[-10]'}`} virtualIndex={index}>
                <div className={`flex relative flex-col select-none items-center gap-[25px]  rounded-[var(--md,8px)]  ${index === currentIndex ? `border ${isDarkMode ? 'border-white' : 'border-[color:var(--black,#171717)]'} border-solid px-20 py-10` : 'px-[30px] py-[20px]'}`}>
                  <Image width={400} height={450} src={item.node.featuredImage?.url} alt="Perfume" className={index === currentIndex ? ' lg:w-[100%] lg:h-[100%] md:w-full md:h-full sm:w-[50%] sm:h-[50%]  w-[90%] h-full' : 'w-[50%] h-[50%] md:w-[40%] md:h-[40%] lg:w-[50%] lg:h-[50%] sm:w-[30%] sm:h-[30%]'} />
                  <div className="flex flex-col justify-center ">
                  <span className={`text-center text-[20px] ${isDarkMode ? 'text-white' : 'text-[#28282A]'} lg:text-[28px] not-italic font-medium leading-[120%]`}>{item.node.title}</span>
                    <div className="flex items-end mt-[10px] justify-center">
                      <div className="flex items-center ">
                      <Star12 color={isDarkMode ? 'white' : '#28282A'} />
                      <Star12 color={isDarkMode ? 'white' : '#28282A'} />
                      <Star12 color={isDarkMode ? 'white' : '#28282A'} />
                      <Star12 color={isDarkMode ? 'white' : '#28282A'} />
                      <Star12 color={isDarkMode ? 'white' : '#28282A'} />
                    </div>
                      <span className={` text-center ml-[5px] text-base leading-[75%] not-italic font-medium ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)] '}`}>(123)</span>
                    </div>
                    <span className=" w-[300px] mx-auto mt-[25px] flex flex-col justify-center">
                      <h6 className={` text-center text-[14px] lg:text-lg not-italic font-normal leading-[120%] ${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[color:var(--Brand,#28282A)]'}`}>
                      Smells Like Dior Sauvage
                      </h6>
                    <div className={`inline-flex mt-[10px] ${index === currentIndex ? 'block' : 'hidden'} mx-auto flex-col justify-center items-center  px-2.5 py-[5px] rounded-[var(--sm,4px)] border  border-solid ${isDarkMode ? 'border-[#454547] text-[#FFFFFFCC]' : 'text-[#28282A] border-[color:var(--Brand,#28282A)]'}`}>
                      <button className={`flex w-48 ${index === currentIndex ? 'block' : 'hidden'}  justify-between items-center ${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[#28282A]'} text-center text-[14px] lg:text-lg not-italic leading-[120%] ${dropdownOpen1 ? 'font-bold' : 'font-normal'} `} onClick={toggleDropdown1}>Ingredients <Dropdown color={isDarkMode ? 'white' : '#28282A'} /> </button>
        {index === currentIndex ? dropdownOpen1 && (
          <div className={`flex w-48 lg:text-[14px] text-[12px] mt-[10px] items-center ${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[#28282A]'} text-start`}>
          {item.node.description}
</div>
                      ) : dropdownOpen1 && (
                        <div className={`hidden w-48 lg:text-[14px] text-[12px] mt-[10px] items-center ${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[#28282A]'} text-start`}>
                        {item.node.description}
              </div>
                                    )}
                      <div className="w-[192px] h-[1px] bg-[#28282A] mx-auto my-[10px] "></div>
        <button className={`flex w-48 ${index === currentIndex ? 'block' : 'hidden'}  justify-between items-center ${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[#28282A]'} text-center text-[14px] lg:text-lg not-italic leading-[120%] ${dropdownOpen2 ? 'font-bold' : 'font-normal'}`} onClick={toggleDropdown2}>Notes <Dropdown color={isDarkMode ? 'white' : '#28282A'} /></button>
        {index === currentIndex ? dropdownOpen2 && (
                        <div className={`flex w-48 lg:text-[14px] text-[12px] mt-[10px] items-center ${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[#28282A]'} text-start`}>
                          {item.node.description}
          </div>) : dropdownOpen2 && (
                        <div className={`hidden w-48 lg:text-[14px] text-[12px] mt-[10px] items-center ${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[#28282A]'} text-start`}>
                          {item.node.description}
          </div>) }
                                </div>
                                {
                                  show1 === 1 && (
                                    selectedProductImages.length < maxLimit ? (
                                      <button  onClick={() => {handleAddToSet(selectedButton === 1 && item.link || selectedButton === 2 && item.link2 || selectedButton === 3 && item.link3, item.node)}}  className={`w-[220px] flex ${index === currentIndex ? 'block' : 'hidden'}  mx-auto items-center justify-center gap-2.5  text-center text-[16px] lg:text-2xl not-italic font-medium leading-[120%] px-5 py-[10px] rounded-[var(--sm,4px)]  mt-[25px] ${isDarkMode ? 'bg-[#454547] text-[#FFFFFFCC]' : 'bg-primary text-white'}`}>
                                        Add To Set
                                        <Image src={addSet} alt="Set"/>
                                                       </button>
                                 ) : (
                                   <button onClick={() => {handleAddToSet(selectedButton === 1 && item.link || selectedButton === 2 && item.link2 || selectedButton === 3 && item.link3, item.node)}}  className={`w-[220px] flex ${index === currentIndex ? 'block' : 'hidden'}  mx-auto items-center justify-center gap-2.5 text-center text-[16px] lg:text-2xl not-italic cursor-not-allowed font-medium leading-[120%] px-5 py-[10px] rounded-[var(--sm,4px)] bg-opacity-[0.5] mt-[25px] ${isDarkMode ? 'bg-[#454547] text-[#FFFFFFCC]' : 'bg-primary text-white'}`}>Add To Set<Image src={addSet} alt="Set"/>
                                                    </button>
                                 )
                                  )
                                }

                                {
                                //   show1 === 2 && (
                                //     selectedProductImages.length < count  ? (
                                //       <button onClick={() => handleAddToSetOneTime(selectedButton === 1 && item.link || selectedButton === 2 && item.link2 || selectedButton === 3 && item.link3, item.node)}  className={`w-[220px] flex  mx-auto items-center justify-center gap-2.5  text-center text-[16px] ${index === currentIndex ? 'block' : 'hidden'}  lg:text-2xl not-italic font-medium leading-[120%] px-5 py-[10px] rounded-[var(--sm,4px)] mt-[25px] ${isDarkMode ? 'bg-[#454547] text-[#FFFFFFCC]' : 'bg-primary text-white'}`}>Add To Set<Image src={addSet} alt="Set"/>
                                //                        </button>
                                //  ) : (
                                //    <button onClick={() => handleAddToSetOneTime(selectedButton === 1 && item.link || selectedButton === 2 && item.link2 || selectedButton === 3 && item.link3, item.node)}  className={`w-[220px] flex mx-auto items-center justify-center gap-2.5  text-center text-[16px] lg:text-2xl ${index === currentIndex ? 'block' : 'hidden'}  not-italic cursor-not-allowed font-medium leading-[120%] px-5 py-[10px] rounded-[var(--sm,4px)] bg-opacity-[0.5] mt-[25px] ${isDarkMode ? 'bg-[#454547] text-[#FFFFFFCC]' : 'bg-primary text-white'}`}>Add To Set<Image src={addSet} alt="Set"/>
                                //                     </button>
                                //  )
                                //   )
                                show1 === 2 && (
                                  selectedImages.length < count  ? (
                                    <button onClick={() => handleAddToSetOneTime(selectedButton === 1 && item.link || selectedButton === 2 && item.link2 || selectedButton === 3 && item.link3, item.node)}  className={`w-[220px] flex  mx-auto items-center justify-center gap-2.5  text-center text-[16px] ${index === currentIndex ? 'block' : 'hidden'}  lg:text-2xl not-italic font-medium leading-[120%] px-5 py-[10px] rounded-[var(--sm,4px)] mt-[25px] ${isDarkMode ? 'bg-[#454547] text-[#FFFFFFCC]' : 'bg-primary text-white'}`}>Add To Set<Image priority src={addSet} alt="Set"/>
                                                     </button>
                               ) : (
                                 <button onClick={() => handleAddToSetOneTime(selectedButton === 1 && item.link || selectedButton === 2 && item.link2 || selectedButton === 3 && item.link3 ,  item.node)}  className={`w-[220px] flex mx-auto items-center justify-center gap-2.5  text-center text-[16px] lg:text-2xl ${index === currentIndex ? 'block' : 'hidden'}  not-italic cursor-not-allowed font-medium leading-[120%] px-5 py-[10px] rounded-[var(--sm,4px)] bg-opacity-[0.5] mt-[25px] ${isDarkMode ? 'bg-[#454547] text-[#FFFFFFCC]' : 'bg-primary text-white'}`}>Add To Set<Image priority src={addSet} alt="Set"/>
                                                  </button>
                               )
                                )
                                }
                   
                     
                      
                      </span>
                  </div>
                </div>
                {
                  index === currentIndex ?  <div className="swiper-button-prev1 absolute top-[40%] md:left-[-2%] left-[5%] lg:left-[-25%] cursor-pointer z-[999]">
                  <Prev className={`lg:h-auto lg:w-auto h-[60px] w-[50px]`} color={isDarkMode ? 'white' : '#28282A'}/>
                 
                </div> : 
                <div className="swiper-button-prev1 opacity-0 absolute top-[40%] md:left-[-2%] left-[5%] lg:left-[-25%] cursor-pointer z-[999]">
                  <Prev color={isDarkMode ? 'white' : '#28282A'}/>
  
                </div>
                }
                {
                  index === currentIndex ?  <div className="swiper-button-next1 absolute top-[40%] md:right-[-2%] right-[5%] lg:right-[-25%] cursor-pointer z-[999]">
                  <Next className={`lg:h-auto lg:w-auto h-[60px] w-[50px]`} color={isDarkMode ? 'white' : '#28282A'}/>
                  </div> : 
                  <div className="swiper-button-next1 opacity-0 absolute top-[40%] md:right-[-2%] right-[5%] lg:right-[-25%] cursor-pointer z-[999]">
                  <Next color={isDarkMode ? 'white' : '#28282A'}/>
                  </div>
                }
                

              </SwiperSlide>
            )})
            }
       
      </Swiper>
                  </div>
                )
              }
             
             
             
            </div>

    </div>
          </div>
    </>
  )
}

//export default ProductSlider