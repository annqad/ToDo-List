import { useState, useRef, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToDoTask } from "./components/ToDoTask/ToDoTask";
import {
  DELETE_TASK_REQUEST,
  CHANGE_TASK_REQUEST,
} from "../../constants/tasks";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { Modal } from "../../components/Modal/Modal";
import "./ToDoList.css";

export const ToDoList = memo(() => {
  const dispatch = useDispatch();
  const TASK = useRef();
  const tasks = useSelector((state) => state.tasks.tasks);

  const [showModal, setShowModal] = useState(null);

  const handleCheck = (id, completed) => () => {
    dispatch({
      type: CHANGE_TASK_REQUEST,
      payload: {
        data: {
          id,
          completed,
        },
      },
    });
  };

  const handleEdit = (task) => () => {
    TASK.current = task;
    setShowModal("edit");
  };

  const handleDelete = (task) => () => {
    TASK.current = task;
    setShowModal("delete");
  };

  const handleCloseModal = () => {
    setShowModal(null);
  };

  const handleConfirmModal = (data) => {
    switch (showModal) {
      case "delete": {
        dispatch({
          type: DELETE_TASK_REQUEST,
          payload: {
            id: TASK?.current?.id,
          },
        });
        break;
      }
      case "edit": {
        dispatch({
          type: CHANGE_TASK_REQUEST,
          payload: {
            data: {
              id: TASK?.current?.id,
              ...data,
            },
          },
        });
        break;
      }
      default:
    }
    setShowModal(null);
  };

  return (
    <PageWrapper>
      <div className="to-do-list">
        {tasks.map((task, index) => (
          <ToDoTask
            key={task.id}
            title={task.title}
            description={task.description}
            completed={task.completed || false}
            onCheck={handleCheck(task.id, !task.completed)}
            onEdit={handleEdit(task)}
            onDelete={handleDelete(task)}
          />
        ))}
      </div>
      <Modal
        show={showModal === "delete"}
        title="Are you sure?"
        body="This action can't be undone."
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
      />
      <Modal
        show={showModal === "edit"}
        title="Edit task"
        fields={[
          {
            name: "title",
            label: "Title",
            type: "text",
            value: TASK?.current?.title,
          },
          {
            name: "description",
            label: "Description",
            type: "text",
            value: TASK?.current?.description,
          },
        ]}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
      />
    </PageWrapper>
  );
});
