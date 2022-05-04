import {
  CLEAR_REDUX_STATE,
  SHOW_ALERT,
  HIDE_ALERT,
  SHOW_MODAL,
  HIDE_MODAL,
} from "../constants/app";
import { randomId } from "../helpers";

const initialState = {
  modals: {},
  alerts: [],
  loadings: 0,
};

export const app = (state = initialState, action) => {
  switch (action.type) {
    case action.type.match(/_REQUEST/)?.input:
      return {
        ...state,
        loadings: ++state.loadings,
      };

    case action.type.match(/_SUCCESS/)?.input:
      return {
        ...state,
        loadings: --state.loadings,
      };

    case action.type.match(/_FAILURE/)?.input:
      return {
        ...state,
        loadings: --state.loadings,
        alerts: [
          ...state.alerts,
          {
            id: randomId(),
            type: "error",
            message: action.payload.error,
          },
        ],
      };

    case SHOW_ALERT:
      return {
        ...state,
        alerts: [...state.alerts, action.payload.alert],
      };

    case HIDE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter(
          (alert) => alert.id !== action.payload.alertId
        ),
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
