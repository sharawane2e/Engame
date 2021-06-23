import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {HashRouter} from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
    <App />
   </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

