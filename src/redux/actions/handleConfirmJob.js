import actionTypes from "./actionTypes";
import axios from "axios";
const handleConfirmJob = ({ task_id, status, remarks }) => {
  return (dispatch) => {
    return axios
      .post(
        `http://${process.env.REACT_APP_SERVER}/work-queue/admin/job/request/confirmation`,
        { task_id, status, remarks }
      )
      .then((res) => {
          dispatch({type: actionTypes.HANDLE_CONFIRM_JOB});
      })
      .catch((err) => {
        throw err;
      });
  };
};

export { handleConfirmJob };
