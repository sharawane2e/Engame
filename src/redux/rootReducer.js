import { combineReducers } from "redux";
// import { paymentSucess } from "./payment";
import loaderReducer from "./loader/loader-reducer";
import { productListReducer } from "./product/product-reducer";
import userReducer from "./user/user-reducer";
import { cartReducers } from "./cart/reducer";

const rootReducer = combineReducers({
  // payment: paymentSucess,
  loader: loaderReducer,
  productList: productListReducer,
  user: userReducer,
  cart: cartReducers,
});

export default rootReducer;
