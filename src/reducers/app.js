import {
  CLEAR_REDUX_STATE,
  SHOW_ERROR_ALERT,
  HIDE_ERROR_ALERT,
} from "../constants";

const initialState = {
  error: null,
};

export const app = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ERROR_ALERT:
      return {
        ...state,
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
