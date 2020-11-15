import React, { useEffect, useState, useRef } from "react";
import SortIcon from "@material-ui/icons/Sort";
import SearchIcon from "@material-ui/icons/Search";
import SaveAlt from "@material-ui/icons/SaveAlt";
import TablePagination from "@material-ui/core/TablePagination";
import FilterModal from "./FilterModal";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import TableActions from "../../../common/TableActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Logs from "./Logs";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ReactToPrint from "react-to-print";
import JobRequestPrintable from "../../../common/JobRequestPrintable";
import PrintIcon from "@material-ui/icons/Print";
export default function JobReports(props) {
  const componentRef = useRef();

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
                <th></th>
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
                    <React.Fragment key={index}>
                      <tr>
                        <td>
                          <button
                            className={"btn btn-sm"}
                            onClick={props.handleExpand.bind(
                              null,
                              item.item.task_id
                            )}
                          >
                            {props.expand[item.item.task_id] ? (
                              <ExpandLessIcon />
                            ) : (
                              <ExpandMoreIcon />
                            )}
                          </button>
                        </td>
                        <td>{item.item.task_id}</td>
                        <td>{item.item.inspector}</td>
                        <td>{item.item.scope_of_work}</td>
                        <td>{item.item.date_needed}</td>
                        <td>{item.item.task_start}</td>
                        <td>{item.item.task_end}</td>
                        <td>{item.item.date_requested}</td>
                      </tr>

                      {props.expand[item.item.task_id] && (
                        <tr>
                          <td colSpan={8}>
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
                              data={item.item}
                            />
                            <Logs
                              expand={props.expand}
                              activeStep={props.activeStep}
                              handleNext={props.handleNext}
                              handleBack={props.handleBack}
                              handleReset={props.handleReset}
                              steps={item.logs}
                            />
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}

              {props.data.length < 1 ||
              props.data.filter((item) => item.item.status === "Confirmed")
                .length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center" }}>
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
