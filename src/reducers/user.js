import { HIDE_ERROR_ALERT, CLEAR_REDUX_STATE } from "../constants";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOAD_PROFILE_REQUEST,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAILURE,
  CHANGE_PROFILE_REQUEST,
  CHANGE_PROFILE_SUCCESS,
  CHANGE_PROFILE_FAILURE,
} from "../constants/user";

const initialState = {
  profile: {},
  loading: false,
  error: null,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
    case LOAD_PROFILE_REQUEST:
    case CHANGE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case LOGOUT_SUCCESS:
    case LOAD_PROFILE_SUCCESS:
    case CHANGE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload.profile,
        loading: false,
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case LOGOUT_FAILURE:
    case LOAD_PROFILE_FAILURE:
    case CHANGE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case HIDE_ERROR_ALERT:
      return {
        ...state,
        error: null,
      };

    case CLEAR_REDUX_STATE:
      return {
        ...initialState,
      };

    default: {
      return state;
    }
  }
};
