// @flow
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

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
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { gilad, jason, antoine } = state;

  return (
    <FormControl
      required
      error={false}
      component="fieldset"
      className={classes.formControl}
    >
      <FormLabel component="legend">Type of Work Requested</FormLabel>
      <FormGroup>
        {props.checkBox &&
          props.checkBox.map((checkBox) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={false}
                  onChange={handleChange}
                  name={checkBox}
                />
              }
              label={checkBox}
            />
          ))}
      </FormGroup>
      <FormHelperText>You can display an error</FormHelperText>
    </FormControl>
  );
}
