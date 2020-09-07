import actionTypes from "../actions/actionTypes";
import Reactotron from "reactotron-react-js";

const defaultState = {
  dateNeeded: "",
  typeOfWork: [],
  otherTypeOfWork: "",
  scopeOfWork: "",
  "Check-up/Repair": false,
  Installation: false,
  "Information System": false,
  Fabrication: false,
  Others: false,
};

const job_request_inputChange = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.JOB_REQUEST_INPUT_CHANGE:
      if (action.data.type !== "checkbox") {
        return Object.assign({}, state, {
          [action.data.name]: action.data.value,
        });
      } else {
        if (action.data.checked) {
          return Object.assign({}, state, {
            typeOfWork: [...state.typeOfWork, action.data.name],
            [action.data.name]: !state[action.data.name],
          });
        } else {
          let arr = [...state.typeOfWork];
          let remove = arr
            .map((item) => {
              return item.value;
            })
            .indexOf(action.data.value);
          arr.splice(remove, 1);
          return Object.assign({}, state, {
            typeOfWork: arr,
            [action.data.name]: !state[action.data.name],
          });
        }
      }

    case actionTypes.REMOVE_ADD_JOB_REQUEST_MESSAGE:
      return Object.assign({}, state, {
        dateNeeded: "",
        typeOfWork: [],
        otherTypeOfWork: "",
        scopeOfWork: "",
        "Check-up/Repair": false,
        Installation: false,
        "Information System": false,
        Fabrication: false,
        Others: false,
      });
    default:
      return state;
  }
};

export default job_request_inputChange;
