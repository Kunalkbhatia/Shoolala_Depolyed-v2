import { createSlice } from "@reduxjs/toolkit";


const productDetailsSlice = createSlice({
    name : 'productDetails',
    initialState:{
        product:{},
    },

    reducers:{
        productDetailsRequest : (state , action) => {
            state.loading = true
        },

        productDetailsSuccess : (state , action) => {
            state.loading = false
            state.product = action.payload
        },

        productDetailsFail : (state , action) => {
            state.loading = false
            state.error = action.payload
        }
    }
});




export const {productDetailsRequest , productDetailsFail , productDetailsSuccess} = productDetailsSlice.actions;
export default productDetailsSlice.reducer;