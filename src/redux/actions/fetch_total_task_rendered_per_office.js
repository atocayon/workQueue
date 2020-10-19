import actionTypes from "./actionTypes";
import axios from "axios";
const fetch_total_task_rendered_per_office = (inspector) => {
  return (dispatch) => {
    return axios
      .get(
        "http://" +
          process.env.REACT_APP_SERVER +
          "/work-queue/admin/office/total/task/" +
          inspector
      )
      .then((res) => {
        let arr = [];
        for (let i = 0; i < res.data.length; i++) {
          arr.push({
            y: res.data[i].task_id.split(",").length,
            label: res.data[i].secshort,
          });
        }
        dispatch({
          type: actionTypes.FETCH_TOTAL_TASK_RENDERED_PER_OFFICE,
          data: arr,
        });
      })
      .catch((err) => {
        throw err;
      });
  };
};

export { fetch_total_task_rendered_per_office };
