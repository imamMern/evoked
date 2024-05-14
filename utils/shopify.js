const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;
const endpoint = process.env.SHOPIFY_STORE_FRONT_API_URL;

const adminEndPoint = process.env.SHOPIFY_STORE_ADMIN_API;
const adminStoreAccessToken = process.env.ADMIN_API_ACCESS_TOKEN;
import { default as fetch } from 'node-fetch';

import { gql, GraphQLClient } from "graphql-request";

const graphQLClient = new GraphQLClient('https://beevoked.myshopify.com/api/2024-04/graphql.json', {
  headers: {
    "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    "Content-Type": "application/json",
    
  },
});

async function ShopifyFrontData(query, variables) {
  //const URL = `https://${domain}/admin/api/2024-04/graphql.json`;
  const URL = endpoint
  
  const options = {
    endpoint: 'https://beevoked.myshopify.com/api/2024-04/graphql.json',
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query , variables }),
  };
  
  try {
    const data = await fetch('https://beevoked.myshopify.com/api/2024-04/graphql.json', options).then((response) => {
      return response.json();
    });

    return data;
  } catch (error) {
    return new Error("Products not fetched");
  }
}

async function ShopifyData(query) {
  //const URL = `https://${domain}/admin/api/2024-04/graphql.json`;
  const URL = endpoint
  const options = {
    endpoint: URL,
    method: "GET",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    const data = await fetch(URL, options).then((response) => {
      return response.json();
    });

    return data;
  } catch (error) {
    return new Error("Products not fetched");
  }
}


export async function getProducts() {
  const getAllProductsQuery = gql`
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            featuredImage {
              altText
              url
            }
          }
        }
      }
    }
  `;
  try {
    return await graphQLClient.request(getAllProductsQuery);
  } catch (error) {
    throw new Error(error);
  }
}

export async function getProductByCollection() {
  const productsByCollection = gql`{
    collections(first : 100) {
        edges {
          node {
            title
             products(first : 100) {
              edges {
                node {
                  title
                  id
                  description
                  tags
                  handle
                   variants(first: 10) {
                    edges {
                        node {
                        id
                        }
                    }
                    }
                  featuredImage {
                    altText
                    url
                  }
                }
              }
            }
          }
        }
      }
     }`;

  try {
    return await graphQLClient.request(productsByCollection);
    } catch (error) {
      throw new Error(error);
    }
  }


  export async function addToCart(id, quantity) {
    const createCartMutation =`
      mutation createCart($cartInput: CartInput) {
        cartCreate(input: $cartInput) {
          cart {
            id
            checkoutUrl
            totalQuantity
          }
        }
      }
   `;
 
     const variables = {
      cartInput : {
         lines: [
           {
             "quantity": parseInt(quantity),
             "merchandiseId": id
           },
         ],
       },
     };
    return ShopifyFrontData(createCartMutation, variables );
   }

// export async function addToCart(itemId, quantity) {
//   const createCartMutation = gql`
//     mutation createCart($cartInput: CartInput) {
//       cartCreate(input: '$cartInput') {
//         cart {
//           id
//         }
//       }
//     }`;
//   const variables = {
//     cartInput: {
//       lines: [
//         {
//           quantity: parseInt(quantity),
//           merchandiseId: itemId,
//         },
//       ],
//     },
//   };
//   try {
//     const data = await graphQLClient.request(createCartMutation, variables);
//     return data.json();
//   } catch (error) {
//     return new Error(error);
//   }
// }

export async function updateCart(cartId, itemId, quantity) {
  const updateCartMutation = gql`
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
        }
      }
    }
  `;
  const variables = {
    cartId: cartId,
    lines: [
      {
        quantity: parseInt(quantity),
        merchandiseId: itemId,
      },
    ],
  };

  try {
    const data = await graphQLClient.request(updateCartMutation, variables);
    return data;
  } catch (error) {
    return new Error(error);
  }
}

export async function retrieveCart(cartId) {
  const cartQuery = gql`
    query cartQuery($cartId: ID!) {
      cart(id: $cartId) {
        id
        createdAt
        updatedAt
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  product {
                    id
                    title
                    handle
                    featuredImage {
                      url
                      altText
                    }
                    priceRange {
                      minVariantPrice {
                        amount
                      }
                    }
                  }
                }
              }
            }
          }
        }

        estimatedCost {
          totalAmount {
            amount
          }
        }
      }
    }
  `;
  const variables = {
    cartId,
  };
  try {
    const data = await graphQLClient.request(cartQuery, variables);
    return data.cart;
  } catch (error) {
    throw new Error(error);
  }
}

export const getProduct = async (id) => {
  const productQuery = gql`
    getProduct($id: ID!) {
      product(id: $id) {
        id
        handle
        title
        description
      
        featuredImage {
          url
          altText
        }
        variants(first: 10) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  `;
  const variables = {
    id,
  };
  try {
    const data = await graphQLClient.request(productQuery, variables);
    return data.product;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCheckoutUrl = async (cartId) => {
  const getCheckoutUrlQuery = gql`
    query checkoutURL($cartId: ID!) {
      cart(id: $cartId) {
        checkoutUrl
      }
    }
  `;
  const variables = {
    cartId: cartId,
  };

  try {
    return await graphQLClient.request(getCheckoutUrlQuery, variables);
  } catch (error) {
    throw new Error(error);
  }
};
