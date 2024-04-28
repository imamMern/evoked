import React  from 'react'
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
import { getAllDeProducts } from "../app/lib/shopify"

const Main =  async () => {
  const jsonX = await getAllDeProducts();
  console.log("product", jsonX)
  return (
    <div>
      <DarkModeProvider>
          <Navbar />
        <Hero />
        <Carousel />
        
        <ul>
        {jsonX.data?.products?.edges.map((product) => (
          
          <li key={product.node.title}>dsadsad</li>
        ))}
        </ul>
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