import React, { useEffect, useState } from "react";
import SortIcon from "@material-ui/icons/Sort";
import SearchIcon from "@material-ui/icons/Search";
import SaveAlt from "@material-ui/icons/SaveAlt";
import TablePagination from "@material-ui/core/TablePagination";
import FilterModal from "./FilterModal";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import TableActions from "../../../common/TableActions";
const Excel = ({ csvData, fileName }) => {
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

export default function JobReports(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={"job-request-container"}>
      <FilterModal
        inputChange={props.inputChange}
        filterModal={props.filterModal}
        handleFilterJobReportsModal={props.handleFilterJobReportsModal}
        filterJobRequestReports={props.filterJobRequestReports}
      />
      <div className={"row"}>
        <div className={"col-md-12"}>
          <div className={"jumbotron"}>
            <h3>
              Job Request&nbsp;
              <span className={"text-info"}>Reports</span>
            </h3>
          </div>
        </div>
        <div className={"col-md-1"}></div>
        <div className={"col-md-10"}>
          <TableActions
            sort={props.sort}
            _sort={props._sort}
            search={props.search}
            filter={true}
            handleFilterJobReportsModal={props.handleFilterJobReportsModal}
            data={props.data}
          />

          <table className={"table table-hover table-borderless"}>
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Inspector</th>
                <th>Scope of work</th>
                <th>Deadline</th>
                <th>Start</th>
                <th>End</th>
                <th>Date Requested</th>
              </tr>
            </thead>
            <tbody>
              {props.data.length > 0 &&
                props.data
                  .filter((item) => item.item.status === "Confirmed")
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.item.task_id}</td>
                      <td>{item.item.inspector}</td>
                      <td>{item.item.scope_of_work}</td>
                      <td>{item.item.date_needed}</td>
                      <td>{item.item.task_start}</td>
                      <td>{item.item.task_end}</td>
                      <td>{item.item.date_requested}</td>
                    </tr>
                  ))}

              {props.data.length < 1 ||
              props.data.filter((item) => item.item.status === "Confirmed")
                .length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center" }}>
                    No data found
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={props.data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </div>
        <div className={"col-md-1"}></div>
      </div>
    </div>
  );
}
