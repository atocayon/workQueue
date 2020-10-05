import actionTypes from "../actions/actionTypes";

const fetch_job_requests = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_JOB_REQUESTS:
      return [...action.data];
    default:
      return state;
  }
};

export default fetch_job_requests;
