import actionTypes from "../actions/actionTypes";

const defaultState = [];

const fetch_web_upload_requests = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_WEB_UPLOAD_REQUESTS:
      return [...action.data];

    case actionTypes.SORT:
      if (action.data === "asc") {
        return [...state].sort((a, b) => {
          return (
            a.web_upload_list.upload_title - b.web_upload_list.upload_title
          );
        });
      } else {
        return [...state].sort((a, b) => {
          return (
            b.web_upload_list.upload_title - a.web_upload_list.upload_title
          );
        });
      }

    case actionTypes.SEARCH:
      return [...state]
        .filter((item) => item.web_upload_list.validator !== null)
        .filter((item) => {
          if (
            item.web_upload_list.upload_title.charAt(0).toLowerCase() ===
              action.data.charAt(0).toLowerCase() ||
            item.web_upload_list.validator.charAt(0).toLowerCase() ===
              action.data.charAt(0).toLowerCase() ||
            item.web_upload_list.upload_title
              .charAt(item.web_upload_list.upload_title.length - 1)
              .toLowerCase() ===
              action.data.charAt(action.data.length - 1).toLowerCase() ||
            item.web_upload_list.validator
              .charAt(item.web_upload_list.validator.length - 1)
              .toLowerCase() ===
              action.data.charAt(action.data.length - 1).toLowerCase()
          ) {
            return item;
          }
        });

    default:
      return state;
  }
};

export default fetch_web_upload_requests;
