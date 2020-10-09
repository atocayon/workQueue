import React, { useEffect, useState } from "react";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Badge from "@material-ui/core/Badge";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import PrintIcon from "@material-ui/icons/Print";
import InfoIcon from "@material-ui/icons/Info";
import Reactotron from "reactotron-react-js";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import DashboardIcon from "@material-ui/icons/Dashboard";
import TimelineIcon from "@material-ui/icons/Timeline";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "none",
    width: "100%",
    height: "100vh",
    overflow: "auto",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    marginTop: 50,
    paddingBottom: 100,
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
      display: "block",
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

export default function AdminSideBarNavigation(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  useEffect(() => {}, []);
  const handleClick = () => {
    setOpen(!open);
  };

  const activeStyle = {
    color: "#2196F3",
    fontWeight: "bold",
    textDecoration: "underline",
  };
  return (
    <div className={"sidebar"}>
      <div className={classes.root}>
        <List component="nav" aria-label="main mailbox folders">
          {props.user && (
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <ListItem
                className={"start"}
                title={"Click to go to home page"}
                style={{
                  paddingTop: "7vh",
                  paddingBottom: "2vh",
                  color: "#2196F3",
                }}
              >
                <ListItemAvatar>
                  <StyledBadge
                    overlap="circle"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    variant="dot"
                  >
                    <Avatar
                      alt={props.user.name}
                      src="/static/images/avatar/1.jpg"
                    />
                  </StyledBadge>
                </ListItemAvatar>
                <ListItemText
                  primary={props.user.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {props.user.position}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </Link>
          )}
          <Divider />

          <NavLink
            activeStyle={activeStyle}
            to={"/admin"}
            exact
            style={{ textDecoration: "none", color: "#000" }}
          >
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItem>
          </NavLink>

          <NavLink
            activeStyle={activeStyle}
            to={"/admin/jobrequest"}
            exact
            style={{ textDecoration: "none", color: "#000" }}
          >
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary={"Job Requests"} />
            </ListItem>
          </NavLink>

          <NavLink
            activeStyle={activeStyle}
            to={"/admin/reports"}
            exact
            style={{ textDecoration: "none", color: "#000" }}
          >
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <TimelineIcon />
              </ListItemIcon>
              <ListItemText primary={"Reports"} />
            </ListItem>
          </NavLink>
        </List>
        <Divider />
        <List>
          {props.user.secid === "1" && (
            <NavLink
              activeStyle={activeStyle}
              to={"/admin/webupload"}
              exact
              style={{ textDecoration: "none", color: "#000" }}
            >
              <ListItem button onClick={handleClick}>
                <ListItemIcon>
                  <CloudUploadIcon />
                </ListItemIcon>
                <ListItemText primary={"Web Upload(s)"} />
              </ListItem>
            </NavLink>
          )}

          <ListItem>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary={"About"} />
          </ListItem>
        </List>
      </div>
    </div>
  );
}
