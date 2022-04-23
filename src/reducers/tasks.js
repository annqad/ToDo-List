import { HIDE_ERROR_ALERT, CLEAR_REDUX_STATE } from "../constants";
import {
  LOAD_TASKS_REQUEST,
  LOAD_TASKS_SUCCESS,
  LOAD_TASKS_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  CHANGE_TASK_REQUEST,
  CHANGE_TASK_SUCCESS,
  CHANGE_TASK_FAILURE,
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILURE,
} from "../constants/tasks";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

export const tasks = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TASKS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LOAD_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload.tasks,
        loading: false,
      };

    case LOAD_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case DELETE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
        loading: false,
      };

    case DELETE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case CHANGE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CHANGE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.task.id ? action.payload.task : task
        ),
        loading: false,
      };

    case CHANGE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case ADD_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_TASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.payload.task],
        loading: false,
      };

    case ADD_TASK_FAILURE:
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
