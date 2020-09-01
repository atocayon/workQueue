import actionTypes from "./actionTypes";
import axios from "axios";
import server_endpoint from "../../server_endpoint";
const fetch_current_user_info = (user_id) => {
  return (dispatch) => {
    return axios
      .get("http://" + server_endpoint.IP + "/work-queue/user/" + user_id)
      .then((res) => {
        return dispatch({
          type: actionTypes.CURRENT_USER_INFO,
          data: res.data,
        });
      })
      .catch((err) => {
        throw err;
      });
  };
};

export { fetch_current_user_info };
