import React, { useEffect, useState } from "react";
import { getFromStorage } from "../../../../local_storage";
import Navbar from "../../../common/NavigationBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import horizontalLine from "../../../../img/horizontal.svg";
import footer from "../../../../img/footer.svg";
import { ReactSVG } from "react-svg";
import HomeIcon from "@material-ui/icons/Home";
import HomePageContent from "./HomePageContent";
import JobRequest from "../JobRequest";
import Reports from "../Reports";
import Settings from "../Settings";
import WebUpload from "../WebUpload";
import AdminSideBar from "../../../common/AdminSideBarNavigation";
import Reactotron from "reactotron-react-js";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import { fetch_current_user_info } from "../../../../redux/actions/fetch_current_user_info";
import { logout } from "../../../../redux/actions/login_logout";
import { fetch_job_requests } from "../../../../redux/actions/fetch_job_requests";
import { clear_message } from "../../../../redux/actions/clear_message";
import { job_request_action } from "../../../../redux/actions/job_request_action";
import { fetch_admin_job } from "../../../../redux/actions/fetch_admin_job";
import { fetch_admin_job_request_reports } from "../../../../redux/actions/fetch_admin_job_request_reports";
import { update_user_info } from "../../../../redux/actions/update_user_info";
import { generate_code } from "../../../../redux/actions/changePassword";
import { changePasswordFunction } from "../../../../redux/actions/changePassword";
import { validateCode } from "../../../../redux/actions/changePassword";
import { fetch_admin_web_upload_list } from "../../../../redux/actions/fetch_web_upload_requests";
import { fetch_admin_web_upload_request } from "../../../../redux/actions/fetch_web_upload_requests";
import { web_upload_request_action } from "../../../../redux/actions/web_upload_request_action";
import { fetch_total_task_rendered_per_office } from "../../../../redux/actions/fetch_total_task_rendered_per_office";
import { fetch_active_users } from "../../../../redux/actions/fetch_active_users";
import { sort } from "../../../../redux/actions/sort";
import { search } from "../../../../redux/actions/search";
import { handleFilterJobReportsModal } from "../../../../redux/actions/handleFilterJobReportsModal";
import { inputChange } from "../../../../redux/actions/inputChange";
import { filterJobRequestReports } from "../../../../redux/actions/filterJobRequestReports";
import { fetch_total_task_rendered } from "../../../../redux/actions/fetch_total_task_rendered";
import { handleOpen } from "../../../../redux/actions/handleRemarksModal";
import { handleClose } from "../../../../redux/actions/handleRemarksModal";
import { handleOpenJobDoneModal } from "../../../../redux/actions/handleJobDoneModal";
import { handleCloseJobDoneModal } from "../../../../redux/actions/handleJobDoneModal";
import { handle_job_done_specification } from "../../../../redux/actions/handle_job_done_specification";
import { handle_submit_job_done } from "../../../../redux/actions/handle_submit_job_done";
import ActiveUsers from "../../../common/ActiveUsers";
import io from "socket.io-client";
let socket;
function AdminHomePage(props) {
  const [loading, setLoading] = useState(true);
  const [endSession, setEndSession] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expand, setExpand] = useState({});
  const [error, setError] = useState({});

  const [webUploadModal, setWebUploadModal] = useState({
    open: false,
    web_upload_id: "",
    title: "",
    status: "",
  });
  const [profileView, setProfileView] = useState(true);
  const [changePassword, setChangePassword] = useState(false);
  const [code, setCode] = useState(false);
  const [changePassInputChange, setChangePassInputChange] = useState({
    code: "",
    newPassword: "",
  });
  const [uploadPic, setUploadPic] = useState(null);

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    socket = io(process.env.REACT_APP_SERVER);
    const obj = getFromStorage("work-queue");
    if (obj && obj.token) {
      props.fetch_current_user_info(obj.token);
      props.fetch_job_requests(obj.token);
      props.fetch_admin_job(obj.token);
      props.fetch_admin_job_request_reports(obj.token);
      props.fetch_admin_web_upload_list(obj.token);
      props.fetch_admin_web_upload_request();
      props.fetch_total_task_rendered_per_office(obj.token);
      props.fetch_total_task_rendered(obj.token);
      props.fetch_active_users(socket);
    }
    setLoading(false);
    setEndSession(!(obj && obj.token));
    if (props._job_request_action !== "") {
      if (props._job_request_action === "success") {
        setError({});
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

    if (props._web_upload_request_action !== "") {
      if (props._web_upload_request_action === "success") {
        setWebUploadModal({
          ...webUploadModal,
          open: false,
          web_upload_id: "",
          title: "",
          status: "",
        });

        props.clear_message();
      }
    }

    if (props.jobDoneModal.message !== "") {
      if (props.jobDoneModal.message === "success") {
        props.clear_message();
      }
    }
  }, [
    props._logout,
    props._job_request_action,
    props._update_user_info,
    props._generateCode,
    props._validateCode,
    props._changePasswordFunction,
    props._web_upload_request_action,
    props.jobDoneModal.message,
    loading,
  ]);

  const onClickExpand = (val) => {
    // console.log(val);
    if (expand[val]) {
      setExpand({ ...expand, [val]: !val });
    } else {
      setExpand({ ...expand, [val]: true });
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      props.remarksModal.title === "Update" &&
      props.remarksModal.update !== "" &&
      props.remarksModal.remarks !== ""
    ) {
      props.job_request_action(
        props.current_user.user_id,
        props.remarksModal.task_id,
        props.remarksModal.update,
        props.remarksModal.remarks
      );
      return;
    }

    if (
      props.remarksModal.title === "Update" &&
      props.remarksModal.update === "" &&
      props.remarksModal.remarks === ""
    ) {
      return setError({
        ...error,
        update: "Update is required",
        remarks: "Remarks is required",
      });
    }

    if (
      props.remarksModal.title !== "Update" &&
      props.remarksModal.remarks !== ""
    ) {
      props.job_request_action(
        props.current_user.user_id,
        props.remarksModal.task_id,
        props.remarksModal.title,
        props.remarksModal.remarks
      );
      return;
    }
    if (
      props.remarksModal.title !== "Update" &&
      props.remarksModal.remarks === ""
    ) {
      return setError({ ...error, remarks: "Remarks is required" });
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    props.logout(props.current_user.user_id);
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleOpenWebUploadModal = (val) => {
    if (val.status === "Done") {
      props.web_upload_request_action(
        props.current_user.user_id,
        val.id,
        val.status
      );
    } else {
      setWebUploadModal({
        ...webUploadModal,
        open: !webUploadModal.open,
        web_upload_id: val.id,
        title: val.title,
        status: val.status,
      });
    }
  };

  const handleCloseWebUploadModal = () => {
    setWebUploadModal({ ...webUploadModal, open: false });
  };

  const handleUpdateModal = ({ target }) => {
    setWebUploadModal({
      ...webUploadModal,
      [target.name]: target.value,
    });
  };

  const handleConfirmWebUpload = () => {
    props.web_upload_request_action(
      props.current_user.user_id,
      webUploadModal.web_upload_id,
      webUploadModal.status
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
        <div className={"row"}>
          <div className={"col-md-12"}>
            <Navbar
              user={props.current_user}
              route={"/admin"}
              logout={handleLogout}
            />
          </div>

          <div className={"col-md-2"}>
            <AdminSideBar
              user={props.current_user}
              jobRequest={props._fetch_job_requests}
            />
          </div>
          <div className={"col-md-8"}>
            <Paper
              elevation={3}
              className={"paper content-container"}
              style={{ overflow: "auto", paddingBottom: "30vh" }}
            >
              {/* Route */}
              {!props.match.params.route && (
                <>
                  <HomePageContent
                    error={error}
                    data={props._fetch_admin_job}
                    remarksModal={props.remarksModal}
                    expand={expand}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onClickExpand={onClickExpand}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    handleClickOpenRemarksModal={props.handleOpen}
                    handleCloseRemarksModal={props.handleClose}
                    handleChangeRemarks={props.inputChange}
                    handleSubmit={handleSubmit}
                    activeStep={activeStep}
                    handleNext={handleNext}
                    handleBack={handleBack}
                    handleReset={handleReset}
                    sort={props.sort}
                    _sort={props._sort}
                    search={props.search}
                    jobDoneModal={props.jobDoneModal}
                    handleOpenJobDoneModal={props.handleOpenJobDoneModal}
                    handleCloseJobDoneModal={props.handleCloseJobDoneModal}
                    handle_job_done_specification={
                      props.handle_job_done_specification
                    }
                    handle_submit_job_done={props.handle_submit_job_done}
                  />
                </>
              )}

              {props.match.params.route === "jobrequest" && (
                <>
                  <JobRequest
                    error={error}
                    remarksModal={props.remarksModal}
                    expand={expand}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onClickExpand={onClickExpand}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    handleClickOpenRemarksModal={props.handleOpen}
                    handleCloseRemarksModal={props.handleClose}
                    job_requests={props._fetch_job_requests}
                    handleChangeRemarks={props.inputChange}
                    handleSubmit={handleSubmit}
                    sort={props.sort}
                    _sort={props._sort}
                    search={props.search}
                  />
                </>
              )}
              {props.match.params.route === "reports" && (
                <>
                  <Reports
                    data={props._fetch_admin_job_request_reports}
                    task_per_office={
                      props._fetch_total_task_rendered_per_office
                    }
                    sort={props.sort}
                    _sort={props._sort}
                    search={props.search}
                    handleFilterJobReportsModal={
                      props.handleFilterJobReportsModal
                    }
                    filterModal={props.job_reports_filter}
                    inputChange={props.inputChange}
                    filterJobRequestReports={props.filterJobRequestReports}
                    task_rendered={props._fetch_total_task_rendered}
                  />
                </>
              )}
              {props.match.params.route === "user" && (
                <>
                  <Settings
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

              {props.current_user.secid === "1" &&
                props.match.params.route === "webupload" && (
                  <>
                    <WebUpload
                      modal={webUploadModal}
                      handleOpenWebUploadModal={handleOpenWebUploadModal}
                      handleCloseWebUploadModal={handleCloseWebUploadModal}
                      handleUpdateModal={handleUpdateModal}
                      expand={expand}
                      onClickExpand={onClickExpand}
                      list={props._fetch_admin_web_upload_list}
                      request={props._fetch_admin_web_upload_request}
                      handleConfirmWebUpload={handleConfirmWebUpload}
                      activeStep={activeStep}
                      handleNext={handleNext}
                      handleBack={handleBack}
                      handleReset={handleReset}
                      sort={props.sort}
                      _sort={props._sort}
                      search={props.search}
                    />
                  </>
                )}
            </Paper>
          </div>
          <div className={"col-md-2"}>
            <ActiveUsers users={props._fetch_active_users} />
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    current_user: state.current_system_user,
    _logout: state.logout,
    _fetch_job_requests: state.fetch_job_requests,
    _job_request_action: state.job_request_action,
    _fetch_admin_job: state.fetch_admin_job,
    _fetch_admin_job_request_reports: state.fetch_admin_job_request_reports,
    _update_user_info: state.update_user_info,
    _generateCode: state.generateCode,
    _validateCode: state.validateCode,
    _changePasswordFunction: state.changePasswordFunction,
    _fetch_admin_web_upload_list: state.fetch_admin_web_upload_list,
    _fetch_admin_web_upload_request: state.fetch_admin_web_upload_request,
    _web_upload_request_action: state.web_upload_request_action,
    _fetch_total_task_rendered_per_office:
      state.fetch_total_task_rendered_per_office,
    _fetch_total_task_rendered: state.fetch_total_task_rendered,
    _fetch_active_users: state.fetch_active_users,
    _sort: state.sort,
    job_reports_filter: state.job_reports_filter,
    remarksModal: state.remarksModal,
    jobDoneModal: state.jobDoneModal,
  };
};

const mapDispatchToProps = {
  fetch_current_user_info,
  logout,
  fetch_job_requests,
  clear_message,
  job_request_action,
  fetch_admin_job,
  fetch_admin_job_request_reports,
  update_user_info,
  generate_code,
  changePasswordFunction,
  validateCode,
  fetch_admin_web_upload_list,
  fetch_admin_web_upload_request,
  web_upload_request_action,
  fetch_total_task_rendered_per_office,
  fetch_total_task_rendered,
  fetch_active_users,
  sort,
  search,
  handleFilterJobReportsModal,
  inputChange,
  filterJobRequestReports,
  handleOpen,
  handleClose,
  handleOpenJobDoneModal,
  handleCloseJobDoneModal,
  handle_job_done_specification,
  handle_submit_job_done,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(AdminHomePage));
