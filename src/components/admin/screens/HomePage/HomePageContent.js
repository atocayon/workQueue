// @flow
import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
        <>
          <div className={"jumbotron jumbotron-container"}></div>
          <div className={"row"}>
          
          <div className={"col-md-1"}></div>

          <div className={"col-md-10 typeOfWork-table"}>
            <table className={"table "}>
              <thead>
                <tr>
                  <th>Ticket No.</th>
                  <th>Type of Work</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> <button><ExpandMoreIcon/></button> sample ticket name</td>
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

          <div className={"col-md-1"}></div>
        </div>
        </>
       
      )}
    </>
  );
}
