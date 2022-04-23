import { memo } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import "./ToDoTask.css";

export const ToDoTask = memo(
  ({ title, description, completed, onCheck, onEdit, onDelete }) => {
    return (
      <div className="to-do-task">
        <div
          className="title"
          style={{ textDecoration: completed ? "line-through" : "none" }}
        >
          {title}
        </div>
        <div
          className="description"
          style={{ textDecoration: completed ? "line-through" : "none" }}
        >
          {description}
        </div>
        <Checkbox checked={completed} onChange={onCheck} />
        <IconButton aria-label="delete" size="small" onClick={onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" size="small" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
    );
  }
);
