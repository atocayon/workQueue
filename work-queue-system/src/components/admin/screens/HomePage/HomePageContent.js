// @flow
import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function HomePageContent(props) {
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
        <div className={"row"}>
          <div className={"col-md-4"}>
            <div className={"container"}>
              <div className={"row"}>
                <div className={"col-md-12"}>
                  <div>
                    <h5>Type of Work: </h5>
                    <ul>
                      <li>All</li>
                      <li>Check - up</li>
                      <li>Repair</li>
                      <li>Installation</li>
                      <li>Information System</li>
                      <li>Other(s)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={"col-md-8"}>
            <table className={"table table-borderless"}>
              <tbody>
                <tr>
                  <td>sample ticket name</td>
                  <td>
                    <button>sample type of work</button>
                  </td>
                  <td>sample current status</td>
                </tr>

                <tr>
                  <td>sample ticket name</td>
                  <td>
                    <button>sample type of work</button>
                  </td>
                  <td>sample current status</td>
                </tr>
                <tr>
                  <td>sample ticket name</td>
                  <td>
                    <button>sample type of work</button>
                  </td>
                  <td>sample current status</td>
                </tr>
                <tr>
                  <td>sample ticket name</td>
                  <td>
                    <button>sample type of work</button>
                  </td>
                  <td>sample current status</td>
                </tr>
                <tr>
                  <td>sample ticket name</td>
                  <td>
                    <button>sample type of work</button>
                  </td>
                  <td>sample current status</td>
                </tr>
                <tr>
                  <td>sample ticket name</td>
                  <td>
                    <button>sample type of work</button>
                  </td>
                  <td>sample current status</td>
                </tr>
                <tr>
                  <td>sample ticket name</td>
                  <td>
                    <button>sample type of work</button>
                  </td>
                  <td>sample current status</td>
                </tr>
                <tr>
                  <td>sample ticket name</td>
                  <td>
                    <button>sample type of work</button>
                  </td>
                  <td>sample current status</td>
                </tr>
                <tr>
                  <td>sample ticket name</td>
                  <td>
                    <button>sample type of work</button>
                  </td>
                  <td>sample current status</td>
                </tr>
                <tr>
                  <td>sample ticket name</td>
                  <td>
                    <button>sample type of work</button>
                  </td>
                  <td>sample current status</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
