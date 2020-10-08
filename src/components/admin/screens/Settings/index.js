// @flow
import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import UserProfile from "../../../common/UserProfile";
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
          <UserProfile
            error={props.error}
            user={props.user}
            setProfileView={props.setProfileView}
            profileView={props.profileView}
            inputChange={props.inputChange}
            onSubmitUpdateProfile={props.onSubmitUpdateProfile}
            handleUploadPic={props.handleUploadPic}
            uploadPic={props.uploadPic}
            setUploadPic={props.setUploadPic}
            changePassword={props.changePassword}
            setChangePassword={props.setChangePassword}
            code={props.code}
            setCode={props.setCode}
            handleChangePassword={props.handleChangePassword}
            generate_code={props.generate_code}
            changePasswordFunction={props.changePasswordFunction}
            handleSubmitCode={props.handleSubmitCode}
            changePassInputChange={props.changePassInputChange}
            setLoading={props.setLoading}
          />
        </>
      )}
    </>
  );
}
