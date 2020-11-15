import actionTypes from "./actionTypes";

const handlePrint = () => {
  return (dispatch) => {
    return dispatch({ type: actionTypes.PRINT });
  };
};

export { handlePrint };
