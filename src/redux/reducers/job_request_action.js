import actionTypes from "../actions/actionTypes";

const job_request_action = (state = "", action) => {
  switch (action.type) {
    case actionTypes.JOB_REQUEST_ACTION:
      return (state = action.data);
    case actionTypes.CLEAR_MESSAGE:
      return (state = "");
    default:
      return state;
  }
};

export default job_request_action;
