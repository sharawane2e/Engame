import { createStore  } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
//import rootReducer from "./reducers";

import rootReducer from "./rootReducer";

import { persistStore } from 'redux-persist'

//const middleware = [thunk];

export const store  = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export const persistor = persistStore(store);

export default { store, persistStore };


// const store1 = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(...middleware))
//   );
  
//   export default store1;

