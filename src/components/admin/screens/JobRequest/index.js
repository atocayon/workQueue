// @flow
import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import TablePagination from "@material-ui/core/TablePagination";
import RemarksModal from "./RemarksModal";
const tableHead = ["Ticket Name", "Requisitioner", "Date Requested"];

export default function JobRequest(props) {
  const [loading, setLoading] = useState(true);
  const [expand, setExpand] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [remarksModal, setRemarksModal] = useState({
    open: false,
    title: "",
    task_id: "",
    remarks: "",
  });
  const [error, setError] = useState({});
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpenRemarksModal = (val) => {
    setRemarksModal({
      ...remarksModal,
      task_id: val.id,
      title: val.title,
      open: !remarksModal.open,
    });
  };

  const handleCloseRemarksModal = () => {
    setRemarksModal({ ...remarksModal, open: !remarksModal.open });
  };

  const handleChangeRemarks = ({ target }) => {
    setRemarksModal({ ...remarksModal, remarks: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(remarksModal.remarks !== ""){
      props.onSubmitJobRequestAction(remarksModal);
      setRemarksModal({...remarksModal, open: false});
      setError({});
    }else{
      setError({...error, remarks: "Remarks is required"});
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
              <RemarksModal
                handleClose={handleCloseRemarksModal}
                modal={remarksModal}
                onChange={handleChangeRemarks}
                handleSubmit={handleSubmit}
                error={error}
              />
              <div className={"job-request-container"}>
                <table className={"table table-borderless"}>
                  <thead>
                    <tr>
                      {tableHead.map((th) => (
                        <th key={th}>{th}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {props.job_requests
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((item) => (
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
                                  onClick={handleClickOpenRemarksModal.bind(
                                    null,
                                    { id: item.ticket, title: "Accept" }
                                  )}
                                >
                                  Accept
                                </button>{" "}
                                &nbsp;
                                <button
                                  className={"btn btn-sm btn-outline-danger"}
                                  onClick={handleClickOpenRemarksModal.bind(
                                    null,
                                    { id: item.ticket, title: "Reject" }
                                  )}
                                >
                                  Reject
                                </button>
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
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
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
