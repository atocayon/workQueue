import actionTypes from "../actions/actionTypes";

const defaultState = "";
const add_new_job_request = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.ADD_JOB_REQUEST:
      return (state = action.data);
    default:
      return state;
  }
};

export default add_new_job_request;
