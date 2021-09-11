// import { CART_ADD_ITEM, CART_REMOVE_ITEM, GET_CART_ITEM } from "./types";

// const initialState = { cartItems: [], carts: [] };

// export const cartReducers = (state = initialState, action) => {
//   switch (action.type) {
//     case CART_REMOVE_ITEM:
//       return {
//         ...state,
//         cartItems: state.cartItems.filter((x) => x.product !== action.payload),
//       };
//     default:
//       return state;
//   }
// };



import { CART_ADD_ITEM, CART_REMOVE_ITEM, GET_CART_ITEM } from "./types";

const initialState = { cartItems: [], carts: [] };

export const cartReducers = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      //const existItem = state.cartItems.find((x) => x.product === item.product);
         return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      case GET_CART_ITEM:
      return { ...state, cartItems: action.payload };
    case CART_REMOVE_ITEM:
     state.cartItems.pop();
      return {
        // ...state,
        //  cartItems:[...state.cartItems.filter((x) => x.product !== action.payload)],
         ...state,
        // cartItems: [...state.cartItems.filter((x) => x.product !== action.payload)]

        //...state,cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    default:
      return state;
  }
};
