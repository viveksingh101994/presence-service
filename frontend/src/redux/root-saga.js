import { all, call } from "redux-saga/effects";
import { userSagas } from "./user/user.sagas";
import { presenceSagas } from "./presence/presence.sagas";
import { visitedUsersSagas } from "./visited-user/visited-user.sagas";

export default function* rootSaga() {
  yield all([call(userSagas), call(presenceSagas), call(visitedUsersSagas)]);
}
