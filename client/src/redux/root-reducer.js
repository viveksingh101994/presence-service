import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import presenceReducer from "./presence/presence.reducer";
import visiterUsersReducer from "./visited-user/visited-user.reducer";

const appReducer = combineReducers({
  user: userReducer,
  userList: presenceReducer,
  visitedUsers: visiterUsersReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
