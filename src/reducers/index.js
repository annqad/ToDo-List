import { combineReducers } from "redux";
import { tasks } from "./tasks";
import { user } from "./user";
import { app } from "./app";

export default combineReducers({
  tasks,
  user,
  app,
});
