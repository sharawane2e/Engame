import { CART_ADD_ITEM, CART_REMOVE_ITEM, GET_CART_ITEM } from "./types";

const initialState = { cartItems: [], carts: [] };

export const cartReducers = (state = initialState, action) => {
  switch (action.type) {
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    default:
      return state;
  }
};
