import { combineReducers } from "redux";
import shoppingReducer from './shopping/shopping-reducer';
import loaderReducer from './loader/loader-reducer';
import { productListReducer } from "./product/product-reducer";



const rootReducer = combineReducers({
    shop:shoppingReducer,
    loader:loaderReducer,
    productList:productListReducer,
})

export default  rootReducer;