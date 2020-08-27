// @flow
import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
export default function JobRequest(props) {
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
        <h1>Job Request Page</h1>
      )}
    </>
  );
}
