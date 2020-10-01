import actionTypes from "../actions/actionTypes";

const defaultState = "";

const changePassword = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.USER_CHANGE_PASSWORD:
      return (state = action.data);
    case actionTypes.CLEAR_MESSAGE:
      return (state = "");
    default:
      return state;
  }
};

export default changePassword;
