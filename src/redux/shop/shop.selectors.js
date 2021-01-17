import { createStore } from "redux";
import { createSelector } from "reselect";

const selectShopData = (state) => state.shopdata;

export const selectShopCollections = createSelector(
  [selectShopData],
  (shopdata) => shopdata.collections
);
