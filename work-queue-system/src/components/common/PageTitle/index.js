// @flow
import React from "react";

export default function PageTitle(props) {
  return (
    <div>
      <h3>
        {props.page && props.page} <br />{" "}
        {props.section && props.section.map((sec) => (
          <small key={sec}>{sec.secshort}</small>
        ))}
      </h3>
    </div>
  );
}
