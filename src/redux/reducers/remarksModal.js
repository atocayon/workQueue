import actionTypes from "../actions/actionTypes";

const remarksModal = (
  state = {
    open: false,
    title: "",
    task_id: "",
    remarks: "",
    update: "",
  },
  action
) => {
  switch (action.type) {
    case actionTypes.HANDLE_OPEN_REMARKS_MODAL:
      return Object.assign({}, state, {
        title: action.data.title,
        task_id: action.data.task_id,
        open: !state.open,
      });

    case actionTypes.HANDLE_CLOSE_REMARKS_MODAL:
      return Object.assign({}, state, {
        open: false,
        title: "",
        task_id: "",
        remarks: "",
        update: "",
      });

    case actionTypes.INPUT_CHANGE:
      return Object.assign({}, state, {
        [action.data.name]: action.data.value,
      });

    case actionTypes.CLEAR_MESSAGE:
      return Object.assign({}, state, {
        open: false,
        title: "",
        task_id: "",
        remarks: "",
        update: "",
      });

    default:
      return state;
  }
};

export default remarksModal;
