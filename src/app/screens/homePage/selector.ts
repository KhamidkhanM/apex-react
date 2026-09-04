import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrievePopularBikes = createSelector(
    selectHomePage,
    (HomePage) => HomePage.popularBikes
);

export const retrieveNewBikes = createSelector(
    selectHomePage,
    (HomePage) => HomePage.newBikes
);

export const retrieveTopUsers = createSelector(
    selectHomePage,
    (HomePage) => HomePage.topUsers
);
