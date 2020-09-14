import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import NavigationBar from "../../../common/NavigationBar";
import ButtonFilter from "./Buttons";
import TableData from "./TableData";
import Paper from "@material-ui/core/Paper";
import { getFromStorage } from "../../../../local_storage";
import { Redirect } from "react-router";
import { fetch_current_user_info } from "../../../../redux/actions/fetch_current_user_info";
import { logout } from "../../../../redux/actions/login_logout";
import { job_request_inputChange } from "../../../../redux/actions/job_request_inputChange";
import { fetch_section_list } from "../../../../redux/actions/fetch_section_list";
import { add_new_job_request } from "../../../../redux/actions/add_new_job_request";
import { remove_add_job_request_messege } from "../../../../redux/actions/add_new_job_request";
import { fetch_user_job_request } from "../../../../redux/actions/fetch_user_job_requests";
import JobRequestForm from "../JobRequest";
import RequestForUpload from "../RequestForUpload";
import CircularProgress from "../../../common/CircularProgress";
import Reactotron from "reactotron-react-js";
const navbarContent = ["Request for upload"];
function HomePage(props) {
  const [redirect, setRedirect] = useState(false);
  const [endSession, setEndSession] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  useEffect(() => {
    setLoading(false);
    const obj = getFromStorage("work-queue");
    if (obj && obj.token) {
      props.fetch_current_user_info(obj.token);
      props.fetch_section_list();
      props.fetch_user_job_request(obj.token);

      if (props.onSubmitJobRequest !== "") {
        if (props.onSubmitJobRequest === "success") {
          const variant = "info";
          props.enqueueSnackbar("Job request successful...", {
            variant,
          });
          setRedirect(true);
          props.remove_add_job_request_messege();
        }
      }
    }
    setEndSession(!(obj && obj.token));
  }, [props._logout, props.match.params.office, props.onSubmitJobRequest]);

  const onSubmitJobRequest = async (e) => {
    e.preventDefault();
    if (props._job_request_form_action_onChange.typeOfWork.length === 0) {
      return setError({
        ...error,
        typeOfWork: "Please indicate the type work needed for your job request",
      });
    }

    await props.add_new_job_request(
      props.current_user.user_id,
      props.match.params.office,
      props._job_request_form_action_onChange
    );
  };

  return (
    <>
      {redirect && <Redirect to={"/client"} />}
      {endSession && <Redirect to={"/login"} />}
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <div className={"row"}>
            <div className={"col-md-12"}>
              {/*navigation bar*/}
              <NavigationBar
                user={props.current_user}
                route={"/client"}
                addRoute={"/upload/"}
                logout={props.logout}
                navbarContent={
                  props.match.params.office === "1" && navbarContent
                }
              />

              {/* <div className={"horizontalLine"}>
                <ReactSVG src={horizontalLine} />
              </div> */}
            </div>
          </div>

          <div className={"row"}>
            <div className={"col-md-2"}></div>
            <div className={"col-md-8"}>
              <Paper elevation={3} className={"paper content-container"}>
                <div className={"jumbotron jumbotron-container"}></div>
                {!props.match.params.office && !props.match.params.upload ? (
                  <>
                    <div>
                      {/* Table*/}
                      <TableData data={props.current_user_job_request_list} />
                    </div>
                  </>
                ) : (
                  ""
                )}

                {/* Job Request Form */}
                {props.match.params.office && (
                  <>
                    <div style={{ height: "7vh" }}></div>
                    <JobRequestForm
                      error={error}
                      sections={props.section_list}
                      office={props.match.params.office}
                      handleChange={props.job_request_inputChange}
                      form_data={props._job_request_form_action_onChange}
                      onSubmitJobRequest={onSubmitJobRequest}
                    />
                  </>
                )}

                {/* Request for upload */}
                {props.match.params.upload && (
                  <>
                    <div style={{ height: "7vh" }}></div>
                    <RequestForUpload />
                  </>
                )}
              </Paper>
            </div>
            <div className={"col-md-2"}>
              <div>
                {!props.match.params.office && !props.match.params.upload && (
                  <>
                    {/*Button control*/}
                    <ButtonFilter sections={props.section_list} />
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    current_user: state.current_system_user,
    current_user_job_request_list: state.fetch_user_job_request,
    _logout: state.logout,
    _job_request_form_action_onChange: state.job_request_inputChange,
    section_list: state.section_list,
    onSubmitJobRequest: state.add_new_job_request,
  };
};

const mapDispatchToProps = {
  fetch_current_user_info,
  logout,
  job_request_inputChange,
  fetch_section_list,
  add_new_job_request,
  remove_add_job_request_messege,
  fetch_user_job_request,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(HomePage));
