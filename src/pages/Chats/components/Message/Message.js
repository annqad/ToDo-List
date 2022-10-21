import { Paper, Box, Avatar } from "@mui/material";
import { memo } from "react";

export const Message = memo(({ text, username, avatar, createdAt, isUserMessage }) => {
  const date = new Date(createdAt).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Paper sx={{
      background: (theme) => isUserMessage ? theme.palette.primary.main : 'grey',
      color: '#ffffff',
      padding: '15px',
      marginBottom: '15px',
      maxWidth: '300px',
      marginLeft: isUserMessage ? 'auto' : 'none',
      display: 'flex',
    }}>
      {!isUserMessage && <Box sx={{ marginRight: '15px' }}>
        <Avatar src={avatar} sx={{ border: '1px solid #ffffff' }} />
      </Box>}
      <Box sx={{ width: '100%' }}>
        {!isUserMessage && <Box sx={{
          fontSize: '16px',
          display: 'flex',
          justifyContent: 'start',
          marginTop: '-6px',
          fontWeight: 'bold',
        }}>
          {username}
        </Box>}
        <Box sx={{
          fontSize: '14px',
        }}>
          {text}
        </Box>
        <Box sx={{
          fontSize: '12px',
          display: 'flex',
          justifyContent: 'end',
          marginBottom: '-6px',
          fontWeight: 'bold',
        }}>
          {date}
        </Box></Box>
    </Paper>
  );
});
