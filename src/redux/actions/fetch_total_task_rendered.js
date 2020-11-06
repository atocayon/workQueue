import axios from "axios";
import actionTypes from "./actionTypes";
import Reactotron from "reactotron-react-js";
const fetch_total_task_rendered = (inspector) => {
  return async (dispatch) => {
    let arr = [];
    let get_year = await axios.get(
      `http://${process.env.REACT_APP_SERVER}/work-queue/admin/task/year/${inspector}`
    );

    for (let i = 0; i < get_year.data.length; i++) {
      arr.push({
        type: "spline",
        name: get_year.data[i].task_year,
        showInLegend: true,
        dataPoints: await get_month(get_year.data[i].task_year),
      });
    }
   
    return dispatch({
      type: actionTypes.FETCH_TOTAL_TASK_RENDERED,
      data: [...arr],
    });
  };
};

const get_month = async (data) => {
  let arr = [];
  let get_month = await axios.get(
    `http://${process.env.REACT_APP_SERVER}/work-queue/admin/task/month/${data}`
  );
  for (let i = 0; i < get_month.data.length; i++) {
    arr.push({
      y: await number_of_task(get_month.data[i].month_in_task_year),
      label: get_month.data[i].month_in_task_year,
    });
  }

  return arr;
};

const number_of_task = async (data) => {
  let total_task = await axios.get(
    `http://${process.env.REACT_APP_SERVER}/work-queue/admin/task/month/total/${data}`
  );

  return total_task.data.length;
};

export { fetch_total_task_rendered };
