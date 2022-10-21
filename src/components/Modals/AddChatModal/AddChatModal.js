import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, InputAdornment, TextField, Checkbox, Paper, Chip } from "@mui/material";
import {
  PhotoCamera as PhotoCameraIcon,
  Edit as EditIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { Modal } from "../components/Modal/Modal";
import { fileToDataURL, getInitials } from "../../../helpers";
import { ADD_CHAT_MODAL } from "../../../config";
import { HIDE_MODAL } from "../../../constants/app";
import { GET_USERS_REQUEST } from "../../../constants/users";
import { ADD_CHAT_REQUEST } from "../../../constants/chats";
import "./AddChatModal.css";

export const AddChatModal = memo(() => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.app.modals[ADD_CHAT_MODAL]);
  const users = useSelector((state) => state.users.users);
  const [title, setTitle] = useState('');
  const [search, setSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [thumbnail, setThumbnail] = useState();

  const handleThumbnail = async (event) => {
    const dataURL = await fileToDataURL(event.target.files[0]);
    setThumbnail(dataURL);
  };

  const handleClose = () => {
    dispatch({
      type: HIDE_MODAL,
      payload: {
        name: ADD_CHAT_MODAL,
      },
    });
  };

  const handleConfirm = () => {
    dispatch({
      type: ADD_CHAT_REQUEST,
      payload: {
        data: {
          title,
          thumbnail,
          usersIds: selectedUsers.map(({ id }) => id),
        },
      },
    });
    handleClose();
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const getUsersList = () => {
    return search ? users.filter(({ firstName, lastName }) => firstName.toLowerCase().includes(search.toLowerCase()) || lastName.toLowerCase().includes(search.toLowerCase())) : users
  };

  const handleSelect = (id) => {
    setSelectedUsers([...selectedUsers, users.find((user) => user.id === id)]);
  };

  const handleRemove = (id) => {
    setSelectedUsers(selectedUsers.filter((user) => user.id !== id));
  };

  useEffect(() => {
    if (!data) {
      setTimeout(() => {
        setThumbnail();
        setTitle('');
        setSearch('');
        setSelectedUsers([]);
      }, 100);
    } else {
      dispatch({
        type: GET_USERS_REQUEST,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Modal
      show={!!data}
      title="Add Chat"
      modalProps={{
        fullWidth: true,
        maxWidth: 'sm',
      }}
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      <Box className="thumbnail" component="label" sx={{ marginBottom: "4px" }}>
        <Box className="edit">
          <EditIcon
            className="icon"
            sx={{ color: "#FFFFFF", fontSize: "50px" }}
          />
        </Box>
        <Avatar
          sx={{
            width: "200px",
            minHeight: "200px",
            maxHeight: "200px",
            height: "auto",
            margin: "auto",
            fontSize: "25px",
            bgcolor: grey[500],
          }}
          variant="rounded"
          alt="post thumbnail"
          src={thumbnail}
        >
          <PhotoCameraIcon sx={{ fontSize: "50px" }} />
        </Avatar>
        <input type="file" accept="image/*" hidden onChange={handleThumbnail} />
      </Box>
      <TextField sx={{ marginTop: '10px' }} label='Title' fullWidth value={title} onChange={handleChangeTitle} />
      <TextField
        sx={{ margin: '10px 0px' }}
        placeholder='Search'
        InputProps={{
          style: {
            paddingLeft: '8px',
          },
          startAdornment: (
            <InputAdornment position="start">
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {selectedUsers.map(({ id, firstName }) => (
                  <Chip
                    key={id}
                    label={firstName.length > 4 ? `${firstName.substring(0, 4)}...` : firstName}
                    onDelete={() => handleRemove(id)}
                  />
                ))}
              </Box>
            </InputAdornment>
          ),
        }}
        fullWidth
        value={search}
        onChange={handleSearch}
      />
      <Box sx={{ maxHeight: '240px', overflow: 'scroll' }}>
        {getUsersList().map(({ id, firstName, lastName, avatar }) => (
          <User
            key={id}
            id={id}
            firstName={firstName}
            lastName={lastName}
            avatar={avatar}
            checked={selectedUsers.find((user) => user.id === id)}
            onSelect={handleSelect}
            onRemove={handleRemove}
          />
        )
        )}
      </Box>
    </Modal>
  );
});

const User = memo(({ id, firstName, lastName, avatar, checked, onSelect, onRemove }) => {
  const handleChange = (event) => {
    if (event.target.checked) {
      onSelect(id);
    } else {
      onRemove(id);
    }
  };

  return (
    <Paper sx={{
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      marginBottom: '5px',
      boxShadow: 'none',
      border: '1px solid lightgrey',
    }}>
      <Avatar sx={{ marginRight: '10px' }} src={avatar}>
        {getInitials(firstName, lastName) || (
          <PersonIcon />
        )}
      </Avatar>
      <Box>{`${firstName} ${lastName}`}</Box>
      <Checkbox sx={{ marginLeft: 'auto' }} onChange={handleChange} checked={Boolean(checked)} />
    </Paper>
  );
});