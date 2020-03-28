import { takeLatest, put, all, call } from "redux-saga/effects";
import {
  SignInSuccess,
  SignInFailure,
  signOutFailure,
  signOutSuccess,
  signUpFailure,
  signUpSuccess
} from "./user.actions";
import { UserActionTypes } from "./user.types";
import { get, post } from "../../axios/axios.utiils";
import { url } from "../../global.config";
// import {
//   auth,
//   createUserProfileDocument,
//   getCurrentUser
// } from "../../firebase/firebase.utils";

// export function* getSnapShotFromUserAuth(userAuth, additionalData) {
//   try {
//     const userRef = yield call(
//       createUserProfileDocument,
//       userAuth,
//       additionalData
//     );
//     const userSnapshot = yield userRef.get();
//     yield put(SignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
//   } catch (err) {
//     yield put(SignInFailure(err));
//   }
// }

// export function* signInWithEmail({ payload: { email, password } }) {
//   try {
//     const { user } = yield auth.signInWithEmailAndPassword(email, password);
//     yield getSnapShotFromUserAuth(user);
//   } catch (err) {
//     yield put(SignInFailure(err));
//   }
// }

// export function* onEmailSignInStart() {
//   yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
// }

// export function* isUserAuthenticated() {
//   try {
//     const userAuth = yield getCurrentUser();
//     if (!userAuth) return;
//     yield getSnapShotFromUserAuth(userAuth);
//   } catch (err) {
//     yield put(SignInFailure(err));
//   }
// }

// export function* onCheckUserSession() {
//   yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
// }

// export function* signOut() {
//   try {
//     yield auth.signOut();
//     yield put(signOutSuccess());
//   } catch (err) {
//     yield put(signOutFailure(err));
//   }
// }

// export function* onSignOutStart() {
//   yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
// }

export function* signUp({ payload }) {
  try {
    debugger;
    yield post(`${url}/register`, { payload });
    yield put(signUpSuccess({ payload }));
  } catch (err) {
    yield put(signUpFailure(err));
  }
}

// export function* onSignUpSuccess() {
//   yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
// }

// export function* signInAfterSignUp({ payload: { user, additionalData } }) {
//   yield getSnapShotFromUserAuth(user, additionalData);
// }

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* userSagas() {
  yield all([
    // call(onEmailSignInStart),
    // call(onCheckUserSession),
    // call(onSignOutStart),
    // call(onSignUpSuccess),
    call(onSignUpStart)
  ]);
}
