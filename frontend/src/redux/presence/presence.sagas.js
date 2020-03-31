import { takeLatest, put, all, call } from "redux-saga/effects";
import { PresenceActionTypes } from "./presence.types";
import { post } from "../../axios/axios.utiils";
import { url } from "../../global.config";
import { cookies } from "../../cookie/cookie.name";
import { getCookie } from "../../cookie/cookie.util";
import { userPresentSuccess, setPresentUsersFailure } from "./presence.actions";
import { clearStates } from "../user/user.sagas";

export function* onGetPresentUsersStart() {
  yield takeLatest(PresenceActionTypes.GET_PRESENT_USERS_START, getUserPresent);
}

export function* getUserPresent({ payload }) {
  try {
    if (getCookie(cookies.validToken) === "true") {
      const userData = yield post(`${url}/api/v1/room-user`, { payload });
      yield put(userPresentSuccess({ user: userData.data }));
    } else {
      yield put(clearStates("token invalid"));
    }
  } catch (err) {
    yield put(setPresentUsersFailure(err));
  }
}

export function* presenceSagas() {
  yield all([call(onGetPresentUsersStart)]);
}
