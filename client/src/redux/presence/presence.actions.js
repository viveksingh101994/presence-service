import { PresenceActionTypes } from "./presence.types";

export const getPresentUsersStart = userList => ({
  type: PresenceActionTypes.GET_PRESENT_USERS_START,
  payload: userList
});

export const userPresentSuccess = userList => ({
  type: PresenceActionTypes.GET_PRESENT_USERS_SUCCESS,
  payload: userList
});

export const setPresentUsersFailure = err => ({
  type: PresenceActionTypes.PRESENT_USERS_FAILURE,
  payload: err
});

export const setInitialUser = user => ({
  type: PresenceActionTypes.SET_INITIAL_USER,
  payload: user
});
