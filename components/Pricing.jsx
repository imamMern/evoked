"use client";
import { useDarkMode } from "@/utils/DarkModeContext";
import { Box1, Box2, DownArrow2, Plus, Minus, DownArrow1, Star12, Prev, Next, Dropdown, Remove } from "@/utils/Helpers";
import Image from "next/image";
import circle from "@/public/assets/circle.svg";
import checkedCircle from "@/public/assets/checkedCircle.svg";
import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import '@/app/globals.css'
import perfume from '@/public/assets/perfumeCollect.png'
import blue from '@/public/assets/blue.png'
import brown from '@/public/assets/brown.png'
import videoDark from '@/public/assets/dark-video.png'
import prev from '@/public/assets/prev.svg'
import next from '@/public/assets/next.svg'
import addSet from '@/public/assets/addSet.svg'
import darkGrey from '@/public/assets/darkNotSelected.svg'
import darkBlack from '@/public/assets/darkSelected.png'
import CheckMart from "@/utils/CheckMart";






const Pricing = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(true);
  const [show4, setShow4] = useState(false);
  const [selectedButton, setSelectedButton] = useState(1);
  const [selectedButtonDropdown, setSelectedButtonDropdown] = useState(null);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };
  const handleClick1 = () => {
    setShow1(true);
    setShow2(false);
    setShow3(true);
    setShow4(false);
    
  };
  const handleClick2 = () => {
    setShow2(true);
    setShow1(false);
    setShow3(false);
    setShow4(true);
  };
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

  const handleSlideChange = (swiper) => {
    // Update the currentIndex based on the realIndex provided by Swiper
    setCurrentIndex(swiper.realIndex);
  };
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [count, setCount] = useState(1)
  const toggleDropdown1 = () => {
    setDropdownOpen1(!dropdownOpen1);
  };
  
  const toggleDropdown2 = () => {
    setDropdownOpen2(!dropdownOpen2);
  };
  const [selectedTrend, setSelectedTrend] = useState(true);
  const data = [
    { name:'1 Perfume', rate:'£40/2 months', rate50:'£20/2 months', shipping:'Free shipping & returns. ', includes:'What’s included:', firstPoint:'1 x 100ml perfume (lasts 2 months)', firstPoint50:'1 x 50ml perfume (lasts 2 months)', lastPoint:'1 x 5ml sample (free compliment)',spray:'£0.04 per spray' },
    { name:'2 Perfumes', rate:'£60/4 months',rate50:'£30/4 months',discount50:'£40 ', discount:'£80 ', shipping:'Free shipping & returns. ', includes:'What’s included:', firstPoint:'2 x 100ml perfumes (lasts 4 months)',firstPoint50:'2 x 50ml perfume (lasts 4 months)', lastPoint:'2 x 5ml samples (free compliments)',spray:'£0.03 per spray', trend: selectedTrend, trendName: 'MOST POPULAR' },
    { name:'3 Perfumes', rate:'£75/6 months', rate50:'£37/6 months',discount50:'£60 ',discount:'£120 ', shipping:'Free shipping & returns. ', includes:'What’s included:', firstPoint:'3 x 100ml perfumes (lasts 6 months)', firstPoint50:'1 x 50ml perfume (lasts 6 months)', lastPoint:'3 x 5ml samples (free compliments)',spray:'£0.02 per spray', trend: selectedTrend, trendName: 'BEST VALUE' }
  ];

  // Ref to hold dropdown elements
  const dropdownRefs = useRef(data.map(() => React.createRef()));

  // State variables
  const [isOpen, setIsOpen] = useState(data.map(() => false)); // isOpen for each dropdown
  const [selectedPlan, setSelectedPlan] = useState('2 Perfumes');
 
  const [selectedPlanColors, setSelectedPlanColors] = useState(data.map(() => true)); // selectedPlanColor for each dropdown
  const [selectedOptions, setSelectedOptions] = useState(data.map(() => "100ml")); // selectedOption for each dropdown

  // Handle option change for a specific dropdown
  const handleOptionChange = (option, index) => {
    setSelectedOptions(prevOptions => prevOptions.map((value, i) => i === index ? option : value));
    setIsOpen(prevOpen => prevOpen.map((value, i) => i === index ? false : value)); // Close other dropdowns
  };

  // Handle plan change
  const handleOptionPlanChange = (option, index) => {
    setSelectedPlan(option);
    setSelectedPlanColors(prevColors => prevColors.map((value, i) => i === index ? true : value)); // Change color for this dropdown
  };

  // Toggle dropdown for a specific index
  const toggleDropdown = (index) => {
    setIsOpen(prevOpen => prevOpen.map((value, i) => i === index ? !value : false)); // Close other dropdowns
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event, index) => {
    // Check if the ref is initialized and not null
    if (dropdownRefs.current[index] && dropdownRefs.current[index].current && !dropdownRefs.current[index].current.contains(event.target)) {
      setIsOpen(prevOpen => prevOpen.map((value, i) => i === index ? false : value));
    }
  };

  useEffect(() => {
    const handleClickOutsideForAll = (event) => {
      isOpen.forEach((value, index) => handleClickOutside(event, index));
    };

    document.addEventListener("click", handleClickOutsideForAll);
    return () => {
      document.removeEventListener("click", handleClickOutsideForAll);
    };
  }, [isOpen]);

  const PerfumeContent = {
    '1 Perfume': [{}],
    '2 Perfumes': [{}, {}],
    '3 Perfumes': [{}, {}, {}],
    'Perfume Set': Array.from({ length: count }, () => ({})), // For one-time purchase
  };

  const content = selectedPlan === 'Perfume Set' ? PerfumeContent[selectedPlan2] || [] : PerfumeContent[selectedPlan] || [];
  const options = [
  {value: '1', label: '1 month'},
  {value: '2', label: selectedPlan === '1 Perfume' ? '2 month (Recommended)' : '2 month'},
  {value: '3', label: '3 month'},
  {value: '4', label: selectedPlan === '2 Perfumes' ? '4 month (Recommended)' : '4 month'},
  {value: '5', label: '5 month'},
  {value: '6', label: selectedPlan === '3 Perfumes' ? '6 month (Recommended)' : '6 month'},
  ]
  const numberOfBoxes = 3;
  const numberOfBoxes2 = 10;
  const [selectedImages, setSelectedImages] = useState([]);
  useEffect(() => {
    setSelectedImages([]);
  }, [selectedPlan]);

  useEffect(() => {
    setSelectedImages([]);
  }, [show3]);
  useEffect(() => {
    setSelectedImages([]);
  }, [show1]);
  useEffect(() => {
    setSelectedImages([]);
  }, [show2]);
  useEffect(() => {
    setSelectedImages([]);
  }, [show4]);
  

  const [selectedOneTimeItems, setSelectedOneTimeItems] = useState([]);

  const handleAddToSet = (perfume) => {
    // Determine the maximum limit based on the selected plan
    let maxLimit = 0;
    if (selectedPlan === '1 Perfume') {
        maxLimit = numberOfBoxes - 2;
    } else if (selectedPlan === '2 Perfumes') {
        maxLimit = numberOfBoxes - 1;
    } else if (selectedPlan === '3 Perfumes') {
        maxLimit = numberOfBoxes;
    }

    // Check if the number of selected images exceeds the maximum limit
    if (selectedImages.length < maxLimit) {
        // Add the new image
        setSelectedImages(prevImages => [...prevImages, perfume]);
    } else {
        // Display an alert if the maximum limit of images is reached
        alert('You have reached the maximum limit of Perfumes.');
    }
    

    console.log('clicked');
};
  
