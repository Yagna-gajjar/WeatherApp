import { configureStore, createSlice } from "@reduxjs/toolkit";

const modeSlice = createSlice({
    name: "mode",
    initialState: { value: localStorage.getItem('mode') },
    reducers: {
        toggleMode: (state) => {
            localStorage.setItem('mode', state.value === 'light' ? 'dark' : 'light')
            state.value = state.value === "light" ? "dark" : "light";
        },
        setMode: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { toggleMode, setMode } = modeSlice.actions;

const store = configureStore({
    reducer: {
        mode: modeSlice.reducer,
    },
});

export default store;
