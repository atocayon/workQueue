// @flow
import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import userAvatar from "../../../../img/user.png";
export default function Settings(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
      {loading ? (
        <div className={"loading"}>
          <h5>
            <CircularProgress />
            <br />
            Please wait...
          </h5>
        </div>
      ) : (
        <>
          <div className={"container"}>
            <div className={"row"}>
              <div className={"col-md-12"}>
                <div className={"admin-settings-container"}>
                  <div className={"jumbotron"}></div>
                  <div className={"userInfo"}>
                    <img src={userAvatar} />

                    <h5>Username</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col-md-2"}></div>
          </div>
        </>
      )}
    </>
  );
}
