import actionTypes from "../actions/actionTypes";

const defaultState = "";

const validateCode = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.VALIDATE_CODE:
      return (state = action.data);
    case actionTypes.CLEAR_MESSAGE:
      return (state = "");
    default:
      return state;
  }
};

export default validateCode;
