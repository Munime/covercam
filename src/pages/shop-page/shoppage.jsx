import React from "react";
import { Route } from "react-router-dom";

import CollectionOverview from "../../components/collection-overview/collectionOverview";
import CollectionPage from "../collection-page/collectionPage";

import "./shoppage.styles.scss";

const ShopPage = ({ match }) => (
  <div>
    <Route exact path={`${match.path}`} component={CollectionOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
  </div>
);

export default ShopPage;
