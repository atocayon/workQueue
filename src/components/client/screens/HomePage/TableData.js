import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import SortIcon from "@material-ui/icons/Sort";
import TablePagination from "@material-ui/core/TablePagination";
import Reactotron from "reactotron-react-js";
export default function TableData(props) {
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const sort = (e) => {
    e.preventDefault();

    setSortAsc(!sortAsc);
    Reactotron.log(sortAsc);
    if (sortAsc) {
      return props.data.sort((a, b) => {
        return a.inspector - b.inspector;
      });
    } else {
      return props.data.sort((a, b) => {
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
    <div className={"table-data"}>
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
            <th>Status</th>
            <th>Start Date/Time</th>
            <th>End Date/Time</th>
            <th>Date Requested</th>
          </tr>
        </thead>
        <tbody>
          {props.data.length > 0 &&
            props.data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <tr>
                  <td>{item.task_id}</td>
                  <td>{item.inspector === null ? "N/A" : item.inspector}</td>
                  <td>{item.status === null ? "N/A" : item.status}</td>
                  <td>{item.task_start === null ? "N/A" : item.task_start}</td>
                  <td>{item.task_end === null ? "N/A" : item.task_end}</td>
                  <td>{item.date_requested}</td>
                </tr>
              ))}

          {props.data.length < 1 && (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                No data found
              </td>
            </tr>
          )}
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
  );
}
