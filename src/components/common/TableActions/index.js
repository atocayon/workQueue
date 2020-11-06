// @flow
import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import SortIcon from "@material-ui/icons/Sort";
import ExtensionOutlinedIcon from "@material-ui/icons/ExtensionOutlined";

export default function index(props) {
  return (
    <div className={"row"}>
      <div className={"col-md-6"}>
        <button
          className={"btn"}
          onClick={props.sort.bind(null, props._sort === "asc" ? "dsc" : "asc")}
        >
          <SortIcon />{" "}
          {props._sort === "asc" ? "Sort Descending" : "Sort Ascending"}
        </button>
        &nbsp;
        {props.filter && (
          <button
            title={"Filter data"}
            className={"btn btn-sm"}
            onClick={props.handleFilterJobReportsModal}
          >
            <ExtensionOutlinedIcon />
            &nbsp;Filter
          </button>
        )}
      </div>
      <div className={"col-md-6"}>
        <form>
          <div className={"input-group"}>
            <div className={"input-group-prepend"}>
              <button type={"submit"} className={"btn btn-outline-info"}>
                <SearchIcon />
              </button>
            </div>
            <input
              type={"text"}
              className={"form-control"}
              onChange={props.search}
              placeholder={props.placeholder || "Search Task Id or Inpector..."}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
