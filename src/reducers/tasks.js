import { CLEAR_REDUX_STATE } from "../constants/app";
import {
  LOAD_TASKS_SUCCESS,
  DELETE_TASK_SUCCESS,
  EDIT_TASK_SUCCESS,
  ADD_TASK_SUCCESS,
} from "../constants/tasks";

const initialState = {
  tasks: [],
};

export const tasks = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload.tasks,
      };

    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };

    case EDIT_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.task.id ? action.payload.task : task
        ),
      };

    case ADD_TASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.payload.task],
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
