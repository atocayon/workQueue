// @flow
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import InputField from "../textField/InputField";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function CheckBox(props) {
  const classes = useStyles();

  const checkBox = props.checkBox.filter((item) => {
    if (props.params !== "1") {
      return item !== "Information System";
    } else {
      return item;
    }
  });
  return (
    <FormControl
      required
      error={props.error ? true : false}
      component="fieldset"
      className={classes.formControl}
    >
      <FormLabel component="legend">{props.label}</FormLabel>
      <FormGroup>
        {props.checkBox &&
          checkBox.map((checkBox) => (
            <FormControlLabel
              key={checkBox}
              control={
                <Checkbox
                  checked={props.check[checkBox]}
                  onChange={props.handleChange}
                  name={checkBox}
                />
              }
              label={checkBox}
            />
          ))}
      </FormGroup>
      {props.checkBox &&
        props.checkBox.map((item) => (
          <React.Fragment key={item}>
            {item === "Others" && props.check[item] ? (
              <InputField
                label={"Pls. specify"}
                name={"otherTypeOfWork"}
                onChange={props.handleChange}
                type={"text"}
                // value={props.form_data.dateNeeded}
              />
            ) : (
              ""
            )}
          </React.Fragment>
        ))}

      <FormHelperText>{props.error}</FormHelperText>
    </FormControl>
  );
}
