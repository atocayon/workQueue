import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
const add_new_job_request = (
  requisitioner_id,
  task_secid,
  { dateNeeded, typeOfWork, otherTypeOfWork, scopeOfWork }
) => {
  return (dispatch) => {
    return axios
      .post(
        `http://${process.env.REACT_APP_SERVER}/work-queue/new/job-request`,
        {
          requisitioner_id,
          task_secid,
          dateNeeded,
          typeOfWork,
          otherTypeOfWork,
          scopeOfWork,
        }
      )
      .then(async (res) => {
        await dispatch({ type: actionTypes.ADD_JOB_REQUEST, data: "success" });
      })
      .catch((err) => {
        throw err;
      });
  };
};

export { add_new_job_request };
