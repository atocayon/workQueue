import React, { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import sideImg from "../../img/Untitled-1.svg";
import logo from "../../img/logo.svg";
import userAvatar from "../../img/user.svg";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import InputField from "../common/textField/InputField";
import CircularProgress from '@material-ui/core/CircularProgress';

function Login(props){
  const [loading, setLoading] = useState(true);
  const [visiblePass, setVisiblePass] = useState(false);

  useEffect(() => {
      setLoading(false);
  }, []);

  const onSubmit = () => {};

  const onChange = () => {};

  return(
    <>
      {loading ? (
        <div className={"loading"}>

          <h5>
            <CircularProgress />
            <br/>
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

                      <form onSubmit={onSubmit}>
                        <h5 className={"login-header"}>WELCOME</h5>
                        <br />
                        <InputField
                          id={"email"}
                          label={"Username or Email"}
                          name={"emailOrPassword"}
                          onChange={onChange}
                          // error={error.email}
                          type={"text"}
                        />
                        <br />
                        <br />
                        <FormControl fullWidth>
                          <InputLabel
                            // style={error.password && { color: "red" }}
                          >
                            Password
                          </InputLabel>
                          <Input
                            className={"password-input"}
                            id={"password"}
                            name={"password"}
                            onChange={onChange}
                            type={visiblePass ? "text" : "password"}
                            // style={
                            //   error.password && {
                            //     borderBottom: "1px solid red",
                            //     color: "red",
                            //   }
                            // }
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  title={"clear"}
                                  aria-label="toggle password visibility"
                                  onClick={() => {
                                    setVisiblePass(!visiblePass);
                                  }}
                                  onMouseDown={() => {
                                    setVisiblePass(!visiblePass);
                                  }}
                                  edge="end"
                                >
                                  {visiblePass ? (
                                    <VisibilityOffIcon />
                                  ) : (
                                    <VisibilityIcon />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                          {/*<small style={{ color: "red" }}>*/}
                          {/*  {error.password}*/}
                          {/*</small>*/}
                        </FormControl>

                        <br />
                        <br />
                        <div className={"login-btn-container"}>
                          <button
                            className={"btn btn-primary login-btn"}
                            type={"submit"}
                          >
                            Login
                          </button>
                        </div>
                      </form>
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


export default Login;