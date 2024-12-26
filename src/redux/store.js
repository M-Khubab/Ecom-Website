// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// Create the Redux store and add reducers
const Store = configureStore({
    reducer: {
      cart : cartReducer,  // Add reducers here
    },
  });

export default Store
