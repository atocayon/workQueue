// @flow
import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const tableHead = ["Ticket Name", "Requisitioner", "Date/Time Requested"];

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
        <>
          <div className={"row"}>
            <div className={"col-md-2"}></div>
            <div className={"col-md-8"}>
              <div className={"job-request-container"}>
                <table className={"table table-borderless"}>
                  <thead>
                    <tr>
                      {tableHead.map((th) => (
                        <th>{th}</th>
                      ))}
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
            <div className={"col-md-2"}></div>
          </div>
        </>
      )}
    </>
  );
}
