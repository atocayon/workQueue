import actionTypes from "../actions/actionTypes";

const fetch_total_task_rendered_per_office = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_TOTAL_TASK_RENDERED_PER_OFFICE:
      return [...action.data];
    default:
      return state;
  }
};

export default fetch_total_task_rendered_per_office;
