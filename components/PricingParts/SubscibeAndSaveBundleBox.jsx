import { useDarkMode } from "@/utils/DarkModeContext";
import { Remove } from "@/utils/Helpers";
import Image from "next/image";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { removeFromCart, CheckoutUrlWithSellingPlanId, retrieveCart, addToCart } from "../../utils/shopify"
import { usePricing } from "@/utils/PricingContext";
import CheckMart from "@/utils/CheckMart";
import { useRouter } from 'next/navigation'
const SubscibeAndSaveBundleBox = ({isCheckout, products, collections}) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { show1, setShow1, selectedPlan, setSelectedPlan, selectedButton, setSelectedButton, selectedPlan2, setSelectedPlan2, count, setCount, selectedImages, setSelectedImages, selectedOneTimeItems, setSelectedOneTimeItems, selectedOptions, setSelectedOptions,selectedProductImages, setSelectedProductImages, itemCount, setItemCount, cartItems} = usePricing();
  const router = useRouter()
  const [selectedTrend, setSelectedTrend] = useState(true);

  const data = [
    { name:'1 Perfume', rate:'£40/2 months', rate50:'£20/2 months', shipping:'Free shipping & returns. ', includes:'What’s included:', firstPoint:'1 x 100ml perfume (lasts 2 months)', firstPoint50:'1 x 50ml perfume (lasts 2 months)', lastPoint:'1 x 5ml sample (free compliment)',spray:'£0.04 per spray' },
    { name:'2 Perfumes', rate:'£60/4 months',rate50:'£30/4 months',discount50:'£40 ', discount:'£80 ', shipping:'Free shipping & returns. ', includes:'What’s included:', firstPoint:'2 x 100ml perfumes (lasts 4 months)',firstPoint50:'2 x 50ml perfume (lasts 4 months)', lastPoint:'2 x 5ml samples (free compliments)',spray:'£0.03 per spray', trend: selectedTrend, trendName: 'MOST POPULAR' },
    { name:'3 Perfumes', rate:'£75/6 months', rate50:'£37/6 months',discount50:'£60 ',discount:'£120 ', shipping:'Free shipping & returns. ', includes:'What’s included:', firstPoint:'3 x 100ml perfumes (lasts 6 months)', firstPoint50:'1 x 50ml perfume (lasts 6 months)', lastPoint:'3 x 5ml samples (free compliments)',spray:'£0.02 per spray', trend: selectedTrend, trendName: 'BEST VALUE' }
  ];
  const PerfumeContent = {
    '1 Perfume': [{}],
    '2 Perfumes': [{}, {}],
    '3 Perfumes': [{}, {}, {}],
    'Perfume Set': Array.from({ length: count }, () => ({})), // For one-time purchase
  };

  const content = selectedPlan === 'Perfume Set' ? PerfumeContent[selectedPlan2] || [] : PerfumeContent[selectedPlan] || [];
  let retrivePlan = () => {
    if(selectedPlan === '1 Perfume') {
      return setSelectedPlan("Evoked Perfume Set Subscription (Every 2 Months)")
    }else if(selectedPlan === '2 Perfume') {
      return setSelectedPlan("Evoked Perfume Set Subscription (Every 4 Months)")
    }else if(selectedPlan === '2 Perfume') {
      return setSelectedPlan("Evoked Perfume Set Subscription (Every 6 Months)")
    }else {
      return ""
    }
  }

  let newOptions = products?.products?.edges[0]?.node?.sellingPlanGroups.edges[0].node.sellingPlans.edges
  const getOption = newOptions.length > 0 && newOptions.map((x, i) => {
    return { value: x.node.id, label: x.node.name, selected :  selectedPlan === "2 Perfume" ? "selected" :  ""}
  })
  const [options, setOptions] = useState([]);
  
  useEffect(() => {
    
    setOptions(getOption)
  },[getOption.length > 0])
  console.log("selectedPlan", getOption)

  const handleRemoveFromSet = async (boxIndex, item) => {
    
    setSelectedImages(prevImages => {
      // Create a new array with the image at the specified boxIndex set to null
      const updatedImages = [...prevImages];
      updatedImages[boxIndex] = null;
      // Filter out any null values from the array
      return updatedImages.filter(image => image !== null) ? updatedImages.filter(image => image !== null) : updatedImages;
    });
    setSelectedProductImages(prevImages => {
      // Create a new array with the image at the specified boxIndex set to null
      const updatedImages = [...prevImages];
      updatedImages[boxIndex] = null;
      // Filter out any null values from the array
      return updatedImages.filter(image => image !== null) ? updatedImages.filter(image => image !== null) : updatedImages;
    });

    setItemCount((prevCount) => prevCount - 1);
    const productVId = item[boxIndex].variants.edges[2].node.id
    const cartId = window.sessionStorage.getItem("cartId");
    await removeFromCart(cartId, productVId)
  };

