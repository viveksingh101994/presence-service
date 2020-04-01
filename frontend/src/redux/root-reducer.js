import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import presenceReducer from "./presence/presence.reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import visiterUsersReducer from "./visited-user/visited-user.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [""]
};

const appReducer = combineReducers({
  user: userReducer,
  userList: presenceReducer,
  visitedUsers: visiterUsersReducer
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === "USER_LOGGED_OUT") {
    storage.removeItem("persist:root");
    state = undefined;
  }

  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
