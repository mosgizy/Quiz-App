import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: "modal",
    initialState: { value: { modalDisplay: false,percentage:0 }, },
    reducers: {
        modalState: (state, action) => {
            state.value = action.payload
        },
    },

});

export const { modalState } = modalSlice.actions

export default modalSlice.reducer