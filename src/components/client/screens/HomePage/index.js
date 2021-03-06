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
import { inputChange } from "../../../../redux/actions/inputChange";
import { fetch_section_list } from "../../../../redux/actions/fetch_section_list";
import { add_new_job_request } from "../../../../redux/actions/add_new_job_request";
import { fetch_user_job_request } from "../../../../redux/actions/fetch_user_job_requests";
import { web_upload_request } from "../../../../redux/actions/web_upload_request";
import { fetch_web_upload_requests } from "../../../../redux/actions/fetch_web_upload_requests";
import { update_user_info } from "../../../../redux/actions/update_user_info";
import { generate_code } from "../../../../redux/actions/changePassword";
import { clear_message } from "../../../../redux/actions/clear_message";
import { changePasswordFunction } from "../../../../redux/actions/changePassword";
import { validateCode } from "../../../../redux/actions/changePassword";
import { handleFilterJobReportsModal } from "../../../../redux/actions/handleFilterJobReportsModal";
import { filterJobRequestReports } from "../../../../redux/actions/filterJobRequestReports";
import { fetch_active_users } from "../../../../redux/actions/fetch_active_users";
import { sort } from "../../../../redux/actions/sort";
import { search } from "../../../../redux/actions/search";
import { handleConfirmJob } from "../../../../redux/actions/handleConfirmJob";
import { handlePrint } from "../../../../redux/actions/handlePrint";
import JobRequestForm from "../JobRequest";
import RequestForUpload from "../RequestForUpload";
import UserProfile from "../../../common/UserProfile";
import JobReports from "../JobReports";
import CircularProgress from "../../../common/CircularProgress";
import Reactotron from "reactotron-react-js";
import io from "socket.io-client";
import UserList from "../../../common/ActiveUsers";
let socket;
const navbarContent = ["Request for upload"];

