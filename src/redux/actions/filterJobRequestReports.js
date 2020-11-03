import actionTypes from "./actionTypes";

const filterJobRequestReports = ({ ...data }) => {
  return (dispatch) => {
    return dispatch({
      type: actionTypes.FILTER_JOB_REQUEST_REPORTS,
      data: { ...data },
    });
  };
};

export { filterJobRequestReports };
