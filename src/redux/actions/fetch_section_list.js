import actionTypes from "./actionTypes";
import axios from "axios";
const fetch_section_list = () => {
  return (dispatch) => {
    return axios
      .get(`http://${process.env.REACT_APP_SERVER}/work-queue/sections`)
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
