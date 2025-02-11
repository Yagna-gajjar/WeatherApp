import { configureStore, createSlice } from "@reduxjs/toolkit";

const modeSlice = createSlice({
    name: "mode",
    initialState: { value: localStorage.getItem('mode') || "night" },
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
    // initialState: { url: "http://localhost:5000" },
    initialState: { url: "https://weatherwiseapp.onrender.com" },
    reducers: {
        setApiUrl: (state, action) => {
            state.url = action.payload;
        },
    },
});
const searchedCitySlice = createSlice({
    name: "searchedCity",
    initialState: { cityId: "674e0418a6b239ebfb81958b" },
    reducers: {
        setSerchedCity: (state, action) => {
            state.cityId = action.payload;
        }
    }
})

const adminDateSlice = createSlice({
    name: "AdminDate",
    initialState: { citiyDate: new Date().toISOString().split("T")[0] },
    reducers: {
        setAdminDate: (state, action) => {
            state.citiyDate = action.payload;
        }
    }
})

export const { changeMode, toggleMode, setMode } = modeSlice.actions;
export const { setApiUrl } = apiSlice.actions;
export const { setSerchedCity } = searchedCitySlice.actions;
export const { setAdminDate } = adminDateSlice.actions;

const store = configureStore({
    reducer: {
        mode: modeSlice.reducer,
        api: apiSlice.reducer,
        searchedCity: searchedCitySlice.reducer,
        AdminDate: adminDateSlice.reducer
    },
});

export default store;