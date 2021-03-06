import React from "react";
import InputField from "../textField/InputField";
export default function ChangePass(props) {
  return (
    <div className={"row"}>
      <div className={"col-md-4"}></div>
      <div className={"col-md-4"}>
        <InputField
          name={"newPassword"}
          label={"New Password"}
          variant={"outlined"}
          onChange={props.handleChangePassword}
          value={props.inputValue.newPassword}
        />
      </div>
      <div className={"col-md-4"}></div>
    </div>
  );
}
