import acionTypes from "./actionTypes";
import axios from "axios";
import actionTypes from "./actionTypes";
const fetch_total_task_rendered = (inspector) => {
  return async (dispatch) => {

    let get_year = await axios.get("http://"+process.env.REACT_APP_SERVER+"/work-queue/admin/job/year"+inspector);
    
    // axios
    //   .get(
    //     "http://" +
    //       process.env.REACT_APP_SERVER +
    //       "/work-queue/admin/total/job/:inspector"
    //   )
    //   .then((res) => {
    //     dispatch({ type: actionTypes.FETCH_TOTAL_TASK_RENDERED });
    //   })
    //   .catch((err) => {
    //     throw err;
    //   });
  };
};

export { fetch_total_task_rendered };
