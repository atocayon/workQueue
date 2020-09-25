import actionTypes from "../actions/actionTypes";

const defaultState = "";

const generateCode = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GENERATE_CODE:
      return (state = action.data);
    default:
      return state;
  }
};

export default generateCode;
