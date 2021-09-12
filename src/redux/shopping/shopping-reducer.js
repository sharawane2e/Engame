
import { CART_ADD_ITEM, CART_REMOVE_ITEM, GET_CART_ITEM } from "./types";
//state = { cartItems: [] }
export const shoppingReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:

      let addedItem = state.cartItems.find(item=> item.id === action.id)
      //check if the action id exists in the addedItems
     let existed_item= state.addedItem.find(item=> action.id === item.id)
  //  const existItem = state.cartItems.find((x) => x.product === item.product);
    if (existed_item) {
      addedItem.quantity += 1 

      return {
        ...state,
        state: [...state],
        cartItems: state.cartItems.map((x) =>
          x.product === existed_item.product ? x.item : x
        ),
      };
    } else {
      addedItem.quantity = 1;
      return {
        
        ...state,
        cartItems: [...state.cartItems],
      };
    }


      // return {
      //   ...state,
      //   cartItems: state.cartItems.map((product) =>
      //     product.id === action.id ? { ...product, selected: true } : product
      //   ),
      // };

    //   case CART_ADD_ITEM:
    // const item = action.payload;
    // const item = state.products[0].find(
    //   (prop) => prop.id == action.payload.id
    // );

    // // // check if item is in cart already
    // const inCart = state.cart.find((item) =>
    //   item.id === action.payload.id ? true : false
    // );
    // return {
    //   ...state,
    //   cart: inCart
    //     ? state.cart.map((item) =>
    //         item.id === action.payload.id ? { ...item, qty: item.qty } : item
    //       )
    //     : [...state.cart, { ...item, qty: 1 }],
    // };
    // const existItem = state.cartItems.find((x) => x.product === item.product);
    // if (existItem) {
    //   return {
    //     ...state,
    //     state: [...state],
    //     cartItems: state.cartItems.map((x) =>
    //       x.product === existItem.product ? item : x
    //     ),
    //   };
    // } else {
    //   return {
    //     ...state,
    //     cartItems: [...state.cartItems, item],
    //   };
    // }

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
