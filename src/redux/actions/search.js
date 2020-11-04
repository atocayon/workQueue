import actionTypes from "./actionTypes";

const search = ({ target }) => {
  return (dispatch) => {
    if (target.value !== "") {
      return dispatch({ type: actionTypes.SEARCH, data: target.value });
    } else {
      window.location.reload();
    }
  };
};

export { search };
