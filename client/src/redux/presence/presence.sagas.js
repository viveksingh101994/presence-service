import { takeLatest, put, all, call } from "redux-saga/effects";
import { PresenceActionTypes } from "./presence.types";
import { post } from "../../axios/axios.utiils";
import { roomUserUrl } from "../../global.config";
import { cookies } from "../../cookie/cookie.name";
import { getCookie } from "../../cookie/cookie.util";
import { userPresentSuccess, setPresentUsersFailure } from "./presence.actions";
import { signOutSuccess } from "../user/user.actions";

export function* onGetPresentUsersStart() {
  yield takeLatest(PresenceActionTypes.GET_PRESENT_USERS_START, getUserPresent);
}

export function* getUserPresent({ payload }) {
  try {
    if (getCookie(cookies.validToken) === "true") {
      if (payload.occupants.length === 1) {
        return yield put(userPresentSuccess({ user: [payload.user] }));
      }
      const userList = payload.occupants
        .filter(x => x.uuid !== payload.user.uid)
        .map(x => x.uuid);
      const userData = yield post(roomUserUrl(), {
        payload: userList
      });
      yield put(userPresentSuccess({ user: [payload.user, ...userData.data] }));
    } else {
      yield put(signOutSuccess());
    }
  } catch (err) {
    yield put(setPresentUsersFailure(err));
  }
}

export function* presenceSagas() {
  yield all([call(onGetPresentUsersStart)]);
}
