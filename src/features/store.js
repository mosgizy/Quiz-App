import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./question"
import modalReducer from "./modal"

export const store = configureStore({
    reducer: {
        question: questionReducer,
        modal:modalReducer,
    },
});