const AddToCartRetive = async () => {
    let cartId = window.sessionStorage.getItem("cartId");
    const getCartItem = cartId && await retrieveCart(cartId)
    //setSelectedImages(getCartItem)
    console.log("retrive", getCartItem)
  }

useEffect(() => {
  if(selectedImages && selectedImages.length == 0) {
    AddToCartRetive()
  }
 
},[cartItems])

const selectedPlanData = data.find(item => item.name === selectedPlan);
const forFifty = selectedOptions[data.indexOf(selectedPlanData)].includes('50ml')
  const actualPrice = selectedImages?.length === 1 ? '' : selectedImages?.length === 2 ? forFifty ? ('$' + 40 ) : ('$' + 80 ): selectedImages?.length === 3 ? forFifty ? ('$' + 60 ) : ('$' + 120) : 0;
  const totalPrice = selectedImages?.length === 1 ? forFifty ? 20 : 40 : selectedImages?.length === 2 ? forFifty ? 30 : 60 : selectedImages?.length === 3 ? forFifty ? 37 : 75 : 0;


 const checkoutNow = async () => {
  if (selectedImages.length > 0) {
    let linesData = [];
    selectedImages.forEach(element => {
      let variables = {
        "merchandiseId": element.variants.edges[2].node.id,
        "quantity": parseInt("1"),
        "sellingPlanId": selectedOptions
      }
      linesData.push(variables)
    });

    try {
      const CartId = await addToCart(linesData);
      if (CartId && CartId.data && CartId.data.cartCreate && CartId.data.cartCreate.cart && CartId.data.cartCreate.cart.checkoutUrl) {
        const urlCheckout = CartId.data.cartCreate.cart.checkoutUrl;
        router.push(urlCheckout);
      } else {
        console.error("Error: Unable to retrieve checkout URL");
      }
    } catch (error) {
      console.error("Error occurred during checkout:", error);
    }
  }
}

