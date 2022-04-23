import { CircularProgress } from "@mui/material";
import { Fragment, memo } from "react";
import "./Loader.css";

export const Loader = memo(({ show }) => {
  return (
    <Fragment>
      {show && (
        <div className="loader">
          <CircularProgress />
        </div>
      )}
    </Fragment>
  );
});
