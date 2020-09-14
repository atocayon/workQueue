import React, { useEffect, useState } from "react";
import CircularProgress from "../../../common/CircularProgress";
import * as Scroll from "react-scroll";

export default function RequestForUpload(props) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
    Scroll.animateScroll.scrollToBottom();
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <div className={"container request-for-upload"}>
            <div className={"row"}>
              <div className={"col-md-12"}>
                <h3>Request for Upload</h3>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
