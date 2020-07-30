import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../img/logo.png";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
export default function NavigationBar(props) {

  return (
      <>

            <div className="navbar">
              <div>
                  <img alt={"NMP Logo"} src={logo} className={"logo"} />
              </div>

              <div className={"user"}>

                <Link to={"/profile"}>
                   <span className={"username"}>
                      Current Username
                  </span>&nbsp;
                  <AccountCircleIcon  />
                </Link>
              </div>


            </div>


      </>
);
}
