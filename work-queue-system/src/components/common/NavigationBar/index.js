import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../img/logo.png";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
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
                      style={
                        !props.activeLink && rmv_whiteSpace === "home"
                          ? {
                              fontWeight: "bold",
                              background: "#fff",
                              color: "#141F46",
                              padding: "0.5vw",
                            }
                          : props.activeLink === rmv_whiteSpace
                          ? {
                              fontWeight: "bold",
                              background: "#fff",
                              color: "#141F46",
                              padding: "0.5vw",
                            }
                          : null
                      }
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
              <Link className={"username"}>
                <span>
                  <button
                    title={"Logout"}
                    className={"btn btn-sm"}
                    onClick={() => {
                      props.logout(props.user.user_id);
                    }}
                  >
                    <PowerSettingsNewIcon />
                  </button>
                  <Link to={"/admin/" + props.user.user_id}>
                    {props.user && props.user.username}
                  </Link>
                </span>
                &nbsp;
                <AccountCircleIcon />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
