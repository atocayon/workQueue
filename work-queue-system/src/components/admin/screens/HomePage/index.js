import React, { useEffect, useState } from "react";
import { getFromStorage } from "../../../../local_storage";
import Navbar from "../../../common/NavigationBar";
import AdminPageHeader from "../../../common/AdminPageHeader";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Redirect } from "react-router-dom";
import horizontalLine from "../../../../img/horizontal.svg";
import { ReactSVG } from "react-svg";
function AdminHomePage(props) {
  const [loading, setLoading] = useState(true);
  const [endSession, setEndSession] = useState(false);
  useEffect(() => {
    const obj = getFromStorage("work-queue");
    setLoading(false);
    setEndSession(!(obj && obj.token));
  }, []);

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
          <Navbar />

          <AdminPageHeader />

          
          <ReactSVG src={horizontalLine} className={"adminHorizontalLine"} />
          
        </>
      )}
    </>
  );
}

export default AdminHomePage;
