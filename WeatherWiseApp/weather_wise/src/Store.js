import { configureStore, createSlice } from "@reduxjs/toolkit";

// Mode slice
const modeSlice = createSlice({
    name: "mode",
    initialState: { value: localStorage.getItem('mode') || "dark" },
    reducers: {
        changeMode: (state, modename) => {
            const newMode = modename.payload;
            localStorage.setItem('mode', newMode);
            state.value = newMode;
        },
        setMode: (state, action) => {
            state.value = action.payload;
        },
    },
});

const apiSlice = createSlice({
    name: "api",
    initialState: { url: "https://weatherwiseapp.onrender.com" },
    reducers: {
        setApiUrl: (state, action) => {
            state.url = action.payload;
        },
    },
});

export const { changeMode, setMode } = modeSlice.actions;
export const { setApiUrl } = apiSlice.actions;

const store = configureStore({
    reducer: {
        mode: modeSlice.reducer,
        api: apiSlice.reducer,
    },
});

export default store;
