import actionTypes from "./actionTypes";

const handle_job_done_specification = (val) => {
  return (dispatch) => {
    return dispatch({
      type: actionTypes.HANDLE_JOB_DONE_SPECIFICATION,
      data: val,
    });
  };
};

export { handle_job_done_specification };
