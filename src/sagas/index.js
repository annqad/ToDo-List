import { takeLatest } from "redux-saga/effects";
import {
  LOAD_TASKS_REQUEST,
  DELETE_TASK_REQUEST,
  EDIT_TASK_REQUEST,
  ADD_TASK_REQUEST,
} from "../constants/tasks";
import {
  REGISTER_REQUEST,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  LOAD_PROFILE_REQUEST,
  EDIT_PROFILE_REQUEST,
} from "../constants/user";
import {
  ADD_POST_REQUEST,
  GET_POST_REQUEST,
  GET_POSTS_REQUEST,
} from "../constants/posts";
import {
  ADD_CHAT_REQUEST,
  GET_CHAT_REQUEST,
  DELETE_CHAT_REQUEST,
  GET_CHATS_REQUEST,
} from "../constants/chats";
import {
  GET_USERS_REQUEST,
} from "../constants/users";
import {
  registerRequest,
  loginRequest,
  logoutRequest,
  loadProfileRequest,
  changeProfileRequest,
} from "./user";
import {
  loadTasksRequest,
  deleteTaskRequest,
  changeTaskRequest,
  addTaskRequest,
} from "./tasks";
import { addPostRequest, getPostRequest, getPostsRequest } from "./posts";
import { addChatRequest, deleteChatRequest, getChatRequest, getChatsRequest } from "./chats";
import { getUsersRequest } from "./users";

function* appSaga() {
  yield takeLatest(REGISTER_REQUEST, registerRequest);
  yield takeLatest(LOGIN_REQUEST, loginRequest);
  yield takeLatest(LOGOUT_REQUEST, logoutRequest);
  yield takeLatest(LOAD_PROFILE_REQUEST, loadProfileRequest);
  yield takeLatest(EDIT_PROFILE_REQUEST, changeProfileRequest);

  yield takeLatest(LOAD_TASKS_REQUEST, loadTasksRequest);
  yield takeLatest(DELETE_TASK_REQUEST, deleteTaskRequest);
  yield takeLatest(EDIT_TASK_REQUEST, changeTaskRequest);
  yield takeLatest(ADD_TASK_REQUEST, addTaskRequest);

  yield takeLatest(ADD_POST_REQUEST, addPostRequest);
  yield takeLatest(GET_POST_REQUEST, getPostRequest);
  yield takeLatest(GET_POSTS_REQUEST, getPostsRequest);

  yield takeLatest(ADD_CHAT_REQUEST, addChatRequest);
  yield takeLatest(GET_CHAT_REQUEST, getChatRequest);
  yield takeLatest(DELETE_CHAT_REQUEST, deleteChatRequest);
  yield takeLatest(GET_CHATS_REQUEST, getChatsRequest);

  yield takeLatest(GET_USERS_REQUEST, getUsersRequest);
}

export default appSaga;
