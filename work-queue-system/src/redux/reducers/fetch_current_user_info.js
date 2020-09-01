import actionTypes from "../actions/actionTypes";

const defaultState = {};

const fetch_current_user_info = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CURRENT_USER_INFO:
      return { ...state, ...action.data };
      case actionTypes.USER_LOGOUT:
          return {};
    default:
      return state;
  }
};

export default fetch_current_user_info;
