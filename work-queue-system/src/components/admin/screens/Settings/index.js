// @flow
import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Settings(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
      {loading ? (
        <div className={"loading"}>
          <h5>
            <CircularProgress />
            <br />
            Please wait...
          </h5>
        </div>
      ) : (
        <h1>Settings Page</h1>
      )}
    </>
  );
}
