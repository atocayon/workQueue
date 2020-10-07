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
function AdminHomePage(props) {
  const [loading, setLoading] = useState(true);
  const [endSession, setEndSession] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expand, setExpand] = useState({});
  const [error, setError] = useState({});
  const [remarksModal, setRemarksModal] = useState({
    open: false,
    title: "",
    task_id: "",
    remarks: "",
    update: "",
  });
  useEffect(() => {
    const obj = getFromStorage("work-queue");
    if (obj && obj.token) {
      props.fetch_current_user_info(obj.token);
      props.fetch_job_requests(obj.token);
      props.fetch_admin_job(obj.token);
    }
    setLoading(false);
    setEndSession(!(obj && obj.token));
    if (props._job_request_action !== "") {
      if (props._job_request_action === "success") {
        setRemarksModal({ ...remarksModal, open: false });
        setError({});
        props.clear_message();
      }
    }
  }, [props._logout, props._job_request_action]);

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

  const handleClickOpenRemarksModal = (val) => {
    setRemarksModal({
      ...remarksModal,
      task_id: val.id,
      title: val.title,
      open: !remarksModal.open,
    });
  };

  const handleCloseRemarksModal = () => {
    setRemarksModal({ ...remarksModal, open: !remarksModal.open });
  };

  const handleChangeRemarks = ({ target }) => {
    setRemarksModal({ ...remarksModal, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      remarksModal.title === "Update" &&
      remarksModal.update !== "" &&
      remarksModal.remarks !== ""
    ) {
      props.job_request_action(
        props.current_user.user_id,
        remarksModal.task_id,
        remarksModal.update,
        remarksModal.remarks
      );
      return;
    }

    if (
      remarksModal.title === "Update" &&
      remarksModal.update === "" &&
      remarksModal.remarks === ""
    ) {
      return setError({
        ...error,
        update: "Update is required",
        remarks: "Remarks is required",
      });
    }

    if (remarksModal.title !== "Update" && remarksModal.remarks !== "") {
      props.job_request_action(
        props.current_user.user_id,
        remarksModal.task_id,
        remarksModal.title,
        remarksModal.remarks
      );
      return;
    }
    if (remarksModal.title !== "Update" && remarksModal.remarks == "") {
      return setError({ ...error, remarks: "Remarks is required" });
    }
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
              logout={props.logout}
            />
          </div>

          <div className={"col-md-2"}>
            <AdminSideBar user={props.current_user} />
          </div>
          <div className={"col-md-8"}>
            <Paper
              elevation={3}
              className={"paper content-container"}
              style={{ overflow: "auto" }}
            >
              {/* Route */}
              {!props.match.params.route && (
                <>
                  <HomePageContent
                    error={error}
                    data={props._fetch_admin_job}
                    remarksModal={remarksModal}
                    expand={expand}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onClickExpand={onClickExpand}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    handleClickOpenRemarksModal={handleClickOpenRemarksModal}
                    handleCloseRemarksModal={handleCloseRemarksModal}
                    handleChangeRemarks={handleChangeRemarks}
                    handleSubmit={handleSubmit}
                  />
                </>
              )}

              {props.match.params.route === "jobrequest" && (
                <>
                  <JobRequest
                    error={error}
                    remarksModal={remarksModal}
                    expand={expand}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onClickExpand={onClickExpand}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    handleClickOpenRemarksModal={handleClickOpenRemarksModal}
                    handleCloseRemarksModal={handleCloseRemarksModal}
                    job_requests={props._fetch_job_requests}
                    handleChangeRemarks={handleChangeRemarks}
                    handleSubmit={handleSubmit}
                  />
                </>
              )}
              {props.match.params.route === "reports" && (
                <>
                  <Reports />
                </>
              )}
              {props.match.params.route === "user" && (
                <>
                  <Settings />
                </>
              )}
            </Paper>
          </div>
          <div className={"col-md-2"}></div>
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
  };
};

const mapDispatchToProps = {
  fetch_current_user_info,
  logout,
  fetch_job_requests,
  clear_message,
  job_request_action,
  fetch_admin_job,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(AdminHomePage));
