import { CLEAR_REDUX_STATE } from "./constants";
import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
} from "./constants/user";
import { setAuth, clearStorage } from "./helpers";

export const userMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS: {
      setAuth(action.payload.profile.token);
      break;
    }
    case LOGOUT_SUCCESS: {
      clearStorage();
      break;
    }
    default:
  }
  next(action);
};

export const errorMiddleware = (store) => (next) => (action) => {
  if (action?.payload?.error?.includes("authorized")) {
    clearStorage();
    store.dispatch({
      type: CLEAR_REDUX_STATE,
    });
  }
  next(action);
};
