// @flow
import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import TablePagination from "@material-ui/core/TablePagination";
import RemarksModal from "../../../common/RemarksModal";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { useStyles } from "../../../common/StepperMakeStyle";
const date = new Date();

export default function HomePageContent(props) {
  const classes = useStyles();
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
                                <ExpandMoreIcon />
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
                                      onClick={props.handleClickOpenRemarksModal.bind(
                                        null,
                                        { id: item.job.task_id, title: "Done" }
                                      )}
                                    >
                                      Mark as done
                                    </button>
                                  </>
                                )}

                                <Stepper
                                  activeStep={props.activeStep}
                                  orientation="vertical"
                                >
                                  {item.logs.map((_item, index) => (
                                    <Step key={_item.status}>
                                      <StepLabel
                                        StepIconComponent={
                                          FiberManualRecordIcon
                                        }
                                        style={{ color: "#2196F3" }}
                                      >
                                        <b>{_item.status}</b>
                                      </StepLabel>
                                      <StepContent>
                                        <Typography>
                                          {" "}
                                          <span>
                                            <small>
                                              {_item.dateTime} <br />
                                              {_item.remarks}
                                            </small>
                                          </span>{" "}
                                        </Typography>
                                        <div
                                          className={classes.actionsContainer}
                                        >
                                          <div>
                                            <button
                                              disabled={props.activeStep === 0}
                                              onClick={props.handleBack}
                                              className={
                                                "btn btn-outline-primary btn-sm"
                                              }
                                            >
                                              {"<< Previous"}
                                            </button>
                                            &nbsp;
                                            <button
                                              variant="contained"
                                              color="primary"
                                              onClick={props.handleNext}
                                              className={
                                                "btn btn-primary btn-sm"
                                              }
                                            >
                                              {props.activeStep ===
                                              item.logs.length - 1
                                                ? "Done"
                                                : "Next >>"}
                                            </button>
                                          </div>
                                        </div>
                                      </StepContent>
                                    </Step>
                                  ))}
                                </Stepper>
                                {props.activeStep === item.logs.length && (
                                  <Paper
                                    square
                                    elevation={0}
                                    className={classes.resetContainer}
                                  >
                                    <button
                                      onClick={props.handleReset}
                                      className={
                                        "btn btn-outline-primary btn-sm"
                                      }
                                    >
                                      Back to top
                                    </button>
                                  </Paper>
                                )}
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
