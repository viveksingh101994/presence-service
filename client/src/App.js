import React, { lazy, Suspense } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Spinner from './components/spinner/spinner.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { GlobalStyle } from './global.styles';
import {
  selectCurrentUser,
  selectIsUserSessionAvailable,
  selectIsError
} from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';
import NavBarComponent from './components/navbar/navbar.component';
import Container from '@material-ui/core/Container';

const DashboardPage = lazy(() =>
  import('./pages/dashboard/dashboard.component')
);
const SignInAndSignUpPage = lazy(() =>
  import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component')
);
const ErrorBoundary = lazy(() =>
  import('./components/error-boundary/error-boundary.component')
);

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  getDashboardComponent = () => {
    if (this.props.isError instanceof Error) {
      return <ErrorBoundary />;
    }
    if (this.props.isLoading) {
      return <Spinner />;
    }
    if (this.props.currentUser) {
      return <DashboardPage />;
    }
  };

  componentWillUnmount() {}
  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <NavBarComponent />
        <Container fixed>
          <Switch>
            <Suspense fallback={<Spinner />}>
              <Route
                path="/dashboard"
                exact
                render={this.getDashboardComponent}
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
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isLoading: selectIsUserSessionAvailable,
  isError: selectIsError
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
