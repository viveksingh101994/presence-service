import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
  SignInSuccess,
  SignInFailure,
  signOutFailure,
  signOutSuccess,
  signUpFailure,
  signUpSuccess,
  resetError
} from './user.actions';
import { UserActionTypes } from './user.types';
import { get, post } from '../../axios/axios.utiils';
import {
  authenticateUrl,
  userUrl,
  logoutUrl,
  registerUrl
} from '../../global.config';
import { getCookie } from '../../cookie/cookie.util';
import { cookies } from '../../cookie/cookie.name';

export function* getValidToken(userAuth) {
  if (getCookie(cookies.validToken) === 'true') {
    yield put(SignInSuccess({ user: userAuth }));
  } else {
    yield put(signOutSuccess());
  }
}

export function* signInWithEmail(payload) {
  try {
    const { data } = yield post(authenticateUrl(), payload);
    yield put(SignInSuccess({ user: data }));
  } catch (err) {
    yield put(
      SignInFailure(err && err.request ? JSON.parse(err.request.response) : err)
    );
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

function getCurrentUser() {
  return get(userUrl());
}

export function* isUserAuthenticated() {
  try {
    if (getCookie(cookies.validToken) === 'true') {
      const { data } = yield getCurrentUser();
      if (!data) return;
      yield put(SignInSuccess({ user: data }));
    } else {
      yield put(SignInFailure(new Error('login invalid')));
    }
  } catch (err) {
    yield put(
      SignInFailure(err && err.request ? JSON.parse(err.request.response) : err)
    );
  }
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOut({ payload }) {
  try {
    yield get(logoutUrl());
    payload();
    yield put(signOutSuccess());
  } catch (err) {
    yield put(
      signOutFailure(
        err && err.request ? JSON.parse(err.request.response) : err
      )
    );
  }
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* signUp({ payload }) {
  try {
    const userData = yield post(registerUrl(), { payload });
    yield put(signUpSuccess({ user: userData.data }));
  } catch (err) {
    yield put(
      signUpFailure(err && err.request ? JSON.parse(err.request.response) : err)
    );
  }
}

export function* resettingError({ payload }) {
  yield put(resetError());
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

export function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpSuccess),
    call(onSignUpStart)
  ]);
}
