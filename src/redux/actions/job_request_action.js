import actionTypes from "./actionTypes";
import axios from "axios";
const job_request_action = (inspector_id, task_id, status, remarks) => {
  return (dispatch) => {
    return axios
      .post(
        `http://
          ${process.env.REACT_APP_SERVER}
          /work-queue/admin/job/request/action`,

        { inspector_id, task_id, status, remarks }
      )
      .then((res) => {
        dispatch({ type: actionTypes.JOB_REQUEST_ACTION, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
};

export { job_request_action };
