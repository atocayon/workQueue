import actionTypes from "./actionTypes";
import Reactotron from "reactotron-react-js";

const inputChange = ({ target }) => {
  return (dispatch) => {
    return dispatch({
      type: actionTypes.INPUT_CHANGE,
      data: {
        name: target.name,
        type: target.type,
        value: target.value,
        checked: target.type === "checkbox" && target.checked,
      },
    });
  };
};

export { inputChange };
