import React, { useEffect, useState } from "react";
import CircularProgress from "../CircularProgress";
import userAvatar from "../../../img/user.png";
import EditIcon from "@material-ui/icons/Edit";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import Form from "./Form";
import ChangePass from "./ChangePass";
import Code from "./Code";
import Reactotron from "reactotron-react-js";
export default function UserProfile(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    Reactotron.log("======");
    Reactotron.log(props.changePassword);
  }, []);

  const onChangeView = async () => {
    if (props.profileView) {
      await props.setProfileView(!props.profileView);
      return;
    }

    if (!props.profileView) {
      await props.onSubmitUpdateProfile();
      return;
    }
  };

  const onClickChangePassword = async (e) => {
    e.preventDefault();
    if (!props.code) {
      Reactotron.log("False it code");
      await props.setChangePassword(!props.changePassword);
      await props.setLoading(true);
      await props.generate_code(props.user.user_id, props.user.email);

      if (props.changePassInputChange.code !== "" && props.changePassInputChange.newPassword === "") {
        await props.handleSubmitCode();
      }
    }

    if (props.code) {
      Reactotron.log("true it code");
      if (props.changePassInputChange.code !== "" && props.changePassInputChange.newPassword !== "") {
        props.changePasswordFunction(props.user.user_id, props.changePassInputChange.newPassword);
      }
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
                    <img
                      src={
                        props.uploadPic !== null ? props.uploadPic : userAvatar
                      }
                      alt={"avatar"}
                      className={"image"}
                    />
                    <div className={"btn-edit-avatar"}>
                      <div>
                        <span>
                          <CameraAltIcon /> Upload
                        </span>
                        <input
                          type={"file"}
                          onChange={props.handleUploadPic}
                          accept="image/x-png,image/gif,image/jpeg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <br />
              {props.profileView && !props.changePassword ? (
                <>
                  <h4>
                    {props.user.secshort} - {props.user.name}
                    <br />
                    <small> ({props.user.position})</small>
                  </h4>
                </>
              ) : (
                ""
              )}

              <h6 className={"user-info"}>
                {props.profileView && !props.changePassword ? (
                  <>
                    <small>@{props.user.username}</small>
                    <br />
                    <small>{props.user.email}</small>
                    <br />
                    <small>{props.user.contact}</small>
                  </>
                ) : (
                  ""
                )}

                {!props.profileView && (
                  <Form
                    user={props.user}
                    inputChange={props.inputChange}
                    update_user_info={props.update_user_info}
                  />
                )}

                {props.changePassword && (
                  <>
                    {!props.code ? (
                      <Code
                        error={props.error}
                        handleChangePassword={props.handleChangePassword}
                        inputValue={props.changePassInputChange}
                      />
                    ) : (
                      <ChangePass
                        handleChangePassword={props.handleChangePassword}
                        inputValue={props.changePassInputChange}
                      />
                    )}
                  </>
                )}

                <br />
                <br />

                {!props.changePassword && (
                  <button
                    className={"btn btn-info btn-sm"}
                    onClick={onChangeView}
                  >
                    {props.profileView ? "Update Information" : "Save Changes"}
                  </button>
                )}

                <br />
                <br />

                {props.profileView && (
                  <>
                    <button
                      className={"btn btn-outline-info btn-sm"}
                      onClick={onClickChangePassword}
                    >
                      {!props.changePassword
                        ? "Change Password"
                        : props.code
                        ? "Change Password"
                        : "Submit"}
                    </button>
                  </>
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
