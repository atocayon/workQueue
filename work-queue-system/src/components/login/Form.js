import React from "react";
import InputField from "../common/textField/InputField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";

export default function Form({ onSubmit, onChange, error, visiblePass, setVisiblePass  }){

  return(
    <form onSubmit={onSubmit}>
      <h5 className={"login-header"}>WELCOME</h5>
      <br />
      <InputField
        id={"email"}
        label={"Username or Email"}
        name={"usernameOrEmail"}
        onChange={onChange}
        error={error.usernameOrEmail}
        type={"text"}
      />
      <br />
      <br />
      <FormControl fullWidth>
        <InputLabel
          style={error.password && { color: "red" }}
        >
          Password
        </InputLabel>
        <Input
          className={"password-input"}
          id={"password"}
          name={"password"}
          onChange={onChange}
          type={visiblePass ? "text" : "password"}
          style={
            error.password && {
              borderBottom: "2px solid red",
              color: "red",
            }
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                title={"clear"}
                aria-label="toggle password visibility"
                onClick={() => {
                  setVisiblePass(!visiblePass);
                }}
                onMouseDown={() => {
                  setVisiblePass(!visiblePass);
                }}
                edge="end"
              >
                {visiblePass ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
        <small style={{ color: "red" }}>
          {error.password}
        </small>
      </FormControl>

      <br />
      <br />
      <div className={"login-btn-container"}>
        <button
          className={"btn btn-primary login-btn"}
          type={"submit"}
        >
          Login
        </button>
      </div>
    </form>
  );
};