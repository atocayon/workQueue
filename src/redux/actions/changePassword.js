import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
const generate_code = (user_id, email) => {
  return (dispatch) => {
    return axios
      .post(
        `http://${process.env.REACT_APP_SERVER}/work-queue/users/code/generate`,
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

const validateCode = (users_id, code) => {
  return (dispatch) => {
    return axios
      .post(
        `http://${process.env.REACT_APP_SERVER}/work-queue/users/code/validate`,
        { users_id, code }
      )
      .then((res) => {
        dispatch({ type: actionTypes.VALIDATE_CODE, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
};

const changePasswordFunction = (user_id, code, new_password) => {
  return (dispatch) => {
    return axios
      .post(
        `http://${process.env.REACT_APP_SERVER}/work-queue/users/change/password`,
        { user_id, code, new_password }
      )
      .then((res) => {
        dispatch({ type: actionTypes.USER_CHANGE_PASSWORD, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
};

export { generate_code };
export { validateCode };
export { changePasswordFunction };
