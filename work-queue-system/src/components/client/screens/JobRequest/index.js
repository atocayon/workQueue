// @flow
import React from "react";
import InputField from "../../../common/textField/InputField";
import CheckBox from "../../../common/CheckBox";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Reactotron from "reactotron-react-js";
const checkBox = [
  "Check-up",
  "Repair",
  "Installation",
  "Information System",
  "Fabrication",
];
export default function JobRequest(props) {
  const date = new Date();
  const section = props.sections.filter(
    (item) => item.secid === parseInt(props.office)
  );

  return (
    <div>
      <div className={"row"}>
        <div className={"col-md-2"}></div>
        <div className={"col-md-8"}>
          <div className={"client-job-request-form"}>
            <h3>
              Job Request Form <br />{" "}
              {section.map((sec) => (
                <small>{sec.secshort}</small>
              ))}
            </h3>

            <form onSubmit={props.onSubmitJobRequest}>
              <div className={"container"}>
                <div className={"col-md-12"}>
                  <span>
                    <small>Date Needed: (Optional)</small>
                  </span>
                  <InputField
                    name={"dateNeeded"}
                    onChange={props.handleChange}
                    type={"date"}
                    value={props.form_data.dateNeeded}
                  />
                  <br />

                  <CheckBox
                    error={props.error.typeOfWork}
                    check={props.form_data}
                    checkBox={checkBox}
                    handleChange={props.handleChange}
                  />
                  <br />

                  <TextareaAutosize
                    aria-label="Scope-of-work"
                    placeholder="Scope of Work (Optional)"
                    className={"scope-of-work-input"}
                    name={"scopeOfWork"}
                    onChange={props.handleChange}
                  />

                  <div className={"btn-job-request"}>
                    <button
                      title={"Submit Job Request"}
                      type={"submit"}
                      className={"btn"}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className={"col-md-2"}></div>
      </div>
    </div>
  );
}
