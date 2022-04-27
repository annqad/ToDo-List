import { combineReducers } from "redux";
import { posts } from "./posts";
import { tasks } from "./tasks";
import { user } from "./user";
import { app } from "./app";

export default combineReducers({
  posts,
  tasks,
  user,
  app,
});
