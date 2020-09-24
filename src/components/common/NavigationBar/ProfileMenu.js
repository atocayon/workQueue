import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";

export default function ProfileMenu(props) {
  return (
    <Menu
      anchorEl={props.anchorElProfileMenu}
      anchorOrigin={props.anchorOriginProfileMenu}
      id={props.idProfileMenu}
      keepMounted
      transformOrigin={props.transformOriginProfileMenu}
      open={props.openProfileMenu}
      onClose={props.onCloseProfileMenu}
    >
      <MenuItem className={"profile"}>
        <Link to={props.route+"/user/profile/"+props.user_id} style={{ textDecoration: "none" }}>
          My Account
        </Link>
      </MenuItem>
  
      <MenuItem onClick={props.logout}>Logout</MenuItem>
    </Menu>
  );
}
