// @flow
import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import CanvasJSReact from "../../../../canvasJS/canvasjs.react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { spline } from "../../../common/Chart";
import { pie } from "../../../common/Chart";
import Reactotron from "reactotron-react-js";
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Reports(props) {
  const [loading, setLoading] = useState(true);
  const [reportPresentation, setReportPresentation] = useState("text");
  useEffect(() => {
    setLoading(false);
  }, []);

  const handleReportPresentation = (target) => {
    setReportPresentation(target);
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
        <>
          <div className={"jumbotron jumbotron-container"}></div>

          <div className={"row"}>
            <div className={"col-md-12"}>
              <div className={"btn-reports-choices-container"}>
                <ButtonGroup
                  variant="text"
                  color="primary"
                  aria-label="text primary button group"
                >
                  <Button
                    color={
                      reportPresentation === "text" ? "secondary" : "default"
                    }
                    onClick={handleReportPresentation.bind(null, "text")}
                  >
                    Table Presentation
                  </Button>
                  <Button
                    color={
                      reportPresentation === "graph" ? "secondary" : "default"
                    }
                    onClick={handleReportPresentation.bind(null, "graph")}
                  >
                    Graph Presentation
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>

          {reportPresentation === "graph" && (
            <>
              <div className={"reports-gui-container"}>
                <div className={"row"}>
                  <div className={"col-md-6"}>
                    <CanvasJSChart
                      options={spline([], "Number of Job Rendered")}
                      /* onRef={ref => this.chart = ref} */
                    />
                  </div>

                  <div className={"col-md-6"}>
                    <CanvasJSChart
                      options={pie(
                        props.task_per_office,
                        "Total number of Task"
                      )}
                      /* onRef={ref => this.chart = ref} */
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {reportPresentation === "text" && (
            <>
              <div className={"text-report-presentation"}>
                <div className={"row"}>
                  <div className={"col-md-1"}></div>

                  <div className={"col-md-10"}>
                    <div>
                      <table className={"table table-borderless table-striped"}>
                        <thead>
                          <tr>
                            <th>Task No.</th>
                            <th>Requisitioner</th>
                            <th>Start Date/Time</th>
                            <th>End Date/Time</th>
                            <th>Date Requested</th>
                          </tr>
                        </thead>
                        <tbody>
                          {props.data.length === 0 && (
                            <tr>
                              <td colSpan={5} style={{ textAlign: "center" }}>
                                No job request reports found
                              </td>
                            </tr>
                          )}
                          {props.data.map((item) => (
                            <tr>
                              <td>{item.data.task_id}</td>
                              <td>{item.data.requisitioner}</td>
                              <td>{item.data.start}</td>
                              <td>{item.data.end}</td>
                              <td>{item.data.dateRequested}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className={"col-md-1"}></div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
