import { createSlice } from "@reduxjs/toolkit";

const clearErrorsSlice = createSlice({
    name: "clearErrors",
    initialState: {
        error: null 
    },
    reducers: {
        clearErrors: (state,action) => {
            state.error = null
        }
    }
})

export const {clearErrors} = clearErrorsSlice.actions;
export default clearErrorsSlice.reducer;