import { CLEAR_REDUX_STATE } from "../constants/app";
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOAD_PROFILE_SUCCESS,
  EDIT_PROFILE_SUCCESS,
} from "../constants/user";

const initialState = {
  profile: {},
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case LOGOUT_SUCCESS:
    case LOAD_PROFILE_SUCCESS:
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload.profile,
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
