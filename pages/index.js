import Head from "next/head";
import { getProductByCollection, getProducts } from "../utils/shopify";
import Landing from "../components/Landing"
export default function Home({ dataByCollection, product }) {

  return (
    <>
      <Head>
        <title>Evoked</title>
        <meta name="description" content="Evoked" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./icon.svg" />
      </Head>
      
      <main>
      
        <Landing products={product} collections={dataByCollection} />
        
      </main>
    </>
  );
}
export const getServerSideProps = async () => {
 const product = await getProducts()
  const dataByCollection = await getProductByCollection()
  return {
    props: { dataByCollection, product }
  };
};


