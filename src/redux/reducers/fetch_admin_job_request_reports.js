import actionTypes from "../actions/actionTypes";

const fetch_admin_job_request_reports = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_ADMIN_JOB_REQUEST_REPORTS:
      return [...action.data];

    case actionTypes.SORT:
      if (action.data === "asc") {
        return [...state].sort((a, b) => {
          return a.data.task_id - b.data.task_id;
        });
      } else {
        return [...state].sort((a, b) => {
          return b.data.task_id - a.data.task_id;
        });
      }

    case actionTypes.SEARCH:
      return [...state].filter((item) => {
        if (
          item.data.task_id.charAt(0) === action.data.charAt(0) ||
          item.data.requisitioner.charAt(item.data.requisitioner.length - 1) ===
            action.data.charAt(action.data.length - 1)
        ) {
          return item;
        }
      });
    default:
      return state;
  }
};

export default fetch_admin_job_request_reports;
