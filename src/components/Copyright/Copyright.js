import { Typography } from "@mui/material";
import { memo } from "react";

export const Copyright = memo((props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © Anya Dao & Co "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
});
