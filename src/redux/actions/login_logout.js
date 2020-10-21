import actionTypes from "./actionTypes";
import axios from "axios";
import { setInStorage } from "../../local_storage";
import Reactotron from "reactotron-react-js";

export function login({ usernameOrEmail, password }) {
  return function (dispatch) {
    return axios
      .post(`http://${process.env.REACT_APP_SERVER}/work-queue/login`, {
        usernameOrEmail,
        password,
      })
      .then(async (res) => {
        await dispatch({ type: actionTypes.USER_LOGIN, data: res.data });
        setInStorage("work-queue", {
          token: res.data.id,
          role: res.data.role.work_queue,
        });
      })
      .catch((err) => {
        throw err;
      });
  };
}

export function logout(user_id) {
  return function (dispatch) {
    return axios
      .post(`http://${process.env.REACT_APP_SERVER}/work-queue/logout`, {
        user_id,
      })
      .then(async (res) => {
        await dispatch({ type: actionTypes.USER_LOGOUT, data: "success" });
        localStorage.clear();
      })
      .catch((err) => {
        throw err;
      });
  };
}
