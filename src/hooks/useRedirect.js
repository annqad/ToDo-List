import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOAD_TASKS_REQUEST } from "../constants/tasks";
import { LOAD_PROFILE_REQUEST } from "../constants/user";
import { getAuth } from "../helpers";
import { commentsSocket } from "../sockets";

export const useRedirect = () => {
  const tokenRef = useRef(getAuth());
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user.profile);

  useEffect(() => {
    if (token && token !== tokenRef.current) {
      tokenRef.current = token;
      navigate("/");
    }
    if (tokenRef.current && tokenRef.current !== commentsSocket.auth?.token) {
      commentsSocket.auth = { token: tokenRef.current };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (tokenRef.current) {
      dispatch({
        type: LOAD_PROFILE_REQUEST,
      });
      dispatch({
        type: LOAD_TASKS_REQUEST,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
