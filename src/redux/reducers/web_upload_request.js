import actionTypes from "../actions/actionTypes";

const web_upload_request = (state = "", action) => {
  switch (action.type) {
    case actionTypes.WEB_UPLOAD_REQUEST:
      return (state = "success");
    case actionTypes.CLEAR_MESSAGE:
      return (state = "");
    default:
      return state;
  }
};

export default web_upload_request;
