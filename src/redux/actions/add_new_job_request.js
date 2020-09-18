import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
const add_new_job_request = (requisitioner_id, task_secid, form_data) => {
  const { dateNeeded, typeOfWork, otherTypeOfWork, scopeOfWork } = form_data;
  return (dispatch) => {
    return axios
      .post("http://" + process.env.REACT_APP_SERVER + "/work-queue/new/job-request", {
        requisitioner_id,
        task_secid,
        dateNeeded,
        typeOfWork,
        otherTypeOfWork,
        scopeOfWork,
      })
      .then(async (res) => {
        await dispatch({ type: actionTypes.ADD_JOB_REQUEST, data: "success" });
      })
      .catch((err) => {
        throw err;
      });
  };
};

const remove_add_job_request_messege = () => {
  return (dispatch) => {
    return dispatch({ type: actionTypes.REMOVE_ADD_JOB_REQUEST_MESSAGE });
  };
};

export { add_new_job_request };
export { remove_add_job_request_messege };