import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../components/Modal/Modal";
import { DELETE_TASK_MODAL } from "../../../config";
import { HIDE_MODAL } from "../../../constants";
import { DELETE_TASK_REQUEST } from "../../../constants/tasks";

export const DeleteTaskModal = memo(() => {
  const task = useSelector((state) => state.app.modals[DELETE_TASK_MODAL]);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({
      type: HIDE_MODAL,
      payload: {
        name: DELETE_TASK_MODAL,
      },
    });
  };

  const handleConfirm = (data) => {
    dispatch({
      type: DELETE_TASK_REQUEST,
      payload: {
        id: task?.id,
      },
    });
    handleClose();
  };

  return (
    <Modal
      show={!!task}
      title="Are you sure?"
      body="This action can't be undone."
      onClose={handleClose}
      onConfirm={handleConfirm}
    />
  );
});
