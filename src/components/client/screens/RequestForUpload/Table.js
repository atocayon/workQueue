import React from "react";

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
            props.data.map((item) => (
              <tr>
                <td>{item.web_upload_list.upload_title}</td>
                <td>
                  <ul>
                    {item.web_upload_destination.map((des) => (
                      <li>{des.destination}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul>
                    {item.web_upload_file.map((file) => (
                      <li>{file.file_name}</li>
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
