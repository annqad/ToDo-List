import { memo } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { grey, red, blue } from "@mui/material/colors";
import {
  Person as PersonIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { getInitials, timeSince } from "../../../../helpers";

export const Comment = memo(
  ({
    avatar,
    firstName,
    lastName,
    text,
    createdAt,
    updatedAt,
    bgcolor,
    canEdit,
    canDelete,
    onEdit,
    onDelete,
  }) => (
    <Box sx={{ display: "flex", marginTop: "8px" }}>
      <Avatar
        sx={{
          bgcolor: avatar ? grey[500] : bgcolor,
          marginRight: "8px",
          fontSize: "14px",
        }}
        alt="user avatar"
        src={avatar}
        variant="rounded"
      >
        {getInitials(firstName, lastName) || <PersonIcon />}
      </Avatar>
      <Box>
        <Box sx={{ fontWeight: "bold" }}>
          {`${firstName || ""} ${lastName || ""}`}
          <Typography
            sx={{
              marginLeft: "8px",
              color: grey[800],
              fontWeight: "light",
            }}
            display="inline-block"
            variant="caption"
            component="span"
          >
            {timeSince(createdAt || updatedAt)}
          </Typography>
        </Box>
        <Box>{text}</Box>
      </Box>
      <Box
        sx={{
          marginLeft: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "40px",
        }}
      >
        {canEdit && (
          <EditIcon
            sx={{
              fontSize: "18px",
              cursor: "pointer",
              color: grey[600],
              "&:hover": {
                color: blue[600],
              },
            }}
            onClick={onEdit}
          />
        )}
        {canDelete && (
          <DeleteIcon
            sx={{
              fontSize: "18px",
              cursor: "pointer",
              color: grey[600],
              "&:hover": {
                color: red[600],
              },
            }}
            onClick={onDelete}
          />
        )}
      </Box>
    </Box>
  )
);
