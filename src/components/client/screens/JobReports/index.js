import React from "react";

export default function JobReports(props) {
  const data = props.data.filter((item) => item.inspector !== null);
  return (
    <div className={"job-request-container"}>
      <div className={"jumbotron"}>
        <h3>
          Job Request&nbsp;
          <span className={"text-info"}>Reports</span>
        </h3>
      </div>

      <table className={"table table-hover table-borderless"}>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Inspector</th>
            <th>Scope of work</th>
            <th>Deadline</th>
            <th>Start</th>
            <th>End</th>
            <th>Date Requested</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.task_id}</td>
                <td>{item.inspector}</td>
                <td>{item.scope_of_work}</td>
                <td>{item.date_needed}</td>
                <td>{item.task_start}</td>
                <td>{item.task_end}</td>
                <td>{item.date_requested}</td>
              </tr>
            ))}

          {data.length < 1 && (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
