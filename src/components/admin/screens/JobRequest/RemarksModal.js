// @flow
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import InputField from "../../../common/textField/InputField";
import InfoIcon from '@material-ui/icons/Info';
export default function RemarksModal(props) {
  return (
    <div>
      <Dialog
        open={props.modal.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {/* <span style={props.modal.title === "Reject" && { color: "red" }}> */}
            <InfoIcon/> {props.modal.title} Job Request
          {/* </span> */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Kindly indicate your remarks/note to this job request.
          </DialogContentText>
          <InputField
            autoFocus={true}
            id="remarks"
            label="Remarks"
            type="text"
            variant={"outlined"}
            value={props.modal.remarks}
            onChange={props.onChange}
            error={props.error.remarks}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={props.handleSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
