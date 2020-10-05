import React, { useEffect, useState } from "react";
import { getFromStorage } from "../../../../local_storage";
import Navbar from "../../../common/NavigationBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import horizontalLine from "../../../../img/horizontal.svg";
import footer from "../../../../img/footer.svg";
import { ReactSVG } from "react-svg";
import HomeIcon from "@material-ui/icons/Home";
import HomePageContent from "./HomePageContent";
import JobRequest from "../JobRequest";
import Reports from "../Reports";
import Settings from "../Settings";
import AdminSideBar from "../../../common/AdminSideBarNavigation";
import Reactotron from "reactotron-react-js";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import { fetch_current_user_info } from "../../../../redux/actions/fetch_current_user_info";
import { logout } from "../../../../redux/actions/login_logout";
import { fetch_job_requests } from "../../../../redux/actions/fetch_job_requests";
function AdminHomePage(props) {
  const [loading, setLoading] = useState(true);
  const [endSession, setEndSession] = useState(false);
  useEffect(() => {
    const obj = getFromStorage("work-queue");
    if (obj && obj.token) {
      props.fetch_current_user_info(obj.token);
      props.fetch_job_requests(obj.token);
    }
    setLoading(false);
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
        <div className={"row"}>
          <div className={"col-md-12"}>
            <Navbar
              user={props.current_user}
              route={"/admin"}
              logout={props.logout}
            />
          </div>

          <div className={"col-md-2"}>
            <AdminSideBar user={props.current_user} />
          </div>
          <div className={"col-md-8"}>
            <Paper
              elevation={3}
              className={"paper content-container"}
              style={{ overflow: "auto" }}
            >
              {/* Route */}
              {!props.match.params.route && (
                <>
                  <HomePageContent />
                </>
              )}

              {props.match.params.route === "jobrequest" && (
                <>
                  <JobRequest job_requests={props._fetch_job_requests} />
                </>
              )}
              {props.match.params.route === "reports" && (
                <>
                  <Reports />
                </>
              )}
              {props.match.params.route === "user" && (
                <>
                  <Settings />
                </>
              )}
            </Paper>
          </div>
          <div className={"col-md-2"}></div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    current_user: state.current_system_user,
    _logout: state.logout,
    _fetch_job_requests: state.fetch_job_requests
  };
};

const mapDispatchToProps = {
  fetch_current_user_info,
  logout,
  fetch_job_requests,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(AdminHomePage));
