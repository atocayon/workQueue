import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../img/logo.png";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
export default function NavigationBar(props) {
  return (
    <>
      <div className="navbar">
        <div>
          <img alt={"NMP Logo"} src={logo} className={"logo"} />
        </div>

        <div className={"user"}>
          <ul className="horizontal-list">
            {props.navbarContent &&
              props.navbarContent.map((content) => {
                const lowerString = content.toLowerCase();
                const rmv_whiteSpace = lowerString.replace(/\s/g, "");
                return (
                  <li key={content}>
                    <Link
                      to={
                        rmv_whiteSpace === "home"
                          ? "/admin"
                          : "/admin/" + rmv_whiteSpace
                      }
                      className={"navbarContent"}
                    >
                      {" "}
                      &nbsp;&nbsp; {content}
                    </Link>
                  </li>
                );
              })}
            <li>
              <Link to={"/profile"}>
                <span className={"username"}>Current Username</span>&nbsp;
                <AccountCircleIcon />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
