import { compose } from "redux";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectIsCollectionsFetching } from "../../redux/shop/shop.selectors";
import WithSpinner from "../with-spinner/withSpinner";
import collectionsOverview from "./collectionOverview";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionsFetching,
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(collectionsOverview);

export default CollectionsOverviewContainer;
