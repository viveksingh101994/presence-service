import React, { lazy, Suspense } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Spinner from "./components/spinner/spinner.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { GlobalStyle } from "./global.styles";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";
import NavBarComponent from "./components/navbar/navbar.component";

const DashboardPage = lazy(() => import("./pages/avatar/avatar.component"));
const SignInAndSignUpPage = lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);
const ErrorBoundary = lazy(() =>
  import("./components/error-boundary/error-boundary.component")
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
        <NavBarComponent />

        <Switch>
          <Suspense fallback={<Spinner />}>
            <Route
              path="/dashboard"
              exact
              render={() =>
                this.props.currentUser ? (
                  <DashboardPage user={this.props.currentUser.user} />
                ) : (
                  <ErrorBoundary />
                )
              }
            />
            <Route
              path="/"
              exact
              render={() =>
                this.props.currentUser ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <SignInAndSignUpPage />
                )
              }
            />
          </Suspense>
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
