import actionTypes from "../actions/actionTypes";

const sort = (state = "asc", action) => {
  switch (action.type) {
    case actionTypes.SORT:
      return (state = action.data);
    default:
      return state;
  }
};

export default sort;
