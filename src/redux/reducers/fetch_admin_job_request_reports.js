import actionTypes from "../actions/actionTypes";

const fetch_admin_job_request_reports = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_ADMIN_JOB_REQUEST_REPORTS:
      return [...action.data];
    default:
      return state;
  }
};

export default fetch_admin_job_request_reports;
