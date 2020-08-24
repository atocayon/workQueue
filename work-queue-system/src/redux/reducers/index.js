import { combineReducers } from "redux";
import login from "./login";
import logout from "./logout";
const rootReducer = combineReducers({
  login: login,
  logout: logout
});

export default rootReducer;
