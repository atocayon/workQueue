import actionTypes from "./actionTypes";

const handleOpen = ({ id, title }) => {
  return (dispatch) => {
    return dispatch({
      type: actionTypes.HANDLE_OPEN_REMARKS_MODAL,
      data: { task_id: id, title },
    });
  };
};

const handleClose = () => {
  return (dispatch) => {
    return dispatch({ type: actionTypes.HANDLE_CLOSE_REMARKS_MODAL });
  };
};

export { handleOpen };
export { handleClose };
