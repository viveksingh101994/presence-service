import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import presenceReducer from "./presence/presence.reducer";
export default combineReducers({
  user: userReducer,
  userList: presenceReducer
});
