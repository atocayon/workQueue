import actionTypes from "./actionTypes";
import axios from "axios";
const fetch_web_upload_requests = (user_id) => {
  return async (dispatch) => {
    let arr = [];
    const web_upload_list = await axios.get(
      "http://" +
        process.env.REACT_APP_SERVER +
        "/work-queue/web_upload_list/" +
        user_id
    );

    for (let i = 0; i < web_upload_list.data.length; i++) {
      const _web_upload_destination = await web_upload_destination(
        web_upload_list.data[i].id
      );

      const _web_upload_file = await web_upload_file(
        web_upload_list.data[i].id
      );

      const _web_upload_logs = await web_upload_logs(
        web_upload_list.data[i].id
      );

      arr.push({
        web_upload_list: web_upload_list.data[i],
        web_upload_destination: _web_upload_destination,
        web_upload_file: _web_upload_file,
        web_upload_logs: _web_upload_logs,
      });
    }

    dispatch({
      type: actionTypes.FETCH_WEB_UPLOAD_REQUESTS,
      data: arr,
    });
  };
};

const web_upload_destination = async (id) => {
  let arr = [];
  const destination = await axios.get(
    "http://" +
      process.env.REACT_APP_SERVER +
      "/work-queue/web_upload_destination/" +
      id
  );

  for (let i = 0; i < destination.data.length; i++) {
    arr.push(destination.data[i]);
  }

  return arr;
};

const web_upload_file = async (id) => {
  let arr = [];
  const file = await axios.get(
    "http://" +
      process.env.REACT_APP_SERVER +
      "/work-queue/web_upload_file/" +
      id
  );

  for (let i = 0; i < file.data.length; i++) {
    arr.push(file.data[i]);
  }

  return arr;
};

const web_upload_logs = async (id) => {
  let arr = [];

  const logs = await axios.get(
    "http://" +
      process.env.REACT_APP_SERVER +
      "/work-queue/web_upload_logs/" +
      id
  );

  for (let i = 0; i < logs.data.length; i++) {
    arr.push(logs.data[i]);
  }

  return arr;
};
export { fetch_web_upload_requests };
