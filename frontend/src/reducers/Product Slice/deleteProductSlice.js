import { createSlice } from "@reduxjs/toolkit";


const deleteProductSlice = createSlice({
    name : 'deleteProduct',
    initialState:{
        products:[],
    },

    reducers:{
        deleteProductRequest : (state , action) => {
            state.loading = true
        },

        deleteProductSuccess : (state , action) => {
            state.loading = false
            state.isDeleted = action.payload
        },

        deleteProductFail : (state , action) => {
            state.loading = false
            state.error = action.payload
        },
        deleteProductStatusReset : (state , action) => {
            state.isDeleted = false
        },
        clearDeleteErrors : (state,action) => {
            state.error = null
        }
        
    }
});




export const {clearDeleteErrors, deleteProductFail,deleteProductRequest,deleteProductStatusReset,deleteProductSuccess} = deleteProductSlice.actions;
export default deleteProductSlice.reducer;