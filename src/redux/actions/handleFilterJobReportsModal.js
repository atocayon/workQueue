import actionTypes from "./actionTypes";

const handleFilterJobReportsModal = () => {
  return (dispatch) => {
    return dispatch({ type: actionTypes.HANDLE_JOB_REPORTS_FILTER_MODAL });
  };
};

export { handleFilterJobReportsModal };
