import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputField from "../textField/InputField";
import InfoIcon from "@material-ui/icons/Info";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
export default function JobDoneModal(props) {
  const [error, setError] = useState({});

  const validation = () => {
    let _err = {};

    if (props.modal.specific_job === "normal_job") {
      if (!props.modal.item_no) _err.item_no = "Item No. is required";
      if (!props.modal.serial_no) _err.serial_no = "Serial No. is required";
      if (!props.modal.brand) _err.brand = "Brand is required";
      if (!props.modal.item_model) _err.model = "Model is required";
      if (!props.modal.color) _err.color = "Color is required";
      if (!props.modal.findings) _err.findings = "Findings is required";
      if (!props.modal.recommendations)
        _err.recommendations = "Recommendations. is required";
      setError(_err);

      return Object.keys(_err).length === 0;
    }

    if (props.modal.specific_job === "info_system_job") {
      if (!props.modal.interface) _err.interface = "Interface is required";
      if (!props.modal.func_capabilities)
        _err.func_capabilities = "Funcitonal Cabalities is required";
      if (!props.modal.contraints)
        _err.contraints = "Contraints/Limitation is required";
      if (!props.modal.findings) _err.findings = "Findings is required";
      if (!props.modal.recommendations)
        _err.recommendations = "Recommendations. is required";
      setError(_err);

      return Object.keys(_err).length === 0;
    }
  };

  const handleSubmit = () => {
    if (!validation()) return;

    return props.handle_submit_job_done(props.modal);
  };

  return (
    <div>
      <Dialog
        open={props.modal.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {/* <span style={props.modal.title === "Reject" && { color: "red" }}> */}
          <InfoIcon /> Done Job Request
          {/* </span> */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Kindly indicate the neccesarry info to this job request.
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button
                onClick={props.handle_job_done_specification.bind(
                  null,
                  "normal_job"
                )}
              >
                Job Specification/Description
              </Button>
              <Button
                onClick={props.handle_job_done_specification.bind(
                  null,
                  "info_system_job"
                )}
              >
                Information System Specification
              </Button>
            </ButtonGroup>
            {props.modal.specific_job === "normal_job" && (
              <div>
                <br />
                <br />
                <InputField
                  label={"Item no"}
                  name={"item_no"}
                  value={props.modal.item_no}
                  onChange={props.onChange}
                  error={error.item_no}
                />
                <br />
                <br />
                <InputField
                  label={"Serial no"}
                  name={"serial_no"}
                  value={props.modal.serial_no}
                  onChange={props.onChange}
                  error={error.serial_no}
                />
                <br />
                <br />
                <InputField
                  label={"Brand"}
                  name={"brand"}
                  value={props.modal.brand}
                  onChange={props.onChange}
                  error={error.brand}
                />
                <br />
                <br />
                <InputField
                  label={"Memory Capacity"}
                  name={"memory_capacity"}
                  value={props.modal.memory_capacity}
                  onChange={props.onChange}
                />
                <br />
                <br />
                <InputField
                  label={"Model"}
                  name={"item_model"}
                  value={props.modal.item_model}
                  onChange={props.onChange}
                  error={error.model}
                />
                <br />
                <br />
                <InputField
                  label={"Color"}
                  name={"color"}
                  value={props.modal.color}
                  onChange={props.onChange}
                  error={error.color}
                />
                <br />
                <br />
                <InputField
                  label={"Measurement"}
                  name={"measurement"}
                  value={props.modal.measurement}
                  onChange={props.onChange}
                />
                <br />
                <br />
                <InputField
                  label={"Location"}
                  name={"location"}
                  value={props.modal.location}
                  onChange={props.onChange}
                />
              </div>
            )}
            {props.modal.specific_job === "info_system_job" && (
              <div>
                <br />
                <br />
                <InputField
                  label={"Interface"}
                  name={"interface"}
                  value={props.modal.interface}
                  onChange={props.onChange}
                  error={error.interface}
                />
                <br />
                <br />
                <InputField
                  label={"Functional Capabilities"}
                  name={"func_capabilities"}
                  value={props.modal.func_capabilities}
                  onChange={props.onChange}
                  error={error.func_capabilities}
                />
                <br />
                <br />
                <InputField
                  label={"Data Structures/Elements"}
                  name={"data_structure"}
                  value={props.modal.data_structure}
                  onChange={props.onChange}
                />
                <br />
                <br />
                <InputField
                  label={"Reliability"}
                  name={"reliability"}
                  value={props.modal.reliability}
                  onChange={props.onChange}
                />
                <br />
                <br />
                <InputField
                  label={"Security/Privacy"}
                  name={"security"}
                  value={props.modal.security}
                  onChange={props.onChange}
                />
                <br />
                <br />
                <InputField
                  label={"Quality"}
                  name={"quality"}
                  value={props.modal.quality}
                  onChange={props.onChange}
                />
                <br />
                <br />
                <InputField
                  label={"Contraints/Limitation"}
                  name={"contraints"}
                  value={props.modal.contraints}
                  onChange={props.onChange}
                  error={error.contraints}
                />
              </div>
            )}
            {props.modal.specific_job === "normal_job" ||
            props.modal.specific_job === "info_system_job" ? (
              <>
                <br />
                <br />
                <InputField
                  label={"Findings"}
                  name={"findings"}
                  value={props.modal.findings}
                  onChange={props.onChange}
                />
                <br />
                <br />
                <InputField
                  label={"Recommendations"}
                  name={"recommendations"}
                  value={props.modal.recommendations}
                  onChange={props.onChange}
                />
              </>
            ) : null}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
