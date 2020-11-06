import actionTypes from "../actions/actionTypes";

const fetch_job_requests = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_JOB_REQUESTS:
      return [...action.data];

    case actionTypes.SORT:
      if (action.data === "asc") {
        return [...state].sort((a, b) => {
          return a.ticket - b.ticket;
        });
      } else {
        return [...state].sort((a, b) => {
          return b.ticket - a.ticket;
        });
      }

    case actionTypes.SEARCH:
      return [...state].filter((item) => {
        if (
          item.ticket.charAt(0) === action.data.charAt(0) ||
          item.requisitioner.charAt(item.requisitioner.length - 1) ===
            action.data.charAt(action.data.length - 1)
        ) {
          return item;
        }
      });
    default:
      return state;
  }
};

export default fetch_job_requests;
