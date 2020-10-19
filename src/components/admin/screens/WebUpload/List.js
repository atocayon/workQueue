// @flow
import React, { useState, useEffect } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { useStyles } from "../../../common/StepperMakeStyle";

export default function List(props) {
  const classes = useStyles();

  return (
    <>
      <table className={"table table-borderless"}>
        <thead>
          <tr>
            <th>Requisitioner</th>
            <th>File Title</th>
            <th>Destination</th>
            <th>Date Requested</th>
          </tr>
        </thead>
        <tbody>
          {props.data.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                No web upload request found
              </td>
            </tr>
          )}
          {props.data.length > 0 &&
            props.data.map((list) => (
              <React.Fragment key={list.web_upload_list.id}>
                <tr>
                  <td>
                    {" "}
                    <button
                      title={"Expand"}
                      className={"btn btn-sm"}
                      onClick={props.onClickExpand.bind(
                        null,
                        list.web_upload_list.id
                      )}
                    >
                      <ExpandMoreIcon />
                    </button>{" "}
                    {list.web_upload_list.requisitioner}
                  </td>
                  <td>{list.web_upload_list.upload_title}</td>
                  <td>
                    <ul>
                      {list.web_upload_destination.map((des) => (
                        <li>{des.destination}</li>
                      ))}
                    </ul>
                  </td>
                  <td>{list.web_upload_list.date_time_requested}</td>
                </tr>

                {props.expand[list.web_upload_list.id] && (
                  <tr>
                    <td colSpan={4}>
                      <Stepper
                        activeStep={props.activeStep}
                        orientation="vertical"
                      >
                        {list.web_upload_logs.map((item) => (
                          <Step key={item.status}>
                            <StepLabel
                              StepIconComponent={FiberManualRecordIcon}
                              style={{ color: "#2196F3" }}
                            >
                              <b>{item.status}</b>
                            </StepLabel>
                            <StepContent>
                              <Typography>
                                {" "}
                                <span>
                                  <small>
                                    {item.date_time} <br />
                                    {item.host_computer}
                                    <br />
                                    {item.network_group}
                                  </small>
                                </span>{" "}
                              </Typography>
                              <div className={classes.actionsContainer}>
                                <div>
                                  <button
                                    disabled={props.activeStep === 0}
                                    onClick={props.handleBack}
                                    className={"btn btn-outline-primary btn-sm"}
                                  >
                                    {"<< Previous"}
                                  </button>
                                  &nbsp;
                                  <button
                                    variant="contained"
                                    color="primary"
                                    onClick={props.handleNext}
                                    className={"btn btn-primary btn-sm"}
                                  >
                                    {props.activeStep ===
                                    list.web_upload_logs.length - 1
                                      ? "Done"
                                      : "Next >>"}
                                  </button>
                                </div>
                              </div>
                            </StepContent>
                          </Step>
                        ))}
                        {props.activeStep === list.web_upload_logs.length && (
                          <Paper
                            square
                            elevation={0}
                            className={classes.resetContainer}
                          >
                           
                            <button
                              onClick={props.handleReset}
                              className={"btn btn-outline-primary btn-sm"}
                            >
                              Back to top
                            </button>
                          </Paper>
                        )}
                      </Stepper>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
        </tbody>
      </table>
    </>
  );
}
