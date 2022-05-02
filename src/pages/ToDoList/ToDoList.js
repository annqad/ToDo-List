import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToDoTask } from "./components/ToDoTask/ToDoTask";
import { EDIT_TASK_REQUEST } from "../../constants/tasks";
import { SHOW_MODAL } from "../../constants/app";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { EDIT_TASK_MODAL, DELETE_TASK_MODAL } from "../../config";
import "./ToDoList.css";

export const ToDoList = memo(() => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  const handleCheck = (id, completed) => () => {
    dispatch({
      type: EDIT_TASK_REQUEST,
      payload: {
        data: {
          id,
          completed,
        },
      },
    });
  };

  const handleEdit = (task) => () => {
    dispatch({
      type: SHOW_MODAL,
      payload: {
        name: EDIT_TASK_MODAL,
        data: task,
      },
    });
  };

  const handleDelete = (task) => () => {
    dispatch({
      type: SHOW_MODAL,
      payload: {
        name: DELETE_TASK_MODAL,
        data: task,
      },
    });
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
    </PageWrapper>
  );
});
