// @flow
import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import TablePagination from "@material-ui/core/TablePagination";

export default function HomePageContent(props) {
  const [loading, setLoading] = useState(true);
  const [expand, setExpand] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    setLoading(false);
  }, []);

  const onClickExpand = (val) => {
    if (expand[val]) {
      setExpand({ ...expand, [val]: !expand[val] });
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
              <table className={"table table-borderless "}>
                <thead>
                  <tr>
                    <th>Ticket No.</th>
                    <th>Type of Work</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {props.data.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      ).map((item) => (
                    <React.Fragment key={item.job.task_id}>
                      <tr>
                        <td>
                          <button
                            className={"btn btn-sm"}
                            title={"Expand"}
                            onClick={onClickExpand.bind(null, item.job.task_id)}
                          >
                            <ExpandMoreIcon />
                          </button>
                          {item.job.task_id}
                        </td>
                        <td>
                          <button
                            className={"btn btn-info btn-sm type_of_work"}
                          >
                            {item.job.type_of_work}
                          </button>{" "}
                        </td>
                        <td>{item.job.status}</td>
                      </tr>
                      {expand[item.job.task_id] && (
                        <tr>
                          <td colSpan={3}>
                            <h6>
                              <InfoOutlinedIcon /> Logs
                            </h6>
                            <table className={"table table-striped"}>
                              <thead>
                                <tr>
                                  <th>Status</th>
                                  <th>Remarks</th>
                                  <th>Date/Time</th>
                                </tr>
                              </thead>
                              <tbody>
                                {item.logs.map((item) => (
                                  <tr>
                                    <td>{item.status}</td>
                                    <td>{item.remarks}</td>
                                    <td>{item.dateTime}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
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
                  count={props.data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </div>

            <div className={"col-md-1"}></div>
          </div>
        </>
      )}
    </>
  );
}
