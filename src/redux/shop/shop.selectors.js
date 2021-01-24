import memoize from "lodash.memoize";
import { createSelector } from "reselect";

const selectShopData = (state) => state.shopdata;

export const selectShopCollections = createSelector(
  [selectShopData],
  (shopdata) => shopdata.collections
);

export const selectCollection = memoize((collectionUrlParam) =>
  createSelector([selectShopCollections], (collections) =>
    collections ? collections[collectionUrlParam] : null
  )
);

// Object.key() перетворює обєкти з ключами в масив ключів
export const selectCollectionForPreview = createSelector(
  [selectShopCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);
