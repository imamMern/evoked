import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import { getProduct, updateCart, addToCart } from "../utils/shopify"
import { usePricing } from "../utils/PricingContext";

export default function  CreateCartItem () {
    const router = useRouter()
    const [checkout, setCheckout] = React.useState(false);
    const { id, quantity } = router.query
   

    const handleAddToCart = async () => {
        let cartId = window.sessionStorage.getItem("cartId");
        if (quantity > 0) {
          if (cartId) {
            await updateCart(cartId, id, "1");
            setCheckout(true);
          } else {
            let data = await addToCart(id, "1");
            cartId = data.data.cartCreate?.cart?.id;
            window.sessionStorage.setItem("cartId", cartId);
            setCheckout(true);
          }
        }
      };

    
    return (
        <>
        <button onClick={handleAddToCart}>Add to cart</button>
         
        </>
    )
}


// export const getServerSideProps = async (context) => {
    
//     let cart = await addToCart('gid://shopify/ProductVariant/41446261948521', 1);
   
//     return {
//       props: { cart },
//     };
//   };
  