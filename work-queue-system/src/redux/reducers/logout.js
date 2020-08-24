import actionTypes from "../actions/actionTypes";

const defaultState = "";

const logout = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGOUT:
      return (state = action.data);
    default:
      return state;
  }
};

export default logout;
