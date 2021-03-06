// @flow
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputField from "../textField/InputField";
export default function WebUploadConfirmation(props) {
  return (
    <div>
      <Dialog
        open={props.modal.open}
        onClose={props.handleCloseWebUploadModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText>
            You're about to&nbsp;
            <span
              style={
                props.modal.title === "Reject"
                  ? { color: "red" }
                  : { color: "#2196F3" }
              }
            >
              {props.modal.title}
            </span>
            &nbsp;this job request.
          </DialogContentText>
          {props.modal.title === "Accept" ||
          props.modal.title === "Reject" ? null : (
            <InputField
              autoFocus={true}
              id={"status"}
              name={"status"}
              label={"Web Upload Status"}
              type={"text"}
              onChange={props.handleUpdateModal}
            />
          )}
        </DialogContent>
        <DialogActions>
          <button
            onClick={props.handleCloseWebUploadModal}
            className={"btn btn-outline-info btn-sm"}
          >
            Cancel
          </button>
          <button onClick={props.handleConfirmWebUpload} className={"btn btn-info btn-sm"}>
            Confirm
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
