import React, { useEffect, useState } from "react";
import CircularProgress from "../../../common/CircularProgress";

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
            
          </div>
        </>
      )}
    </>
  );
}
