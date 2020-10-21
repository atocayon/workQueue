import actionTypes from "./actionTypes";
import axios from "axios";
const fetch_job_requests = (user_id) => {
  return async (dispatch) => {
    return axios
      .get(
        `http://
          ${process.env.REACT_APP_SERVER} 
          /work-queue/admin/job/requests/${user_id}`
      )
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_JOB_REQUESTS, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
};

export { fetch_job_requests };
