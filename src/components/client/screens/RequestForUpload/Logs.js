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
    <div className={classes.root}>
      <Stepper activeStep={props.activeStep} orientation="vertical">
        {props.steps.map((label, index) => (
          <Step key={index}>
            <StepLabel
              StepIconComponent={FiberManualRecordIcon}
              style={{ color: "#2196F3" }}
            >
              <b>
                {label.status} @ {label.date_time}
              </b>
            </StepLabel>
            <StepContent>
              <Typography>
                {label.host_computer}
                <br />
                {label.network_group}
              </Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <button
                    disabled={props.activeStep === 0}
                    onClick={props.handleBack}
                    className={"btn btn-sm btn-outline-primary"}
                  >
                    Back
                  </button>
                  &nbsp;&nbsp;
                  <button
                    variant="contained"
                    color="primary"
                    onClick={props.handleNext}
                    className={"btn btn-sm btn-primary"}
                  >
                    {props.activeStep === props.steps.length - 1
                      ? "Done"
                      : "Next"}
                  </button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {props.activeStep === props.steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>End of Logs</Typography>
          <button
            onClick={props.handleReset}
            className={"btn btn-sm btn-primary"}
          >
            Reset
          </button>
        </Paper>
      )}
    </div>
  );
}
