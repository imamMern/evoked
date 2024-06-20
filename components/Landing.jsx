import React from 'react'
import Navbar from './navbar'
import Hero from './hero'
import { DarkModeProvider } from '@/utils/DarkModeContext'
import Carousel from './carousel'
import EvokedBrand from './evokedBrand'
import OtherBrands from './OtherBrands'
import Accordion from './Accordion'
import Story from './Story'
import Pricing from './Pricing'
import Review from './Review'
import ThreeMore from './ThreeMore'
import Footer from './Footer'
import { PricingProvider } from '@/utils/PricingContext'
// import BodyComponent from '@/utils/BodyComponent'

const Landing = ({products, collections}) => {
  
  return (
    <div>
      <DarkModeProvider>
        {/* <BodyComponent/> */}
          <Navbar />
        <Hero />
        <PricingProvider>
        <Pricing products={products} collections={collections} />
        </PricingProvider>
        <Carousel />
        <EvokedBrand />
        <ThreeMore/>
        <OtherBrands />
        <Review/>
        <Story/>
          <Accordion />
          <Footer/>
      </DarkModeProvider>
    </div>
  )
}

export default Landing