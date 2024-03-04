import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
// import store from "./store";
import appStore from './appStore';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={appStore}>
<Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
      fontFamily: 'Roboto, sans-serif', // Specify Roboto font
    },

    // Default options for specific types
    success: {
      duration: 3000,
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        fontFamily: 'Roboto, sans-serif', 
      },
    },
    error: {
      duration: 3000,
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#ffff',
        fontFamily: 'Roboto, sans-serif',
      },
    }
  }}
/>

    <App />
  </Provider>
  
);
