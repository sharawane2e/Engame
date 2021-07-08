import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {HashRouter} from 'react-router-dom';
import store from './redux/store';
import {Provider} from 'react-redux';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <HashRouter>
    <App />
   </HashRouter>
   </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

