// @flow
import React from "react";
import InputField from "../../../common/textField/InputField";
import CheckBox from "../../../common/CheckBox";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const checkBox = [
  "Check-up",
  "Repair",
  "Installation",
  "Information System",
  "Fabrication",
];
export default function JobRequest(props) {
    const date = new Date();
  return (
    <div>
      <div className={"row"}>
        <div className={"col-md-2"}></div>
        <div className={"col-md-8"}>
          <div className={"client-job-request-form"}>
            <h3>Job Request Form <br /> <small>{props.office.toUpperCase()}</small></h3>
            
            <div className={"container"}>
              <div className={"col-md-12"}>
                <span>
                  <small>Date Needed:</small>
                </span>
                <InputField
                  name={"dateNeeded"}
                  //   label={"Date Needed"}
                  //   variant={"outline"}
                  type={"date"}
                />
                <br />

                <CheckBox checkBox={checkBox} />
                <br />

                <TextareaAutosize
                  aria-label="Scope-of-work"
                  placeholder="Scope of Work"
                  className={"scope-of-work-input"}
                />

                <div className={"btn-job-request"}>
                    <button type={"submit"} className={"btn"}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={"col-md-2"}></div>
      </div>
    </div>
  );
}
