import actionTypes from "./actionTypes";
import axios from "axios";
import server_endpoint from "../../server_endpoint";
const add_new_job_request = (
  requisitioner_id,
  task_secid,
  form_data
) => {
  const { dateNeeded, typeOfWork, scopeOfWork } = form_data;
  return (dispatch) => {
    return axios
      .post("http://" + server_endpoint.IP + "/work-queue/job-request", {
        requisitioner_id,
        task_secid,
        dateNeeded,
        typeOfWork,
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

export { add_new_job_request };
