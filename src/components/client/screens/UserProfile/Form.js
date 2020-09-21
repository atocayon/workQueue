import React from "react";
import InputField from "../../../common/textField/InputField";

export default function Form(props) {
  return (
    <div className={"row"}>
      <div className={"col-md-4"}></div>
      <div className={"col-md-4"}>
        <InputField
          id={"name"}
          name={"name"}
          label={"Name"}
          variant={"outlined"}
          value={props.user.name}
        />
        <br />
        <br />
        <InputField
          id={"position"}
          name={"position"}
          label={"Job Title"}
          variant={"outlined"}
          value={props.user.position}
        />

        <br />
        <br />
        <InputField
          id={"username"}
          name={"username"}
          label={"Username"}
          variant={"outlined"}
          value={props.user.username}
        />

        <br />
        <br />
        <InputField
          id={"email"}
          name={"email"}
          label={"Email"}
          variant={"outlined"}
          value={props.user.email}
        />

        <br />
        <br />
        <InputField
          id={"contact"}
          name={"contact"}
          label={"Contact number"}
          variant={"outlined"}
          value={props.user.contact}
        />
      </div>
      <div className={"col-md-4"}></div>
    </div>
  );
}
