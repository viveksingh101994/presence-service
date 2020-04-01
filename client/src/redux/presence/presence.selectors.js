import { createSelector } from "reselect";

const selectPresentedUsers = state => {
  return state.userList;
};

export const selectPresentUserList = createSelector(
  [selectPresentedUsers],
  userList => userList.currentPresentUser
);
