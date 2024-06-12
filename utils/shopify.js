const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;
const STORE_FRONT_API = process.env.SHOPIFY_STORE_FRONT_API_URL;

const adminEndPoint = process.env.SHOPIFY_STORE_ADMIN_API;
const adminStoreAccessToken = process.env.ADMIN_API_ACCESS_TOKEN;
import { default as fetch } from "node-fetch";

import { gql, GraphQLClient } from "graphql-request";

const graphQLClient = new GraphQLClient(
  "https://beevoked.myshopify.com/api/2024-04/graphql.json",
  {
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      "Content-Type": "application/json",
    },
  }
);

async function ShopifyFrontData(query, variables) {
  //const URL = `https://${domain}/admin/api/2024-04/graphql.json`;
  const URL = STORE_FRONT_API;

  const options = {
    endpoint: "https://beevoked.myshopify.com/api/2024-04/graphql.json",
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": "c0e2768eb355ed35104d0b75433cc70a",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  };

  try {
    const data = await fetch(
      "https://beevoked.myshopify.com/api/2024-04/graphql.json",
      options
    ).then((response) => {
      return response.json();
    });

    return data;
  } catch (error) {
    return new Error("Products not fetched");
  }
}

async function ShopifyData(query) {
  //const URL = `https://${domain}/admin/api/2024-04/graphql.json`;
  const URL = endpoint;
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
      products(first: 100) {
        edges {
          node {
            id
            title
            metafields(
              identifiers: [
                {namespace: "custom", key: "smells_like_"},
          {namespace: "custom", key: "feels_like"},
          {namespace: "custom", key: "top_notes"},
          {namespace: "custom", key: "bottom_notes"}
              ]
            ) {
              key
              value
              namespace
            }
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            sellingPlanGroups(first: 10) {
              edges {
                node {
                  name
                  sellingPlans(first: 10) {
                    edges {
                      node {
                        id
                        name
                      }
                    }
                  }
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
  `;
  try {
    return await graphQLClient.request(getAllProductsQuery);
  } catch (error) {
    throw new Error(error);
  }
}

export async function getProductByCollection() {
  const productsByCollection = gql`
    {
      collections(first: 100) {
        edges {
          node {
            title
            products(first: 100) {
              edges {
                node {
                  title
                  id
                  description
                  tags
                  sellingPlanGroups(first: 10) {
                    edges {
                      node {
                        name
                        sellingPlans(first: 10) {
                          edges {
                            node {
                              id
                              name
                            }
                          }
                        }
                      }
                    }
                  }
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
                  metafields(
              identifiers: [
                {namespace: "custom", key: "smells_like_"},
          {namespace: "custom", key: "feels_like"},
          {namespace: "custom", key: "top_notes"},
          {namespace: "custom", key: "bottom_notes"}
              ]
            ) {
              key
              value
              namespace
            }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    return await graphQLClient.request(productsByCollection);
  } catch (error) {
    throw new Error(error);
  }
}

export async function addToCart(line) {
  const createCartMutation = `
    mutation createCart($cartInput: CartInput) {
      cartCreate(input: $cartInput) {
        cart {
          id
          totalQuantity
          checkoutUrl
        }
      }
    }
  `;

  const variables = {
    cartInput: {
      lines: line,
    },
  };
  // const variables = {
  // cartInput : {
  //     lines: [
  //       {
  //         "quantity": parseInt(quantity),
  //         "merchandiseId": id
  //       },
  //     ],
  //   },
  // };
  return ShopifyFrontData(createCartMutation, variables);
}

export async function CreateCart(id, quantity) {
  const createMutation = `mutation cartCreate {
    cartCreate {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }`;

  const variables = {
    input: {
      attributes: [
        {
          key: "<your-key>",
          value: "<your-value>",
        },
      ],

      lines: [
        {
          attributes: [
            {
              key: "<your-key>",
              value: "<your-value>",
            },
          ],
          merchandiseId: id,
          quantity: parseInt(quantity),
          sellingPlanId: "gid://shopify/SellingPlan/1224474729",
        },
      ],
    },
  };
  return ShopifyFrontData(createMutation, variables);
}

export async function updateCart(cartId, itemId, id, quantity) {
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
        id: id,
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

export async function SingleCartUpdate(cartId, lines) {
  const UpdateCartSingle = `mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
  `;
  const variables = {
    cartId: cartId,
    lines: lines,
  };
  return ShopifyFrontData(UpdateCartSingle, variables);
}

export async function removeFromCart(cartId, itemId) {
  const removeFormCart = gql`
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
        }

        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    cartId: cartId,
    lineIds: itemId,
  };
  try {
    const data = await graphQLClient.request(removeFormCart, variables);
    return data;
  } catch (error) {
    return new Error(error);
  }
}
export async function retrieveCart(cartId) {
  const cartQuery = `
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
  return ShopifyFrontData(cartQuery, variables);
  // try {
  //   const data = await graphQLClient.request(cartQuery, variables);
  //   return data.cart;
  // } catch (error) {
  //   throw new Error(error);
  // }
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
  const getCheckoutUrlQuery = `
    query checkoutURL($cartId: ID!) {
      cart(id: $cartId) {
        checkoutUrl
      }
    }
  `;
  const variables = {
    cartId: cartId,
  };

  return ShopifyFrontData(getCheckoutUrlQuery, variables);
  // try {
  //   return await graphQLClient.request(getCheckoutUrlQuery, variables);
  // } catch (error) {
  //   throw new Error(error);
  // }
};

export const CheckoutUrlWithSellingPlanId = async (
  cartId,
  lines,
  sellingPlanId
) => {
  const createCheckOut = `mutation checkoutURL($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines){
      cart {
           checkoutUrl
         }
     }
   }`;

  const variables = {
    cartId: cartId,
    lines: lines,
    // lines: [
    //     {
    //       "merchandiseId": lines.ProductVariant,
    //       "quantity": parseInt(lines.quantity),
    //       "attributes" : lines.attributes,
    //       "sellingPlanId" : lines.sellingPlanId
    //     }

    //   ]
  };
  return ShopifyFrontData(createCheckOut, variables);
  //  try {
  //   return await graphQLClient.request(createCheckOut, variables);
  // } catch (error) {
  //   throw new Error(error);
  // }
};
