import React, { useEffect, useState } from "react";
import { getFromStorage } from "../../../../local_storage";
import Navbar from "../../../common/NavigationBar";
import AdminPageHeader from "../../../common/AdminPageHeader";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Redirect } from "react-router-dom";
import horizontalLine from "../../../../img/horizontal.svg";
import footer from "../../../../img/footer.svg";
import { ReactSVG } from "react-svg";
import HomeIcon from "@material-ui/icons/Home";
import HomePageContent from "./HomePageContent";
import JobRequest from "../JobRequest";
import Reports from "../Reports";
import Settings from "../Settings";
import Reactotron from "reactotron-react-js";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import { fetch_current_user_info } from "../../../../redux/actions/fetch_current_user_info";
import { logout } from "../../../../redux/actions/login_logout";
const navbarContent = ["Home", "Job Request", "Reports", "Settings"];

function AdminHomePage(props) {
  const [loading, setLoading] = useState(true);
  const [endSession, setEndSession] = useState(false);
  useEffect(() => {
    const obj = getFromStorage("work-queue");
    if (obj && obj.token) {
      props.fetch_current_user_info(obj.token);
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
        <>
          <Navbar
            user={props.current_user}
            logout={props.logout}
            navbarContent={navbarContent}
            activeLink={props.match.params.route}
          />

          {/* Route */}
          {!props.match.params.route && (
            <>
              <AdminPageHeader />

              <ReactSVG
                src={horizontalLine}
                className={"adminHorizontalLine"}
              />
              <HomePageContent />
            </>
          )}
          <div style={{ overflow: "auto" }}>
            {props.match.params.route === "jobrequest" && (
              <>
                <div style={{ height: "15vh" }}></div>
                <JobRequest />
              </>
            )}
            {props.match.params.route === "reports" && (
              <>
                <div style={{ height: "15vh" }}></div>
                <Reports />
              </>
            )}
            {props.match.params.route === "settings" && (
              <>
                <div style={{ height: "15vh" }}></div>
                <Settings />
              </>
            )}
          </div>
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
)(withSnackbar(AdminHomePage));
