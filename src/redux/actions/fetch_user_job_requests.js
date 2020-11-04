import actionTypes from "./actionTypes";
import axios from "axios";
import job_request_logs from "./job_request_logs";
const fetch_user_job_request = (user_id) => {
  return (dispatch) => {
    return axios
      .get(
        `http://${process.env.REACT_APP_SERVER}/work-queue/client/job-requests/${user_id}`
      )
      .then(async (res) => {
        let arr = [];
        var item;
        for (item of res.data) {
          arr.push({ item, logs: await job_request_logs(item.task_id) });
        }

        await dispatch({
          type: actionTypes.FETCH_USER_JOB_REQUEST,
          data: arr,
        });
        
      })
      .catch((err) => {
        throw err;
      });
  };
};

export { fetch_user_job_request };
