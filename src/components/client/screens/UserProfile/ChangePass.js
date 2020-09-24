import React from "react";
import InputField from "../../../common/textField/InputField";
export default function ChangePass(props) {
  return (
    <div className={"row"}>
      <div className={"col-md-4"}></div>
      <div className={"col-md-4"}>
        <InputField
          name={"code"}
          label={"New Password"}
          variant={"outlined"}
        />
      </div>
      <div className={"col-md-4"}></div>
    </div>
  );
}
