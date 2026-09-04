import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
    popularDishes: [],
    newDishes: [],
    topUsers: [],
};

const homePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {
        setPopularBikes: (state, action) => {
            state.popularDishes = action.payload;
        },
        setNewBikes: (state, action) => {
            state.newDishes = action.payload;
        },
        setTopUsers: (state, action) => {
            state.topUsers = action.payload;
        },
    },
});

export const { setPopularBikes, setNewBikes, setTopUsers } =
    homePageSlice.actions;

const homePageReducer = homePageSlice.reducer;

export default homePageReducer;