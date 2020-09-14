import React from "react";
import SideBarNavigation from "./SideBarNavigation";
export default function SideBar(props) {
  return <SideBarNavigation user={props.user} sections={props.sections} />;
}
