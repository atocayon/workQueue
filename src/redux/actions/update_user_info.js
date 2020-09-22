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

const clear_update_message = () => {
    return (dispatch) => {
        return dispatch({type: actionTypes.CLEAR_UPDATE_USER_MESSAGE});
    }
}

export { update_user_info };
export {clear_update_message};
