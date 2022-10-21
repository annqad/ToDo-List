import { put } from "redux-saga/effects";
import api from "../api";
import { URL } from "../config";
import {
  ADD_CHAT_SUCCESS,
  ADD_CHAT_FAILURE,
  GET_CHAT_SUCCESS,
  GET_CHAT_FAILURE,
  DELETE_CHAT_SUCCESS,
  DELETE_CHAT_FAILURE,
  GET_CHATS_SUCCESS,
  GET_CHATS_FAILURE,
} from "../constants/chats";
import { getErrorMessage } from "../helpers";

export function* addChatRequest({ payload }) {
  try {
    const { data } = yield api
      .authenticated()
      .post(`${URL}chats`, payload.data);

    yield put({
      type: ADD_CHAT_SUCCESS,
      payload: {
        chat: data.chat,
      },
    });
  } catch (error) {
    yield put({
      type: ADD_CHAT_FAILURE,
      payload: {
        error: getErrorMessage(error),
      },
    });
  }
}

export function* getChatRequest({ payload }) {
  try {
    const { data } = yield api
      .authenticated()
      .get(`${URL}chats/${payload.chatId}`);

    yield put({
      type: GET_CHAT_SUCCESS,
      payload: {
        chat: data.chat,
      },
    });
  } catch (error) {
    yield put({
      type: GET_CHAT_FAILURE,
      payload: {
        error: getErrorMessage(error),
      },
    });
  }
}

export function* deleteChatRequest({ payload }) {
  try {
    yield api.authenticated().delete(`${URL}chats/${payload.id}`);

    yield put({
      type: DELETE_CHAT_SUCCESS,
      payload: {
        id: payload.id,
      },
    });
  } catch (error) {
    yield put({
      type: DELETE_CHAT_FAILURE,
      payload: {
        error: getErrorMessage(error),
      },
    });
  }
}

export function* getChatsRequest() {
  try {
    const { data } = yield api.authenticated().get(`${URL}chats`);

    yield put({
      type: GET_CHATS_SUCCESS,
      payload: {
        chats: data.chats,
      },
    });
  } catch (error) {
    yield put({
      type: GET_CHATS_FAILURE,
      payload: {
        error: getErrorMessage(error),
      },
    });
  }
}
