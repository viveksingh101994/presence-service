import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { selectIsUserSessionAvailable } from "../../redux/user/user.selectors";
import DashboardComponent from "../dashboard/dashboard.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsUserSessionAvailable
});

const DashboardContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(DashboardComponent);

export default DashboardContainer;
