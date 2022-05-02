import { memo, Fragment, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { Router } from "./Router";
import { Loader } from "./components/Loader/Loader";
import { Alerts } from "./components/Alerts/Alerts";
import { Modals } from "./components/Modals/Modals";

export const App = memo(() => {
  const profile = useSelector((state) => state.user.profile);
  const loadings = useSelector((state) => state.app.loadings);

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
    navigator?.serviceWorker?.addEventListener("message", handleMessage);
    return () =>
      navigator?.serviceWorker?.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  return (
    <Fragment>
      <Loader show={!!loadings} />
      <Modals />
      <Router />
      <Alerts />
    </Fragment>
  );
});
