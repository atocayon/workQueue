import { combineReducers } from "redux";
import current_system_user from "./fetch_current_user_info";
import login from "./login";
import logout from "./logout";
import job_request_inputChange from "./job_request_inputChange";
import section_list from "./fetch_section_list";
const rootReducer = combineReducers({
  current_system_user: current_system_user,
  login: login,
  logout: logout,
  job_request_inputChange: job_request_inputChange,
  section_list: section_list
});

export default rootReducer;
