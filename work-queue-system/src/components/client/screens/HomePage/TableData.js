import React from "react";

export default function TableData(props) {
  return (
    <div className={"table-data"}>
      <table className={"table table-hover table-borderless"}>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Inspector</th>
            <th>Status</th>
            <th>Start Date/Time</th>
            <th>End Date/Time</th>
          </tr>
        </thead>
        <tbody>
          {props.data.length > 0 &&
            props.data.map((item) => (
              <tr>
                <td>{item.task_id}</td>
                <td>{item.inspector === null ? "N/A" : item.inspector}</td>
                <td>{item.status === null ? "N/A" : item.status}</td>
                <td>{item.task_start === null ? "N/A" : item.task_start}</td>
                <td>{item.task_end === null ? "N/A" : item.task_end}</td>
              </tr>
            ))}

          {props.data.length < 1 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
