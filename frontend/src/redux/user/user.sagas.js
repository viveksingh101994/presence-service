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
import { getCookie } from "../../cookie/cookie.util";
import { cookies } from "../../cookie/cookie.name";

export function* getValidToken(userAuth) {
  if (getCookie(cookies.validToken) === "true") {
    yield put(SignInSuccess({ user: userAuth }));
  } else {
    yield put(clearStates("token invalid"));
  }
}

export function* signInWithEmail(payload) {
  try {
    const { data } = yield post(`${url}/api/public/authenticate`, payload);
    yield put(SignInSuccess({ user: data }));
  } catch (err) {
    yield put(SignInFailure(err));
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

function getCurrentUser() {
  return get(`${url}/api/v1/user`);
}

export function* isUserAuthenticated() {
  try {
    if (getCookie(cookies.validToken) === "true") {
      const { data } = yield getCurrentUser();
      if (!data) return;
      yield put(SignInSuccess({ user: data }));
    } else {
      yield put(clearStates("token invalid"));
    }
  } catch (err) {
    yield put(SignInFailure(err));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOut({ payload }) {
  try {
    yield get(`${url}/api/public/logout`);
    payload();
    yield put(signOutSuccess());
  } catch (err) {
    yield put(signOutFailure(err));
  }
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* signUp({ payload }) {
  try {
    const userData = yield post(`${url}/api/public/register`, { payload });
    yield put(signUpSuccess({ user: userData.data }));
  } catch (err) {
    yield put(signUpFailure(err));
  }
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* signInAfterSignUp({ payload: { user } }) {
  yield getValidToken(user);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* clearStates() {
  yield takeLatest("");
}

export function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpSuccess),
    call(onSignUpStart)
  ]);
}
