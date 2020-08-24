import actionTypes from "../actions/actionTypes";

const defaultState = {};

const login = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN:
      return {...action.data};
    default:
      return state;
  }
};

export default login;
