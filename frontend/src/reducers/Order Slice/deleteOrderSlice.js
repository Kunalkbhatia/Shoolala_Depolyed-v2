import { createSlice } from "@reduxjs/toolkit";


const deleteOrderSlice = createSlice({
    name : 'deleteProduct',
    initialState:{
        products:[],
    },

    reducers:{
        deleteOrderRequest : (state , action) => {
            state.loading = true
        },

        deleteOrderSuccess : (state , action) => {
            state.loading = false
            state.isDeleted = action.payload
        },

        deleteOrderFail : (state , action) => {
            state.loading = false
            state.error = action.payload
        },
        deleteOrderStatusReset : (state , action) => {
            state.isDeleted = false
        },
        clearDeleteOrderErrors: (state , action) => {
            state.error = null
        }
        
    }
});


export const {clearDeleteOrderErrors,deleteOrderFail,deleteOrderRequest,deleteOrderSuccess,deleteOrderStatusReset} = deleteOrderSlice.actions;
export default deleteOrderSlice.reducer;