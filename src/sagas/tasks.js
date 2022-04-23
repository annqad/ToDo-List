import { put } from "redux-saga/effects";
import api from "../api";
import { URL } from "../config";
import {
  DELETE_TASK_FAILURE,
  DELETE_TASK_SUCCESS,
  LOAD_TASKS_FAILURE,
  LOAD_TASKS_SUCCESS,
  CHANGE_TASK_FAILURE,
  CHANGE_TASK_SUCCESS,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILURE,
} from "../constants/tasks";
import { getErrorMessage } from "../helpers";

export function* loadTasksRequest() {
  try {
    const { data } = yield api.authenticated().get(`${URL}tasks`);

    yield put({
      type: LOAD_TASKS_SUCCESS,
      payload: {
        tasks: data.tasks,
      },
    });
  } catch (error) {
    yield put({
      type: LOAD_TASKS_FAILURE,
      payload: {
        error: getErrorMessage(error),
      },
    });
  }
}

export function* deleteTaskRequest({ payload }) {
  try {
    yield api.authenticated().delete(`${URL}tasks/${payload.id}`);

    yield put({
      type: DELETE_TASK_SUCCESS,
      payload: {
        id: payload.id,
      },
    });
  } catch (error) {
    yield put({
      type: DELETE_TASK_FAILURE,
      payload: {
        error: getErrorMessage(error),
      },
    });
  }
}

export function* changeTaskRequest({ payload }) {
  try {
    const { data } = yield api.authenticated().put(`${URL}tasks`, payload.data);

    yield put({
      type: CHANGE_TASK_SUCCESS,
      payload: {
        task: data.task,
      },
    });
  } catch (error) {
    yield put({
      type: CHANGE_TASK_FAILURE,
      payload: {
        error: getErrorMessage(error),
      },
    });
  }
}

export function* addTaskRequest({ payload }) {
  try {
    const { data } = yield api
      .authenticated()
      .post(`${URL}tasks`, payload.data);

    yield put({
      type: ADD_TASK_SUCCESS,
      payload: {
        task: data.task,
      },
    });
  } catch (error) {
    yield put({
      type: ADD_TASK_FAILURE,
      payload: {
        error: getErrorMessage(error),
      },
    });
  }
}
