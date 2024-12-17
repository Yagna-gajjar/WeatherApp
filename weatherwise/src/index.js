import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux'
import store from './Store.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
    <Toaster />
  </Provider>
);