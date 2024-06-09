import Discover from '@/components/Discover/discover'
import { getProductByCollection, getProducts } from "../../utils/shopify"
import React from 'react'

export default function Discovery({ productByCollection, product }) {
  const collections = productByCollection.collections.edges.find(x => x.node.title == "discoverykit")

    return (
      <div>
        <Discover product={product} dataByCollection={collections} allCollections={productByCollection} />
      </div>
    );
  }
  
  export const getServerSideProps = async () => {
     const product = await getProducts()
     const productByCollection = await getProductByCollection()
     return {
       props: { productByCollection, product }
     };
   };
   