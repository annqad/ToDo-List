import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../components/Modal/Modal";
import { getInputDate } from "../../../helpers";
import { ADD_TASK_MODAL } from "../../../config";
import { ADD_TASK_REQUEST } from "../../../constants/tasks";
import { HIDE_MODAL } from "../../../constants/app";

export const AddTaskModal = memo(() => {
  const data = useSelector((state) => state.app.modals[ADD_TASK_MODAL]);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({
      type: HIDE_MODAL,
      payload: {
        name: ADD_TASK_MODAL,
      },
    });
  };

  const handleConfirm = (data) => {
    dispatch({
      type: ADD_TASK_REQUEST,
      payload: {
        data,
      },
    });
    handleClose();
  };

  return (
    <Modal
      show={!!data}
      modalProps={{
        PaperProps: {
          sx: { width: "400px" },
        },
      }}
      title="Add task"
      fields={[
        {
          name: "title",
          label: "Title",
          type: "text",
          value: "",
        },
        {
          name: "description",
          label: "Description",
          type: "text",
          value: "",
        },
        {
          name: "remind",
          label: "Remind",
          type: "datetime-local",
          value: getInputDate(),
        },
      ]}
      onClose={handleClose}
      onConfirm={handleConfirm}
    />
  );
});
