import actionTypes from "./actionTypes";
import axios from "axios";
import server_endpoint from "../../server_endpoint";
export function login(data){
  const {usernameOrEmail, password} = data;
  return function(dispatch){
    return axios.post("http://"+server_endpoint.IP+"/login", {usernameOrEmail, password}).then( async (res) => {
      await dispatch({type: actionTypes.USER_LOGIN, data: res.data});
    });
  }
}

export function logout(user_id){
  return function(dispatch){
    return axios.post("http://"+server_endpoint.IP+"/logout", {user_id}).then( async (res) => {
      await dispatch({type: actionTypes.USER_LOGOUT, data: res.data});
    });
  }
}