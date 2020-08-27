import React, { useEffect, useState } from "react";
import { getFromStorage } from "../../../../local_storage";
import Navbar from "../../../common/NavigationBar";
import AdminPageHeader from "../../../common/AdminPageHeader";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Redirect } from "react-router-dom";
import horizontalLine from "../../../../img/horizontal.svg";
import { ReactSVG } from "react-svg";
import HomeIcon from "@material-ui/icons/Home";
import HomePageContent from "./HomePageContent";
import JobRequest from "../JobRequest";
import Reports from "../Reports";
import Settings from "../Settings";
import Reactotron from "reactotron-react-js";
const navbarContent = ["Home", "Job Request", "Reports", "Settings"];

function AdminHomePage(props) {
  const [loading, setLoading] = useState(true);
  const [endSession, setEndSession] = useState(false);
  useEffect(() => {
    const obj = getFromStorage("work-queue");
    Reactotron.log(props);
    setLoading(false);
    setEndSession(!(obj && obj.token));
  }, [props]);

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
          <Navbar navbarContent={navbarContent} />

          <AdminPageHeader />

          <ReactSVG src={horizontalLine} className={"adminHorizontalLine"} />
          
          {/* Route */}
          {!props.match.params.route && <HomePageContent />}
          {props.match.params.route === "jobrequest" && <JobRequest />}
          {props.match.params.route === "reports" && <Reports />}
          {props.match.params.route === "settings" && <Settings />}
        </>
      )}
    </>
  );
}

export default AdminHomePage;
