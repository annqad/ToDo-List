import { memo, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { fieldsToData } from "../../../../helpers";

export const Modal = memo(
  ({
    show,
    title,
    body,
    fields = [],
    children,
    modalProps,
    onClose,
    onConfirm,
  }) => {
    const [data, setData] = useState({});

    const handleClose = () => {
      onClose();
    };

    const handleConfirm = () => {
      onConfirm(data);
    };

    const handleChange = (event) => {
      setData({
        ...data,
        [event.target.name]: event.target.value,
      });
    };

    useEffect(() => {
      if (fields.length) {
        setData(fieldsToData(fields));
      }
    }, [fields]);

    return (
      <Dialog
        open={show}
        onClose={handleClose}
        {...modalProps}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ textTransform: "uppercase" }}
        >
          {title}
        </DialogTitle>
        <DialogContent>
          {children}
          <DialogContentText id="alert-dialog-description">
            {body}
          </DialogContentText>
          {fields.map(({ name, label, type }, index) => (
            <TextField
              key={`${name}-${index}`}
              name={name}
              label={label}
              type={type}
              value={data[name]}
              margin="dense"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            autoFocus
            disabled={Object.values(data).some((value) => !value)}
            onClick={handleConfirm}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);
