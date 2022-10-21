import { Send as SendIcon } from "@mui/icons-material";
import { Button, TextField, Box } from "@mui/material";
import { memo } from "react";

export const Input = memo(({ value, onChange, onSend }) => {

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
    }}>
      <TextField
        autoComplete="off"
        placeholder="Message"
        value={value}
        sx={{
          width: "100%",
          marginRight: '2px',
        }}
        onChange={onChange}
      />
      <Button variant="contained" color="primary" onClick={onSend}>
        <SendIcon />
      </Button>
    </Box>
  );
});
