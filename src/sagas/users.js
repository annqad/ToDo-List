import { put } from "redux-saga/effects";
import api from "../api";
import { URL } from "../config";
import {
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
} from "../constants/users";
import { getErrorMessage } from "../helpers";

export function* getUsersRequest() {
  try {
    const { data } = yield api.authenticated().get(`${URL}users`);

    yield put({
      type: GET_USERS_SUCCESS,
      payload: {
        users: data.users,
      },
    });
  } catch (error) {
    yield put({
      type: GET_USERS_FAILURE,
      payload: {
        error: getErrorMessage(error),
      },
    });
  }
}
