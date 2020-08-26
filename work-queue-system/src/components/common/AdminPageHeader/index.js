// @flow
import * as React from "react";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
export default function index(props) {
  return (
    <div className={"adminPageHeader"}>
      <div className={"adminHeaderContainer"}>
        <div className={"row"}>
          <div className={"col-md-6 header-text"}>
            <h1>Ticket Name</h1>
            <small>Task Type</small>
          </div>
          <div className={"col-md-6 btn-header-show-more"}>
            <button className={"btn btn-lg btn-expand-more"} title={"Expand more"}>
                <ExpandMoreIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
