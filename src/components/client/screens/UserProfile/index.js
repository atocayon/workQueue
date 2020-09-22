import React, { useEffect, useState } from "react";
import CircularProgress from "../../../common/CircularProgress";
import userAvatar from "../../../../img/user.png";
import EditIcon from "@material-ui/icons/Edit";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import Form from "./Form";
export default function UserProfile(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const onChangeView = async () => {
    
    if(props.profileView){
       await props.setProfileView(!props.profileView);
       return;
    }

    if(!props.profileView){
      await props.onSubmitUpdateProfile();
      return;
    }
    


  };
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
              {props.profileView && (
                <>
                  <h4>
                    {props.user.secshort} - {props.user.name}
                    <br />
                    <small> ({props.user.position})</small>
                  </h4>
                </>
              )}

              <h6 className={"user-info"}>
                {props.profileView && (
                  <>
                    <small>@{props.user.username}</small>
                    <br />
                    <small>{props.user.email}</small>
                    <br />
                    <small>{props.user.contact}</small>
                  </>
                )}

                {!props.profileView && (
                  <Form
                    user={props.user}
                    inputChange={props.inputChange}
                    update_user_info={props.update_user_info}
                  />
                )}

                <br />
                <br />

                <button
                  className={"btn btn-info btn-sm"}
                  onClick={onChangeView}
                >
                  {props.profileView ? "Update Information" : "Save Changes"}
                </button>
                <br />
                <br />
                {props.profileView && (
                  <button className={"btn btn-outline-info btn-sm"}>
                    Change Password
                  </button>
                )}
              </h6>
            </div>
          </div>
          <div className={"col-md-1"}></div>
        </div>
      </div>
    </>
  );
}
