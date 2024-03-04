import { createSlice } from "@reduxjs/toolkit";

const createProductSlice = createSlice({
    name: "createProduct",
    initialState: {
        createdProduct: {},
    },
    reducers: {
        createProductRequest: (state,action) => {
            state.loading = true
        },
        createProductSuccess: (state,action) => {
            state.loading = false
            state.success = action.payload.success
            state.createdProduct = action.payload.product
        },
        createProductFail: (state,action) => {
            state.loading = false
            state.error = action.payload
        },
        createProductUpdateReset: (state,action) => {
            state.success = false
        },
        clearCreateProductErrors: (state ,action) => {
            state.error = null
        },
    }
})

export const {clearCreateProductErrors,createProductFail,createProductRequest,createProductSuccess,createProductUpdateReset} = createProductSlice.actions;
export default createProductSlice.reducer;