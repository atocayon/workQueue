import React from "react";
import {withSnackbar} from "notistack";
import Button from "@material-ui/core/Button";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { ReactSVG } from 'react-svg'
import horizontalLine from "../../../../img/horizontal.svg";
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import PrintIcon from '@material-ui/icons/Print';
import filterLogo from "../../../../img/filter.png";
import NoteAddIcon from '@material-ui/icons/NoteAdd';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

function Buttons(props){

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return(
    <>
      <div className={"ButtonFilter"}>
        <div>
          <button
            title={"Add Task"}
            className={"btn btn-lg btn-primary"}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <AddIcon />
          </button>
              <Popper  open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper className={"popOver"}>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                          <MenuItem onClick={handleClose}>IMS</MenuItem>
                          <MenuItem onClick={handleClose}>SMTADOS</MenuItem>
                          <MenuItem onClick={handleClose}>GSAS</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
        </div>
        <div>
          <button className={"btn btn-lg btn-warning"} title={"Filter"}>
            {/*<img src={filterLogo} className={"filterLogo"}/>*/}
            <FilterListIcon />
          </button>
        </div>
        <div>
          <button className={"btn btn-lg btn-success"} title={"Print Reports"}>
            <PrintIcon />
          </button>
        </div>

      </div>

      <div className={" horizontalLine"}>
        <ReactSVG src={horizontalLine} />
      </div>


    </>

  );
}


export default withSnackbar(Buttons);