import { combineReducers } from "redux";
import shoppingReducer from './shopping/shopping-reducer';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage,
    whiteList:['shop']
}

const rootReducer = combineReducers({
    shop:shoppingReducer
})

export default persistReducer(persistConfig, rootReducer);