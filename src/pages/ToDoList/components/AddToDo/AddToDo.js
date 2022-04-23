import { memo, useState } from "react";
import { TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { ADD_TASK_REQUEST } from "../../../../constants/tasks";
import "./AddToDo.css";

export const AddToDo = memo(() => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [remind, setRemind] = useState(getInputDate());

  const clearForm = () => {
    setTitle("");
    setDescription("");
    // setRemind("");
  };

  const handleChangeTitle = (event) => setTitle(event.target.value);
  const handleChangeDescription = (event) => setDescription(event.target.value);
  // const handleChangeRemind = (event) => setRemind(event.target.value);

  const handleAddTask = () => {
    dispatch({
      type: ADD_TASK_REQUEST,
      payload: {
        data: {
          title,
          description,
          // remind,
        },
      },
    });

    clearForm();
  };

  return (
    <div className="add-to-do">
      <TextField
        label="Title"
        margin="dense"
        value={title}
        onChange={handleChangeTitle}
      />
      <TextField
        label="Description"
        margin="dense"
        multiline
        minRows={2}
        value={description}
        onChange={handleChangeDescription}
      />
      {/* <TextField
          label="Remind"
          type="datetime-local"
          margin="dense"
          value={remind || "-"}
          inputProps={{ min: getInputDate() }}
          onChange={handleChangeRemind}
        /> */}
      <Button
        variant="outlined"
        sx={{ marginTop: "8px" }}
        disabled={!title || !description}
        onClick={handleAddTask}
      >
        ADD
      </Button>
    </div>
  );
});
