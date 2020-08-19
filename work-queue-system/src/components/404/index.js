import React from "react";
import logo from "../../img/logo.png";
function NotFoundPage(){
  return(
    <>
      <div className={"row"}>
        <div className={"col-md-12"}>
            <img src={logo} alt={"NMP Logo"} className={"logoOnNotFound"} />
        </div>
      </div>

      <h1 className={"notFoundPage"}>404 Page Not Found</h1>
    </>
  );
}

export default NotFoundPage;