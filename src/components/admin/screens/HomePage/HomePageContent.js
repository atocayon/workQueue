// @flow
import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import TablePagination from "@material-ui/core/TablePagination";
import RemarksModal from "../../../common/RemarksModal";
import Logs from "./Logs";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import TableActions from "../../../common/TableActions";
import JobDoneModal from "../../../common/JobDoneModal";
const date = new Date();

export default function HomePageContent(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <div className={"loading"}>
          <h5>
            <CircularProgress />
            <br />
            Please wait...
          </h5>
        </div>
      ) : (
        <>
          <div className={"jumbotron jumbotron-container"}></div>
          <div className={"row"}>
            <div className={"col-md-1"}></div>

            <div className={"col-md-10 typeOfWork-table"}>
              <RemarksModal
                handleClose={props.handleCloseRemarksModal}
                modal={props.remarksModal}
                onChange={props.handleChangeRemarks}
                handleSubmit={props.handleSubmit}
                error={props.error}
              />

              <JobDoneModal
                modal={props.jobDoneModal}
                handleClose={props.handleCloseJobDoneModal}
                onChange={props.handleChangeRemarks}
                handle_job_done_specification={
                  props.handle_job_done_specification
                }
                handle_submit_job_done={props.handle_submit_job_done}
              />

              <TableActions
                sort={props.sort}
                _sort={props._sort}
                search={props.search}
                placeholder={"Search Task ID"}
              />

              <br />

              <table className={"table table-borderless table-striped "}>
                <thead>
                  <tr>
                    <th>Ticket No.</th>
                    <th>Type of Work</th>
                    <th>Status</th>
                  </tr>
                </thead>
                {props.data.length === 0 && (
                  <tr>
                    <td colSpan={3} style={{ textAlign: "center" }}>
                      You don't have any job request yet
                    </td>
                  </tr>
                )}
                <tbody>
                  {props.data
                    .slice(
                      props.page * props.rowsPerPage,
                      props.page * props.rowsPerPage + props.rowsPerPage
                    )
                    .map((item) => {
                      const d = new Date(item.job.dateNeeded);
                      const dateNeeded = d.toISOString();
                      // var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
                      // console.log(date.toISOString() > t);
                      return (
                        <React.Fragment key={item.job.task_id}>
                          <tr
                            style={
                              item.job.dateNeeded !== "" &&
                              date.toISOString() > dateNeeded &&
                              item.job.status !== "Done"
                                ? {
                                    backgroundColor: "#f44336",
                                    color: "#fff",
                                  }
                                : null
                            }
                          >
                            <td>
                              <button
                                className={"btn btn-sm"}
                                title={"Expand"}
                                onClick={props.onClickExpand.bind(
                                  null,
                                  item.job.task_id
                                )}
                              >
                                {props.expand[item.job.task_id] ? (
                                  <ExpandLessIcon />
                                ) : (
                                  <ExpandMoreIcon />
                                )}
                              </button>
                              {item.job.task_id}
                            </td>
                            <td>
                              <button
                                className={"btn btn-info btn-sm type_of_work"}
                              >
                                {item.job.type_of_work}
                              </button>{" "}
                            </td>
                            <td>{item.job.status}</td>
                          </tr>
                          {props.expand[item.job.task_id] && (
                            <tr key={item.job.task_id}>
                              <td colSpan={3}>
                                <h6>
                                  <InfoOutlinedIcon /> Logs{" "}
                                  {item.job.dateNeeded !== "" && (
                                    <span
                                      style={
                                        date.toISOString() > dateNeeded &&
                                        item.job.status !== "Done"
                                          ? { color: "#f44336" }
                                          : { color: "#4CAF50" }
                                      }
                                    >
                                      {date.toISOString() > dateNeeded &&
                                      item.job.status !== "Done"
                                        ? "| Deadline :" +
                                          item.job.deadline +
                                          " (OUT DATED)"
                                        : null}
                                    </span>
                                  )}
                                </h6>
                                {item.job.status !== "Done" && (
                                  <>
                                    <button
                                      className={"btn btn-sm btn-info"}
                                      onClick={props.handleClickOpenRemarksModal.bind(
                                        null,
                                        {
                                          id: item.job.task_id,
                                          title: "Update",
                                        }
                                      )}
                                    >
                                      Give update
                                    </button>
                                    &nbsp;
                                    <button
                                      className={"btn btn-sm btn-outline-info"}
                                      onClick={props.handleOpenJobDoneModal.bind(
                                        null,
                                        { task_id: item.job.task_id }
                                      )}
                                    >
                                      Mark as done
                                    </button>
                                  </>
                                )}
                                <Logs
                                  item={item.logs}
                                  activeStep={props.activeStep}
                                  handleBack={props.handleBack}
                                  handleNext={props.handleNext}
                                  handleReset={props.handleReset}
                                />
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                </tbody>
              </table>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={props.data.length}
                rowsPerPage={props.rowsPerPage}
                page={props.page}
                onChangePage={props.handleChangePage}
                onChangeRowsPerPage={props.handleChangeRowsPerPage}
              />
            </div>

            <div className={"col-md-1"}></div>
          </div>
        </>
      )}
    </>
  );
}
