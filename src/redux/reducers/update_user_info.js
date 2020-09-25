import actionTypes from "../actions/actionTypes";

const defaultState = "";

const update_user_info = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_USER_INFO:
      return (state = action.data);
    case actionTypes.CLEAR_MESSAGE:
      return (state = "");
    default:
      return state;
  }
};

export default update_user_info;
