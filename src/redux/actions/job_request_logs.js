import axios from "axios";
const job_request_logs = async (task_id) => {
  const logs = await axios.get(
    `http://${process.env.REACT_APP_SERVER}/work-queue/job/request/logs/
      ${task_id}`
  );

  return logs.data;
};

export default job_request_logs;
