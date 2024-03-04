import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name : 'allProduct',
    initialState:{
        products:[],
    },

    reducers:{
        allProductRequest : (state , action) => {
            state.loading = true
            state.products = []
        },

        allProductSucces : (state , action) => {
            state.loading = false
            state.products = action.payload.products
            state.productsCount= action.payload.productsCount
            state.resultPerPage = action.payload.resultPerPage
        },

        allProductFail : (state , action) => {
            state.loading = false
            state.error = action.payload
        },
        allAdminProductRequest : (state , action) => {
            state.loading = true
            state.products = []
        },

        allAdminProductSucces : (state , action) => {
            state.loading = false
            state.products = action.payload.products
        },

        allAdminProductFail : (state , action) => {
            state.loading = false
            state.error = action.payload
        },
        
    }
});




export const {allProductFail , allProductRequest, allProductSucces,allAdminProductFail,allAdminProductRequest,allAdminProductSucces} = productSlice.actions;
export default productSlice.reducer;