import { PresenceActionTypes } from "./presence.types";

const INITIAL_STATE = {
  currentPresentUser: [],
  error: null
};

const presenceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PresenceActionTypes.SET_INITIAL_USER: {
      return {
        ...state,
        currentPresentUser: [action.payload.user]
      };
    }

    case PresenceActionTypes.GET_PRESENT_USERS_START:
      return {
        ...state
      };
    case PresenceActionTypes.GET_PRESENT_USERS_SUCCESS:
      return {
        ...state,
        currentPresentUser: action.payload.user,
        error: null
      };
    default:
      return state;
  }
};

export default presenceReducer;
