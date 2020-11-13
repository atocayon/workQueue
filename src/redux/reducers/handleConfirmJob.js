import actionTypes from "../actions/actionTypes";

const handleConfirmJob = (state = "", action) => {
  switch (action.type) {
    case actionTypes.HANDLE_CONFIRM_JOB:
      return (state = "success");
    case actionTypes.CLEAR_MESSAGE:
      return (state = "");

    default:
      return state;
  }
};

export default handleConfirmJob;
