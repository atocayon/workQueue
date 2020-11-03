import React, { useEffect, useState } from "react";
import CircularProgress from "../../../common/CircularProgress";

import ListIcon from "@material-ui/icons/List";
import AddIcon from "@material-ui/icons/Add";
import Form from "./Form";
import Table from "./Table";
import Reactotron from "reactotron-react-js";

const checkBox = ["NMP Website", "Facebook"];
export default function RequestForUpload(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <div className={"request-for-upload"}>
            <div className={"jumbotron"}>
              <h3>
                Web Upload <span className={"text-info"}>Request</span>
              </h3>
            </div>

            <div className={"row"}>
              <div className={"col-md-1"}></div>
              <div className={"col-md-10"}>
                <div className={"btn-web-upload-view"}>
                  <button
                    type={"button"}
                    className={"btn btn-sm btn-info btn-selection"}
                    onClick={() => {
                      props.setWebUploadView(!props.webUploadView);
                    }}

                    title={props.webUploadView ? "Add Web Upload Request" : "Web Upload List"}
                  >
                    {props.webUploadView ? <AddIcon /> : <ListIcon />}
                  </button>
                </div>

                {!props.webUploadView && (
                  <Form
                    onSubmitForm={props.onSubmitForm}
                    err={props.error}
                    onChangeHandler={props.onChangeHandler}
                    checkBox={checkBox}
                    form={props.form}
                  />
                )}

                {props.webUploadView && (
                  <Table
                    data={props.web_upload_list}
                    expand={props.expand}
                    activeStep={props.activeStep}
                    handleNext={props.handleNext}
                    handleBack={props.handleBack}
                    handleReset={props.handleReset}
                    handleExpand={props.handleExpand}
                  />
                )}

                <div className={"col-md-1"}></div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
