// @flow
import React from "react";
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
export default function Logs(props) {
  const classes = useStyles();

  return (
    <>
      <Stepper activeStep={props.activeStep} orientation="vertical">
        {props.item.map((_item, index) => (
          <Step key={_item.status}>
            <StepLabel
              StepIconComponent={FiberManualRecordIcon}
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
                    {props.activeStep === props.item.length - 1
                      ? "Done"
                      : "Next >>"}
                  </button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {props.activeStep === props.item.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <button
            onClick={props.handleReset}
            className={"btn btn-outline-primary btn-sm"}
          >
            Back to top
          </button>
        </Paper>
      )}
    </>
  );
}
