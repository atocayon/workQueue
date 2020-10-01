import { combineReducers } from "redux";
import current_system_user from "./fetch_current_user_info";
import login from "./login";
import logout from "./logout";
import job_request_inputChange from "./job_request_inputChange";
import section_list from "./fetch_section_list";
import add_new_job_request from "./add_new_job_request";
import fetch_user_job_request from "./fetch_user_job_request";
import web_upload_request from "./web_upload_request";
import fetch_web_upload_requests from "./fetch_web_upload_requests";
import update_user_info from "./update_user_info";
import generateCode from "./generateCode";
import changePassword from "./changePassword";
import validateCode from "./validateCode";
const rootReducer = combineReducers({
  current_system_user: current_system_user,
  login: login,
  logout: logout,
  job_request_inputChange: job_request_inputChange,
  section_list: section_list,
  add_new_job_request: add_new_job_request,
  fetch_user_job_request: fetch_user_job_request,
  web_upload_request: web_upload_request,
  fetch_web_upload_requests: fetch_web_upload_requests,
  update_user_info: update_user_info,
  generateCode: generateCode,
  changePassword: changePassword,
  validateCode: validateCode
});

export default rootReducer;
