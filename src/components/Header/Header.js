import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Avatar,
  Button,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  PhotoCamera as PhotoCameraIcon,
  Edit as EditIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  SignalCellularNull,
} from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { LOGOUT_REQUEST } from "../../constants/user";
import {
  pages,
  settings,
  entities,
  TO_DO_LIST_PAGE,
  POSTS_PAGE,
  PROFILE_SETTING,
  LOGOUT_SETTING,
  CREATE_SETTING,
  TASK_ENTITY,
  POST_ENTITY,
} from "../../config";
import { fileToDataURL, getInitials, getInputDate } from "../../helpers";
import { Modal } from "../Modal/Modal";
import { ADD_TASK_REQUEST } from "../../constants/tasks";
import { ADD_POST_REQUEST } from "../../constants/posts";
import "./Header.css";

export const Header = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.user.profile);
  const [thumbnail, setThumbnail] = useState();
  const [modal, setModal] = useState(SignalCellularNull);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElCreate, setAnchorElCreate] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setAnchorElCreate(null);
  };

  const handleOpenCreateMenu = (event) => {
    setAnchorElCreate(event.currentTarget);
  };

  const handleCloseCreateMenu = (event) => {
    setAnchorElCreate(null);
  };

  const handlePageClick = (page) => () => {
    switch (page) {
      case TO_DO_LIST_PAGE:
        navigate("/to-do/list");
        break;
      case POSTS_PAGE:
        navigate("/posts");
        break;
      default:
    }
    setAnchorElNav(null);
  };

  const handleSettingClick = (setting) => () => {
    switch (setting) {
      case PROFILE_SETTING:
        navigate("/profile");
        setAnchorElUser(null);
        break;
      case LOGOUT_SETTING:
        dispatch({
          type: LOGOUT_REQUEST,
        });
        setAnchorElUser(null);
        break;
      default:
    }
  };

  const handleEntityClick = (entity) => () => {
    switch (entity) {
      case TASK_ENTITY:
        setModal("task");
        break;
      case POST_ENTITY:
        setModal("post");
        break;
      default:
    }

    setAnchorElCreate(null);
  };

  const handleSettingOver = (setting) => (event) => {
    switch (setting) {
      case PROFILE_SETTING:
      case LOGOUT_SETTING:
        handleCloseCreateMenu(null);
        break;
      case CREATE_SETTING:
        handleOpenCreateMenu(event);
        break;
      default:
    }
  };

  const handleCloseModal = () => {
    setModal(null);
  };

  const handleAddTask = (data) => {
    dispatch({
      type: ADD_TASK_REQUEST,
      payload: {
        data,
      },
    });
    setModal(null);
  };

  const handleImage = async (event) => {
    const dataURL = await fileToDataURL(event.target.files[0]);
    setThumbnail(dataURL);
  };

  const handleAddPost = (data) => {
    dispatch({
      type: ADD_POST_REQUEST,
      payload: {
        data: {
          ...data,
          thumbnail,
        },
      },
    });
    setModal(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            ANYA DAO & CO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handlePageClick(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            ANYA DAO & CO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handlePageClick(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Anya Dao"
                  src={profile.avatar}
                  sx={{ bgcolor: grey[500], fontSize: "14px" }}
                >
                  {getInitials(profile.firstName, profile.secondName) || (
                    <PersonIcon />
                  )}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(({ name, Icon }) => (
                <MenuItem
                  key={name}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "bold",
                    background:
                      name === CREATE_SETTING && anchorElCreate
                        ? "rgba(0, 0, 0, 0.04)"
                        : "none",
                  }}
                  onClick={handleSettingClick(name)}
                  onMouseOver={handleSettingOver(name)}
                >
                  <Icon sx={{ marginRight: "8px" }} />
                  <Typography textAlign="center" fontWeight="bold">
                    {name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
            <Box
              sx={{
                position: "absolute",
                display: anchorElCreate ? "block" : "none",
                background: "#FFFFFF",
                padding: "8px 0px",
                borderRadius: "4px",
                right: "121px",
                top: "97px",
                zIndex: 1400,
              }}
              boxShadow={3}
              onMouseLeave={handleCloseCreateMenu}
            >
              {entities.map(({ name, Icon }) => (
                <Box
                  key={name}
                  className="entity"
                  onClick={handleEntityClick(name)}
                >
                  <Icon sx={{ marginRight: "8px" }} />
                  <Typography textAlign="center" fontWeight="bold">
                    {name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Toolbar>
      </Container>
      <Modal
        show={modal === "task"}
        title="Add task"
        fields={[
          {
            name: "title",
            label: "Title",
            type: "text",
            value: "",
          },
          {
            name: "description",
            label: "Description",
            type: "text",
            value: "",
          },
          {
            name: "remind",
            label: "Remind",
            type: "datetime-local",
            value: getInputDate(),
          },
        ]}
        onClose={handleCloseModal}
        onConfirm={handleAddTask}
      />
      <Modal
        show={modal === "post"}
        title="Add post"
        fields={[
          {
            name: "title",
            label: "Title",
            type: "text",
            value: "",
          },
          {
            name: "description",
            label: "Description",
            type: "text",
            value: "",
          },
        ]}
        onClose={handleCloseModal}
        onConfirm={handleAddPost}
      >
        <Box
          className="thumbnail"
          component="label"
          sx={{ marginBottom: "4px" }}
        >
          <Box className="edit">
            <EditIcon
              className="icon"
              sx={{ color: "#FFFFFF", fontSize: "100px" }}
            />
          </Box>
          <Avatar
            sx={{
              width: "400px",
              minHeight: "400px",
              height: "auto",
              margin: "auto",
              fontSize: "50px",
              borderRadius: "4px",
              bgcolor: grey[500],
            }}
            variant="square"
            alt="post thumbnail"
            src={thumbnail}
          >
            <PhotoCameraIcon sx={{ fontSize: "100px" }} />
          </Avatar>
          <input type="file" accept="image/*" hidden onChange={handleImage} />
        </Box>
      </Modal>
    </AppBar>
  );
});
