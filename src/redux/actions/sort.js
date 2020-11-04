import actionTypes from "./actionTypes";

const sort = (val) => {
  return (dispatch) => {
    return dispatch({ type: actionTypes.SORT, data: val });
  };
};

export { sort };
