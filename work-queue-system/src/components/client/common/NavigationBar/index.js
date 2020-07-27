import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../../img/logo.png";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
export default function NavigationBar(props) {

  return (
      <>
        <div className={"row"}>
          <div className={"col-md-12"}>
            <nav className="navbar justify-content-between">
              <Link to={"/"} className="navbar-brand">
                <img src={logo} className={"logo"} />
              </Link>

              <Link to={"/profile"}>
                <AccountCircleIcon className={"user"} />
              </Link>
            </nav>
          </div>
        </div>

      </>
);
}