function HomePage(props) {
  const [redirect, setRedirect] = useState(false);
  const [endSession, setEndSession] = useState(false);
  const [loading, setLoading] = useState(true);
  const [webUploadView, setWebUploadView] = useState(false);
  const [profileView, setProfileView] = useState(true);
  const [changePassword, setChangePassword] = useState(false);
  const [code, setCode] = useState(false);
  const [changePassInputChange, setChangePassInputChange] = useState({
    code: "",
    newPassword: "",
  });
  const [form, setForm] = useState({
    selectedFile: [],
    destination: [],
    file_name: "",
    "NMP Website": false,
    Facebook: false,
  });
  const [uploadPic, setUploadPic] = useState(null);
  const [error, setError] = useState({});
  const [expand, setExpand] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [sortAsc, setSortAsc] = useState(true);
  useEffect(() => {
    socket = io(process.env.REACT_APP_SERVER);
    setLoading(false);
    const obj = getFromStorage("work-queue");
    if (obj && obj.token) {
      async function fetch() {
        await props.fetch_current_user_info(obj.token);
        await props.fetch_section_list();
        await props.fetch_user_job_request(obj.token);
        await props.fetch_web_upload_requests(obj.token);
        await props.fetch_active_users(socket);
      }

      fetch();

      if (props.onSubmitJobRequest !== "") {
        if (props.onSubmitJobRequest === "success") {
          const variant = "info";
          props.enqueueSnackbar("Job request successful...", {
            variant,
          });
          setRedirect(true);
          props.clear_message();
        }
      }

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

          props.clear_message();
        }
      }

      if (props._update_user_info !== "") {
        if (props._update_user_info === "success") {
          const variant = "info";
          props.enqueueSnackbar("User info updated...", {
            variant,
          });
          setProfileView(true);
          props.clear_message();
        }
      }
    }

    if (props._generateCode !== "") {
      if (props._generateCode === "success") {
        const variant = "info";
        props.enqueueSnackbar("The code was sent to your email...", {
          variant,
        });
        // setCode(true);
        setLoading(false);
        props.clear_message();
      }
    }

    if (props._validateCode !== "") {
      if (props._validateCode === "success") {
        props.clear_message();
        setCode(true);
        setChangePassword(true);
        setLoading(false);
      } else {
        const variant = "error";
        props.enqueueSnackbar("Invalid code...", {
          variant,
        });
        setError({ ...error, code: "Invalid code" });
        setLoading(false);
      }
    }

    if (props._changePasswordFunction !== "") {
      if (props._changePasswordFunction === "success") {
        const variant = "info";
        props.enqueueSnackbar("Your password is now changed...", {
          variant,
        });
        props.clear_message();
      }
    }

    if (props._handleConfirmJob !== "") {
      if (props._handleConfirmJob === "success") {
        const variant = "info";
        props.enqueueSnackbar("Job request is now moved to your history...", {
          variant,
        });
        props.clear_message();
      }
    }

    setEndSession(!(obj && obj.token));
  }, [
    props._logout,
    props.match.params,
    props.onSubmitJobRequest,
    props._web_upload_request,
    props._update_user_info,
    props._generateCode,
    props._validateCode,
    props._changePasswordFunction,
    props._handleConfirmJob,
    loading,
  ]);

  const handleLogout = (e) => {
    e.preventDefault();
    props.logout(props.current_user.user_id);
  };

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

  const onSubmitUpdateProfile = () => {
    props.update_user_info(props.current_user);
  };

  const handleUploadPic = (e) => {
    e.preventDefault();

    setUploadPic(URL.createObjectURL(e.target.files[0]));
    console.log(uploadPic);
  };

  const handleChangePassword = ({ target }) => {
    setChangePassInputChange({
      ...changePassInputChange,
      [target.name]: target.value,
    });
  };

  const handleSubmitCode = () => {
    setLoading(true);
    // setChangePassword(true);
    props.validateCode(props.current_user.user_id, changePassInputChange.code);
    // setLoading(true);
  };

  const handleExpand = (val) => {
    if (expand[val]) {
      setExpand({ ...expand, [val]: !expand[val] });
    } else {
      setExpand({ ...expand, [val]: true });
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const sortJobRequestReports = () => {
    setSortAsc(!sortAsc);
    if (sortAsc) {
      return props.current_user_job_request_list.sort((a, b) => {
        return a.item.inspector - b.item.inspector;
      });
    } else {
      return props.current_user_job_request_list.sort((a, b) => {
        return b.item.inspector - a.item.inspector;
      });
    }
  };

  // const filterJobRequestReports = () => {
  //   if (
  //     props.job_reports_filter.start !== "" &&
  //     props.job_reports_filter.end !== ""
  //   ) {
  //     props.filterJobRequestReports(props.job_reports_filter);

  //     props.handleFilterJobReportsModal();
  //   }
  // };

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
                logout={handleLogout}
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
              <Paper elevation={2} className={"paper content-container"}>
                {!props.match.params.office &&
                !props.match.params.upload &&
                !props.match.params.user &&
                !props.match.params.job ? (
                  <>
                    <div className={"jumbotron jumbotron-container"}></div>
                    <div>
                      {/* Table*/}
                      <TableData
                        data={props.current_user_job_request_list}
                        handleExpand={handleExpand}
                        expand={expand}
                        activeStep={activeStep}
                        handleNext={handleNext}
                        handleBack={handleBack}
                        handleReset={handleReset}
                        _sort={props._sort}
                        sort={props.sort}
                        search={props.search}
                        handleConfirmJob={props.handleConfirmJob}
                        print={props.print}
                        handlePrint={props.handlePrint}
                      />
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
                      handleChange={props.inputChange}
                      form_data={props._job_request_form_action_onChange}
                      onSubmitJobRequest={onSubmitJobRequest}
                    />
                  </>
                )}

                {/* Request for upload */}
                {props.match.params.upload && (
                  <>
                    <RequestForUpload
                      expand={expand}
                      activeStep={activeStep}
                      handleNext={handleNext}
                      handleBack={handleBack}
                      handleReset={handleReset}
                      handleExpand={handleExpand}
                      onChangeHandler={webUploadOnChangeHandler}
                      onSubmitForm={onSubmitFormWebUpload}
                      error={error}
                      setError={setError}
                      form={form}
                      setForm={setForm}
                      webUploadView={webUploadView}
                      setWebUploadView={setWebUploadView}
                      web_upload_list={props.list_web_upload_requests}
                      _sort={props._sort}
                      sort={props.sort}
                      search={props.search}
                    />
                  </>
                )}

                {props.match.params.user && (
                  <>
                    <UserProfile
                      error={error}
                      user={props.current_user}
                      setProfileView={setProfileView}
                      profileView={profileView}
                      inputChange={props.inputChange}
                      onSubmitUpdateProfile={onSubmitUpdateProfile}
                      handleUploadPic={handleUploadPic}
                      uploadPic={uploadPic}
                      setUploadPic={setUploadPic}
                      changePassword={changePassword}
                      setChangePassword={setChangePassword}
                      code={code}
                      setCode={setCode}
                      handleChangePassword={handleChangePassword}
                      generate_code={props.generate_code}
                      changePasswordFunction={props.changePasswordFunction}
                      handleSubmitCode={handleSubmitCode}
                      changePassInputChange={changePassInputChange}
                      setLoading={setLoading}
                    />
                  </>
                )}

                {props.match.params.job && (
                  <>
                    <JobReports
                      data={props.current_user_job_request_list}
                      sortJobRequestReports={sortJobRequestReports}
                      sort={sortAsc}
                      inputChange={props.inputChange}
                      filterModal={props.job_reports_filter}
                      handleFilterJobReportsModal={
                        props.handleFilterJobReportsModal
                      }
                      filterJobRequestReports={props.filterJobRequestReports}
                      _sort={props._sort}
                      sort={props.sort}
                      search={props.search}
                      handleExpand={handleExpand}
                      expand={expand}
                      activeStep={activeStep}
                      handleNext={handleNext}
                      handleBack={handleBack}
                      handleReset={handleReset}
                      print={props.print}
                      handlePrint={props.handlePrint}
                    />
                  </>
                )}
              </Paper>
            </div>
            <div className={"col-md-2"}>
              <div className={"userList"}>
                <UserList users={props._fetch_active_users} />
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
    _web_upload_request: state.web_upload_request,
    list_web_upload_requests: state.fetch_web_upload_requests,
    _update_user_info: state.update_user_info,
    _generateCode: state.generateCode,
    _validateCode: state.validateCode,
    _changePasswordFunction: state.changePasswordFunction,
    job_reports_filter: state.job_reports_filter,
    _fetch_active_users: state.fetch_active_users,
    _sort: state.sort,
    _handleConfirmJob: state.handleConfirmJob,
    print: state.print,
  };
};

const mapDispatchToProps = {
  fetch_current_user_info,
  logout,
  inputChange,
  fetch_section_list,
  add_new_job_request,
  fetch_user_job_request,
  web_upload_request,
  fetch_web_upload_requests,
  update_user_info,
  generate_code,
  clear_message,
  changePasswordFunction,
  validateCode,
  handleFilterJobReportsModal,
  filterJobRequestReports,
  fetch_active_users,
  sort,
  search,
  handleConfirmJob,
  handlePrint,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(HomePage));
