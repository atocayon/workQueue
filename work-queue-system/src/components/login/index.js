import React, { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import sideImg from "../../img/Untitled-1.svg";
import logo from "../../img/logo.svg";
import userAvatar from "../../img/user.svg";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import { validation } from "./callbacks";
import { login } from "../../redux/actions/login_logout";
import { logout } from "../../redux/actions/login_logout";
import Form from "./Form";
import Reactotron from "reactotron-react-js";
function Login(props) {
  const [loading, setLoading] = useState(true);
  const [visiblePass, setVisiblePass] = useState(false);
  const [loginCreds, setLoginCreds] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [error, setError] = useState({});
  useEffect(() => {
    setLoading(false);

    if (Object.keys(props._login).length > 0) {
      if (props._login.message === "unrecognized") {
        const variant = "error";
        props.enqueueSnackbar("Unrecognize username or email...", {
          variant,
        });

        setError({
          ...error,
          usernameOrEmail: "Unrecognize username or email",
        });
      }

      if (props._login.message === "incorrect") {
        const variant = "error";
        props.enqueueSnackbar("Incorrect Password...", {
          variant,
        });
        setError({ ...error, password: "Incorrect Password" });
      }
    }
  }, [props._login]);

  const onSubmit = (e) => {
    e.preventDefault();
    Reactotron.log("submit");
    if (!validation(setError, loginCreds)) {
      const variant = "error";
      props.enqueueSnackbar("Username or Email and Password is required...", {
        variant,
      });
      return;
    }

    props.login(loginCreds);

    // const variant = "success";
    // props.enqueueSnackbar("Login Success", {
    //   variant,
    // });
  };

  const onChange = ({ target }) => {
    setLoginCreds({ ...loginCreds, [target.name]: target.value });
  };

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
        <div className={"row"}>
          <div className={"col-md-4"}>
            <ReactSVG
              src={sideImg}
              className={"sideImg"}
              beforeInjection={(svg) => {
                svg.classList.add("svg-class-name");
                svg.setAttribute("style", "height: 100vh");
              }}
            />

            <div className={"copyrights"}>
              <small>&copy; IMS_2020</small>
            </div>
          </div>
          <div className={"col-md-4"}>
            <ReactSVG src={logo} alt={"nmp_logo"} className={"logoLogin"} />
          </div>
          <div className={"col-md-4"}>
            <div className={"row"}>
              <div className={"col-md-12"}>
                <div className={"paper-container"}>
                  <div className={"row flex"}>
                    <div className={"col-md-12"}>
                      <div className={"logo-container"}>
                        <ReactSVG src={userAvatar} className={"userAvatar"} />
                      </div>
                    </div>
                  </div>

                  <div className={"row"}>
                    <div className={"col-md-2"}></div>
                    <div className={"col-md-8"}>
                      <hr className={"hr"} />
                      <Form
                        onSubmit={onSubmit}
                        onChange={onChange}
                        error={error}
                        visiblePass={visiblePass}
                        setVisiblePass={setVisiblePass}
                      />
                    </div>
                    <div className={"col-md-2"}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    _login: state.login,
    _logout: state.logout,
  };
};

const mapDispatchToProps = {
  login,
  logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Login));
