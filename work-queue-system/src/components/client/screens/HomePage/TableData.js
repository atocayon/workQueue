import React from "react";

export default function TableData(props) {
  return(
    <div className={"table-data"}>
      <table className={"table table-hover table-borderless"}>
        <thead>
        <tr>
          <th>Task</th>
          <th>Inspector</th>
          <th>Status</th>
          <th>Start Date/Time</th>
          <th>End Date/Time</th>
        </tr>
        </thead>

      </table>
    </div>
  );
}