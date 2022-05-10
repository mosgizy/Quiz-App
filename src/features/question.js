import { createSlice } from "@reduxjs/toolkit";

export const questionSlice = createSlice({
    name: "question",
    initialState: { value: { questions: [], loading: false,displayQuestion:false } },
    reducers: {
        loadQuestion: (state, action) => {
            state.value = action.payload
        },
    },
});

export const {loadQuestion} = questionSlice.actions

export default questionSlice.reducer