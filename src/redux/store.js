import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import thunk from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store  = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;

