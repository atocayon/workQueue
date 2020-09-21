import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../img/logo.png";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import PrimarySearchAppBar from "./PrimarySearchAppBar";
export default function NavigationBar(props) {
  return (
    <>
      <PrimarySearchAppBar user={props.user} route={props.route} />
    </>
  );
}
