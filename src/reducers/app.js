import {
  CLEAR_REDUX_STATE,
  SHOW_ERROR_ALERT,
  HIDE_ERROR_ALERT,
  SHOW_MODAL,
  HIDE_MODAL,
} from "../constants";

const initialState = {
  modals: {},
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

    case SHOW_MODAL:
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.payload.name]: action.payload.data || {},
        },
      };

    case HIDE_MODAL:
      delete state.modals[action.payload.name];
      return {
        ...state,
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
