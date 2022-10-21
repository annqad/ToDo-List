import { combineReducers } from "redux";
import { posts } from "./posts";
import { tasks } from "./tasks";
import { user } from "./user";
import { users } from "./users";
import { chats } from "./chats";
import { app } from "./app";

export default combineReducers({
  posts,
  tasks,
  user,
  users,
  chats,
  app,
});
