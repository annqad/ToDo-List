import { put } from "redux-saga/effects";
import api from "../api";
import { URL } from "../config";
import {
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
} from "../constants/posts";
import { getErrorMessage } from "../helpers";

export function* addPostRequest({ payload }) {
  try {
    const { data } = yield api
      .authenticated()
      .post(`${URL}posts`, payload.data);

    yield put({
      type: ADD_POST_SUCCESS,
      payload: {
        post: data.post,
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

export function* getPostRequest({ payload }) {
  try {
    const { data } = yield api
      .authenticated()
      .get(`${URL}posts/${payload.postId}`);

    yield put({
      type: GET_POST_SUCCESS,
      payload: {
        post: data.post,
      },
    });
  } catch (error) {
    yield put({
      type: GET_POST_FAILURE,
      payload: {
        error: getErrorMessage(error),
      },
    });
  }
}

export function* getPostsRequest() {
  try {
    const { data } = yield api.authenticated().get(`${URL}posts`);

    yield put({
      type: GET_POSTS_SUCCESS,
      payload: {
        posts: data.posts,
      },
    });
  } catch (error) {
    yield put({
      type: GET_POSTS_FAILURE,
      payload: {
        error: getErrorMessage(error),
      },
    });
  }
}
