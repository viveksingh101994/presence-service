import React, { lazy, Suspense } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import Spinner from "./components/spinner/spinner.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { GlobalStyle } from "./global.styles";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const SignInAndSignUpPage = lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);

class App extends React.Component {
  componentDidMount() {
    // const { checkUserSession } = this.props;
    // checkUserSession();
  }

  componentWillUnmount() {
    // this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <GlobalStyle />
        <Switch>
          <Suspense fallback={<Spinner />}>
            <Route
              exact
              path="/"
              render={() => (
                // this.props ? (
                //   <Redirect to="/dashboard" />
                // ) :
                <SignInAndSignUpPage />
              )}
            />
          </Suspense>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  // currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  // checkUserSession: () => dispatch(checkUserSession())
});

export default connect(null, null)(App);
// function App() {
//   return (
//     <div>
//       <Switch>
//         <ErrorBoundary>
//           <Suspense fallback={<Spinner />}>
//             <Route exact path="/" component={HomePage} />

//             <Route
//               exact
//               path="/signin"
//               render={() =>
//                 this.props.currentUser ? (
//                   <Redirect to="/" />
//                 ) : (
//                   <SignInAndSignUpPage />
//                 )
//               }
//             />
//           </Suspense>
//         </ErrorBoundary>
//       </Switch>
//     </div>
//   );
// }
