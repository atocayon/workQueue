import React, { useState } from "react";
import GetAppIcon from "@material-ui/icons/GetApp";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Logs from "./Logs";
import SearchIcon from "@material-ui/icons/Search";
import SortIcon from "@material-ui/icons/Sort";
import TablePagination from "@material-ui/core/TablePagination";
import TableActions from "../../../common/TableActions";

export default function Table(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div>
      <TableActions
        sort={props.sort}
        _sort={props._sort}
        search={props.search}
        placeholder={"Search Title or Validator"}
      />
      <br />
      <table className={"table table-borderless table-striped"}>
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Upload destination</th>
            <th>File name</th>
            <th>Validator</th>
            <th>Date/Time Requested</th>
          </tr>
        </thead>
        <tbody>
          {props.data.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                No data found
              </td>
            </tr>
          )}
          {props.data &&
            props.data.map((item, index) => (
              <React.Fragment key={item.web_upload_list.id}>
                <tr>
                  <td>
                    <br />
                    <button
                      className={"btn btn-sm"}
                      onClick={props.handleExpand.bind(
                        null,
                        item.web_upload_list.id
                      )}
                      title={
                        props.expand[item.web_upload_list.id]
                          ? "Expand Less"
                          : "Expand More"
                      }
                    >
                      {props.expand[item.web_upload_list.id] ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </button>
                  </td>
                  <td>{item.web_upload_list.upload_title}</td>
                  <td>
                    <ul>
                      {item.web_upload_destination.map((des) => (
                        <li key={des.destination}>{des.destination}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul>
                      {item.web_upload_file.map((file, index) => (
                        <li key={index}>
                          <a
                            href={
                              process.env.REACT_APP_UPLOAD_FOLDER +
                              "/" +
                              file.file_name
                            }
                            download={file.file_name}
                          >
                            {file.file_name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td>
                    {!item.web_upload_list.validator
                      ? "N/A"
                      : item.web_upload_list.validator}
                  </td>
                  <td>{item.web_upload_list.date_time_requested}</td>
                </tr>

                {props.expand[item.web_upload_list.id] && (
                  <tr>
                    <td colSpan={6}>
                      <Logs
                        steps={item.web_upload_logs}
                        activeStep={props.activeStep}
                        handleNext={props.handleNext}
                        handleBack={props.handleBack}
                        handleReset={props.handleReset}
                        handleExpand={props.handleExpand}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
}
