import React, { useEffect, useState } from "react";
import { getFromStorage } from "../../../../local_storage";
import Navbar from "../../../common/NavigationBar";
import AdminPageHeader from "../../../common/AdminPageHeader";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Redirect } from "react-router-dom";
import horizontalLine from "../../../../img/horizontal.svg";
import { ReactSVG } from "react-svg";
import HomeIcon from '@material-ui/icons/Home';
const navbarContent = [
  "Home",
  "Job Request",
  "Reports",
  "Settings"
];

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
          <Navbar navbarContent={navbarContent} />

          <AdminPageHeader />

          
          <ReactSVG src={horizontalLine} className={"adminHorizontalLine"} />
          
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
                    <td>
                      sample ticket name
                    </td>
                    <td>
                      <button>sample type of work</button>
                    </td>
                    <td>sample current status</td>
                  </tr>

                  <tr>
                    <td>
                      sample ticket name
                    </td>
                    <td>
                      <button>sample type of work</button>
                    </td>
                    <td>sample current status</td>
                  </tr>
                  <tr>
                    <td>
                      sample ticket name
                    </td>
                    <td>
                      <button>sample type of work</button>
                    </td>
                    <td>sample current status</td>
                  </tr>
                  <tr>
                    <td>
                      sample ticket name
                    </td>
                    <td>
                      <button>sample type of work</button>
                    </td>
                    <td>sample current status</td>
                  </tr>
                  <tr>
                    <td>
                      sample ticket name
                    </td>
                    <td>
                      <button>sample type of work</button>
                    </td>
                    <td>sample current status</td>
                  </tr>
                  <tr>
                    <td>
                      sample ticket name
                    </td>
                    <td>
                      <button>sample type of work</button>
                    </td>
                    <td>sample current status</td>
                  </tr>
                  <tr>
                    <td>
                      sample ticket name
                    </td>
                    <td>
                      <button>sample type of work</button>
                    </td>
                    <td>sample current status</td>
                  </tr>
                  <tr>
                    <td>
                      sample ticket name
                    </td>
                    <td>
                      <button>sample type of work</button>
                    </td>
                    <td>sample current status</td>
                  </tr>
                  <tr>
                    <td>
                      sample ticket name
                    </td>
                    <td>
                      <button>sample type of work</button>
                    </td>
                    <td>sample current status</td>
                  </tr>
                  <tr>
                    <td>
                      sample ticket name
                    </td>
                    <td>
                      <button>sample type of work</button>
                    </td>
                    <td>sample current status</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AdminHomePage;
