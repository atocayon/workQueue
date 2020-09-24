import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import Drawer from "@material-ui/core/Drawer";
import logo from "../../../img/logo.png";

//Include
import LeftDrawer from "./LeftDrawer";
import RightDrawer from "./RightDrawer";
import MobileMenu from "./RenderMobileMenu";
import ProfileMenu from "./ProfileMenu";
import { withSnackbar } from "notistack";
import SettingsIcon from "@material-ui/icons/Settings";

function PrimarySearchAppBar(props) {
  const classes = useStyles(); // css styles

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  }); //Used for Drawer

  useEffect(() => {}, []);

  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const isMenuOpen = Boolean(anchorEl);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogOut = async (e) => {};

  const menuId = "primary-search-account-menu";

  const profileMenu = (
    <ProfileMenu
      logout={props.logout}
      route={props.route}
      handleStartGuide={props.handleStartGuide}
      user_id={props.user.user_id}
      anchorElProfileMenu={anchorEl}
      anchorOriginProfileMenu={{ vertical: "top", horizontal: "right" }}
      idProfileMenu={menuId}
      transformOriginProfileMenu={{ vertical: "top", horizontal: "right" }}
      openProfileMenu={isMenuOpen}
      onCloseProfileMenu={handleMenuClose}
      handleLogOut={handleLogOut}
    />
  );

  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = (
    <MobileMenu
      mobileMoreAnchorEl={mobileMoreAnchorEl}
      anchorOriginMobileMenu={{ vertical: "top", horizontal: "right" }}
      idMobileMenu={mobileMenuId}
      transformOriginMobileMenu={{ vertical: "top", horizontal: "right" }}
      openMobileMenu={isMobileMenuOpen}
      onCloseMobileMenu={handleMobileMenuClose}
      handleProfileMenuOpenMobileMenu={handleProfileMenuOpen}
      handleMenuCloseProfileMenu={handleMenuClose}
    />
  );

  const leftSideList = (side) => (
    <LeftDrawer
      nameLeftDrawer={classes.list}
      leftDrawerRole={"presentation"}
      onClickFunctionLeftDrawer={toggleDrawer(side, false)}
      onKeyDownFunctionLeftDrawer={toggleDrawer(side, false)}
    />
  );

  const rightSideList = (side) => (
    <RightDrawer
      // notification={props.notifications}
      nameRightDrawer={classes.list}
      rightDrawerRole={"presentation"}
      onClickRightDrawer={toggleDrawer(side, false)}
      onKeyDownRightDrawer={toggleDrawer(side, false)}
    />
  );

  return (
    <>
      <div className={classes.grow}>
        <AppBar position={"fixed"} color={"inherit"}>
          <Toolbar>
            <div>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer("left", true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography className={classes.title} variant="h6" noWrap>
                <img src={logo} alt={"nmp"} style={{ width: "1.7vw" }} /> |{" "}
                <b>Work Queue Information System</b>
              </Typography>
            </div>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-label="notifications"
                color="inherit"
                onClick={toggleDrawer("right", true)}
              >
                {/*{props.notifications.length > 0 && (*/}
                {/*    <Badge*/}
                {/*        badgeContent={props.notifications.length}*/}
                {/*        color="secondary"*/}
                {/*    >*/}
                {/*      <NotificationsIcon />*/}
                {/*    </Badge>*/}
                {/*)}*/}

                {/*{props.notifications.length === 0 && (*/}
                {/*    <NotificationsIcon />*/}
                {/*)}*/}
              </IconButton>
              <IconButton
                className={"settings"}
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                title={"Site settings"}
              >
                <SettingsIcon />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>

        {renderMobileMenu}
        {profileMenu}

        <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
          {leftSideList("left")}
        </Drawer>

        <Drawer
          anchor="right"
          open={state.right}
          onClose={toggleDrawer("right", false)}
        >
          {rightSideList("right")}
        </Drawer>
      </div>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    display: "block",
    marginRight: theme.spacing(0),
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  title: {
    display: "none",
    [theme.breakpoints.up("lg")]: {
      display: "block",
    },
  },

  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));

export default withSnackbar(PrimarySearchAppBar);
