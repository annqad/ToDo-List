import { Box, Avatar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { memo, useCallback } from "react";
import { PhotoCamera as PhotoCameraIcon } from "@mui/icons-material";

export const Post = memo(({ id, thumbnail, description }) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/posts/${id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Box sx={{ marginBottom: "20px", cursor: "pointer" }} onClick={handleClick}>
      <Avatar
        sx={{
          width: "400px",
          minHeight: "400px",
          height: "auto",
          margin: "auto",
          fontSize: "50px",
        }}
        variant="rounded"
        alt="post thumbnail"
        src={thumbnail}
      >
        <PhotoCameraIcon sx={{ fontSize: "100px" }} />
      </Avatar>
      <Typography
        sx={{
          textAlign: "justify",
          display: "-webkit-box",
          overflow: "hidden",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 4,
        }}
        variant="subtitle2"
        component="div"
        gutterBottom
        maxWidth="400px"
      >
        {description}
      </Typography>
    </Box>
  );
});
