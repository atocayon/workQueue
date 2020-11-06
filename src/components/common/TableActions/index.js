// @flow
import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import SortIcon from "@material-ui/icons/Sort";
import ExtensionOutlinedIcon from "@material-ui/icons/ExtensionOutlined";
import SaveAlt from "@material-ui/icons/SaveAlt";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const ExcelClient = ({ csvData, fileName }) => {
  let arr = [];
  let val;
  for (val of csvData) {
    arr.push({
      "Task ID": val.item.task_id,
      Inspector: val.item.inspector,
      "Scope of Work": val.item.scope_of_work,
      Deadline: val.item.date_needed,
      "Task Start": val.item.task_start,
      "Task End": val.item.task_end,
      "Date Requested": val.item.date_requested,
    });
  }
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button
      onClick={(e) => exportToCSV(arr, fileName)}
      title={"Download data"}
      className={"btn btn-sm"}
      // onClick={props.handleFilterJobReportsModal}
    >
      <SaveAlt />
      &nbsp;Reports
    </button>
  );
};

const ExcelAdmin = ({ csvData, fileName }) => {
  let arr = [];
  let val;
  for (val of csvData) {
    arr.push({
      "Task ID": val.data.task_id,
      Requisitioner: val.data.requisitioner,
      "Scope of Work": val.data.scope_of_work,
      Deadline: val.data.deadline,
      "Task Start": val.data.date_start,
      "Task End": val.data.date_end,
      "Date Requested": val.data.dateRequested,
    });
  }
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button
      onClick={(e) => exportToCSV(arr, fileName)}
      title={"Download data"}
      className={"btn btn-sm"}
      // onClick={props.handleFilterJobReportsModal}
    >
      <SaveAlt />
      &nbsp;Reports
    </button>
  );
};

export default function index(props) {
  return (
    <div className={"row"}>
      <div className={"col-md-6"}>
        <button
          className={"btn"}
          onClick={props.sort.bind(null, props._sort === "asc" ? "dsc" : "asc")}
        >
          <SortIcon />{" "}
          {props._sort === "asc" ? "Sort Descending" : "Sort Ascending"}
        </button>
        &nbsp;
        {props.filter && (
          <button
            title={"Filter data"}
            className={"btn btn-sm"}
            onClick={props.handleFilterJobReportsModal}
          >
            <ExtensionOutlinedIcon />
            &nbsp;Filter
          </button>
        )}
        &nbsp;
        {props.data && (
          <>
            {props.fromAdmin ? (
              <ExcelAdmin csvData={props.data} fileName={"Job Reports"} />
            ) : (
              <ExcelClient csvData={props.data} fileName={"Job Reports"} />
            )}
          </>
        )}
      </div>
      <div className={"col-md-6"}>
        <form>
          <div className={"input-group"}>
            <div className={"input-group-prepend"}>
              <button type={"submit"} className={"btn btn-outline-info"}>
                <SearchIcon />
              </button>
            </div>
            <input
              type={"text"}
              className={"form-control"}
              onChange={props.search}
              placeholder={props.placeholder || "Search Task Id or Inpector..."}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
