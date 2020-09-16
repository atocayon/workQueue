// @flow
import React, { useEffect, useState } from "react";
import * as Scroll from "react-scroll";
import InputField from "../../../common/textField/InputField";
import CheckBox from "../../../common/CheckBox";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import CircularProgress from "../../../common/CircularProgress";
import Reactotron from "reactotron-react-js";
const checkBox = [
  "Check-up/Repair",
  "Installation",
  "Information System",
  "Fabrication",
  "Others",
];
export default function JobRequest(props) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const section = props.sections.filter(
    (item) => item.secid === parseInt(props.office)
  );

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <div className={"client-job-request-form"}>
            <div className={"jumbotron"}>
              <h3>
                Job Request Form&nbsp;
                {section.map((sec) => (
                  <span className={"text-info"} key={sec}>
                    {sec.secshort}
                  </span>
                ))}
              </h3>
            </div>

            <form onSubmit={props.onSubmitJobRequest}>
              <div className={"row"}>
                <div className={"col-md-1"}></div>
                <div className={"col-md-10"}>
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
                    label={"Type of Work Requested"}
                    params={props.params}
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
                      className={"btn btn-info"}
                    >
                      Submit
                    </button>
                  </div>
                </div>
                <div className={"col-md-1"}></div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
