import actionTypes from "../actions/actionTypes";

const fetch_admin_job = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_ADMIN_JOB:
      return [...action.data];
    default:
      return state;
  }
};

export default fetch_admin_job;
