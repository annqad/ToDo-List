import {
  ManageAccounts as ManageAccountsIcon,
  EventAvailable as EventAvailableIcon,
  EventNote as EventNoteIcon,
  Create as CreateIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

export const URL = "http://localhost:3001/";

export const publicVAPIDKey =
  "BDVCyiDFyXjHKzmEb4vR_VM6vCu5RBAqdea_DcxJ2QG15Vx9ORCtYo7KepWBwKSbS7PVZ9ALR8FbYVZEw0yNZRI";

export const PROFILE_SETTING = "Profile";
export const CREATE_SETTING = "Create";
export const LOGOUT_SETTING = "Logout";

export const settings = [
  { name: PROFILE_SETTING, Icon: ManageAccountsIcon },
  { name: CREATE_SETTING, Icon: CreateIcon },
  { name: LOGOUT_SETTING, Icon: LogoutIcon },
];

export const TASK_ENTITY = "Task";
export const POST_ENTITY = "Post";

export const entities = [
  {
    name: TASK_ENTITY,
    Icon: EventAvailableIcon,
  },
  {
    name: POST_ENTITY,
    Icon: EventNoteIcon,
  },
];

export const TO_DO_LIST_PAGE = "ToDo List";
export const POSTS_PAGE = "Posts";

export const pages = [TO_DO_LIST_PAGE, POSTS_PAGE];

export const ADD_TASK_MODAL = "ADD_TASK_MODAL";
export const EDIT_TASK_MODAL = "EDIT_TASK_MODAL";
export const DELETE_TASK_MODAL = "DELETE_TASK_MODAL";
export const ADD_POST_MODAL = "ADD_POST_MODAL";
