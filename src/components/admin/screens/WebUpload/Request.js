// @flow
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import AttachFileIcon from "@material-ui/icons/AttachFile";
export default function Request(props) {
  return (
    <>
      <table className={"table table-borderless table-striped"}>
        <thead>
          <tr>
            <th>Requisitioner</th>
            <th>File Title</th>
            <th>Destination</th>
            <th>Date Requested</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((item) => (
            <React.Fragment key={item.web_upload_list.id}>
              <tr>
                <td>
                  <button
                    className={"btn"}
                    title={"Expand"}
                    onClick={props.onClickExpand.bind(
                      null,
                      item.web_upload_list.id
                    )}
                  >
                    {" "}
                    <ExpandMoreIcon />
                  </button>
                  &nbsp;{item.web_upload_list.requisitioner}
                </td>
                <td>{item.web_upload_list.upload_title}</td>
                <td>
                  {item.web_upload_destination.map((des) => (
                    <ul>
                      <li>{des.destination}</li>
                    </ul>
                  ))}
                </td>
                <td>{item.web_upload_list.date_time_requested}</td>
              </tr>
              {props.expand[item.web_upload_list.id] && (
                <tr>
                  <td colSpan={4}>
                    <b>
                      <InfoOutlinedIcon />
                      Complete Information{" "}
                    </b>
                    <br />
                    <ul>
                      <li>
                        <h6>Date Time Requested: </h6>
                        {item.web_upload_list.date_time_requested}
                      </li>
                      <li>
                        <h6>Requisitioner:</h6>
                        {item.web_upload_list.requisitioner} (
                        {item.web_upload_list.position})
                      </li>
                      <li>
                        <h6>File Title:</h6>
                        {item.web_upload_list.upload_title}
                      </li>
                      <li>
                        <h6>Destination:</h6>
                        <ol>
                          {item.web_upload_destination.map((des, index) => (
                            <li key={index}>{des.destination}</li>
                          ))}
                        </ol>
                      </li>
                      <li>
                        <h6>Attachment:</h6>
                        {item.web_upload_file.map((file, index) => (
                          <ul key={index}>
                            <li>
                              <a
                                href={
                                  process.env.REACT_APP_UPLOAD_FOLDER +
                                  "/" +
                                  file.file_name
                                }
                                download={file.file_name}
                              >
                                <AttachFileIcon />
                                {file.file_name}
                              </a>
                            </li>
                          </ul>
                        ))}
                      </li>
                    </ul>
                    <button className={"btn btn-sm btn-info"}>Accept</button>{" "}
                    &nbsp;{" "}
                    <button className={"btn btn-sm btn-outline-danger"}>
                      Reject
                    </button>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
}
