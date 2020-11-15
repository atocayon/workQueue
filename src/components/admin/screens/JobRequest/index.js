// @flow
import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import TablePagination from "@material-ui/core/TablePagination";
import RemarksModal from "../../../common/RemarksModal";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import TableActions from "../../../common/TableActions";
const tableHead = ["Ticket No.", "Requisitioner", "Date Requested"];

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
          <div className={"jumbotron jumbotron-container"}></div>

          <div className={"row"}>
            <div className={"col-md-1"}></div>
            <div className={"col-md-10"}>
              <RemarksModal
                handleClose={props.handleCloseRemarksModal}
                modal={props.remarksModal}
                onChange={props.handleChangeRemarks}
                handleSubmit={props.handleSubmit}
                error={props.error}
              />
              <div className={"job-request-container"}>
                <TableActions
                  sort={props.sort}
                  _sort={props._sort}
                  search={props.search}
                  placeholder={"Search Ticket No. or Requisitioner"}
                />
                <table className={"table table-borderless"}>
                  <thead>
                    <tr>
                      {tableHead.map((th) => (
                        <th key={th}>{th}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {props.job_requests.length === 0 && (
                      <tr>
                        <td colSpan={3} style={{ textAlign: "center" }}>
                          No job request found
                        </td>
                      </tr>
                    )}
                    {props.job_requests
                      .slice(
                        props.page * props.rowsPerPage,
                        props.page * props.rowsPerPage + props.rowsPerPage
                      )
                      .map((item) => (
                        <React.Fragment key={item.ticket}>
                          <tr>
                            <td>
                              <button
                                className={"btn btn-sm"}
                                title={"Expand"}
                                onClick={props.onClickExpand.bind(
                                  null,
                                  item.ticket
                                )}
                              >
                                {props.expand[item.ticket] ? (
                                  <ExpandLessIcon />
                                ) : (
                                  <ExpandMoreIcon />
                                )}
                              </button>
                              &nbsp;{item.ticket}
                            </td>
                            <td>{item.requisitioner}</td>
                            <td>{item.date_requested}</td>
                          </tr>
                          {props.expand[item.ticket] && (
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
                                    <h6>Requisitioner: </h6>
                                    {item.requisitioner} ({item.position})
                                  </li>
                                  <li>
                                    <h6>Date Requested: </h6>
                                    {item.date_requested}
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
                                <button
                                  className={"btn btn-sm btn-info"}
                                  onClick={props.handleClickOpenRemarksModal.bind(
                                    null,
                                    { id: item.ticket, title: "Accepted" }
                                  )}
                                >
                                  Accept
                                </button>{" "}
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                  </tbody>
                </table>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={props.job_requests.length}
                  rowsPerPage={props.rowsPerPage}
                  page={props.page}
                  onChangePage={props.handleChangePage}
                  onChangeRowsPerPage={props.handleChangeRowsPerPage}
                />
              </div>
            </div>
            <div className={"col-md-1"}></div>
          </div>
        </>
      )}
    </>
  );
}
