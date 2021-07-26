import { combineReducers } from "redux";
import shoppingReducer from './shopping/shopping-reducer';
import loaderReducer from './loader/loader-reducer';
import { productListReducer } from "./product/product-reducer";
import userReducer from "./user/user-reducer";



const rootReducer = combineReducers({
    shop:shoppingReducer,
    loader:loaderReducer,
    productList:productListReducer,
    user:userReducer,
})

export default  rootReducer;