const handleRemoveFromSet = (boxIndex) => {
  setSelectedImages(prevImages => {
      // Create a new array with the image at the specified boxIndex set to null
      const updatedImages = [...prevImages];
      updatedImages[boxIndex] = null;
      // Filter out any null values from the array
      return updatedImages.filter(image => image !== null) ? updatedImages.filter(image => image !== null) : updatedImages ;
  });

};

const handleAddToSetOneTime = (perfume) => {
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
      setSelectedOneTimeItems(prevItems => [...prevItems, perfume]);
      setSelectedImages(prevImages => [...prevImages, perfume]);
  }
}

// Function to remove a perfume from the set
const handleRemoveFromSetOneTime = (boxIndex) => {
  setSelectedOneTimeItems(prevItems => {
    // Filter out the item at the specified boxIndex
    const updatedItems = prevItems.filter((item, index) => index !== boxIndex);
    return updatedItems;
  });

  setSelectedImages(prevImages => {
    // Filter out the image at the specified boxIndex
    const updatedImages = prevImages.filter((image, index) => index !== boxIndex);
    return updatedImages;
  });
}
  

const selectedPlanData = data.find(item => item.name === selectedPlan);
let originalPrice = '';
let discountedPrice = '';

if (selectedPlanData) {
  const rateKey = selectedOptions[data.indexOf(selectedPlanData)].includes('50ml') ? 'rate50' : 'rate';
  const discountKey = selectedOptions[data.indexOf(selectedPlanData)].includes('50ml') ? 'discount50' : 'discount';
  
  const originalPriceParts = selectedPlanData[discountKey] ? selectedPlanData[discountKey].split('/') : selectedPlanData[rateKey].split('/');
  originalPrice = originalPriceParts.length > 0 ? originalPriceParts[0].trim() : '';
  
  if (selectedPlanData[discountKey]) {
    discountedPrice = selectedPlanData[rateKey].split('/')[0].trim();
  }
  }

  // One time purchase Start
  
 
  const data2 = [
    { name:'Perfume Set', rate:'£45', rate50:'£23', shipping:'Add 1 more to save £20',shippingProgress:'Add 1 more to get 1 x free perfume + £20 off', includes:'What’s included:', firstPoint:' x 100ml perfume (lasts 2 months)',firstPoint50:' x 50ml perfume (lasts 2 months)', lastPoint:' x 5ml sample (free compliment)',spray:'£0.05 per spray', discount:'£60', discount50:'£30' },
  ];
  const [rate, setRate] = useState(data2[0].rate);
  const [rate50, setRate50] = useState(data2[0].rate50);
  const [selector, setSelector] = useState(false);
  const [discount, setDiscount] = useState(data2[0].discount);
  const [discount50, setDiscount50] = useState(data2[0].discount50);
  const [firstPoint, setFirstPoint] = useState(data2[0].firstPoint);
  const [firstPoint50, setFirstPoint50] = useState(data2[0].firstPoint50);
  const [lastPoint, setLastPoint] = useState(data2[0].lastPoint);
  const [spray, setSpray] = useState(data2[0].spray);
  const [shipping, setShipping] = useState(data2[0].shipping);
  
  const handleIncrement =()=> {
    //setCount(prevCount => prevCount+=1);
    if (count < 10) {
      setCount((prevCount) => prevCount + 1);
      // Update other state values based on the count
      // Your existing code for updating state values goes here...
      if (count === 1) {
        setRate('£70'); // Update rate when count increases from 1 to 2
        setSelector(true)
        setDiscount('£90 ')
        setFirstPoint('x 100ml perfume (lasts 4 months)')
        setLastPoint('x 5ml sample (free compliment)')
        setShipping('Add 1 more to save £45')
        setSpray('£0.04 per spray')
  
      }else if(count === 2){
        setRate( '£90' )
        setSelector(true)
        setDiscount('£135 ')
        setFirstPoint('x 100ml perfume (lasts 6 months)')
        setLastPoint('x 5ml sample (free compliment)')
        setShipping('Add 1 more to save £80')
        setSpray('£0.03 per spray')
      } else if (count === 3) {
        setRate('£100')
        setSelector(true)
        setDiscount('£180 ')
        setFirstPoint('x 100ml perfume (lasts 8 months)')
        setLastPoint('x 5ml sample (free compliment)')
        setShipping('You’ve unlocked max savings of £80! 🎉')
        setSpray('£0.02 per spray')
      }else if (count === 4) {
        setRate('£225')
        setSelector(false)
        setFirstPoint('x 100ml perfume (lasts 2 months)')
        setLastPoint('x 5ml sample (free compliment)')
        setShipping('No more savings here')
        setSpray('£0.04 per spray')
      }
      else if ((count+1) > 4) {
        setRate('£'+ ((count+1) * 45 ))
        setSelector(false)
        setFirstPoint('x 100ml perfume (lasts 2 months)')
        setLastPoint('x 5ml sample (free compliment)')
        setShipping('No more savings here')
        setSpray('£0.04 per spray')
      } 
      // Rate for 50ml
      if (count === 1) {
        setRate50('£35');
        setSelector(true)
        setDiscount50('£45')
        setFirstPoint50('x 50ml perfume (lasts 4 months)')
        setLastPoint('x 5ml sample (free compliment)')
        setSpray('£0.04 per spray')
      }else if(count === 2){
        setRate50('£45')
        setSelector(true)
        setDiscount50('£67')
        setFirstPoint50('x 50ml perfume (lasts 6 months)')
        setLastPoint('x 5ml sample (free compliment)')
        setSpray('£0.03 per spray')
      } else if (count === 3) {
        setRate50('£50')
        setSelector(true)
        setDiscount50('£90')
        setFirstPoint50('x 50ml perfume (lasts 8 months)')
        setLastPoint('x 5ml sample (free compliment)')
        setSpray('£0.02 per spray')
      } else if (count === 4) {
        setRate50('£112')
        setSelector(false)
        setFirstPoint50('x 50ml perfume (lasts 2 months)')
        setLastPoint('x 5ml sample (free compliment)')
        setSpray('£0.04 per spray')
      }
      else if ((count+1) > 4) {
        setRate50('£'+ Math.ceil(((count+1) * 45/2 )))
        setSelector(false)
        setFirstPoint50('x 50ml perfume (lasts 2 months)')
        setLastPoint('x 5ml sample (free compliment)')
        setSpray('£0.04 per spray')
      } 
    }
  
 
  }

  const handleDecrement =()=> {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
      // Update other state values based on the count
      // Your existing code for updating state values goes here...
      if (count === 2) {
        setRate('£45');
        setSelector(false)
        setFirstPoint('x 100ml perfume (lasts 2 months)')
        setLastPoint('x 5ml sample (free compliment)')
        setShipping('Add 1 more to save £20)')
        setSpray('£0.05 per spray')
        
      }else if(count === 3){
        setRate('£70')
        setSelector(true)
        setDiscount('£90 ')
        setFirstPoint('x 100ml perfume (lasts 4 months)')
        setLastPoint('x 5ml sample (free compliment)')
        setShipping('Add 1 more to save £45')
        setSpray('£0.04 per spray')
        
      } else if (count === 4) {
        setRate('£90'); 
        setSelector(true)
        setDiscount('£135 ')
        setFirstPoint('x 100ml perfume (lasts 6 months)')
        setLastPoint('x 5ml sample (free compliment)')
        setShipping('Add 1 more to save £80')
        setSpray('£0.03 per spray')
      }else if (count === 5) {
        setRate('£100');
        setSelector(true)
        setDiscount('£180 ')
        setFirstPoint('x 100ml perfume (lasts 8 months)')
        setLastPoint('x 5ml sample (free compliment)')
        setShipping('You’ve unlocked max savings of £80! 🎉')
        setSpray('£0.02 per spray')
      }
      else if ((count+1) > 5) {
        setRate('£' + Math.ceil(((count+1) - 2) * 45)); // Update rate for counts greater than 3
        setSelector(false)
        setFirstPoint('x 100ml perfume (lasts 2 months)')
        setLastPoint('x 5ml sample (free compliment)')
        setShipping('No more savings here')
        setSpray('£0.04 per spray')
      }
      // 50ml
      if (count === 2) {
        setRate50('£23'); // Update rate when count increases from 1 to 2
        setSelector(false)
        setFirstPoint50('x 50ml perfume (lasts 2 months)')
        setLastPoint('x 5ml sample (free compliment)')
        setSpray('£0.05 per spray')
      }else if(count === 3){
        setRate50('£35')
        setSelector(true)
        setDiscount50('£45')
        setFirstPoint50('x 50ml perfume (lasts 4 months)')
        setLastPoint('x 5ml sample (free compliment)')
        setSpray('£0.04 per spray')
      } else if (count === 4) {
        setRate50('£45'); // Update rate for counts greater than 3
        setSelector(true)
        setDiscount50('£67')
        setFirstPoint50('x 50ml perfume (lasts 6 months)')
        setLastPoint('x 5ml sample (free compliment)')
        setSpray('£0.03 per spray')
      }else if (count === 5) {
        setRate50('£50'); // Update rate for counts greater than 3
        setSelector(true)
        setDiscount50('£90')
        setFirstPoint50('x 50ml perfume (lasts 8 months)')
        setLastPoint('x 5ml sample (free compliment)')
        setSpray('£0.02 per spray')
      }
      else if ((count+1) > 5) {
        setRate50('£' + Math.ceil(((count+1) - 2) * 45/2)); // Update rate for counts greater than 3
        setSelector(false)
        setFirstPoint50('x 50ml perfume (lasts 2 months)')
        setLastPoint('x 5ml sample (free compliment)')
        setSpray('£0.04 per spray')
      }
    }
    
  }
  // Ref to hold dropdown elements
  const dropdownRefs2 = useRef(data2.map(() => React.createRef()));

  // State variables
  const [isOpen2, setIsOpen2] = useState(data2.map(() => false)); // isOpen for each dropdown
  const [selectedPlan2, setSelectedPlan2] = useState('Perfume Set');
 
  const [selectedPlanColors2, setSelectedPlanColors2] = useState(data2.map(() => true)); // selectedPlanColor for each dropdown
  const [selectedOptions2, setSelectedOptions2] = useState(data2.map(() => "100ml")); // selectedOption for each dropdown

  // Handle option change for a specific dropdown
  const handleOptionChange2 = (option, index) => {
    setSelectedOptions2(prevOptions => prevOptions.map((value, i) => i === index ? option : value));
    setIsOpen(prevOpen => prevOpen.map((value, i) => i === index ? false : value)); // Close other dropdowns
  };

  // Handle plan change
  const handleOptionPlanChange2 = (option, index) => {
    setSelectedPlan2(option);
    setSelectedPlanColors2(prevColors => prevColors.map((value, i) => i === index ? true : value)); // Change color for this dropdown
  };

  // Toggle dropdown for a specific index
  const toggleDropdownOneTime = (index) => {
    setIsOpen(prevOpen => prevOpen.map((value, i) => i === index ? !value : false)); // Close other dropdowns
  };

  // Close dropdown when clicking outside
  const handleClickOutside2 = (event, index) => {
    if (dropdownRefs.current[index] && !dropdownRefs.current[index].current.contains(event.target)) {
      setIsOpen(prevOpen => prevOpen.map((value, i) => i === index ? false : value));
    }
  };

  useEffect(() => {
    const handleClickOutsideForAll = (event) => {
      isOpen.forEach((value, index) => handleClickOutside2(event, index));
    };

    document.addEventListener("click", handleClickOutsideForAll);
    return () => {
      document.removeEventListener("click", handleClickOutsideForAll);
    };
  }, [isOpen]);

