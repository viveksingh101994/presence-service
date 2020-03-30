import { createSelector } from "reselect";

const selectPresentedUsers = state => state.presentUsers;

export const selectPresentUserList = createSelector(
  [selectPresentedUsers],
  userList => userList.currentUsers
);
