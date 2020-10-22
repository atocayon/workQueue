// @flow
import React, { useEffect, useState } from "react";
import CircularProgress from "../../../common/CircularProgress";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import List from "./List";
import Request from "./Request";
import WebUploadConfirmation from "../../../common/WebUploadConfirmation";
export default function WebUpload(props) {
  const [loading, setLoading] = useState(true);
  const [webUploadView, setWebUploadView] = useState("list");
  useEffect(() => {
    setLoading(false);
  }, []);

  const handleChangeView = (val) => {
    setWebUploadView(val);
  };
  return (
    <>
      {loading && <CircularProgress />}
      <div className={"jumbotron jumbotron-container"}></div>
      <WebUploadConfirmation
        modal={props.modal}
        handleOpenWebUploadModal={props.handleOpenWebUploadModal}
        handleCloseWebUploadModal={props.handleCloseWebUploadModal}
        handleConfirmWebUpload={props.handleConfirmWebUpload}
        handleUpdateModal={props.handleUpdateModal}
      />
      <div className={"row"}>
        <div className={"col-md-1"}></div>
        <div className={"col-md-10"}>
          <div className={"row"}>
            <div className={"col-md-12"}>
              <div className={"btn-webUpload-choices-container"}>
                <ButtonGroup
                  variant="text"
                  color="primary"
                  aria-label="text primary button group"
                >
                  <Button
                    color={webUploadView === "list" ? "secondary" : "default"}
                    onClick={handleChangeView.bind(null, "list")}
                  >
                    Web Upload List
                  </Button>
                  {props.request.length > 0 ? (
                    <Badge
                      badgeContent={props.request.length}
                      color="secondary"
                    >
                      <Button
                        color={
                          webUploadView === "request" ? "secondary" : "default"
                        }
                        onClick={handleChangeView.bind(null, "request")}
                      >
                        Web Upload Request
                      </Button>
                    </Badge>
                  ) : (
                    <Button
                      color={
                        webUploadView === "request" ? "secondary" : "default"
                      }
                      onClick={handleChangeView.bind(null, "request")}
                    >
                      Web Upload Request
                    </Button>
                  )}
                </ButtonGroup>
              </div>
            </div>
          </div>

          {webUploadView === "list" && (
            <>
              <List
                data={props.list}
                expand={props.expand}
                onClickExpand={props.onClickExpand}
                activeStep={props.activeStep}
                handleNext={props.handleNext}
                handleBack={props.handleBack}
                handleReset={props.handleReset}
                handleOpenWebUploadModal={props.handleOpenWebUploadModal}
                
              />
            </>
          )}

          {webUploadView === "request" && (
            <>
              <Request
                data={props.request}
                expand={props.expand}
                onClickExpand={props.onClickExpand}
                handleOpenWebUploadModal={props.handleOpenWebUploadModal}
              />
            </>
          )}
        </div>
        <div className={"col-md-1"}></div>
      </div>
    </>
  );
}
