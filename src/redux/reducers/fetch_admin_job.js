import actionTypes from "../actions/actionTypes";

const fetch_admin_job = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_ADMIN_JOB:
      return [...action.data];

    case actionTypes.SORT:
      if (action.data === "asc") {
        return [...state].sort((a, b) => {
          return a.job.task_id - b.job.task_id;
        });
      } else {
        return [...state].sort((a, b) => {
          return b.job.task_id - a.job.task_id;
        });
      }

    case actionTypes.SEARCH:
      return [...state].filter((item) => {
        if (
          item.job.task_id.charAt(0) === action.data.charAt(0) ||
          item.job.task_id.charAt(item.job.task_id.length - 1) ===
            action.data.charAt(action.data.length - 1)
        ) {
          return item;
        }
      });
    default:
      return state;
  }
};

export default fetch_admin_job;
