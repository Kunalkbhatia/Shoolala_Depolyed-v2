import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
    shippingInfo:localStorage.getItem("shippingInfo")?JSON.parse(localStorage.getItem("shippingInfo")):{},
  },

  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const index = state.cartItems.findIndex(
        (i) => i.product === item.product
      );
      if (index !== -1) {
        state.cartItems[index] = item;
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },


    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.product !== action.payload)
    },

    saveShippinginfo: (state , action) => {
      state.shippingInfo = action.payload
    }
  },
});



export const {addToCart, removeFromCart, saveShippinginfo} = cartSlice.actions;
export default cartSlice.reducer;