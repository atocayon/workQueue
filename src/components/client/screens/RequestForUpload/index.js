import React, { useEffect, useState } from "react";
import CircularProgress from "../../../common/CircularProgress";
import InputField from "../../../common/textField/InputField";
import CheckBox from "../../../common/CheckBox";
import Reactotron from "reactotron-react-js";

const checkBox = ["NMP Website", "Facebook"];
export default function RequestForUpload(props) {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState({});
  const [form, setForm] = useState({
    selectedFile: null,
    destination: [],
    file_name: "",
    "NMP Website": false,
    Facebook: false,
  });
  useEffect(() => {
    setLoading(false);
  }, []);

  const onChangeHandler = (e) => {
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

  const formValidation = () => {
    let error = {};
    if (form.selectedFile.length < 1) error.file = "Please select a file";
    if (!form.file_name) error.file_name = "File name is required";
    if (form.destination.length < 1)
      error.checkbox = "Please select the upload destination";

    setErr(error);
    return Object.keys(error).length === 0;
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (!formValidation()) {
      return;
    }

    const { selectedFile, destination, file_name } = form;
    const _form = new FormData();

    for (let i = 0; i < selectedFile.length; i++) {
      _form.append("file", selectedFile[i]);
    }

    _form.append("destination", destination);
    _form.append("file_name", file_name);
    _form.append("requisitioner", props.user.user_id);

    props.onSubmit(_form);
  };

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
                <form onSubmit={onSubmitForm} encType="multipart/form-data">
                  <div className="form-group files">
                    <label style={err.file && { color: "red" }}>
                      Upload Your File{" "}
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      name={"file"}
                      multiple
                      onChange={onChangeHandler}
                    />
                  </div>

                  <div>
                    <InputField
                      name={"file_name"}
                      error={err.file_name}
                      variant={"outlined"}
                      onChange={onChangeHandler}
                      label={"File name of document(s) to be uploaded"}
                    />
                  </div>

                  <div>
                    <CheckBox
                      label={"Destination of upload:"}
                      checkBox={checkBox}
                      check={form}
                      handleChange={onChangeHandler}
                      error={err.checkbox}
                    />
                  </div>
                  <button
                    type={"submit"}
                    className={"btn btn-info"}
                    id={"submit_web_upload"}
                  >
                    Submit
                  </button>
                </form>

                <div className={"col-md-1"}></div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
