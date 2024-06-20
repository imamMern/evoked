import Discover from '@/components/Discover/discover'
import { getProductByCollection, getProducts } from "../../utils/shopify"
import React from 'react'
import Head from 'next/head';

export default function Discovery({ productByCollection, product }) {
  const collections = productByCollection.collections.edges.find(x => x.node.title == "discoverykit")

    return (
      <>
            <Head>
        <title>Evoked</title>
        <meta name="description" content="Evoked" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./icon.svg" />
      </Head>
        <main>
        <Discover product={product} dataByCollection={collections} allCollections={productByCollection} />
        </main>
      </>
    );
  }
  
  export const getServerSideProps = async () => {
     const product = await getProducts()
     const productByCollection = await getProductByCollection()
     return {
       props: { productByCollection, product }
     };
   };
   