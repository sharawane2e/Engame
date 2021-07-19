import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {HashRouter} from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <HashRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
   </HashRouter>
   </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

