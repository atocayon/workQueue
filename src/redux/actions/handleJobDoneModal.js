import actionTypes from "../actions/actionTypes";

const handleOpenJobDoneModal = ({ task_id }) => {
  return (dispatch) => {
    return dispatch({
      type: actionTypes.HANDLE_OPEN_JOB_DONE_MODAL,
      data: { task_id },
    });
  };
};

const handleCloseJobDoneModal = () => {
  return (dispatch) => {
    return dispatch({ type: actionTypes.HANDLE_CLOSE_JOB_DONE_MODAL });
  };
};

export { handleOpenJobDoneModal };
export { handleCloseJobDoneModal };
