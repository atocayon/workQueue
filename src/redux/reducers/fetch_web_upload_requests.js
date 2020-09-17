import actionTypes from "../actions/actionTypes";

const defaultState = [];

const fetch_web_upload_requests = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_WEB_UPLOAD_REQUESTS:
      return [...action.data];
    default:
      return state;
  }
};

export default fetch_web_upload_requests;
