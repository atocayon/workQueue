// @flow
import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import CanvasJSReact from "../../../../canvasJS/canvasjs.react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Reactotron from "reactotron-react-js";
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const options = {
  animationEnabled: true,
  title: {
    text: "Total number of task accepted per month",
  },
  axisY: {
    title: "Number of job rendered",
  },
  toolTip: {
    shared: true,
  },
  data: [
    {
      type: "spline",
      name: "2016",
      showInLegend: true,
      dataPoints: [
        { y: 155, label: "Jan" },
        { y: 150, label: "Feb" },
        { y: 152, label: "Mar" },
        { y: 148, label: "Apr" },
        { y: 142, label: "May" },
        { y: 150, label: "Jun" },
        { y: 146, label: "Jul" },
        { y: 149, label: "Aug" },
        { y: 153, label: "Sept" },
        { y: 158, label: "Oct" },
        { y: 154, label: "Nov" },
        { y: 150, label: "Dec" },
      ],
    },
    {
      type: "spline",
      name: "2017",
      showInLegend: true,
      dataPoints: [
        { y: 172, label: "Jan" },
        { y: 173, label: "Feb" },
        { y: 175, label: "Mar" },
        { y: 172, label: "Apr" },
        { y: 162, label: "May" },
        { y: 165, label: "Jun" },
        { y: 172, label: "Jul" },
        { y: 168, label: "Aug" },
        { y: 175, label: "Sept" },
        { y: 170, label: "Oct" },
        { y: 165, label: "Nov" },
        { y: 169, label: "Dec" },
      ],
    },
  ],
};

const options1 = {
  exportEnabled: true,
  animationEnabled: true,
  title: {
    text: "Number of task rendered in office",
  },
  data: [
    {
      type: "pie",
      startAngle: 75,
      toolTipContent: "<b>{label}</b>: {y}%",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}%",
      dataPoints: [
        { y: 18, label: "Direct" },
        { y: 49, label: "Organic Search" },
        { y: 9, label: "Paid Search" },
        { y: 5, label: "Referral" },
        { y: 19, label: "Social" },
      ],
    },
  ],
};

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
          <div className={"row"}>
            <div className={"col-md-12"}>
              <div className={"btn-reports-choices-container"}>
                <ButtonGroup
                  variant="text"
                  color="primary"
                  aria-label="text primary button group"
                >
                  <Button
                    color={reportPresentation === "text" ? 'secondary' : 'default'}
                    onClick={handleReportPresentation.bind(null, "text")}
                  >
                    Text Presentation
                  </Button>
                  <Button
                    color={reportPresentation === "graph" ? 'secondary' : 'default'}
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
                      options={options}
                      /* onRef={ref => this.chart = ref} */
                    />
                  </div>

                  <div className={"col-md-6"}>
                    <CanvasJSChart
                      options={options1}
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
                      <table className={"table table-borderless"}>
                        <thead>
                          <tr>
                            <th>Task</th>
                            <th>Inspector</th>
                            <th>Status</th>
                            <th>Start Date/Time</th>
                            <th>End Date/Time</th>
                          </tr>
                        </thead>
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
