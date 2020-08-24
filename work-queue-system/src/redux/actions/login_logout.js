import actionTypes from "./actionTypes";
import axios from "axios";
import server_endpoint from "../../server_endpoint";
import { setInStorage } from "../../local_storage";
import Reactotron from "reactotron-react-js";

export function login(data) {
  const { usernameOrEmail, password } = data;
  return function (dispatch) {
    return axios
      .post("http://" + server_endpoint.IP + "/work-queue/login", {
        usernameOrEmail,
        password,
      })
      .then(async (res) => {
        await dispatch({ type: actionTypes.USER_LOGIN, data: res.data });
        setInStorage("work-queue", { token: res.data.id });
      })
      .catch((err) => {
        throw err;
      });
  };
}

export function logout(user_id) {
  return function (dispatch) {
    return axios
      .post("http://" + server_endpoint.IP + "/work-queue/logout", { user_id })
      .then(async (res) => {
        await dispatch({ type: actionTypes.USER_LOGOUT, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
}