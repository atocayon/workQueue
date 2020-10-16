import actionTypes from "./actionTypes";
import axios from "axios";

const web_upload_request_action = (web_upload_id, status) => {
  return (dispatch) => {
    return axios
      .post(
        "http://" +
          process.env.REACT_APP_SERVER +
          "/work-queue/admin/web/upload/request/action",
        { web_upload_id, status }
      )
      .then((res) => {
        dispatch({
          type: actionTypes.WEB_UPLOAD_REQUEST_ACTION,
          data: res.data,
        });
      })
      .catch((err) => {
        throw err;
      });
  };
};

export { web_upload_request_action };