useEffect(() => {
  // Clear state related to one-time purchase images
  setSelectedImages([]);
  setSelectedOneTimeItems([]);
}, [show2]);

useEffect(() => {
  const root = document.documentElement;
  
  if (isDarkMode) {
    root.style.setProperty('--swiper-button-color', 'white');
  } else {
    root.style.setProperty('--swiper-button-color', '#171717');
  }
}, [isDarkMode]);

  return (
    <section>
      <div className={`${isDarkMode ? 'bg-primary' : 'bg-white'}`}>
      <div
        className={`flex justify-between pt-[100px] ${
          isDarkMode ? "bg-primary" : "bg-white"
        }`}
      >
        <Box1 color={isDarkMode ? "white" : "#454547"} />
        <div className="max-w-container mx-auto mt-[120px]">
          <div className="flex flex-col text-center">
            <h2
              className={`text-5xl mb-[25px] not-italic font-bold leading-[normal] uppercase ${
                isDarkMode ? "text-white" : "text-[color:var(--Brand,#28282A)] "
              }`}
            >
              Select how many BOTTLES
            </h2>
            <span
              className={`text-center text-2xl not-italic font-medium leading-[160%] ${
                isDarkMode ? "text-white" : "text-[color:var(--Brand,#28282A)] "
              }`}
            >
              Buy More, Save More. Subscribe to save most.
            </span>
            <span
              className={`text-2xl italic font-light leading-[160%] ${
                isDarkMode ? "text-white" : "text-[color:var(--Brand,#28282A)] "
              }`}
            >
              100ml per bottle (roughly 1000 sprays) = Lasts 2 months on
              average, used generously twice daily.
            </span>
            {/* Button */}
            <div
              className={`mt-[80px] mx-auto inline-flex gap-2.5 px-2.5 py-2 rounded-[var(--md,8px)] border  border-solid ${
                isDarkMode
                  ? "border-white"
                  : "border-[color:var(--black,#171717)]"
              }`}
            >
              <button
                onClick={handleClick1}
                className={`flex justify-center items-center gap-2.5 px-5 py-2.5 rounded-[var(--md,8px)]  text-lg not-italic font-normal leading-[normal]   ${
                  show1 && `${isDarkMode ? 'bg-white text-[#28282A]' : 'bg-primary text-white'}`
                } ${show2 && `bg-transparent  ${isDarkMode ? 'text-[#454547]' : 'text-[#28282a]'}`} `}
              >
                Subscribe & Save
              </button>
              <button
                onClick={handleClick2}
                className={` flex justify-center rounded-[var(--md,8px)] items-center gap-2.5 px-5 py-2.5 text-lg not-italic leading-[normal] font-normal   ${
                  show2 && `${isDarkMode ? 'bg-white text-[#28282A]' : 'bg-primary text-white'}`
                } ${show1 && `bg-transparent  ${isDarkMode ? 'text-[#454547]' : 'text-[#28282a]'}`}`}
              >
                One Time Purchase
              </button>
            </div>

                      <div className="flex items-start gap-[30px] self-stretch mt-[50px]">
              {
                show1 && 
                (
                  data.map(({ name, rate, discount, shipping, includes, firstPoint, firstPoint50, lastPoint, spray, rate50,discount50, trend, trendName }, index) => (
                    <div className="">
                    <div key={index} className={`flex flex-col items-start px-5 py-[30px] ${trend ? 'rounded-t-[var(--md,8px)] ' : 'rounded-[var(--md,8px)] '} border   border-solid  ${selectedPlan === name ? `${isDarkMode ? 'bg-white border-white' : 'border-white bg-primary'}` : `${isDarkMode ? 'bg-[#454547] border-white' : ' bg-white border-[color:var(--black,#171717)]'}`} `}>
                      <div className="flex items-center gap-5">
                        <h6 className={` text-[38px] not-italic font-semibold leading-[normal] ${selectedPlan === name ? `${isDarkMode ? ' text-primary' : 'text-white'}` : `${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}`}>{name}</h6>
                        {/* Select  */}
                        <div className="relative" ref={dropdownRefs.current[index]}>
                          <span className="rounded-md shadow-sm">
                            <button
                              onClick={() => toggleDropdown(index)}
                              type="button"
                              className={`flex items-center gap-2.5 px-2.5 py-[5px] rounded-[var(--sm,4px)] border  border-solid  text-xl not-italic font-normal leading-[normal] ${selectedPlan === name ? `${isDarkMode ? 'text-primary border-primary' : 'text-white border-white'}` : `${isDarkMode ? 'text-white border-white' : 'text-[color:var(--Brand,#28282A)] border-[color:var(--Brand,#28282A)]'}`}`}
                              id={`options-menu-${index}`}
                              aria-haspopup="true"
                              aria-expanded={isOpen[index] ? "true" : "false"}
                            >
                              {selectedOptions[index]}
                              <DownArrow2 color={selectedPlan === name ? `${isDarkMode ? '#171717' : 'white'}` : `${isDarkMode ? 'white' : '#28282A'}`} />
                            </button>
                          </span>
              
                          {isOpen[index] && (
                            <div
                              className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg  ring-1  ring-opacity-5 ${selectedPlan === name ? `${isDarkMode ? 'ring-white bg-primary' : 'ring-black bg-white'}` : 'ring-black bg-white'}`}
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby={`options-menu-${index}`}
                            >
                              <div className="py-1" role="none">
                                <button
                                  onClick={() => handleOptionChange("100ml", index)}
                                  className={`${selectedOptions[index] === "100ml" ? "" : ""} block w-full text-left px-4 py-2 text-sm  ${selectedPlan === name ? `${isDarkMode ? 'text-white' :'text-primary hover:bg-gray-100 hover:text-gray-900'}` : `'text-gray-700 hover:bg-gray-100 hover:text-gray-900'`}`}
                                  role="menuitem"
                                >
                                  100ml
                                </button>
                                <button
                                  onClick={() => handleOptionChange("50ml", index)}
                                  className={`${selectedOptions[index] === "50ml" ? `${isDarkMode ? 'bg-transparent' :'bg-gray-100'}` : ""} block w-full text-left px-4 py-2 text-sm ${selectedPlan === name ? `${isDarkMode ? 'text-white' :'text-primary hover:bg-gray-100 hover:text-gray-900'}` : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
                                  role="menuitem"
                                >
                                  50ml
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                        {/* CheckMark */}
                        <div className="ml-[70px]">
                            
                            {
                              isDarkMode ? 
                                <Image onClick={() => handleOptionPlanChange(name, index)} src={selectedPlan === name ? darkBlack : darkGrey} alt="Circle" />
                                : <Image onClick={() => handleOptionPlanChange(name, index)} src={selectedPlan === name ? checkedCircle : circle} alt="Circle" />
                            }
                        </div>
                      </div>
                      <span  className={`text-[28px] not-italic font-normal leading-[normal] mt-[25px] ${selectedPlan === name ? `${isDarkMode ? 'text-primary' : 'text-white'}` : `${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}`}><span className={` text-[22px] not-italic font-normal leading-[normal] line-through ${selectedPlan === name ? `${isDarkMode ? 'text-[#171717CC]' : 'text-[rgba(255,255,255,0.80)]'}` : `${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[white]'}`}`}>{selectedOptions[index] === "50ml" ? discount50 : discount}</span>{selectedOptions[index] === "50ml" ? rate50 : rate}</span>
                      {/* <span className={`flex mt-[10px] justify-center items-center gap-2.5 px-2.5 py-[5px] rounded-[var(--sm,4px)] border border-solid  text-sm not-italic font-normal leading-[120%] ${selectedPlan === name ? 'text-[#FFFFFFB2] border-[#FFFFFFB2] ' : 'text-[color:var(--brand-70,rgba(40,40,42,0.70))] border-[color:var(--brand-70,rgba(40,40,42,0.70))]'}`}>{shipping}</span> */}
                      <span className={`mt-[30px] text-xl not-italic font-normal leading-[normal] ${selectedPlan === name ? `${isDarkMode ? 'text-primary' : 'text-[white]'}` : `${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}`}>{includes}</span>
                      <span className={` mt-[15px] text-base not-italic font-normal leading-[normal] ${selectedPlan === name ? `${isDarkMode ? 'text-primary' : 'text-[white]'}` : `${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}`}>{selectedOptions[index] === "50ml" ? firstPoint50 : firstPoint}</span>
                      <span className={` mt-[10px] text-base not-italic font-normal leading-[normal] ${selectedPlan === name ? `${isDarkMode ? 'text-primary' : 'text-[white]'}` : `${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}`}>{lastPoint}</span>
                      <span className={` text-xl not-italic font-light leading-[normal] mt-[30px] ml-auto ${selectedPlan === name ? `${isDarkMode ? 'text-[#28282ACC]' : 'text-[#FFFFFFCC]'}` : `${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[color:var(--brand-70,rgba(40,40,42,0.70))]'}`}`}>{spray}</span>
                      </div>
                      {
                        trend && (
                          <div className={`flex justify-between items-center self-stretch p-5 rounded-[0px_0px_var(--md,8px)_var(--md,8px)] border-b border-l border-r  border-solid ${isDarkMode ? 'border-white ' : 'border-[color:var(--black,#171717)] '}`}>
                            <span className={` text-center mx-auto text-3xl not-italic font-bold leading-[normal] ${isDarkMode ? 'text-white ' : 'text-[color:var(--black,#171717)]'}`}>
                            {trendName}
                            </span> 
                          </div>
                        )
                      }
                    </div>
                  ))
                )
              }
              {
                show2 && 
                (
                  data2.map(({ name, includes }, index) => (
                    <div className="mx-auto">
                    <div key={index} className={`flex flex-col items-start rounded-[8px] px-5 py-[30px] border border-[color:var(--black,#171717)] border-solid  ${selectedPlan2 === name ? `${isDarkMode ? 'bg-white border-white' : 'border-white bg-primary'}` : `${isDarkMode ? 'bg-[#454547] border-white' : ' bg-white border-[color:var(--black,#171717)]'}`} `}>
                        <div className="flex justify-between items-center gap-5">
                          
                        <h6 className={` text-[38px] not-italic font-semibold leading-[normal] ${selectedPlan2 === name ? `${isDarkMode ? 'text-[primary]' : 'text-white'}` : `${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[white]'}`}`}>{name}</h6>
                        {/* Select  */}
                        <div className="relative" ref={dropdownRefs.current[index]}>
                          <span className="rounded-md shadow-sm">
                            <button
                              onClick={() => toggleDropdownOneTime(index)}
                              type="button"
                              className={`flex items-center gap-2.5 px-2.5 py-[5px] rounded-[var(--sm,4px)] border  border-solid  text-xl not-italic font-normal leading-[normal] ${selectedPlan2 === name ? `${isDarkMode ? 'text-primary border-primary' : 'text-white border-white'}` : `${isDarkMode ? 'text-white border-white' : 'text-[color:var(--Brand,#28282A)] border-[color:var(--Brand,#28282A)]'}`}`}
                              id={`options-menu-${index}`}
                              aria-haspopup="true"
                              aria-expanded={isOpen[index] ? "true" : "false"}
                            >
                              {selectedOptions2[index]}
                              <DownArrow2 color={selectedPlan2 === name ? `${isDarkMode ? '#171717' : 'white'}` : '#28282A'} />
                            </button>
                          </span>
              
                          {isOpen[index] && (
                            <div
                              className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg  ring-1  ring-opacity-5 z-[999] ${isDarkMode ? 'ring-white bg-primary' : 'ring-black bg-white'}`}
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby={`options-menu-${index}`}
                            >
                              <div className="py-1" role="none">
                                <button
                                  onClick={() => handleOptionChange2("100ml", index)}
                                  className={`${selectedOptions2[index] === "100ml" ? "" : ""} block w-full text-left px-4 py-2 text-sm ${isDarkMode ? 'text-white hover:bg-gray-900 hover:text-gray-100' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'} hover:bg-gray-100 hover:text-gray-900`}
                                  role="menuitem"
                                >
                                  100ml
                                </button>
                                <button
                                  onClick={() => handleOptionChange2("50ml", index)}
                                  className={`${selectedOptions2[index] === "50ml" ? `${isDarkMode ? 'bg-gray-900' :'bg-gray-100'}` : ""} block w-full text-left px-4 py-2 text-sm ${isDarkMode ? 'text-white hover:bg-gray-900 hover:text-gray-100' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'} `}
                                  role="menuitem"
                                >
                                  50ml
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                        {/* CheckMark */}
                          <div className="ml-[270px]">
                          {
                              isDarkMode ? 
                                <Image onClick={() => handleOptionPlanChange2(name, index)} src={selectedPlan2 === name ? darkBlack : darkGrey} alt="Circle" />
                                : <Image onClick={() => handleOptionPlanChange(name, index)} src={selectedPlan2 === name ? checkedCircle : circle} alt="Circle" />
                            }
                         
                        </div>
                      </div>
                        <div className="flex gap-x-[20px] mt-[30px] mb-[20px]">
                        <div className="">
                        <span  className={`text-[color:var(--Brand,#28282A)] text-[28px] not-italic font-normal leading-[normal] mt-[25px] ${selectedPlan2 === name ? `${isDarkMode ? 'text-primary' : 'text-white'}` : `${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[white]'}`}`}><span className={` text-[22px] not-italic font-normal leading-[normal] line-through ${selectedPlan2 === name ? `${isDarkMode ? 'text-[#171717CC]' : 'text-[rgba(255,255,255,0.80)]'}` : `${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[white]'}`}`}>{selectedOptions2[index] === "50ml" ? selector ? discount50 : null : selector ? discount : null}</span> {selectedOptions2[index] === "50ml" ? rate50 : rate && rate}</span>
                        </div>
                          {/* Increment Decrement Buttons */}
                          {
                            count === 10 ? (
                              <div className={`inline-flex opacity-[0.6] items-center border  border-solid select-none ${isDarkMode ? 'border-primary' : 'border-white'}`}>
                              <button onClick={handleDecrement} className={` flex h-[25.04px] flex-col justify-center items-start gap-2.5 p-[5px]  ${isDarkMode ? 'bg-[#28282AB2]' : 'bg-white'}`}>
                                  <Minus color={ isDarkMode ? 'white' : '#28282A'}/>
                              </button>
                              <span className={`px-[9px] py-[3px] text-lg not-italic font-normal leading-[normal] ${isDarkMode ? 'text-primary' : 'text-white'}`}>{count}</span>
                              <button onClick={handleIncrement} className={`flex cursor-not-allowed h-[25.04px] flex-col justify-center items-start gap-2.5 p-[5px] ${isDarkMode ? 'bg-[#28282AB2]' : 'bg-white'}`}>
                                <Plus color={ isDarkMode ? 'white' : '#28282A'}/>
                              </button>
                            </div>
                            )
                              :

                              (
                                <div className={`inline-flex items-center border border-solid select-none ${isDarkMode ? 'border-primary' : 'border-white'}`}>
                                <button onClick={handleDecrement} className={`flex  h-[25.04px] flex-col justify-center items-start gap-2.5 p-[5px] ${isDarkMode ? 'bg-[#28282AB2]' : 'bg-white'}`}>
                                  <Minus color={ isDarkMode ? 'white' : '#28282A'}/>
                                </button>
                                <span className={`px-[9px] py-[3px] text-lg not-italic font-normal leading-[normal] ${isDarkMode ? 'text-primary' : 'text-white'}`}>{count}</span>
                                <button onClick={handleIncrement} className={`flex  h-[25.04px] flex-col justify-center items-start gap-2.5 p-[5px] ${isDarkMode ? 'bg-[#28282AB2]' : 'bg-white'}`}>
                                  <Plus color={ isDarkMode ? 'white' : '#28282A'}/>
                                </button>
                              </div>
                              )
                          }
                       
                        </div>
                        <div className="flex items-center mt-[10px] cursor-default">
                          <span className={`flex justify-center items-center gap-2.5 px-2.5 py-[5px] rounded-[var(--sm,4px)] border border-solid  text-sm not-italic font-normal leading-[120%]  ${shipping === 'You’ve unlocked max savings of £80! 🎉' ? `${isDarkMode ? 'bg-primary text-white' : 'bg-white text-primary'}` : `${isDarkMode ? 'border-primary text-primary' : 'border-white text-white'}`}`}>{shipping}</span>
                          {/* <div className="w-[92px] h-[1px] bg-white"></div>
                      <span className={`flex justify-center items-center gap-2.5 px-2.5 py-[5px] rounded-[var(--sm,4px)] border border-solid  text-sm not-italic font-normal leading-[120%] ${selectedPlan === name ? 'text-[#FFFFFFB2] border-[#FFFFFFB2] ' : 'text-[color:var(--brand-70,rgba(40,40,42,0.70))] border-[color:var(--brand-70,rgba(40,40,42,0.70))]'}`}>{shippingProgress}</span> */}
                      </div>
                      <span className={`mt-[30px] text-xl not-italic font-normal leading-[normal] ${selectedPlan2 === name ? `${isDarkMode ? 'text-primary' : 'text-[white]'}` : `${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}`}>{includes}</span>
                      <span className={` mt-[15px] text-base not-italic font-normal leading-[normal] ${selectedPlan2 === name ? `${isDarkMode ? 'text-primary' : 'text-[white]'}` : `${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}`}>{selectedOptions2[index] === "100ml" ? count + ' ' + firstPoint : count + ' ' + firstPoint50}</span>
                      <span className={` mt-[10px] text-base not-italic font-normal leading-[normal] ${selectedPlan2 === name ? `${isDarkMode ? 'text-primary' : 'text-[white]'}` : `${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}`}>{count + ' ' + lastPoint}</span>
                      <span className={` text-xl not-italic font-light leading-[normal] mt-[30px] ml-auto ${selectedPlan2 === name && `${isDarkMode ? 'text-[color:var(--brand-70,rgba(40,40,42,0.70))]' : 'text-[#FFFFFFCC]'}`}`}>{spray}</span>
                      </div>
                   
                    </div>
                  ))
                )
              }
            </div>
          </div>
        </div>
        <Box2 color={isDarkMode ? "white" : "#28282A"} />
      </div>
      {/* Second */}
<div className={`${isDarkMode ? 'bg-primary' : 'bg-white'}`}>
      <div className="max-w-container mx-auto text-center mt-[60px]">
        <div className="flex justify-center ">
        <DownArrow1 color={isDarkMode ? 'white' : '#171717'}/>
        </div>
        <h2 className={`${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'} mt-[58px] text-5xl not-italic font-bold leading-[normal] uppercase`}>PICK YOUR SCENTS</h2>
        <h5 className={`${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'} mt-[24px] text-2xl not-italic font-normal leading-[normal]`}>Meet Evoked’s Collection 1. Confidence, now bottled with iconic designer-like scents.</h5>
        </div>
        <div className={` mt-[70px] border-t-[1px] ${isDarkMode ? 'border-white bg-primary' : 'border-primary bg-[#F4F4F4]'} border-opacity-[0.4] border-b-[1px]`}>
        <div className={`max-w-container mx-auto  py-[50px]`}>
            <div>
            </div>
            <span className={`gap-x-[10px] inline-flex items-start gap-2.5 px-2.5 py-2 rounded-[var(--lg,12px)] border ${isDarkMode ? 'border-white' : 'border-[color:var(--black,#171717)]'} border-solid`}>
      <button
        onClick={() => handleButtonClick(1)}
        className={`${selectedButton === 1 ? ` flex justify-center items-center gap-2.5 px-5 py-2.5 rounded-[var(--lg,12px)]  text-lg not-italic font-normal leading-[normal] ${isDarkMode ? 'text-primary bg-white' : 'bg-[#171717] text-white'}` : ` flex justify-center items-center gap-2.5 px-5 py-2.5 rounded-[var(--lg,12px)]  text-lg not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white bg-transparent' : 'bg-transparent text-[#28282A]'}`}`}
      >
        Men
              </button>
             
      <button
        onClick={() => handleButtonClick(2)}
        className={`${selectedButton === 2 ? ` flex justify-center items-center gap-2.5 px-5 py-2.5 rounded-[var(--lg,12px)]  text-lg not-italic font-normal leading-[normal] ${isDarkMode ? 'text-primary bg-white' : 'bg-[#171717] text-white'}` : ` flex justify-center items-center gap-2.5 px-5 py-2.5 rounded-[var(--lg,12px)]  text-lg not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white bg-transparent' : 'bg-transparent text-[#28282A]'}`}`}
      >
        WOMEN
      </button>
      <button
        onClick={() => handleButtonClick(3)}
        className={`${selectedButton === 3 ? ` flex justify-center items-center gap-2.5 px-5 py-2.5 rounded-[var(--lg,12px)]  text-lg not-italic font-normal leading-[normal] ${isDarkMode ? 'text-primary bg-white' : 'bg-[#171717] text-white'}` : ` flex justify-center items-center gap-2.5 px-5 py-2.5 rounded-[var(--lg,12px)]  text-lg not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white bg-transparent' : 'bg-transparent text-[#28282A]'}`}`}
      >
        UNISEX
              </button>
            </span>
            
            <div className="">
              {/* Content 1 */}
              {
                selectedButton === 1 | 2 | 3 && (
                  <div className="mt-[80px]">
                     <Swiper
                      navigation={{
                        prevEl: '.swiper-button-prev1',
                        nextEl: '.swiper-button-next1',
                      }}
        slidesPerView={5}
        spaceBetween={20}
            loop={true}
            allowTouchMove={true}
            centeredSlides={true}
            scrollbar={{ draggable: true }}
            mousewheel={true}
        className="mySwiper"
        modules={[Navigation]}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => handleSlideChange(swiper)}
        initialSlide={currentIndex} 
        >
                      {Links.map((item, index) => {
                        
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
              <SwiperSlide key={selectedButton === 1 && item.link || selectedButton === 2 && item.link2 || selectedButton === 3 && item.link3} className={index === currentIndex  ? 'focus' : 'blur relative z-[-10]'}>
                <div className={`flex flex-col select-none items-center gap-[25px]  rounded-[var(--md,8px)]  ${index === currentIndex ? `border ${isDarkMode ? 'border-white' : 'border-[color:var(--black,#171717)]'} border-solid px-20 py-10` : 'px-[30px] py-[20px]'}`}>
                  <Image src={selectedButton === 1 && item.link || selectedButton === 2 && item.link2 || selectedButton === 3 && item.link3} alt="Perfume" className={index === currentIndex ? 'w-auto h-auto' : 'w-[50%] h-[50%]'} />
                  <div className="flex flex-col justify-center">
                  <span className={`text-center ${isDarkMode ? 'text-white' : 'text-[#28282A]'} text-[28px] not-italic font-medium leading-[120%]`}>Scent 3</span>
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
                      <h6 className={` text-center text-lg not-italic font-normal leading-[120%] ${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[color:var(--Brand,#28282A)]'}`}>
                      Smells Like Dior Sauvage
                      </h6>
                    <div className={`inline-flex mt-[10px] mx-auto flex-col justify-center items-center  px-2.5 py-[5px] rounded-[var(--sm,4px)] border  border-solid ${isDarkMode ? 'border-[#454547] text-[#FFFFFFCC]' : 'text-[#28282A] border-[color:var(--Brand,#28282A)]'}`}>
                      <button className={`flex w-48 justify-between items-center ${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[#28282A]'} text-center text-lg not-italic leading-[120%] ${dropdownOpen1 ? 'font-bold' : 'font-normal'} `} onClick={toggleDropdown1}>Ingredients <Dropdown color={isDarkMode ? 'white' : '#28282A'} /> </button>
        {index === currentIndex ? dropdownOpen1 && (
          <div className={`flex w-48 mt-[10px] items-center ${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[#28282A]'} text-start`}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, alias sit eum delectus itaque minima distinctio facere enim cumque accusamus!
</div>
                      ) : dropdownOpen1 && (
                        <div className={`hidden w-48 mt-[10px] items-center ${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[#28282A]'} text-start`}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, alias sit eum delectus itaque minima distinctio facere enim cumque accusamus!
              </div>
                                    )}
                      <div className="w-[192px] h-[1px] bg-[#28282A] mx-auto my-[10px] "></div>
        <button className={`flex w-48 justify-between items-center ${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[#28282A]'}text-center text-lg not-italic leading-[120%] ${dropdownOpen2 ? 'font-bold' : 'font-normal'}`} onClick={toggleDropdown2}>Notes <Dropdown color={isDarkMode ? 'white' : '#28282A'} /></button>
        {index === currentIndex ? dropdownOpen2 && (
                        <div className={`flex w-48 mt-[10px] items-center ${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[#28282A]'} text-start`}>
                          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, alias sit eum delectus itaque minima distinctio facere enim cumque accusamus!
          </div>) : dropdownOpen2 && (
                        <div className={`hidden w-48 mt-[10px] items-center ${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[#28282A]'} text-start`}>
                          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, alias sit eum delectus itaque minima distinctio facere enim cumque accusamus!
          </div>) }
                                </div>
                                {
                                  show1 && (
                                    selectedImages.length < maxLimit ? (
                                      <button onClick={() => handleAddToSet(selectedButton === 1 && item.link || selectedButton === 2 && item.link2 || selectedButton === 3 && item.link3)}  className={`w-[220px] flex  mx-auto items-center justify-center gap-2.5  text-center text-2xl not-italic font-medium leading-[120%] px-5 py-[10px] rounded-[var(--sm,4px)]  mt-[25px] ${isDarkMode ? 'bg-[#454547] text-[#FFFFFFCC]' : 'bg-primary text-white'}`}>Add To Set<Image src={addSet} alt="Set"/>
                                                       </button>
                                 ) : (
                                   <button onClick={() => handleAddToSet(selectedButton === 1 && item.link || selectedButton === 2 && item.link2 || selectedButton === 3 && item.link3)}  className={`w-[220px] flex  mx-auto items-center justify-center gap-2.5 text-center text-2xl not-italic cursor-not-allowed font-medium leading-[120%] px-5 py-[10px] rounded-[var(--sm,4px)] bg-opacity-[0.5] mt-[25px] ${isDarkMode ? 'bg-[#454547] text-[#FFFFFFCC]' : 'bg-primary text-white'}`}>Add To Set<Image src={addSet} alt="Set"/>
                                                    </button>
                                 )
                                  )
                                }

{
                                  show2 && (
                                    selectedImages.length < count  ? (
                                      <button onClick={() => handleAddToSetOneTime(selectedButton === 1 && item.link || selectedButton === 2 && item.link2 || selectedButton === 3 && item.link3)}  className={`w-[220px] flex  mx-auto items-center justify-center gap-2.5  text-center text-2xl not-italic font-medium leading-[120%] px-5 py-[10px] rounded-[var(--sm,4px)] mt-[25px] ${isDarkMode ? 'bg-[#454547] text-[#FFFFFFCC]' : 'bg-primary text-white'}`}>Add To Set<Image src={addSet} alt="Set"/>
                                                       </button>
                                 ) : (
                                   <button onClick={() => handleAddToSetOneTime(selectedButton === 1 && item.link || selectedButton === 2 && item.link2 || selectedButton === 3 && item.link3)}  className={`w-[220px] flex mx-auto items-center justify-center gap-2.5  text-center text-2xl not-italic cursor-not-allowed font-medium leading-[120%] px-5 py-[10px] rounded-[var(--sm,4px)] bg-opacity-[0.5] mt-[25px] ${isDarkMode ? 'bg-[#454547] text-[#FFFFFFCC]' : 'bg-primary text-white'}`}>Add To Set<Image src={addSet} alt="Set"/>
                                                    </button>
                                 )
                                  )
                                }
                   
                     
                      
                      </span>
                  </div>
                </div>
                {
                  index === currentIndex ?  <div className="swiper-button-prev1 absolute top-[40%] left-[-25%] cursor-pointer z-[999]">
                  <Prev color={isDarkMode ? 'white' : '#28282A'}/>
                  {/* <Image src={prev} alt="Arrow"/> */}
                </div> : <div className="swiper-button-prev1 opacity-0 absolute top-[40%] left-[-25%] cursor-pointer z-[999]">
  <Prev color={isDarkMode ? 'white' : '#28282A'}/>
  {/* <Image src={prev} alt="Arrow"/> */}
</div>
                }
                {
                  index === currentIndex ?  <div className="swiper-button-next1 absolute top-[40%] right-[-25%] cursor-pointer z-[999]">
                  <Next color={isDarkMode ? 'white' : '#28282A'}/>
                  {/* <Image src={next} alt="Arrow"/> */}
                 </div> : <div className="swiper-button-next1 opacity-0 absolute top-[40%] right-[-25%] cursor-pointer z-[999]">
 <Next color={isDarkMode ? 'white' : '#28282A'}/>
 {/* <Image src={next} alt="Arrow"/> */}
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
        <div className={` mt-[70px] border-t-[1px]  border-opacity-[0.4] border-b-[1px] py-[30px] ${isDarkMode ? 'bg-[#28282A] border-white' : 'bg-[#F4F4F4] border-primary'}`}>
          {/* Subscribe and save */}
          {
            show3 && (
              <div className="max-w-container mx-auto flex justify-between items-center">
              <div className="w-[35%]">
                <h3 className={`text-[32px] not-italic font-normal leading-[120%] ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}>Your Evoked Scents </h3>
                <h4 className={`mt-[10px] text-xl not-italic font-normal leading-[120%] ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}>build your set by adding 3</h4>
                <div className="flex items-center gap-2.5 mt-[20px]">
                   {/* <Image src={checkmart} alt="Checkmark Icon" /> */}
                    <CheckMart color={isDarkMode ? 'white' : '#28282A'} />
                   <span className={`text-lg not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'} `}>Free 2-5d shipping & no questions asked returns</span>
                   </div>
                <div className="flex items-center gap-2.5 mt-[10px]">
                   {/* <Image src={checkmart} alt="Checkmark Icon" /> */}
                    <CheckMart color={isDarkMode ? 'white' : '#28282A'} />
                   <span className={`text-lg not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'} `}>Try first, then decide with 30d money-back promise <span className={`text-sm not-italic font-light leading-[120%] underline  cursor-pointer ${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[rgba(40,40,42,0.80)] '}`}>learn more.</span></span>
                   </div>
              </div>
              <div className={`w-[30%]  ${selectedPlan === '1 Perfume' ? 'mr-0' : 'mr-[70px]'}`}>
              <div className="flex gap-x-[20px] justify-center">
      {content.map((_, boxIndex) => (
        <div key={boxIndex} className={`w-[150px] h-[150px] border  border-solid relative ${isDarkMode ? 'bg-primary border-[color:var(--black,#171717)] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.70)]' : 'bg-white border-[color:var(--black,#171717)] shadow-[2px_2px_0px_0px_#171717]'}`}>
          {selectedImages[boxIndex] && (
        <>
          <Image className="w-[70px] h-[108.387px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" src={selectedImages[boxIndex]} alt={`Image ${boxIndex}`} />
              <button className="absolute top-[-10px] right-[-11px]" onClick={() => handleRemoveFromSet(boxIndex)}>
                <Remove rect={isDarkMode ? 'white' : '#171717'} color={isDarkMode ? '#171717' : 'white'}/>
          </button>
        </>
      )}
        </div>
      ))}
    </div>
                 
              </div>
              <div className="w-[35%]">
                <div className="flex items-center gap-x-[20px]">
                  <h6 className={`text-base not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}>Deliver every:</h6>
                  <select name="" id="" className={`px-[10px] py-[5px] bg-transparent border  rounded-[4px] outline-none ${isDarkMode ? 'border-white text-white' : 'border-[#28282A] text-[#28282A]'}`}>
                    {options.map(({ value, label }) => (
                      <option className={`text-[color:var(--Brand,#28282A)] text-lg not-italic font-normal leading-[normal]`} key={value} value={value} selected={selectedPlan === `1 Perfume` && value === '2' || 
                      selectedPlan === `2 Perfumes` && value === '4' ||
                      selectedPlan === `3 Perfumes` && value === '6' ? true : false}>{label}</option>
                    ))
                  }
                  </select>
                </div>
                <button className={`flex mt-[20px] w-[590px] justify-between items-center px-[30px] py-[18px] rounded-[var(--md,8px)] border  border-solid ${isDarkMode ? 'border-[color:var(--black,#171717)] shadow-[4px_4px_0px_0px_#FFF] bg-white' : 'shadow-[4px_4px_0px_0px_#171717] border-white bg-primary'}`}>
                  <span className={` ${isDarkMode ? 'text-[#28282A]' : 'text-white'} text-[32px] not-italic font-bold leading-[120%]`}>SUBSCRIBE NOW</span>
               
                  <span className={`${isDarkMode ? 'text-[#28282A]' : 'text-white'} text-[32px] not-italic font-bold leading-[120%]`}>
    {selectedPlanData && (
      <>
        {selectedPlanData.discount && (
          <span className={`${isDarkMode ? 'text-[#28282A]' : 'text-white'} text-xl not-italic font-normal leading-[120%] line-through`}>
            {originalPrice}
          </span>
        )}
        {selectedPlanData.discount ? ` ${discountedPrice}` : originalPrice}
      </>
    )}
  </span>
                </button>
              </div>
            </div>
            )
          }
          {/* One-time Purchase */}
          {
            show4 && (
              <div className="max-w-container mx-auto flex justify-between gap-x-[60px] items-center">
              <div className="w-[35%]">
                <h3 className={` ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'} text-[32px] not-italic font-normal leading-[120%]`}>Your Evoked Scents </h3>
                <h4 className={`${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'} mt-[10px] text-xl not-italic font-normal leading-[120%]`}>{shipping}</h4>
                <div className="flex items-center gap-2.5 mt-[20px]">
                   {/* <Image src={checkmart} alt="Checkmark Icon" /> */}
                    <CheckMart color={isDarkMode ? 'white' : '#28282A'} />
                   <span className={`text-lg not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'} `}>Free 2-5d shipping & no questions asked returns</span>
                   </div>
                <div className="flex items-center gap-2.5 mt-[10px]">
                   {/* <Image src={checkmart} alt="Checkmark Icon" /> */}
                    <CheckMart color={isDarkMode ? 'white' : '#28282A'} />
                   <span className={`text-lg not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'} `}>Try first, then decide with 30d money-back promise <span className={` ${isDarkMode ? 'text-[#28282ACC]' : 'text-[rgba(40,40,42,0.80)]'} text-sm not-italic font-light leading-[120%] border-b border-b-[rgba(40,40,42,0.45)] underline  cursor-pointer`}>learn more.</span></span>
                   </div>
              </div>
              <div className={`w-[30%] `}>
                  <div className="flex gap-x-[20px] justify-center">

                    <Swiper
                      className="w-full h-full swiperPadding"
                    spaceBetween={18}
                    slidesPerView={3}
                      navigation
                      loop={false}
                    pagination={{ clickable: true }}
                      scrollbar={{ draggable: true }}
                      modules={[Navigation]}
                      onSlideChange={(swiper) => swiper}
                    >

                      {Array.from({ length: count }).map((_, boxIndex) => (
                     <SwiperSlide key={boxIndex} >
          <div className={`w-[150px] h-[150px] border border-solid relative ${isDarkMode ? 'bg-primary border-[color:var(--black,#171717)] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.70)]' : 'bg-white border-[color:var(--black,#171717)] shadow-[2px_2px_0px_0px_#171717]'} `}>
          {selectedImages[boxIndex] && (
        <>
          <Image className="w-[70px] h-[108.387px] z-[100] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" src={selectedImages[boxIndex]} alt={`Image ${boxIndex}`} />
              <button className="absolute top-[-10px] right-[-11px] z-[999]" onClick={() => handleRemoveFromSetOneTime(boxIndex)}>
                <Remove rect={isDarkMode ? 'white' : '#171717'} color={isDarkMode ? '#171717' : 'white'}/>
          </button>
        </>
                      )}
                      
                          </div>
                          </SwiperSlide>
                  ))}
                      </Swiper>
     
    </div>
                 
              </div>
              <div className="w-[35%]">
                <div className="flex items-center gap-x-[20px]">
                  <h6 className={`${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'} text-base not-italic font-normal leading-[normal]`}>Deliver within  <span className="font-bold text-[18px]">2-5 days</span></h6>
                   
                </div>
                <button className={`flex mt-[20px] w-[590px] justify-between items-center px-[30px] py-[18px] rounded-[var(--md,8px)] border border-solid ${isDarkMode ? 'border-[color:var(--black,#171717)] shadow-[4px_4px_0px_0px_#FFF] bg-white' : 'shadow-[4px_4px_0px_0px_#171717] border-white bg-primary'}`}>
                  <span className={`${isDarkMode ? 'text-[#28282A]' : 'text-white'} text-[32px] not-italic font-bold leading-[120%]`}>BUY NOW</span>
               
                  {selectedOptions2.map((option, index) => (
  <span key={index} className={`${isDarkMode ? 'text-[#28282A]' : 'text-white'} text-[32px] not-italic font-bold leading-[120%]`}>
    <span className={`${isDarkMode ? 'text-[#28282A]' : 'text-white'} text-xl not-italic font-normal leading-[120%] line-through`}>
      {option === "50ml" ? selector ? discount50 : null : selector ? discount : null}
    </span>
    {option === "50ml" ? rate50 : rate && rate}
  </span>
))}
                </button>
              </div>
            </div>
            )
          }
         
        </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