console.log(getOption)
const result = getOption.map(({label,value})=> label + value)
console.log(result)
  const selectionHanlder = (e) => {
    setSelectedOptions(e.target.value)
  }
  console.log(selectedOptions)
  return (
    <>
      {
        show1 === 1 && (
          <div className="2xl:max-w-container lg:w-[90%] mx-auto md:flex-row md:justify-center lg:gap-5 md:gap-10 flex lg:flex-row flex-col justify-between items-center">
            <div className="w-[30%] lg:block hidden">
              <h3 className={`2xl:text-[32px] lg:text-[28px] not-italic font-normal leading-[120%] ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}>Your Evoked Scents </h3>
              <h4 className={`mt-[10px] 2xl:text-xl lg:text-[18px] not-italic font-normal leading-[120%] ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}>build your set by adding 3</h4>
              <div className="flex items-center gap-2.5 mt-[20px]">
                {/* <Image src={checkmart} alt="Checkmark Icon" /> */}
                <CheckMart color={isDarkMode ? 'white' : '#28282A'} />
                <span className={`2xl:text-lg lg:text-[12px] not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'} `}>Free 2-5d shipping & no questions asked returns</span>
              </div>
              <div className="flex items-center gap-2.5 mt-[10px]">
                {/* <Image src={checkmart} alt="Checkmark Icon" /> */}
                <CheckMart color={isDarkMode ? 'white' : '#28282A'} />
                <span className={`2xl:text-lg lg:text-[12px] not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'} `}>Try first, then decide with 30d money-back promise <span className={`text-sm not-italic font-light leading-[120%] underline  cursor-pointer ${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[rgba(40,40,42,0.80)] '}`}>learn more.</span></span>
              </div>
            </div>
            <div className={`lg:w-[30%]  ${selectedPlan === '1 Perfume' ? 'mr-0' : 'lg:mr-[70px]'}`}>
              <div className="flex gap-x-[20px] justify-center">
                {content.map((_, boxIndex) => (
                  <div key={boxIndex} className={`2xl:w-[150px] 2xl:h-[150px] lg:w-[100px] lg:h-[100px] md:w-[100px] md:h-[100px] w-[60px] h-[60px] border border-solid relative ${isDarkMode ? 'bg-primary border-[color:var(--black,#171717)] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.70)]' : 'bg-white border-[color:var(--black,#171717)] shadow-[2px_2px_0px_0px_#171717]'}`}>
                    {selectedImages && selectedImages[boxIndex] && (
                      <>
                        <Image className="2xl:w-[70px] 2xl:h-[108.387px]  md:w-[50px] md:h-[76px] w-[25px] h-[40px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" src={selectedImages[boxIndex].featuredImage?.url} alt={`Image ${boxIndex}`} width={80} height={100}/>
                        <button className="absolute lg:top-[-10px] top-[-6px] right-[-8px] lg:right-[-11px]" onClick={() => handleRemoveFromSet(boxIndex, selectedImages)}>
                          <Remove className={`lg:w-auto lg:h-auto  md:top-[-7px] md:right-[-8px] h-[13px] w-[13px]`} rect={isDarkMode ? 'white' : '#171717'} color={isDarkMode ? '#171717' : 'white'} />
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>

            </div>
            <div className="lg:w-[40%]">
              <div className="lg:flex items-center 2xl:gap-x-[20px] lg:gap-x-[10px]">
                <h6 className={`2xl:text-base text-[14px] lg:block hidden not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}>Deliver every:</h6>
                <select onChange={(e) => selectionHanlder(e)} className={`px-[10px] lg:block hidden py-[5px] bg-transparent border  rounded-[4px] outline-none ${isDarkMode ? 'border-white text-white' : 'border-[#28282A] text-[#28282A]'}`}>
                  
                  {
                    options.length > 0 && getOption?.map(({value, label}) => (
                      <option className={`text-[color:var(--Brand,#28282A)] 2xl:text-lg lg:text-[16px] not-italic font-normal leading-[normal]`} key={value} value={value} selected={selectedPlan === `1 Perfume` && value === 'gid://shopify/SellingPlan/1224409193' ||
                        selectedPlan === `2 Perfumes` && value === 'gid://shopify/SellingPlan/1224474729' ||
                        selectedPlan === `3 Perfumes` && value === 'gid://shopify/SellingPlan/1224540265' ? true : false}>{label}</option>
                    ))
                  }
                </select>
              </div>
              <div className="md:flex md:flex-col">
              <button onClick={checkoutNow} className={`flex mt-[20px] 2xl:w-[590px] lg:w-[100%] w-[314px] justify-between items-center px-[20px] lg:px-[24px] lg:py-[12px] 2xl:px-[30px] 2xl:py-[18px] py-[12px] rounded-[var(--md,8px)] border  border-solid ${isDarkMode ? 'border-[color:var(--black,#171717)] shadow-[4px_4px_0px_0px_#FFF] bg-white' : 'shadow-[4px_4px_0px_0px_#171717] border-white bg-primary'}`}>
                <span className={` ${isDarkMode ? 'text-[#28282A]' : 'text-white'} text-[16px] lg:text-[20px] 2xl:text-[32px] not-italic font-bold leading-[120%]`}>SUBSCRIBE NOW</span>

                <span className={`${isDarkMode ? 'text-[#28282A]' : 'text-white'} text-[16px] lg:text-[24px] 2xl:text-[32px] not-italic font-bold leading-[120%]`}>
                  {/* {selectedImages.length > 0 && (
                    <span className={`${isDarkMode ? 'text-[#28282A]' : 'text-white'} text-[16px] lg:text-[32px] not-italic font-bold leading-[120%]`}>
                      {selectedPlanData && (
        <>
          {selectedPlanData.discount && (
            <span className={`${isDarkMode ? 'text-[#28282A]' : 'text-white'} text-[10px] lg:text-xl not-italic font-normal leading-[120%] line-through`}>
              {originalPrice}
            </span>
          )}
          {selectedPlanData.discount ? ` ${discountedPrice}` : originalPrice}
        </>
      )}
                    </span>
                  )} */}

                  {totalPrice || actualPrice > 0 ? (
                    <span className={`${isDarkMode ? 'text-[#28282A]' : 'text-white'} text-[16px] lg:text-[24px] 2xl:text-[32px] not-italic font-bold leading-[120%]`}>
                      <span className={`${isDarkMode ? 'text-[#28282A]' : 'text-white'} text-[10px] lg:text-xl not-italic font-normal leading-[120%] line-through`}>
                        {actualPrice + ' '}
                      </span>
                      ${totalPrice}
                    </span>
                  )
                    :
                    (<span className={`${isDarkMode ? 'text-[#28282A]' : 'text-white'} text-[16px] lg:text-[24px] 2xl:text-[32px] not-italic font-bold leading-[120%]`}>
                      $0
                    </span>)
                  }
                </span>
              </button>
              <div className=" lg:hidden md:block hidden">
              <div className="flex items-center gap-2.5 mt-[20px]">
                {/* <Image src={checkmart} alt="Checkmark Icon" /> */}
                <CheckMart color={isDarkMode ? 'white' : '#28282A'} />
                <span className={`text-[10px] lg:text-lg not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'} `}>Free 2-5d shipping & no questions asked returns</span>
              </div>
              <div className="flex items-center gap-2.5 mt-[10px]">
                {/* <Image src={checkmart} alt="Checkmark Icon" /> */}
                <CheckMart color={isDarkMode ? 'white' : '#28282A'} />
                <span className={`text-[10px] lg:text-lg not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'} `}>Try first, then decide with 30d money-back promise <span className={`text-[10px] lg:text-sm not-italic font-light leading-[120%] underline  cursor-pointer ${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[rgba(40,40,42,0.80)] '}`}>learn more.</span></span>
              </div>
            </div>
              </div>
            </div>
            {/* Mobile-device */}
            <div className="lg:w-[35%] md:hidden block">
              <div className="flex items-center gap-2.5 mt-[20px]">
                {/* <Image src={checkmart} alt="Checkmark Icon" /> */}
                <CheckMart color={isDarkMode ? 'white' : '#28282A'} />
                <span className={`text-[10px] lg:text-lg not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'} `}>Free 2-5d shipping & no questions asked returns</span>
              </div>
              <div className="flex items-center gap-2.5 mt-[10px]">
                {/* <Image src={checkmart} alt="Checkmark Icon" /> */}
                <CheckMart color={isDarkMode ? 'white' : '#28282A'} />
                <span className={`text-[10px] lg:text-lg not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'} `}>Try first, then decide with 30d money-back promise <span className={`text-[10px] lg:text-sm not-italic font-light leading-[120%] underline  cursor-pointer ${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[rgba(40,40,42,0.80)] '}`}>learn more.</span></span>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default SubscibeAndSaveBundleBox
