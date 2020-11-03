import actionTypes from "../actions/actionTypes";

const defaultState = {
  open: false,
  start: "",
  end: "",
};

const job_reports_filter = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.INPUT_CHANGE:
      return Object.assign({}, state, {
        [action.data.name]: action.data.value,
      });

    case actionTypes.HANDLE_JOB_REPORTS_FILTER_MODAL:
      return Object.assign({}, state, {
        open: !state.open,
      });

    default:
      return state;
  }
};

export default job_reports_filter;
