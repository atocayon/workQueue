import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import NavigationBar from "../../../common/NavigationBar";
import SideBarNavigation from "../../../common/SideBarNavigation";
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
import { web_upload_request } from "../../../../redux/actions/web_upload_request";
import { fetch_web_upload_requests } from "../../../../redux/actions/fetch_web_upload_requests";
import { clear_web_upload_message } from "../../../../redux/actions/web_upload_request";
import JobRequestForm from "../JobRequest";
import RequestForUpload from "../RequestForUpload";
import CircularProgress from "../../../common/CircularProgress";
import Reactotron from "reactotron-react-js";
const navbarContent = ["Request for upload"];
function HomePage(props) {
  const [redirect, setRedirect] = useState(false);
  const [endSession, setEndSession] = useState(false);
  const [loading, setLoading] = useState(true);
  const [webUploadView, setWebUploadView] = useState(false);
  const [form, setForm] = useState({
    selectedFile: [],
    destination: [],
    file_name: "",
    "NMP Website": false,
    Facebook: false,
  });
  const [error, setError] = useState({});
  useEffect(() => {
    setLoading(false);
    const obj = getFromStorage("work-queue");
    if (obj && obj.token) {
      props.fetch_current_user_info(obj.token);
      props.fetch_section_list();
      props.fetch_user_job_request(obj.token);
      props.fetch_web_upload_requests(obj.token);

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

      Reactotron.log("Checking");
      Reactotron.log(props._web_upload_request);
      if (props._web_upload_request !== "") {
        if (props._web_upload_request === "success") {
          const variant = "info";
          props.enqueueSnackbar("Web upload request successful...", {
            variant,
          });

          setForm({
            ...form,
            selectedFile: [],
            destination: [],
            file_name: "",
            "NMP Website": false,
            Facebook: false,
          });

          setWebUploadView(true);

          props.clear_web_upload_message();
        }
      }
    }
    setEndSession(!(obj && obj.token));
  }, [
    props._logout,
    props.match.params.office,
    props.onSubmitJobRequest,
    props._web_upload_request,
  ]);

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

  const webUploadOnChangeHandler = (e) => {
    e.preventDefault();

    if (e.target.type === "checkbox") {
      if (e.target.checked) {
        setForm({
          ...form,
          destination: [...form.destination, e.target.name],
          [e.target.name]: !form[e.target.name],
        });
      } else {
        let arr = [...form.destination];
        let remove = form.destination
          .map((item) => {
            return item.value;
          })
          .indexOf(e.target.name);
        arr.splice(remove, 1);

        setForm({
          ...form,
          destination: [...arr],
          [e.target.name]: !form[e.target.name],
        });
      }
    }
    if (e.target.type === "text") {
      setForm({ ...form, [e.target.name]: e.target.value });
    }

    if (e.target.type === "file") {
      setForm({ ...form, selectedFile: e.target.files });
    }
  };

  const webUploadformValidation = () => {
    let error = {};
    if (form.selectedFile.length < 1) error.file = "Please select a file";
    if (!form.file_name) error.file_name = "File name is required";
    if (form.destination.length < 1)
      error.checkbox = "Please select the upload destination";

    setError(error);
    return Object.keys(error).length === 0;
  };

  const onSubmitFormWebUpload = (e) => {
    e.preventDefault();
    if (!webUploadformValidation()) {
      return;
    }

    const { selectedFile, destination, file_name } = form;
    const _form = new FormData();

    for (let i = 0; i < selectedFile.length; i++) {
      _form.append("file", selectedFile[i]);
    }

    _form.append("destination", destination);
    _form.append("file_name", file_name);
    _form.append("requisitioner", props.current_user.user_id);

    props.web_upload_request(_form);
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
              <NavigationBar
                user={props.current_user}
                route={"/client"}
                addRoute={"/upload/"}
                logout={props.logout}
                navbarContent={
                  props.match.params.office === "1" && navbarContent
                }
              />
            </div>
          </div>

          <div className={"row"}>
            <div className={"col-md-2"}>
              <SideBarNavigation
                sections={props.section_list}
                user={props.current_user}
              />
            </div>
            <div className={"col-md-8"}>
              <Paper elevation={3} className={"paper content-container"}>
                {!props.match.params.office && !props.match.params.upload ? (
                  <>
                    <div className={"jumbotron jumbotron-container"}></div>
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
                    <JobRequestForm
                      params={props.match.params.office}
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
                    <RequestForUpload
                      onChangeHandler={webUploadOnChangeHandler}
                      onSubmitForm={onSubmitFormWebUpload}
                      error={error}
                      setError={setError}
                      form={form}
                      setForm={setForm}
                      webUploadView={webUploadView}
                      setWebUploadView={setWebUploadView}
                      web_upload_list={props.list_web_upload_requests}
                    
                    />
                  </>
                )}
              </Paper>
            </div>
            <div className={"col-md-2"}></div>
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
    _web_upload_request: state.web_upload_request,
    list_web_upload_requests: state.fetch_web_upload_requests,
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
  web_upload_request,
  fetch_web_upload_requests,
  clear_web_upload_message,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(HomePage));
