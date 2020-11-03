import React from "react";
import InputField from "../../../common/textField/InputField";
import CheckBox from "../../../common/CheckBox";
export default function Form(props) {
  return (
    <form onSubmit={props.onSubmitForm} encType="multipart/form-data">
      <div className="form-group files">
        <label style={props.err.file && { color: "red" }}>
          Upload Your File{" "}
        </label>
        <input
          type="file"
          className="form-control"
          name={"file"}
          multiple
          onChange={props.onChangeHandler}
        />
      </div>

      <div>
        <InputField
          name={"file_name"}
          error={props.err.file_name}
          variant={"outlined"}
          onChange={props.onChangeHandler}
          label={"File name of document(s) to be uploaded"}
        />
      </div>

      <div>
        <CheckBox
          label={"Destination of upload:"}
          checkBox={props.checkBox}
          check={props.form}
          handleChange={props.onChangeHandler}
          error={props.err.checkbox}
        />
      </div>
      <button
        type={"submit"}
        className={"btn btn-info btn-submit-web-upload"}
        id={"submit_web_upload"}
        title={"Submit web upload request"}
      >
        Submit
      </button>
    </form>
  );
}
