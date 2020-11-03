// @flow
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import InputField from "../../../common/textField/InputField";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FilterModal(props) {
  return (
    <div>
      <Dialog
        open={props.filterModal.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleFilterJobReportsModal}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title"></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <b>From</b>
            <InputField
              autoFocus={true}
              name={"start"}
              // label={"Start"}
              type={"date"}
              onChange={props.inputChange}
            />

            <br />
            <br />
            <b>To</b>
            <InputField
              name={"end"}
              // label={"Start"}
              type={"date"}
              onChange={props.inputChange}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleFilterJobReportsModal} color="primary">
            Cancel
          </Button>
          <Button onClick={props.filterJobRequestReports} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
