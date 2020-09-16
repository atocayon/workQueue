import actionTypes from "../actions/actionTypes";


const web_upload_request = (state = "", action) => {
  switch (action.type) {
    case actionTypes.WEB_UPLOAD_REQEUST:
        return state = action.data;
    default:
      return state;
  }
};

export default web_upload_request;
