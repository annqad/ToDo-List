import { Avatar, TextField, Button, Box } from "@mui/material";
import {
  Edit as EditIcon,
  Person as PersonIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
} from "@mui/icons-material";
import { Fragment, memo, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { fileToDataURL, getAudioDuration, keyToLabel } from "../../helpers";
import { CHANGE_PROFILE_REQUEST } from "../../constants/user";
import { SHOW_ERROR_ALERT } from "../../constants";
import { getInitials } from "../../helpers";
import "./Profile.css";

export const Profile = memo(() => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const profile = useSelector((state) => state.user.profile);
  const [avatar, setAvatar] = useState();
  const [audio, setAudio] = useState();
  const [data, setData] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
  });

  const [playing, setPlaying] = useState(false);

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleImage = async (event) => {
    const dataURL = await fileToDataURL(event.target.files[0]);
    setAvatar(dataURL);
  };

  const handleAudio = async (event) => {
    const dataURL = await fileToDataURL(event.target.files[0]);
    const duration = await getAudioDuration(dataURL);
    if (duration > 3) {
      dispatch({
        type: SHOW_ERROR_ALERT,
        payload: {
          error: "File too big. Maximum duration is 3 seconds.",
        },
      });
      event.target.value = null;
    } else {
      setAudio(dataURL);
    }
  };

  const handleSave = () => {
    dispatch({
      type: CHANGE_PROFILE_REQUEST,
      payload: {
        data: {
          ...data,
          ...(avatar ? { avatar } : {}),
          ...(audio ? { audio } : {}),
        },
      },
    });
  };

  const handlePlay = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setPlaying(true);
    const sound = new Audio(audio || profile.audio);
    sound.onended = () => setPlaying(false);
    sound.play();
  };

  useEffect(() => {
    setData({
      firstName: profile.firstName,
      lastName: profile.lastName,
    });
  }, [profile]);

  return (
    <PageWrapper>
      <div className="profile">
        <div className="avatar">
          <Box component="label" className="upload">
            <EditIcon
              className="icon"
              sx={{ color: "#FFFFFF", fontSize: "50px" }}
            />
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleImage}
            />
          </Box>
          <Avatar
            sx={{
              width: "200px",
              height: "200px",
              margin: "auto",
              marginBottom: "4px",
              fontSize: "50px",
              bgcolor: "secondary.main",
            }}
            alt="Anya Dao"
            src={avatar || profile.avatar}
          >
            {getInitials(profile.firstName, profile.secondName) || (
              <PersonIcon sx={{ fontSize: "100px" }} />
            )}
          </Avatar>
        </div>
        {Object.entries(data).map(([key, value]) => (
          <TextField
            key={key}
            name={key}
            label={keyToLabel(key)}
            value={value || ""}
            margin="dense"
            onChange={handleChange}
          />
        ))}
        <Button
          variant="outlined"
          component="label"
          sx={{ marginTop: "8px", marginBottom: "4px", position: "relative" }}
        >
          {`${audio || profile.audio ? "EDIT" : "ADD"} REMIND AUDIO`}
          {(audio || profile.audio) && (
            <Fragment>
              {playing ? (
                <PauseIcon sx={{ position: "absolute", right: "12px" }} />
              ) : (
                <PlayArrowIcon
                  onClick={handlePlay}
                  sx={{ position: "absolute", right: "12px" }}
                />
              )}
            </Fragment>
          )}
          <input type="file" accept=".mp3" hidden onChange={handleAudio} />
        </Button>
        <Button
          variant="outlined"
          sx={{ marginTop: "8px" }}
          disabled={Object.values(data).some((value) => !value)}
          onClick={handleSave}
        >
          SAVE
        </Button>
      </div>
    </PageWrapper>
  );
});
