import React from "react";
import GetAppIcon from "@material-ui/icons/GetApp";
export default function Table(props) {
  return (
    <div>
      <table className={"table"}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Upload destination</th>
            <th>File name</th>
            <th>Validator</th>
            <th>Date/Time Requested</th>
          </tr>
        </thead>
        <tbody>
          {props.data &&
            props.data.map((item, index) => (
              <tr key={item.web_upload_list.id}>
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
                          {file.file_name} <GetAppIcon />{" "}
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
            ))}
        </tbody>
      </table>
    </div>
  );
}
