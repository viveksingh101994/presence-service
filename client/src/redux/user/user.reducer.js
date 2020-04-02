import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  error: null,
  isFetching: false
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
        isFetching: false
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
      return {
        ...state,
        currentUser: null,
        error: null,
        isFetching: false
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };
    case UserActionTypes.SIGN_OUT_START:
    case UserActionTypes.SIGN_UP_START:
    case UserActionTypes.EMAIL_SIGN_IN_START:
    case UserActionTypes.CHECK_USER_SESSION:
      return {
        ...state,
        isFetching: true
      };
    case UserActionTypes.REINITIALIZE_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export default userReducer;
