import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import NavigationBar from "../../../common/NavigationBar";
import ButtonFilter from "./Buttons";
import TableData from "./TableData";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getFromStorage } from "../../../../local_storage";
import { Redirect } from "react-router";
import horizontalLine from "../../../../img/horizontal.svg";
import { ReactSVG } from "react-svg";
import { fetch_current_user_info } from "../../../../redux/actions/fetch_current_user_info";
import { logout } from "../../../../redux/actions/login_logout";
import { job_request_inputChange } from "../../../../redux/actions/job_request_inputChange";
import { fetch_section_list } from "../../../../redux/actions/fetch_section_list";
import { add_new_job_request } from "../../../../redux/actions/add_new_job_request";
import JobRequestForm from "../JobRequest";
import Reactotron from "reactotron-react-js";
function HomePage(props) {
  const [endSession, setEndSession] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  useEffect(() => {
    setLoading(false);
    const obj = getFromStorage("work-queue");
    if (obj && obj.token) {
      props.fetch_current_user_info(obj.token);
      props.fetch_section_list();
    }
    setEndSession(!(obj && obj.token));
  }, [props._logout, props.match.params.office]);

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
      {endSession && <Redirect to={"/login"} />}
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
          <div className={"row"}>
            <div className={"col-md-12"}>
              {/*navigation bar*/}
              <NavigationBar
                user={props.current_user}
                route={"/client"}
                logout={props.logout}
              />

              <div className={"horizontalLine"}>
                <ReactSVG src={horizontalLine} />
              </div>
            </div>
          </div>

          <div className={"row"}>
            <div className={"col-md-1"}></div>
            <div className={"col-md-10"}>
              {!props.match.params.office && (
                <>
                  {/* Table*/}
                  <TableData />

                  {/*Button control*/}
                  <ButtonFilter sections={props.section_list} />
                </>
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
            </div>
            <div className={"col-md-1"}></div>
          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    current_user: state.current_system_user,
    _logout: state.logout,
    _job_request_form_action_onChange: state.job_request_inputChange,
    section_list: state.section_list,
  };
};

const mapDispatchToProps = {
  fetch_current_user_info,
  logout,
  job_request_inputChange,
  fetch_section_list,
  add_new_job_request,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(HomePage));
