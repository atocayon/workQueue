// @flow
import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
const tableHead = ["Ticket Name", "Requisitioner", "Date Requested"];

export default function JobRequest(props) {
  const [loading, setLoading] = useState(true);
  const [expand, setExpand] = useState({});
  useEffect(() => {
    setLoading(false);
  }, []);

  const onClickExpand = (val) => {
    // console.log(val);
    if (expand[val]) {
      setExpand({ ...expand, [val]: !val });
    } else {
      setExpand({ ...expand, [val]: true });
    }
  };

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
            <div className={"col-md-10"}>
              <div className={"job-request-container"}>
                <table className={"table"}>
                  <thead>
                    <tr>
                      {tableHead.map((th) => (
                        <th key={th}>{th}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {props.job_requests.map((item) => (
                      <React.Fragment key={item.ticket}>
                        <tr>
                          <td>
                            <button
                              className={"btn btn-sm"}
                              title={"Expand"}
                              onClick={onClickExpand.bind(null, item.ticket)}
                            >
                              <ExpandMoreIcon />{" "}
                            </button>
                            &nbsp;{item.ticket}
                          </td>
                          <td>{item.requisitioner}</td>
                          <td>{item.date_requested}</td>
                        </tr>
                        {expand[item.ticket] && (
                          <tr>
                            <td colSpan={3}>
                              <b>
                                <InfoOutlinedIcon />
                                Complete Information{" "}
                              </b>
                              <br />
                              <ul>
                                <li>
                                  <h6>Ticket No:</h6> {item.ticket}
                                </li>
                                <li>
                                  <h6>Requisitioner: </h6>{item.requisitioner} ({item.position})
                                </li>
                                <li>
                                  <h6>Date Requested: </h6>{item.date_requested}
                                </li>
                                <li>
                                  <h6>Description:</h6> {item.scope_of_work}
                                  
                                </li>
                                <li>
                                  <h6>Type of Work:</h6> {item.type_of_work}{" "}
                                  
                                </li>
                                <li>
                                  {" "}
                                  <h6>Date Needed:</h6> {item.deadline}
                                </li>
                              </ul>
                              <button className={"btn btn-sm btn-info"}>Accept</button> &nbsp;
                              <button className={"btn btn-sm btn-outline-danger"}>Reject</button>
                              {/* <table className={"table"}>
                                <tr>
                                  <th>Description</th>
                                  <th>Type of Work</th>
                                  <th>Date Needed</th>
                                </tr>
                                <tr>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                </tr>
                              </table> */}
                            </td>
                          </tr>

                          // <tr>
                          //   {/* <b>
                          //     <InfoOutlinedIcon />
                          //   </b> */}
                          //   <table>
                          //     <thead>
                          //       <tr>
                          //         <th>Description</th>
                          //         <th>Type of Work</th>
                          //         <th>Date Needed</th>
                          //       </tr>
                          //     </thead>
                          //     <tbody>
                          //       <tr>
                          //         <td>{item.scope_of_work}</td>
                          //         <td>{item.type_of_work}</td>
                          //         <td>{item.deadline}</td>
                          //       </tr>
                          //     </tbody>
                          //   </table>
                          // </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className={"col-md-1"}></div>
          </div>
        </>
      )}
    </>
  );
}
