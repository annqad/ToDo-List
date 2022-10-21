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
  Dialog,
} from "@mui/material";
import { Menu as MenuIcon, Person as PersonIcon } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { LOGOUT_REQUEST } from "../../constants/user";
import {
  pages,
  settings,
  entities,
  TO_DO_LIST_PAGE,
  POSTS_PAGE,
  CHATS_PAGE,
  PROFILE_SETTING,
  LOGOUT_SETTING,
  CREATE_SETTING,
  TASK_ENTITY,
  POST_ENTITY,
  CHAT_ENTITY,
  ADD_TASK_MODAL,
  ADD_POST_MODAL,
  ADD_CHAT_MODAL,
} from "../../config";
import { getInitials } from "../../helpers";
import { SHOW_MODAL } from "../../constants/app";
import "./Header.css";

export const Header = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.user.profile);
  const [isSelectEntityDialogOpened, setIsSelectEntityDialogOpened] = useState(false);
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

  // const handleOpenCreateMenu = (event) => {
  //   setAnchorElCreate(event.currentTarget);
  // };

  // const handleCloseCreateMenu = (event) => {
  //   setAnchorElCreate(null);
  // };

  const handlePageClick = (page) => () => {
    switch (page) {
      case TO_DO_LIST_PAGE:
        navigate("/to-do/list");
        break;
      case POSTS_PAGE:
        navigate("/posts");
        break;
      case CHATS_PAGE:
        navigate("/chats");
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
      case CREATE_SETTING:
        setIsSelectEntityDialogOpened(true);
        break;
      default:
    }
  };

  const handleEntityClick = (entity) => () => {
    setIsSelectEntityDialogOpened(false)
    switch (entity) {
      case TASK_ENTITY:
        dispatch({
          type: SHOW_MODAL,
          payload: {
            name: ADD_TASK_MODAL,
          },
        });
        break;
      case POST_ENTITY:
        dispatch({
          type: SHOW_MODAL,
          payload: {
            name: ADD_POST_MODAL,
          },
        });
        break;
      case CHAT_ENTITY:
        dispatch({
          type: SHOW_MODAL,
          payload: {
            name: ADD_CHAT_MODAL,
          },
        });
        break;
      default:
    }

    setAnchorElCreate(null);
  };

  // const handleSettingOver = (setting) => (event) => {
  //   switch (setting) {
  //     case PROFILE_SETTING:
  //     case LOGOUT_SETTING:
  //       handleCloseCreateMenu(null);
  //       break;
  //     case CREATE_SETTING:
  //       handleOpenCreateMenu(event);
  //       break;
  //     default:
  //   }
  // };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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
                  sx={{
                    bgcolor: profile.avatar ? grey[500] : profile.bgcolor,
                    fontSize: "14px",
                  }}
                >
                  {getInitials(profile.firstName, profile.lastName) || (
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
                // onMouseOver={handleSettingOver(name)}
                >
                  <Icon sx={{ marginRight: "8px" }} />
                  <Typography textAlign="center" fontWeight="bold">
                    {name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
            <SelectEntityDialog open={isSelectEntityDialogOpened} onClose={(e) => setIsSelectEntityDialogOpened(false)} onSelect={handleEntityClick} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
});

const SelectEntityDialog = ({ open, onClose, onSelect }) => {
  return (<Dialog onClose={onClose} open={open}>
    <Box
      sx={{
        background: "#FFFFFF",
        padding: "8px 0px",
      }}
      boxShadow={3}
    >
      {entities.map(({ name, Icon }) => (
        <Box
          key={name}
          className="entity"
          onClick={onSelect(name)}
        >
          <Icon sx={{ marginRight: "8px" }} />
          <Typography textAlign="center" fontWeight="bold">
            {name}
          </Typography>
        </Box>
      ))}
    </Box>
  </Dialog>)
}
