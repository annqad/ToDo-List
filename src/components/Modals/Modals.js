import { Fragment } from "react";
import { AddTaskModal } from "./AddTaskModal/AddTaskModal";
import { EditTaskModal } from "./EditTaskModal/EditTaskModal";
import { DeleteTaskModal } from "./DeleteTaskModal/DeleteTaskModal";
import { AddPostModal } from "./AddPostModal/AddPostModal";
import { AddChatModal } from "./AddChatModal/AddChatModal";

export const Modals = () => {
  return (
    <Fragment>
      <AddTaskModal />
      <EditTaskModal />
      <DeleteTaskModal />
      <AddPostModal />
      <AddChatModal />
    </Fragment>
  );
};
