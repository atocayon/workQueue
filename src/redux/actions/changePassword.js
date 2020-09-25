import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
const generate_code = (user_id, email) => {
  return (dispatch) => {
    return axios
      .post(
        "http://" +
          process.env.REACT_APP_SERVER +
          "/work-queue/users/code/generate",
        { user_id, email }
      )
      .then((res) => {
        dispatch({ type: actionTypes.GENERATE_CODE, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
};



export { generate_code };
