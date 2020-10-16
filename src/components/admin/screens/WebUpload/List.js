// @flow
import React, { useState, useEffect } from "react";

export default function List(props) {
  return (
    <>
      <table className={"table table-borderless"}>
        <thead>
          <tr>
            <th>Requisitioner</th>
            <th>File Title</th>
            <th>Destination</th>
            <th>Date Requested</th>
          </tr>
        </thead>
        <tbody>
          {props.data.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                No web upload request found
              </td>
            </tr>
          )}
          {props.data.length > 0 &&
            props.data.map((list) => (
              <tr>
                <td>{list.web_upload_list.requisitioner}</td>
                <td>{list.web_upload_list.upload_title}</td>
                <td>
                  <ul>
                    {list.web_upload_destination.map((des) => (
                      <li>{des.destination}</li>
                    ))}
                  </ul>
                </td>
                <td>{list.web_upload_list.date_time_requested}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
