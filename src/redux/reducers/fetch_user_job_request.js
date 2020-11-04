import actionTypes from "../actions/actionTypes";
const defaultState = [];
const fetch_user_job_request = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_JOB_REQUEST:
      return [...action.data];

    case actionTypes.FILTER_JOB_REQUEST_REPORTS:
      const filter_start = new Date(action.data.start);
      const filter_end = new Date(action.data.end);
      return state.filter((item) => {
        let start = new Date(item.item.start);
        let end = new Date(item.item.end);

        return (
          filter_start.toISOString() >= start.toISOString() &&
          filter_end.toISOString() <= end.toISOString()
        );
      });

    case actionTypes.SORT:
      if (action.data === "asc") {
        return state.sort((a, b) => {
          return a.item.inspector - b.item.inspector;
        });
      } else {
        return state.sort((a, b) => {
          return b.item.inspector - a.item.inspector;
        });
      }

    default:
      return state;
  }
};

export default fetch_user_job_request;
