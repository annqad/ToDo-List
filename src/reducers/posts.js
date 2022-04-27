import { HIDE_ERROR_ALERT, CLEAR_REDUX_STATE } from "../constants";
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
} from "../constants/posts";

const initialState = {
  loading: false,
  error: null,
};

export const posts = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_POST_SUCCESS:
      return {
        ...state,
        profile: action.payload.profile,
        loading: false,
      };

    case ADD_POST_FAILURE:
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
