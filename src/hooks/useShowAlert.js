import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { SHOW_ALERT } from "../constants/app";

export const useShowAlert = () => {
  const dispatch = useDispatch();

  return useCallback((type, message) => {
    dispatch({
      type: SHOW_ALERT,
      payload: {
        alert: {
          type,
          message,
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
