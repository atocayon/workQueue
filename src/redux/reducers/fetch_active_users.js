import actionTypes from "../actions/actionTypes";

const fetch_active_users = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_ACTIVE_USERS:
      return [...action.data];

    default:
      return state;
  }
};

export default fetch_active_users;
