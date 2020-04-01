import { createSelector } from "reselect";

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);

export const selectIsUserSessionAvailable = createSelector(
  [selectUser],
  user => {
    return user.isFetching;
  }
);

export const selectIsError = createSelector([selectUser], user => {
  return user.error;
});
