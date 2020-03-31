import { createSelector } from "reselect";

const selectVisitedUsers = state => {
  return state.visitedUsers;
};

export const selectVisitedUserList = createSelector(
  [selectVisitedUsers],
  userList => userList.visitedUsers
);
