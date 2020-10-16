import actionTypes from "../actions/actionTypes";

const web_upload_request_action = (state = "", action) => {
  switch (action.type) {
    case actionTypes.WEB_UPLOAD_REQUEST_ACTION:
      return (state = action.data);
    case actionTypes.CLEAR_MESSAGE:
      return (state = "");
    default:
      return state;
  }
};

export default web_upload_request_action;
