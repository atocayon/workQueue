import React, { useEffect, useState } from "react";
import SortIcon from "@material-ui/icons/Sort";
import SearchIcon from "@material-ui/icons/Search";
import ExtensionOutlinedIcon from "@material-ui/icons/ExtensionOutlined";
import TablePagination from "@material-ui/core/TablePagination";
import FilterModal from "./FilterModal";
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

  // const searchHandler = (e) => {
  //   e.preventDefault();
  //   console.log(search);
  //   if (search !== "") {
  //     const _data = data.filter(
  //       (item) => item.item.inspector === search || item.item.task_id === search
  //     );
  //     setData([..._data]);
  //   } else {
  //     setData([...data]);
  //   }
  // };

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
          <div className={"row"}>
            <div className={"col-md-6"}>
              <button className={"btn"} onClick={props.sort.bind(null, props._sort === "asc" ? "dsc" : "asc")}>
                <SortIcon /> {props._sort === "asc" ? "Sort Descending" : "Sort Ascending"}
              </button>
              &nbsp;
              <button
                className={"btn btn-sm"}
                onClick={props.handleFilterJobReportsModal}
              >
                <ExtensionOutlinedIcon />
                &nbsp;Filter
              </button>
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
                    placeholder={"Search Task ID or Inspector"}
                    onChange={props.search}
                  />
                </div>
              </form>
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
              {props.data.length > 0 &&
                props.data
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

              {props.data.length < 1 && (
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
