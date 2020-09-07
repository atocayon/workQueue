import actionTypes from "./actionTypes";
import axios from "axios";
import server_endpoint from "../../server_endpoint";
const fetch_user_job_request = (user_id) => {
  return (dispatch) => {
    return axios
      .get(
        "http://" +
          server_endpoint.IP +
          "/work-queue/client/job-requests/" +
          user_id
      )
      .then( async (res) => {
        await dispatch({type: actionTypes.FETCH_USER_JOB_REQUEST, data: res.data});
      })
      .catch((err) => {
        throw err;
      });
  };
};

export { fetch_user_job_request };
