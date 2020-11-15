import actionTypes from "./actionTypes";
import axios from "axios";
const handle_submit_job_done = ({
  task_id,
  item_no,
  serial_no,
  brand,
  memory_capacity,
  item_model,
  color,
  measurement,
  location,
  system_interface,
  functional_capabilities,
  data_structure,
  reliability,
  security,
  quality,
  contraints,
  findings,
  recommendations,
  specific_job,
}) => {
  return (dispatch) => {
    return axios
      .post(
        `http://${process.env.REACT_APP_SERVER}/work-queue/admin/job/request/done/action`,
        {
          task_id,
          item_no,
          serial_no,
          brand,
          memory_capacity,
          item_model,
          color,
          measurement,
          location,
          system_interface,
          functional_capabilities,
          data_structure,
          reliability,
          security,
          quality,
          contraints,
          findings,
          recommendations,
          specific_job,
        }
      )
      .then((res) => {
        dispatch({ type: actionTypes.HANDLE_SUBMIT_JOB_DONE });
      })
      .catch((err) => {
        throw err;
      });
  };
};

export { handle_submit_job_done };
