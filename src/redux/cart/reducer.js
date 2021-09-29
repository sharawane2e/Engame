import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_ITEM_GET,
  CART_ITEM_UPDATE,
} from "./types";

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

    case CART_ITEM_UPDATE:
      return {
        ...state,
        cartItems: [...state.cartItems.filter((x) => x.id !== action.payload)],
      };

    case CART_ITEM_GET:
      return { ...state, cartItems: action.payload };
    case CART_REMOVE_ITEM:
      state.cartItems.pop();
      return {
        ...state,
        cartItems: [...state.cartItems.filter((x) => x.id !== action.payload)],
      };
    default:
      return state;
  }
};
