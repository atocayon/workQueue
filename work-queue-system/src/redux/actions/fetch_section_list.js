import actionTypes from "./actionTypes";
import axios from "axios";
import server_endpoint from "../../server_endpoint";
const fetch_section_list = () => {
  return (dispatch) => {
    return axios
      .get("http://" + server_endpoint.IP + "/work-queue/sections")
      .then(async (res) => {
        await dispatch({
          type: actionTypes.FETCH_SECTION_LIST,
          data: res.data,
        });
      })
      .catch((err) => {
        throw err;
      });
  };
};

export { fetch_section_list };
