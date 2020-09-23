import React, { useState } from "react";
import SortIcon from "@material-ui/icons/Sort";
import SearchIcon from "@material-ui/icons/Search";

import TablePagination from "@material-ui/core/TablePagination";

export default function JobReports(props) {
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const data = props.data.filter((item) => item.inspector !== null);

  const sort = (e) => {
    e.preventDefault();

    setSortAsc(!sortAsc);
    if (sortAsc) {
      return data.sort((a, b) => {
        return a.inspector - b.inspector;
      });
    } else {
      return data.sort((a, b) => {
        return b.inspector - a.inspector;
      });
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={"job-request-container"}>
      <div className={"jumbotron"}>
        <h3>
          Job Request&nbsp;
          <span className={"text-info"}>Reports</span>
        </h3>
      </div>
      <div className={"row"}>
        <div className={"col-md-6"}>
          <button className={"btn"} onClick={sort}>
            <SortIcon /> {sortAsc ? "Sort Descending" : "Sort Ascending"}
          </button>
        </div>
        <div className={"col-md-6"}>
          <div className={"input-group"}>
            <div className={"input-group-prepend"}>
              <button type={"submit"} className={"btn btn-outline-info"}>
                <SearchIcon />
              </button>
            </div>
            <input type={"text"} className={"form-control"} />
          </div>
        </div>
      </div>

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
          {data.length > 0 &&
            data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <tr key={index}>
                  <td>{item.task_id}</td>
                  <td>{item.inspector}</td>
                  <td>{item.scope_of_work}</td>
                  <td>{item.date_needed}</td>
                  <td>{item.task_start}</td>
                  <td>{item.task_end}</td>
                  <td>{item.date_requested}</td>
                </tr>
              ))}

          {data.length < 1 && (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}
