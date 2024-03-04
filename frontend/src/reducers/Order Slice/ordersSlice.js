import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
    name:"orders",
    initialState: {},
  
    reducers :{
      
      getOrdersRequest : (state , action) => {
        state.loading = true;
      },
      getOrdersSuccess: (state , action) => {
        state.loading = false;
        state.orders = action.payload.orders;
      },
      getOrdersFail: (state,action) => {
        state.loading = false;
        state.error = action.payload;
      },


      getAdminOrdersRequest : (state , action) => {
        state.loading = true;
      },
      getAdminOrdersSuccess: (state , action) => {
        state.loading = false;
        state.orders = action.payload;
      },
      getAdminOrdersFail: (state,action) => {
        state.loading = false;
        state.error = action.payload;
      },
    }
  });
  
  
  export const {getOrdersRequest , getOrdersFail, getOrdersSuccess,getAdminOrdersFail,getAdminOrdersRequest,getAdminOrdersSuccess} = ordersSlice.actions;
  export default ordersSlice.reducer;