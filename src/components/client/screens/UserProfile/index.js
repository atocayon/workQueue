import React, { useEffect, useState } from "react";
import CircularProgress from "../../../common/CircularProgress";
import userAvatar from "../../../../img/user.png";
import EditIcon from "@material-ui/icons/Edit";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
export default function UserProfile(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
      {loading && <CircularProgress />}
      <div className={"user-profile-container"}>
        <div className={"jumbotron"}></div>
        <div className={"row"}>
          <div className={"col-md-1"}></div>
          <div className={"col-md-10"}>
            <div>
              <div className={"row"}>
                <div className={"col-md-4"}></div>
                <div className={"col-md-4"}>
                  <div className={" avatar-container"}>
                    <img src={userAvatar} alt={"avatar"} className={"image"} />
                    <div className={"btn-edit-avatar"}>
                      <div>
                        <button className={"btn"}>
                          <span>
                            {" "}
                            <CameraAltIcon /> Upload
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <br />
              <h4>
                {props.user.secshort} - {props.user.name}
                <br />
                <small> ({props.user.position})</small>
              </h4>
              <h6 className={"user-info"}>
                <small>@{props.user.username}</small>
                <br />
                <small>{props.user.email}</small>
                <br />
                <small>{props.user.contact}</small>
              </h6>
            </div>
          </div>
          <div className={"col-md-1"}></div>
        </div>
      </div>
    </>
  );
}
