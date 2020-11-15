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
import fetch_job_requests from "./fetch_job_requests";
import job_request_action from "./job_request_action";
import fetch_admin_job from "./fetch_admin_job";
import fetch_admin_job_request_reports from "./fetch_admin_job_request_reports";
import fetch_admin_web_upload_list from "./fetch_admin_web_upload_list";
import fetch_admin_web_upload_request from "./fetch_admin_web_upload_request";
import web_upload_request_action from "./web_upload_request_action";
import fetch_total_task_rendered_per_office from "./fetch_total_task_rendered_per_office";
import job_reports_filter from "./job_reports_filter";
import fetch_active_users from "./fetch_active_users";
import sort from "./sort";
import fetch_total_task_rendered from "./fetch_total_task_rendered";
import handleConfirmJob from "./handleConfirmJob";
import print from "./print";
import remarksModal from "./remarksModal";
import jobDoneModal from "./jobDoneModal";
const rootReducer = combineReducers({
  current_system_user,
  login,
  logout,
  job_request_inputChange,
  section_list,
  add_new_job_request,
  fetch_user_job_request,
  web_upload_request,
  fetch_web_upload_requests,
  update_user_info,
  generateCode,
  changePassword,
  validateCode,
  fetch_job_requests,
  job_request_action,
  fetch_admin_job,
  fetch_admin_job_request_reports,
  fetch_admin_web_upload_list,
  fetch_admin_web_upload_request,
  web_upload_request_action,
  fetch_total_task_rendered_per_office,
  fetch_total_task_rendered,
  job_reports_filter,
  fetch_active_users,
  sort,
  handleConfirmJob,
  print,
  remarksModal,
  jobDoneModal,
});

export default rootReducer;
