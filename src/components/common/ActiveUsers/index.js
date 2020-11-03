// @flow
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Badge from "@material-ui/core/Badge";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflowY: "auto",
    maxHeight: "80vh",
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
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

export default function ActiveUsers(props) {
  const classes = useStyles();
  return (
    <div className={"userList overflow-auto"}>
      {props.users.length === 0 && (
        <div
          style={{ textAlign: "center", marginTop: "40vh", color: "#9E9E9E" }}
        >
          <small>No other active user(s)</small>
        </div>
      )}
      {props.users.length > 0 && (
        <h6
          style={{
            paddingTop: "10vh",
            paddingLeft: 10,
            paddingBottom: 30,
            fontWeight: "bold",
            color: "#2196F3",
            borderBottom: "1px solid #E9ECEF",
          }}
        >
          <InfoIcon />
          &nbsp;Active Users
        </h6>
      )}
      <List  className={classes.root} subheader={<li />}>
        {props.users.map((item) => (
          <ListItem alignItems="flex-start" key={item.user_id}>
            <ListItemAvatar>
              <StyledBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
              >
                <Avatar alt={item.name} src="/static/images/avatar/1.jpg" />
              </StyledBadge>
            </ListItemAvatar>
            <ListItemText
              MuiListItemText-dense
              primary={item.name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    //   className={classes.inline}
                    color="textPrimary"
                  >
                    {item.position}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
