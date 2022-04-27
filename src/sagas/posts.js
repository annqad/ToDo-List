import { put } from "redux-saga/effects";
import api from "../api";
import { URL } from "../config";
import { ADD_POST_SUCCESS, ADD_POST_FAILURE } from "../constants/posts";
import { getErrorMessage } from "../helpers";

export function* addPostRequest({ payload }) {
  try {
    const { data } = yield api
      .authenticated()
      .post(`${URL}posts`, payload.data);

    yield put({
      type: ADD_POST_SUCCESS,
      payload: {
        profile: data.profile,
      },
    });
  } catch (error) {
    yield put({
      type: ADD_POST_FAILURE,
      payload: {
        error: getErrorMessage(error),
      },
    });
  }
}
