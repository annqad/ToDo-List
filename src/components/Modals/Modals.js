import { Fragment } from "react";
import { AddTaskModal } from "./AddTaskModal/AddTaskModal";
import { EditTaskModal } from "./EditTaskModal/EditTaskModal";
import { DeleteTaskModal } from "./DeleteTaskModal/DeleteTaskModal";
import { AddPostModal } from "./AddPostModal/AddPostModal";

export const Modals = () => {
  return (
    <Fragment>
      <AddTaskModal />
      <EditTaskModal />
      <DeleteTaskModal />
      <AddPostModal />
    </Fragment>
  );
};
