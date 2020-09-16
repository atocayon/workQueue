import actionTypes from "../actions/actionTypes";
const defaultState = [];
const fetch_user_job_request = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_JOB_REQUEST:
      return [...action.data];

    default:
      return state;
  }
};

export default fetch_user_job_request;
