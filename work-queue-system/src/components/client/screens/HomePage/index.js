import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import NavigationBar from "../../../common/NavigationBar";
import ButtonFilter from "./Buttons";
import TableData from "./TableData";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getFromStorage } from "../../../../local_storage";
import { Redirect } from "react-router";
import horizontalLine from "../../../../img/horizontal.svg";
import { ReactSVG } from "react-svg";
import { fetch_current_user_info } from "../../../../redux/actions/fetch_current_user_info";
import {logout} from "../../../../redux/actions/login_logout";
import Reactotron from "reactotron-react-js";
function HomePage(props) {
  const [endSession, setEndSession] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
    const obj = getFromStorage("work-queue");
    if (obj && obj.token) {
      props.fetch_current_user_info(obj.token);
    }
    setEndSession(!(obj && obj.token));
  }, [props._logout]);

  return (
    <>
      {endSession && <Redirect to={"/login"} />}
      {loading ? (
        <div className={"loading"}>
          <h5>
            <CircularProgress />
            <br />
            Please wait...
          </h5>
        </div>
      ) : (
        <>
          {/*navigation bar*/}
          <NavigationBar
            user={props.current_user}
            route={"/client"}
            logout={props.logout}
          />

          <ReactSVG src={horizontalLine} className={"adminHorizontalLine"} />

          {/*Button control*/}
          <ButtonFilter />

          {/* Table*/}
          <TableData />
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    current_user: state.current_system_user,
    _logout: state.logout
  };
};

const mapDispatchToProps = {
  fetch_current_user_info,
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(HomePage));
