import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
const web_upload_request = (data) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: "http://" + process.env.REACT_APP_SERVER + "/work-queue/web_upload",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        dispatch({ type: actionTypes.WEB_UPLOAD_REQUEST, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
};

export { web_upload_request };
