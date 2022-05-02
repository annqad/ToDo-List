import { memo, Fragment, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const profile = useSelector((state) => state.user.profile);

  const handleClose = useCallback(() => {
    dispatch({
      type: HIDE_ERROR_ALERT,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMessage = useCallback(
    (event) => {
      const { audio } = profile;
      switch (event.data.type) {
        case "TASK_REMIND":
          if (audio) {
            const sound = new Audio(audio);
            sound.play();
          }
          break;
        default:
      }
    },
    [profile]
  );

  useEffect(() => {
    if (error) {
      errorRef.current = error;
    }
  }, [error]);

  useEffect(() => {
    navigator?.serviceWorker?.addEventListener("message", handleMessage);
    return () =>
      navigator?.serviceWorker?.removeEventListener("message", handleMessage);
  }, [handleMessage]);

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
