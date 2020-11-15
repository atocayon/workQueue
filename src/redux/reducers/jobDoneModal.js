import actionTypes from "../actions/actionTypes";

const jobDoneModal = (
  state = {
    open: false,
    task_id: "",
    item_no: "",
    serial_no: "",
    brand: "",
    memory_capacity: "",
    item_model: "",
    color: "",
    measurement: "",
    location: "",
    system_interface: "",
    func_capabilities: "",
    data_structure: "",
    reliability: "",
    security: "",
    quality: "",
    contraints: "",
    findings: "",
    recommendations: "",
    specific_job: "",
    message: "",
  },
  action
) => {
  switch (action.type) {
    case actionTypes.HANDLE_OPEN_JOB_DONE_MODAL:
      return Object.assign({}, state, {
        open: !state.open,
        task_id: action.data.task_id,
      });

    case actionTypes.HANDLE_CLOSE_JOB_DONE_MODAL:
      return Object.assign({}, state, {
        open: false,
        task_id: "",
        item_no: "",
        serial_no: "",
        brand: "",
        memory_capacity: "",
        item_model: "",
        color: "",
        measurement: "",
        location: "",
        system_interface: "",
        func_capabilities: "",
        data_structure: "",
        reliability: "",
        security: "",
        quality: "",
        contraints: "",

        findings: "",
        recommendations: "",
        specific_job: "",
        message: "",
      });

    case actionTypes.HANDLE_JOB_DONE_SPECIFICATION:
      return Object.assign({}, state, {
        specific_job: action.data,
      });

    case actionTypes.INPUT_CHANGE:
      return Object.assign({}, state, {
        [action.data.name]: action.data.value,
      });

    case actionTypes.HANDLE_SUBMIT_JOB_DONE:
      return Object.assign({}, state, { message: "success" });

    case actionTypes.CLEAR_MESSAGE:
      return Object.assign({}, state, {
        open: false,
        task_id: "",
        item_no: "",
        serial_no: "",
        brand: "",
        memory_capacity: "",
        item_model: "",
        color: "",
        measurement: "",
        location: "",
        system_interface: "",
        func_capabilities: "",
        data_structure: "",
        reliability: "",
        security: "",
        quality: "",
        contraints: "",
        findings: "",
        recommendations: "",
        specific_job: "",
        message: "",
      });

    default:
      return state;
  }
};

export default jobDoneModal;
