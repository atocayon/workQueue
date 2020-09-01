import { combineReducers } from "redux";
import current_system_user from "./fetch_current_user_info";
import login from "./login";
import logout from "./logout";
const rootReducer = combineReducers({
  current_system_user: current_system_user,
  login: login,
  logout: logout
});

export default rootReducer;
