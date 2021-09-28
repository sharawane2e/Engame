// import { BASE_URL } from "../../config/ApiUrl";
// import * as actionTypes from "./shopping-types";
// import { CART_ADD_ITEM, CART_REMOVE_ITEM, GET_CART_ITEM } from "./types";

// let data = [];

// // async function getRadomeData() {
// //   const response = await fetch(BASE_URL + "widget/");
// //   const data = await response.json();
// //   addData(data.flat());
// // }

// // function addData(object) {
// //   // data.push(object)
// //   object.map((item) => {
// //     data.push(item);
// //   });
// // }
// // getRadomeData();

// // const initialState = {
// //   products: [data], //{id, title, descr, price, img}
// //   cart: [], //{id, title, descr, price, img}
// // };
// const shopReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case actionTypes.CART_ADD_ITEM:
//       // Get the items data from an array
//       const item = state.products[0].find(
//         (prop) => prop.id == action.payload.id
//       );
//       // // check if item is in cart already
//       const inCart = state.cart.find((item) =>
//         item.id === action.payload.id ? true : false
//       );
//       return {
//         ...state,
//         cart: inCart
//           ? state.cart.map((item) =>
//               item.id === action.payload.id ? { ...item, qty: item.qty } : item
//             )
//           : [...state.cart, { ...item, qty: 1 }],
//       };
//     case actionTypes.CART_REMOVE_ITEM:
//       return {
//         ...state,
//         cart: state.cart.filter((item) => item.id !== action.payload.id),
//       };

//     default:
//       return state;
//   }
// };

// export default shopReducer;

// // import { CART_ADD_ITEM, CART_REMOVE_ITEM, GET_CART_ITEM } from "./types";

// // export const shoppingReducer = (state = { cartItems: [] }, action) => {
// //   switch (action.type) {
// //     case CART_ADD_ITEM:
// //       const item = action.payload;
// //       const existItem = state.cartItems.find((x) => x.product === item.product);
// //       if (existItem) {
// //         return {
// //           ...state,
// //           cartItems: state.cartItems.map((x) =>
// //             x.product === existItem.product ? item : x
// //           ),
// //         };
// //       } else {
// //         return {
// //           ...state,
// //           cartItems: [...state.cartItems, item],
// //         };
// //       }
// //     case GET_CART_ITEM:
// //       return { ...state, carts: action.payload };
// //     case CART_REMOVE_ITEM:
// //       return {
// //         ...state,
// //         cartItems: state.cartItems.filter((x) => x.product !== action.payload),
// //       };
// //     default:
// //       return state;
// //   }
// // };

import { CART_ADD_ITEM, CART_REMOVE_ITEM, GET_CART_ITEM } from "./types";
//state = { cartItems: [] }

const initialState = {
  cart: []
};


export const shoppingReducer = (state = { cartItems: [] }, action) => {
 
switch (action.type) {
    case CART_ADD_ITEM:
 

    case GET_CART_ITEM:
      return { ...state, cartItems: action.payload };
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};
