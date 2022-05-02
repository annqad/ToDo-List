import { put } from "redux-saga/effects";
import api from "../api";
import { URL } from "../config";
import {
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAILURE,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,
} from "../constants/user";
import { getErrorMessage } from "../helpers";

export function* registerRequest({ payload }) {
  try {
    const { data } = yield api
      .public()
      .post(`${URL}user/register`, payload.data);

    yield put({
      type: REGISTER_SUCCESS,
      payload: {
        profile: data.profile,
      },
    });
  } catch (error) {
    yield put({
      type: REGISTER_FAILURE,
      payload: {
        error: getErrorMessage(error),
      },
    });
  }
}

export function* loginRequest({ payload }) {
  try {
    const { data } = yield api.public().post(`${URL}user/login`, payload.data);

    yield put({
      type: LOGIN_SUCCESS,
      payload: {
        profile: data.profile,
      },
    });
  } catch (error) {
    yield put({
      type: LOGIN_FAILURE,
      payload: {
        error: getErrorMessage(error),
      },
    });
  }
}

export function* logoutRequest() {
  try {
    yield api.authenticated().post(`${URL}user/logout`);

    yield put({
      type: LOGOUT_SUCCESS,
      payload: {
        profile: {},
      },
    });
  } catch (error) {
    yield put({
      type: LOGOUT_FAILURE,
      payload: {
        error: getErrorMessage(error),
      },
    });
  }
}

export function* loadProfileRequest() {
  try {
    const { data } = yield api.authenticated().get(`${URL}user/profile`);

    yield put({
      type: LOAD_PROFILE_SUCCESS,
      payload: {
        profile: data.profile,
      },
    });
  } catch (error) {
    yield put({
      type: LOAD_PROFILE_FAILURE,
      payload: {
        error: getErrorMessage(error),
      },
    });
  }
}

export function* changeProfileRequest({ payload }) {
  try {
    const { data } = yield api
      .authenticated()
      .put(`${URL}user/profile`, payload.data);

    yield put({
      type: EDIT_PROFILE_SUCCESS,
      payload: {
        profile: data.profile,
      },
    });
  } catch (error) {
    yield put({
      type: EDIT_PROFILE_FAILURE,
      payload: {
        error: getErrorMessage(error),
      },
    });
  }
}
