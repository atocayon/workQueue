import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getFromStorage } from "../local_storage";
import { withSnackbar } from "notistack";

function Redirection(props) {
  const [endSession, setEndSession] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRedirection, setUserRedirection] = useState({});

  useEffect(() => {
    setLoading(false);
    props.enqueueSnackbar("NMP| Work Queue Information System");
    const obj = getFromStorage("work-queue");
    if (obj && obj.token) {
      setUserRedirection({ ...userRedirection, role: obj.role });
    }
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
          {userRedirection.role !== "admin" && <Redirect to={"/client"} />}

          {userRedirection.role === "admin" && <Redirect to={"/admin"} />}
        </>
      )}
    </>
  );
}

export default withSnackbar(Redirection);
