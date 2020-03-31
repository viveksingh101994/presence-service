import { VisitedUserTypes } from "./visited-user.types";

export const getVisitedUsersStart = () => ({
  type: VisitedUserTypes.GET_VISITED_USER_START
});

export const visitedUserSuccess = userList => ({
  type: VisitedUserTypes.GET_VISITED_USER_SUCCESS,
  payload: userList
});

export const visitedUsersFailure = err => ({
  type: VisitedUserTypes.VISITED_USER_FAILURE,
  payload: err
});
