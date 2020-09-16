import actionTypes from "../actions/actionTypes";

const defaultState = [];

const fetch_section_list = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SECTION_LIST:
      return [...action.data];
    default:
      return state;
  }
};

export default fetch_section_list;
