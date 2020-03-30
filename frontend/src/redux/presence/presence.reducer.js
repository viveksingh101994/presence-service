import { PresenceActionTypes } from "./presence.types";

const INITIAL_STATE = {
  userList: null,
  error: null
};

const presenceReducer = (state = INITIAL_STATE, action) => {
  switch (action.types) {
    case PresenceActionTypes.GET_PRESENT_USERS_SUCCESS:
      return {
        ...state,
        userList: action.payload,
        error: null
      };
    default:
      return state;
  }
};

export default presenceReducer;
