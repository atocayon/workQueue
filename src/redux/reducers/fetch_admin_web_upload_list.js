import actionTypes from "../actions/actionTypes";

const fetch_admin_web_upload_list = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_ADMIN_WEB_UPLOAD_LIST:
      return [...action.data];
    default:
      return state;
  }
};

export default fetch_admin_web_upload_list;
