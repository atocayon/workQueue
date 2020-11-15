import actionTypes from "../actions/actionTypes";

const print = (state = false, action) => {
  switch (action.type) {
    case actionTypes.PRINT:
      return (state = !state);
    default:
      return state;
  }
};

export default print;
