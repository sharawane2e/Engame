<<<<<<< HEAD
import { createStore, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
=======
import { createStore  } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
//import rootReducer from "./reducers";

>>>>>>> b92e40e23637c98b475d57eb01d2af452ef17c55
import rootReducer from "./rootReducer";


<<<<<<< HEAD
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store  = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));
=======
//const middleware = [thunk];

export const store  = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
>>>>>>> b92e40e23637c98b475d57eb01d2af452ef17c55


<<<<<<< HEAD
export default store;
=======
export default { store, persistStore };


// const store1 = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(...middleware))
//   );
  
//   export default store1;

>>>>>>> b92e40e23637c98b475d57eb01d2af452ef17c55
