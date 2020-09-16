import actionTypes from "./actionTypes";
import Reactotron from "reactotron-react-js";

const job_request_inputChange = ({ target }) => {
  return (dispatch) => {
    return dispatch({
      type: actionTypes.JOB_REQUEST_INPUT_CHANGE,
      data: {
        name: target.name,
        type: target.type,
        value: target.value,
        checked: target.type === "checkbox" && target.checked,
      },
    });
  };
};

export { job_request_inputChange };
