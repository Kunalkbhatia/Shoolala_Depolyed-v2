import { createSlice } from "@reduxjs/toolkit";


const orderDetailsSlice = createSlice({
    name : 'orderDetails',
    initialState:{
        order:{},
    },

    reducers:{
        orderDetailsRequest : (state , action) => {
            state.loading = true
        },

        orderDetailsSuccess : (state , action) => {
            state.loading = false
            state.order = action.payload
        },

        orderDetailsFail : (state , action) => {
            state.loading = false
            state.error = action.payload
        }
    }
});




export const {orderDetailsRequest , orderDetailsSuccess , orderDetailsFail} = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;