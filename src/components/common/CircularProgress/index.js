// @flow
import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Progress() {
  return (
    <div className={"loading"}>
    <h5>
      <CircularProgress />
      <br />
      Please wait...
    </h5>
  </div>
  );
};