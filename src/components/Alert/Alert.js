import { forwardRef, memo } from "react";
import { Snackbar, Alert as MuiAlert } from "@mui/material";

const CustomizedAlert = forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Alert = memo(({ show, style, message, onClose }) => {
  const handleClose = (event, reason) => {
    if (reason !== "clickaway") {
      onClose();
    }
  };

  return (
    <Snackbar
      open={show}
      style={style}
      autoHideDuration={9000000}
      onClose={handleClose}
    >
      <CustomizedAlert
        onClose={handleClose}
        severity="error"
        sx={{ width: "100%" }}
      >
        {message}
      </CustomizedAlert>
    </Snackbar>
  );
});
