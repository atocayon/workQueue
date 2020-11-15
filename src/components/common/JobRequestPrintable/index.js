import React, { Component } from "react";

export default class JobRequestPrintable extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={"printable-form"}>
        <div className={"row"}>
          <div className={"col-md-4"}>
            <div className={"form-number"}>
              <small>
                NMP Form No. IMS-07
                <br />
                Issue No. 01
                <br />
                Rev.No.01 December 16, 2015
              </small>
            </div>
          </div>
        </div>

        <div>
          <h5 className={"form-title"}>
            JOB REQUEST FORM
            <br />({this.props.data.section})
          </h5>

          <p className={"job-number"}>JR No. _______________</p>
        </div>

        <div className={"content"}>
          <div className={"col-print-6"}>
            <div className={"box-1"}>
              <p>Date/Time Requested: {this.props.data.date_requested}</p>

              <p>Name of Requisitioner: {this.props.data.requisitioner}</p>

              <p>Division/Section/Unit: {this.props.data.secshort}</p>

              <p>Date/Time Work Required: {this.props.data.date_needed}</p>
            </div>
          </div>
          <div className={"col-print-6"}>
            <div className={"box"}>
              <p>Type of Work Requested: </p>
              <ul>
                {this.props.data.type_of_work.split(",").map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={"col-print-6"}>
            <div className={"box-description"}>
              <p>Job Descriptions:</p>
              <p>Item #:{this.props.data.item_no}</p>
              <p>Serial #: {this.props.data.serial_no}</p>
              <p>Brand: {this.props.data.brand}</p>
              <p>Memory Capacity: {this.props.data.memory_capacity}</p>
              <p>Model: {this.props.data.model}</p>
              <p>Color: {this.props.data.color}</p>
              <p>Measurement: {this.props.measurement}</p>
              <p>Location: {this.props.location}</p>
            </div>
          </div>

          <div className={"col-print-6"}>
            <div className={"box-info-system-specification"}>
              <p>Information System Specification</p>
              <p>Interface: {this.props.data.interface}</p>
              <p>
                Functional Capabilities:{" "}
                {this.props.data.funcional_capabilities}
              </p>
              <p>Data Structures/Elements: {this.props.data.date_structure}</p>
              <p>Reliability: {this.props.data.reliability}</p>
              <p>Security/Privacy: {this.props.data.security}</p>
              <p>Quality: {this.props.data.quality}</p>
              <p>Constraints/Limitation: {this.props.data.contraints}</p>
            </div>
          </div>

          <div className={"col-print-12"}>
            <div className={"box"}>
              <p>Scope of Work: </p>
              <p>{this.props.data.scope_of_work}</p>
            </div>
          </div>

          <div className={"col-print-6"}>
            <div className={"box-signature"}>
              <p>Signature of Requisitioner:</p>
              <br />
              <br />
              <p>{this.props.data.requisitioner}</p>
            </div>
          </div>

          <div className={"col-print-6"}>
            <div className={"box-signature"}>
              <p>Supervisor of the Requisting Party: </p>
            </div>
          </div>

          <div className={"col-print-12"}>
            <div className={"section-title"}>
              <p>Inspection by Authrorized Personel</p>
            </div>
          </div>

          <div className={"col-print-12"}>
            <div className={"box"}>
              <p>Findings:</p>
              <p>{this.props.data.findings}</p>
            </div>
          </div>
          <div className={"col-print-12"}>
            <div className={"box"}>
              <p>Recommendations:</p>
              <p>{this.props.data.recommendations}</p>
            </div>
          </div>

          <div className={"col-print-6"}>
            <div className={"box-signature"}>
              <p>Signature Inspector:</p>
              <br />
              <br />
              <p>{this.props.data.inspector}</p>
            </div>
          </div>

          <div className={"col-print-6"}>
            <div className={"box-signature"}>
              <p>Supervisor of the Inspector:</p>
            </div>
          </div>

          <div className={"col-print-8"}>
            <div className={"box"}>
              <p>
                Details of Action Taken (Signature of Responsible Personel):
              </p>
            </div>
          </div>
          <div className={"col-print-4"}>
            <div className={"box"}>
              <p>Accepted by (Signature of Requisitioner):</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
