import React, { lazy, Suspense } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import Spinner from "./components/spinner/spinner.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { GlobalStyle } from "./global.styles";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";

const DashboardPage = lazy(() =>
  import("./pages/dashboard/dashboard.component")
);
const SignInAndSignUpPage = lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  componentWillUnmount() {}
  render() {
    return (
      <div>
        <GlobalStyle />
        <Switch>
          <Suspense fallback={<Spinner />}>
            {" "}
            <Route
              exact
              path="/dashboard"
              render={() =>
                this.props.currentUser ? (
                  <DashboardPage user={this.props.currentUser.user} />
                ) : (
                  ""
                )
              }
            />
            <Route
              exact
              path="/"
              render={() =>
                this.props.currentUser ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <SignInAndSignUpPage />
                )
              }
            />
          </Suspense>
          {/* <Route path="*" component={ErrorBoundary} /> */}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
