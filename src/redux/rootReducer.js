import { combineReducers } from "redux";
import loaderReducer from "./loader/loader-reducer";
import { productListReducer } from "./product/product-reducer";
import userReducer from "./user/user-reducer";
import { cartReducers } from "./cart/reducer";

const rootReducer = combineReducers({
  loader: loaderReducer,
  productList: productListReducer,
  user: userReducer,
  cart: cartReducers,
});

export default rootReducer;
