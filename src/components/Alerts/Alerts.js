import { Fragment, useCallback, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "./components/Alert/Alert";
import { HIDE_ALERT } from "../../constants/app";

export const Alerts = () => {
  const dispatch = useDispatch();
  const alertsRef = useRef([]);

  const alerts = useSelector((state) => state.app.alerts);

  const maximumStackSize = useMemo(() => 5, []);
  const autoHideDuration = useMemo(() => 6000, []);

  const handleClose = useCallback(
    (alertId) => () => {
      dispatch({
        type: HIDE_ALERT,
        payload: { alertId },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    alertsRef.current = alerts;
  }, [alerts]);

  return (
    <Fragment>
      {new Array(maximumStackSize).fill(null).map((item, index) => {
        const alert = alerts[index];
        const alertRef = alertsRef.current[index];

        return (
          <Alert
            key={`${alert?.id}-${index}`}
            style={{ bottom: `${index * (48 + 20) + 20}px` }}
            type={alert?.type || alertRef?.type}
            show={!!alert}
            message={alert?.message || alertRef?.message}
            autoHideDuration={autoHideDuration}
            onClose={handleClose(alert?.id)}
          />
        );
      })}
    </Fragment>
  );
};
