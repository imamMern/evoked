import React from 'react'
import Navbar from './navbar'
import Hero from './hero'
import { DarkModeProvider } from '@/utils/DarkModeContext'
import Carousel from './carousel'
import EvokedBrand from './evokedBrand'
import OtherBrands from './OtherBrands'
import Accordion from './Accordion'
import Story from './Story'
import EmblaSlider from './Embla'
import Pricing from './Pricing'

const Main = () => {
  return (
    <div>
      <DarkModeProvider>
          <Navbar />
        <Hero />
        <Carousel />
        <EvokedBrand />
        <OtherBrands />
        <Pricing/>
        <EmblaSlider/>
        <Story/>
        <Accordion/>
      </DarkModeProvider>
    </div>
  )
}

export default Main