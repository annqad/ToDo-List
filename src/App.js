import { memo, Fragment, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Router } from "./Router";
import { Loader } from "./components/Loader/Loader";
import { Alert } from "./components/Alert/Alert";
import { HIDE_ERROR_ALERT } from "./constants";
import { useLoading } from "./hooks/useLoading";
import { useError } from "./hooks/useError";
import { Modals } from "./components/Modals/Modals";

export const App = memo(() => {
  const errorRef = useRef();
  const dispatch = useDispatch();

  const error = useError();
  const loading = useLoading();

  const handleClose = () => {
    dispatch({
      type: HIDE_ERROR_ALERT,
    });
  };

  useEffect(() => {
    if (error) {
      errorRef.current = error;
    }
  }, [error]);

  return (
    <Fragment>
      <Loader show={loading} />
      <Modals />
      <Alert
        show={!!error}
        message={error || errorRef.current}
        onClose={handleClose}
      />
      <Router />
    </Fragment>
  );
});
