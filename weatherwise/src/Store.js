import { configureStore, createSlice } from '@reduxjs/toolkit';

const globalValueSlice = createSlice({
    name: 'globalValue',
    initialState: { value: "yagna" },
    reducers: {
        setValue: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setValue } = globalValueSlice.actions;

const store = configureStore({
    reducer: {
        globalValue: globalValueSlice.reducer,
    },
});

export default store;