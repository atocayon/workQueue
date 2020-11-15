import React, { useEffect, useState, useRef } from "react";
import SearchIcon from "@material-ui/icons/Search";
import SortIcon from "@material-ui/icons/Sort";
import TablePagination from "@material-ui/core/TablePagination";
import Reactotron from "reactotron-react-js";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Logs from "./Logs";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import TableActions from "../../../common/TableActions";
import DoneIcon from "@material-ui/icons/Done";
import ReactToPrint from "react-to-print";
import JobRequestPrintable from "../../../common/JobRequestPrintable";
import PrintIcon from "@material-ui/icons/Print";
export default function TableData(props) {
  const componentRef = useRef();
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
      <TableActions
        sort={props.sort}
        _sort={props._sort}
        search={props.search}
      />
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
          {props.data
            .filter((data) => data.item.status !== "Confirmed")
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((data) => (
              <React.Fragment key={data.item.task_id}>
                <tr>
                  <td>
                    <button
                      onClick={props.handleExpand.bind(null, data.item.task_id)}
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
                    {data.item.inspector === null ? "N/A" : data.item.inspector}
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
                      <ReactToPrint
                        trigger={() => (
                          <button
                            className={"btn btn-primary btn-sm"}
                            title={"Print Job Request"}
                          >
                            <PrintIcon />
                            &nbsp;Print Job Request
                          </button>
                        )}
                        content={() => componentRef.current}
                      />
                      <br />
                      <br />
                      <h5>
                        <InfoOutlinedIcon />
                        &nbsp;Logs
                      </h5>

                      <JobRequestPrintable
                        ref={componentRef}
                        data={data.item}
                      />

                      {data.item.status === "Done" &&
                      data.item.task_end !== null ? (
                        <>
                          <button
                            className={"btn btn-success btn-sm"}
                            onClick={props.handleConfirmJob.bind(null, {
                              task_id: data.item.task_id,
                              status: "Confirmed",
                              remarks: "Done",
                            })}
                          >
                            <DoneIcon />
                            &nbsp; Confirm Job Done
                          </button>
                          <br />
                          <br />
                        </>
                      ) : null}
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

          {props.data.length < 1 ||
          props.data.filter((item) => item.item.status !== "Confirmed")
            .length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
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
  );
}
