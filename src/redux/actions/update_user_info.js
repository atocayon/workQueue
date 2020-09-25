import actionTypes from "./actionTypes";
import axios from "axios";

const update_user_info = (data) => {
  return (dispatch) => {
    return axios
      .post(
        "http://" + process.env.REACT_APP_SERVER + "/work-queue/user/update",
        { data }
      )
      .then((res) => {
        dispatch({ type: actionTypes.UPDATE_USER_INFO, data: "success" });
      })
      .catch((err) => {
        throw err;
      });
  };
};



export { update_user_info };
