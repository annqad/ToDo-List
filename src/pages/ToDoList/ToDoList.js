import { useState, useRef, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToDoTask } from "./components/ToDoTask/ToDoTask";
// import { AddToDo } from "./components/AddToDo/AddToDo";
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

  const [modal, setModal] = useState(null);

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
    setModal("edit");
  };

  const handleDelete = (task) => () => {
    TASK.current = task;
    setModal("delete");
  };

  const handleCloseModal = () => {
    setModal(null);
  };

  const handleConfirmModal = (data) => {
    switch (modal) {
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
    setModal(null);
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
        show={modal === "delete"}
        title="Are you sure?"
        body="This action can't be undone."
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
      />
      <Modal
        show={modal === "edit"}
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
          {
            name: "remind",
            label: "Remind",
            type: "datetime-local",
            value: TASK?.current?.remind,
          },
        ]}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
      />
    </PageWrapper>
  );
});
