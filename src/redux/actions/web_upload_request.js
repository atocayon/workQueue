import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
const web_upload_request = (file, destination, file_name) => {
  console.log(file);

  return (dispatch) => {
    return axios
      .post(
        "http://" + process.env.REACT_APP_SERVER + "/work-queue/web_upload",
        file, { }
      )
      .then((res) => {
        Reactotron.log(res.data);
      })
      .catch((err) => {
        throw err;
      });
  };
};

export { web_upload_request };
