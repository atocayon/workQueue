import actionTypes from "../actions/actionTypes";

const fetch_admin_web_upload_list = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_ADMIN_WEB_UPLOAD_LIST:
      return [...action.data];

    case actionTypes.SORT:
      if (action.data === "asc") {
        return [...state].sort((a, b) => {
          return (
            a.web_upload_list.requisitioner - b.web_upload_list.requisitioner
          );
        });
      } else {
        return [...state].sort((a, b) => {
          return (
            b.web_upload_list.requisitioner - a.web_upload_list.requisitioner
          );
        });
      }

    case actionTypes.SEARCH:
      return [...state].filter((item) => {
        if (
          item.web_upload_list.requisitioner.charAt(0).toLowerCase() ===
            action.data.charAt(0).toLowerCase() ||
          item.web_upload_list.upload_title.charAt(0).toLowerCase() ===
            action.data.charAt(0).toLowerCase() ||
          item.web_upload_list.requisitioner
            .charAt(item.web_upload_list.requisitioner.length - 1)
            .toLowerCase() ===
            action.data.charAt(action.data.length - 1).toLowerCase() ||
          item.web_upload_list.upload_title
            .charAt(item.web_upload_list.upload_title.length - 1)
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

export default fetch_admin_web_upload_list;
