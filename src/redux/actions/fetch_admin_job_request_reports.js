import actionTypes from "./actionTypes";
import axios from "axios";
import job_request_logs from "./job_request_logs";
const fetch_admin_job_request_reports = (user_id) => {
  return (dispatch) => {
    return axios
      .get(
        `http://
          ${process.env.REACT_APP_SERVER}
          /work-queue/admin/job/request/reports/${user_id}`
      )
      .then(async (res) => {
        let arr = [];
        for (let i = 0; i < res.data.length; i++) {
          arr.push({
            data: res.data[i],
            logs: await job_request_logs(res.data[i].task_id),
          });
        }

        dispatch({
          type: actionTypes.FETCH_ADMIN_JOB_REQUEST_REPORTS,
          data: arr,
        });
      })
      .catch((err) => {
        throw err;
      });
  };
};

export { fetch_admin_job_request_reports };
