import React from "react";
import InputField from "../../../common/textField/InputField";

export default function Code(props) {
  return (
    <div className={"row"}>
      <div className={"col-md-4"}></div>
      <div className={"col-md-4"}>
        <InputField name={"code"} label={"Code"} variant={"outlined"} />
        <small>Kidly check your email for the code</small>
      </div>
      <div className={"col-md-4"}></div>
    </div>
  );
}
