import { createSlice } from "@reduxjs/toolkit";


const newOrderSlice = createSlice({
  name: "newOrder",
  initialState: {},

  reducers: {

    createOrderRequest : (state,action) => {
        state.loading = true
    },
    createOrderSuccess : (state,action) => {
        state.loading = false
        state.newOrder = action.payload
    },
    createOrderFail : (state , action) => {
        state.loading = false
        state.error = action.payload
    },
    ClearErrors : (state,action) => {
      state.error = null
    }

  },
});

export const {ClearErrors,createOrderFail , createOrderRequest , createOrderSuccess} = newOrderSlice.actions;
export default newOrderSlice.reducer;




