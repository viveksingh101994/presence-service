import { VisitedUserTypes } from "./visited-user.types";

const INITIAL_STATE = {
  visitedUsers: [],
  error: null
};

const visiterUsersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case VisitedUserTypes.GET_VISITED_USER_START:
      return {
        ...state
      };
    case VisitedUserTypes.GET_VISITED_USER_SUCCESS:
      return {
        ...state,
        visitedUsers: action.payload.user,
        error: null
      };
    default:
      return state;
  }
};

export default visiterUsersReducer;
