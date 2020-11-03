import actionTypes from "./actionTypes";

const fetch_active_users = (socket) => {
  return (dispatch) => {
    socket.emit("active_users");
    socket.on("activeUsers", (data) => {
      dispatch({ type: actionTypes.FETCH_ACTIVE_USERS, data });
    });
  };
};

export { fetch_active_users };
