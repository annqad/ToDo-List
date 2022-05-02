import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../components/Modal/Modal";
import { EDIT_TASK_MODAL } from "../../../config";
import { EDIT_TASK_REQUEST } from "../../../constants/tasks";
import { HIDE_MODAL } from "../../../constants/app";

export const EditTaskModal = memo(() => {
  const task = useSelector((state) => state.app.modals[EDIT_TASK_MODAL]);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({
      type: HIDE_MODAL,
      payload: {
        name: EDIT_TASK_MODAL,
      },
    });
  };

  const handleConfirm = (data) => {
    dispatch({
      type: EDIT_TASK_REQUEST,
      payload: {
        data: {
          ...task,
          ...data,
        },
      },
    });
    handleClose();
  };

  return (
    <Modal
      show={!!task}
      title="Edit task"
      fields={[
        {
          name: "title",
          label: "Title",
          type: "text",
          value: task?.title,
        },
        {
          name: "description",
          label: "Description",
          type: "text",
          value: task?.description,
        },
        {
          name: "remind",
          label: "Remind",
          type: "datetime-local",
          value: task?.remind,
        },
      ]}
      onClose={handleClose}
      onConfirm={handleConfirm}
    />
  );
});
