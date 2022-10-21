import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { DeleteForever as DeleteForeverIcon } from "@mui/icons-material";
import { DELETE_CHAT_REQUEST, GET_CHATS_REQUEST } from "../../constants/chats";
import { useNavigate, useParams } from "react-router-dom";
import { messagesSocket } from "../../sockets";
import { useShowAlert } from "../../hooks/useShowAlert";
import { Message } from "./components/Message/Message";
import { Input } from "./components/Input/Input";


const drawerWidth = 240;

export const Chats = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showAlert = useShowAlert();
  const messagesEndRef = useRef();
  const { chatId } = useParams();
  const chats = useSelector((state) => state.chats.chats);
  const profile = useSelector((state) => state.user.profile);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);

  const handleOpenChat = (id) => () => {
    navigate(`/chats/${id}`);
  };

  const handleDeleteChat = (id) => (event) => {
    event.stopPropagation();
    dispatch({
      type: DELETE_CHAT_REQUEST,
      payload: {
        id,
      }
    });
    if (id === chatId) {
      navigate(`/chats`);
      navigate(0);
    }
  };

  const scrollToBottom = (behavior) => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  const handleSend = useCallback(() => {
    if (messageText.trim()) {
      messagesSocket.emit("send", {
        chatId,
        text: messageText.trim(),
      });
      setMessageText("");
    }
  }, [messageText, chatId]);

  useEffect(() => {
    dispatch({
      type: GET_CHATS_REQUEST,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (chatId) {
      messagesSocket.emit("join", {
        chatId,
      });
      messagesSocket.on("joined", (payload) => { setMessages(payload.messages); scrollToBottom() });
      messagesSocket.on("error", (error) => showAlert("error", error));
      return () => {
        messagesSocket.emit("leave");
        messagesSocket.off();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  useEffect(() => {
    messagesSocket.on("sent", (payload) => {
      setMessages([...messages, payload.message]);
      scrollToBottom();
    });
    messagesSocket.on("deleted", (payload) => {
      setMessages(
        messages.filter((message) => message.id !== payload.messageId)
      );
      showAlert("success", "Message has been deleted.");
    });

    messagesSocket.on("edited", (payload) => {
      setMessages(
        messages.map((message) =>
          message.id === payload.messageId
            ? {
              ...message,
              text: payload.text,
              updatedAt: payload.updatedAt,
            }
            : message
        )
      );
      showAlert("success", "Message has been edited.");
    });
    return () => {
      messagesSocket.removeListener("sent");
      messagesSocket.removeListener("deleted");
      messagesSocket.removeListener("edited");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {chats.map(({ id, title, thumbnail }, index) => (
              <ListItem selected={id === chatId}
                key={id} disablePadding onClick={handleOpenChat(id)}>
                <ListItemButton>
                  <ListItemIcon>
                    <Avatar src={thumbnail} />
                  </ListItemIcon>
                  <ListItemText primary={title} />
                  <IconButton onClick={handleDeleteChat(id)}>
                    <DeleteForeverIcon />
                  </IconButton>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      {chatId && <Box sx={{
        flexGrow: 1,
        height: '100vh',
      }}>
        <Toolbar />
        <Box sx={{
          flexGrow: 1,
          overflow: 'scroll',
          padding: '15px 25px 0px 25px',
          maxHeight: 'calc(100vh - 68.5px - 80px)',
          minHeight: 'calc(100vh - 68.5px - 80px)',
          '@media screen and (max-width: 900px)': {
            maxHeight: 'calc(100vh - 64px - 80px)',
            minHeight: 'calc(100vh - 64px - 80px)',
          },
          '@media screen and (max-width: 600px)': {
            maxHeight: 'calc(100vh - 56px - 80px)',
            minHeight: 'calc(100vh - 64px - 80px)',
          },
        }}>
          {messages.length ? messages.map(({ id, user, userId, text, createdAt }) => (
            <Message key={id} avatar={user.avatar} username={`${user.firstName} ${user.lastName}`} isUserMessage={profile.id === userId} text={text} createdAt={createdAt} />
          )) : <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'rgba(0, 0, 0, 0.6)',
          }}>Start messaging here...</Box>}
          <Box ref={messagesEndRef} />
        </Box>
        <Box sx={{
          padding: '0px 25px',
        }}>
          <Input value={messageText} onChange={(e) => setMessageText(e.target.value)} onSend={handleSend} />
        </Box>
      </Box>}
    </Box>
  );
});
