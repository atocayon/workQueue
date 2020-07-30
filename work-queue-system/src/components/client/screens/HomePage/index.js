import React, { useEffect, useState } from "react";
import {withSnackbar} from "notistack";
import NavigationBar from "../../../common/NavigationBar";
import ButtonFilter from "./Buttons";
import TableData from "./TableData";
import CircularProgress from "@material-ui/core/CircularProgress";

function HomePage(props){

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);

    props.enqueueSnackbar("Log in as Current User");
  }, []);

  return(
      <>
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