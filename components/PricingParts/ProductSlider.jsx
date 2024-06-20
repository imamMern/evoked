"use client";
import { useDarkMode } from "@/utils/DarkModeContext";
import { Box1, Box2, DownArrow2, Plus, Minus, DownArrow1, Star12, Prev, Next, Dropdown, Remove } from "@/utils/Helpers";
import Image from "next/image";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

import { usePricing } from "@/utils/PricingContext";
import perfume from '@/public/assets/perfumeCollect.png'
import blue from '@/public/assets/blue.png'
import brown from '@/public/assets/brown.png'
import addSet from '@/public/assets/addSet.svg'
import { getProduct, updateCart, addToCart, retrieveCart, getMetaFields } from "../../utils/shopify"


export default function ProductSlider ({products, collections}) {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const {show1, setShow1,selectedPlan, setSelectedPlan,selectedButton, setSelectedButton, selectedPlan2, setSelectedPlan2, count, setCount, selectedImages, selectedOptions, setSelectedImages, selectedOneTimeItems, setSelectedOneTimeItems, cartItems, setCartItems, selectedProductImages, setSelectedProductImages  } = usePricing();
    const [dropdownOpen1, setDropdownOpen1] = useState({});
    const [dropdownOpen2, setDropdownOpen2] = useState({});
    const [initCollection, setInitCollection] = useState("Men's Perfumes");
    const [listProducts, setListProducts] = useState([]);
    const collectionsData = collections.collections.edges.map((x) => { return x.node });
    const [checkout, setCheckout] = useState(false);
console.log(collectionsData)
    const RenderProducts = () => {
      
      const data =  collectionsData.find((x) => {
          if(x.title == initCollection) {
            return x.products.edges.map((d) => {return d.node})
          }
          
        })
        return data;
    }

    const toggleDropdown1 = (index) => {
      setDropdownOpen1(prevState => ({
        ...prevState,
        [index]: !prevState[index]
      }));
    };
    
    const toggleDropdown2 = (index) => {
      setDropdownOpen2(prevState => ({
        ...prevState,
        [index]: !prevState[index]
      }));
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
      
     
      const numberOfBoxes = 3;
      
  const numberOfBoxes2 = 10;
  
      const handleAddToSet = async (perfume, items) => {
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
        <div className={`2xl:max-w-container lg:w-[90%] w-[100%] mx-auto md:py-[30px] py-[30px]  lg:py-[50px]`}>
            <div>
              </div>
              <div className="lg:block flex justify-center">
            <span className={`xxl:ml-0 ml-0 gap-x-[10px] inline-flex items-start gap-2.5 px-2.5 py-2 rounded-[var(--lg,12px)] border ${isDarkMode ? 'border-white' : 'border-[color:var(--black,#171717)]'} border-solid`}>
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
                     navigation
                      spaceBetween={30}
                      slidesPerView= "auto"
                      loop={false}
                      allowTouchMove={true}
                      scrollbar={{ draggable: true }}
                      mousewheel={true}
                      className="w-full h-full"
                      onSlideChange={(swiper) => swiper}
                                      
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
                     
              <SwiperSlide key={selectedButton == item.title} className={`lg:w-full border ${isDarkMode ? 'border-white' : 'border-primary'} py-[40px] rounded-[8px] sm:w-[100%] md:w-[100%] w-[70%] `} virtualIndex={index}>
                <div className={`flex relative flex-col select-none items-center gap-[25px]  rounded-[var(--md,8px)]  `}>
                  <Image width={400} height={450} src={item.node.featuredImage?.url} alt="Perfume" className={ `2xl:w-[200px] 2xl:h-[200px] object-contain md:w-[40%] md:h-[40%] lg:w-[200px] lg:h-[200px] sm:w-[30%] sm:h-[30%]`} />
                  <div className="flex flex-col justify-center ">
                  <span className={`text-center text-[20px] ${isDarkMode ? 'text-white' : 'text-brand'} lg:text-[28px] not-italic font-medium leading-[120%]`}>{item.node.title}</span>
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
                      {item.node.metafields[0]?.value}
                      </h6>
                    <div className={`inline-flex mt-[10px]  mx-auto flex-col justify-center items-center  px-2.5 py-[5px] rounded-[var(--sm,4px)] border  border-solid ${isDarkMode ? 'border-[#454547] text-[#FFFFFFCC]' : 'text-[#28282A] border-[color:var(--Brand,#28282A)]'}`}>
                      <button className={`flex w-48   justify-between items-center ${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[#28282A]'} text-center text-[14px] lg:text-lg not-italic leading-[120%] ${dropdownOpen1 ? 'font-bold' : 'font-normal'} `} onClick={() => toggleDropdown1(index)}>Ingredients <Dropdown color={isDarkMode ? 'white' : '#28282A'} /> </button>
        {dropdownOpen1[index] && (
          <div className={`flex w-48 lg:text-[14px] text-[12px] mt-[10px] items-center ${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[#28282A]'} text-start`}>
          {item.node.metafields[2]?.value}
</div>
                      ) }
                      <div className="w-[192px] h-[1px] bg-[#28282A] mx-auto my-[10px] "></div>
        <button className={`flex w-48  justify-between items-center ${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[#28282A]'} text-center text-[14px] lg:text-lg not-italic leading-[120%] ${dropdownOpen2 ? 'font-bold' : 'font-normal'}`} onClick={() => toggleDropdown2(index)}>Notes <Dropdown color={isDarkMode ? 'white' : '#28282A'} /></button>
        { dropdownOpen2[index] && (
                        <div className={`flex w-48 lg:text-[14px] text-[12px] mt-[10px] items-center ${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[#28282A]'} text-start`}>
                          {item.node.metafields[3]?.value}
          </div>)  }
                                </div>
                                {
                                  show1 === 1 && (
                                    selectedProductImages.length < maxLimit ? (
                                      <button  onClick={() => {handleAddToSet(selectedButton === 1 && item.link || selectedButton === 2 && item.link2 || selectedButton === 3 && item.link3, item.node)}}  className={`w-[220px] flex  mx-auto items-center justify-center gap-2.5  text-center text-[16px] lg:text-2xl not-italic font-medium leading-[120%] px-5 py-[10px] rounded-[var(--sm,4px)]  mt-[25px] ${isDarkMode ? 'bg-[#454547] text-[#FFFFFFCC]' : 'bg-primary text-white'}`}>
                                        Add To Set
                                        <Image src={addSet} alt="Set"/>
                                                       </button>
                                 ) : (
                                   <button onClick={() => {handleAddToSet(selectedButton === 1 && item.link || selectedButton === 2 && item.link2 || selectedButton === 3 && item.link3, item.node)}}  className={`w-[220px] flex   mx-auto items-center justify-center gap-2.5 text-center text-[16px] lg:text-2xl not-italic cursor-not-allowed font-medium leading-[120%] px-5 py-[10px] rounded-[var(--sm,4px)] bg-opacity-[0.5] mt-[25px] ${isDarkMode ? 'bg-[#454547] text-[#FFFFFFCC]' : 'bg-primary text-white'}`}>Add To Set<Image src={addSet} alt="Set"/>
                                                    </button>
                                 )
                                  )
                                }

                                {
                        
                                show1 === 2 && (
                                  selectedImages.length < count  ? (
                                    <button onClick={() => handleAddToSetOneTime(selectedButton === 1 && item.link || selectedButton === 2 && item.link2 || selectedButton === 3 && item.link3, item.node)}  className={`w-[220px] flex  mx-auto items-center justify-center gap-2.5  text-center text-[16px] lg:text-2xl not-italic font-medium leading-[120%] px-5 py-[10px] rounded-[var(--sm,4px)] mt-[25px] ${isDarkMode ? 'bg-[#454547] text-[#FFFFFFCC]' : 'bg-primary text-white'}`}>Add To Set<Image priority src={addSet} alt="Set"/>
                                                     </button>
                               ) : (
                                 <button onClick={() => handleAddToSetOneTime(selectedButton === 1 && item.link || selectedButton === 2 && item.link2 || selectedButton === 3 && item.link3 ,  item.node)}  className={`w-[220px] flex mx-auto items-center justify-center gap-2.5  text-center text-[16px] lg:text-2xl  not-italic cursor-not-allowed font-medium leading-[120%] px-5 py-[10px] rounded-[var(--sm,4px)] bg-opacity-[0.5] mt-[25px] ${isDarkMode ? 'bg-[#454547] text-[#FFFFFFCC]' : 'bg-primary text-white'}`}>Add To Set<Image priority src={addSet} alt="Set"/>
                                                  </button>
                               )
                                )
                                }
                      </span>
                  </div>
                </div>
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