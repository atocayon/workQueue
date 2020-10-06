import actionTypes from "./actionTypes";
import axios from "axios";
const fetch_admin_job = (user_id) => {
  return (dispatch) => {
    return axios
      .get(
        "http://" +
          process.env.REACT_APP_SERVER +
          "/work-queue/admin/job/list/" +
          user_id
      )
      .then(async (res) => {
        let arr = [];
        for (let i = 0; i < res.data.length; i++) {
          arr.push({
            job: res.data[i],
            logs: await job_request_logs(res.data[i].task_id),
          });
        }
        dispatch({ type: actionTypes.FETCH_ADMIN_JOB, data: arr });
      })
      .catch((err) => {
        throw err;
      });
  };
};

const job_request_logs = async (task_id) => {
  const logs = await axios.get(
    "http://" +
      process.env.REACT_APP_SERVER +
      "/work-queue/job/request/logs/" +
      task_id
  );

  return logs.data;
};

export { fetch_admin_job };
