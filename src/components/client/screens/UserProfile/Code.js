import React from "react";
import InputField from "../../../common/textField/InputField";

export default function Code(props) {
  return (
    <div className={"row"}>
      <div className={"col-md-4"}></div>
      <div className={"col-md-4"}>
        <InputField
          name={"code"}
          label={"Code"}
          variant={"outlined"}
          onChange={props.handleChangePassword}
          value={props.inputValue.code}
          error={props.error.code}
        />
        <span style={{ color: "red" }}>
          <small>Kidly check your email for the code</small>
        </span>
      </div>
      <div className={"col-md-4"}></div>
    </div>
  );
}
