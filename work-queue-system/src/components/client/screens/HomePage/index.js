import React, { useEffect, useState } from "react";
import {withSnackbar} from "notistack";
import NavigationBar from "../../../common/NavigationBar";
import ButtonFilter from "./Buttons";
import TableData from "./TableData";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getFromStorage } from "../../../../local_storage";
import { Redirect } from "react-router";

function HomePage(props){
  const [endSession, setEndSession] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    const obj = getFromStorage("documentTracking");

    setEndSession(!(obj && obj.token));

  }, []);

  return(
      <>
        {endSession && <Redirect to={"/login"} />}
        {loading ? (
          <div className={"loading"}>
            <h5>
              <CircularProgress />
              <br/>
              Please wait...
            </h5>
          </div>
        ) : (
          <>
            {/*navigation bar*/}
            <NavigationBar />

            {/*Button control*/}
            <ButtonFilter />

            {/* Table*/}
            <TableData />
          </>
        )}

      </>
  );
}

export default withSnackbar(HomePage);