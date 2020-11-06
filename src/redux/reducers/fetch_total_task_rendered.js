import actionTypes from "../actions/actionTypes";

const fetch_total_task_rendered = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_TOTAL_TASK_RENDERED:
      return [...action.data];
    default:
      return state;
  }
};

export default fetch_total_task_rendered;
