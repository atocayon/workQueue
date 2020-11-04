import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import SortIcon from "@material-ui/icons/Sort";
import TablePagination from "@material-ui/core/TablePagination";
import Reactotron from "reactotron-react-js";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Logs from "./Logs";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
export default function TableData(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");

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
          <button
            className={"btn"}
            onClick={props.sort.bind(
              null,
              props._sort === "asc" ? "dsc" : "asc"
            )}
          >
            <SortIcon />{" "}
            {props._sort === "asc" ? "Sort Descending" : "Sort Ascending"}
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
                onChange={props.search}
                placeholder={"Search Task Id or Inpector..."}
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
              .map((data) => (
                <React.Fragment key={data.item.task_id}>
                  <tr>
                    <td>
                      <button
                        onClick={props.handleExpand.bind(
                          null,
                          data.item.task_id
                        )}
                        className={"btn btn-sm"}
                        title={
                          props.expand[data.item.task_id]
                            ? "Expand Less"
                            : "Expand More"
                        }
                      >
                        {props.expand[data.item.task_id] ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </button>

                      {data.item.task_id}
                    </td>
                    <td>
                      {data.item.inspector === null
                        ? "N/A"
                        : data.item.inspector}
                    </td>
                    <td>
                      {data.item.status === null ? "N/A" : data.item.status}
                    </td>
                    <td>
                      {data.item.task_start === null
                        ? "N/A"
                        : data.item.task_start}
                    </td>
                    <td>
                      {data.item.task_end === null ? "N/A" : data.item.task_end}
                    </td>
                    <td>{data.item.date_requested}</td>
                  </tr>
                  {props.expand[data.item.task_id] && (
                    <tr>
                      <td colSpan={7}>
                        <h5>
                          <InfoOutlinedIcon />
                          &nbsp;Logs
                        </h5>
                        <Logs
                          expand={props.expand}
                          activeStep={props.activeStep}
                          handleNext={props.handleNext}
                          handleBack={props.handleBack}
                          handleReset={props.handleReset}
                          steps={data.logs}
                        />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
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
