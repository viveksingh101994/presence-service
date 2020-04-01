import { takeLatest, put, all, call } from "redux-saga/effects";
import { VisitedUserTypes } from "./visited-user.types";
import { get } from "../../axios/axios.utiils";
import { visitedUsersUrl } from "../../global.config";
import { cookies } from "../../cookie/cookie.name";
import { getCookie } from "../../cookie/cookie.util";
import {
  visitedUserSuccess,
  visitedUsersFailure
} from "./visited-user.actions";
import { signOutSuccess } from "../user/user.actions";

export function* onGetVisitedUsersStart() {
  yield takeLatest(VisitedUserTypes.GET_VISITED_USER_START, getVisitedUsers);
}

export function* getVisitedUsers() {
  try {
    if (getCookie(cookies.validToken) === "true") {
      const userData = yield get(visitedUsersUrl());
      yield put(visitedUserSuccess({ user: userData.data }));
    } else {
      yield put(signOutSuccess());
    }
  } catch (err) {
    yield put(visitedUsersFailure(err));
  }
}

export function* visitedUsersSagas() {
  yield all([call(onGetVisitedUsersStart)]);
}
