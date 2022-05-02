import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box } from "@mui/material";
import {
  PhotoCamera as PhotoCameraIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { Modal } from "../components/Modal/Modal";
import { fileToDataURL } from "../../../helpers";
import { ADD_POST_MODAL } from "../../../config";
import { ADD_POST_REQUEST } from "../../../constants/posts";
import { HIDE_MODAL } from "../../../constants/app";
import "./AddPostModal.css";

export const AddPostModal = memo(() => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.app.modals[ADD_POST_MODAL]);
  const [thumbnail, setThumbnail] = useState();

  const handleThumbnail = async (event) => {
    const dataURL = await fileToDataURL(event.target.files[0]);
    setThumbnail(dataURL);
  };

  const handleClose = () => {
    dispatch({
      type: HIDE_MODAL,
      payload: {
        name: ADD_POST_MODAL,
      },
    });
  };

  const handleConfirm = (data) => {
    dispatch({
      type: ADD_POST_REQUEST,
      payload: {
        data: {
          ...data,
          thumbnail,
        },
      },
    });
    handleClose();
  };

  useEffect(() => {
    if (!data) {
      setTimeout(setThumbnail, 100);
    }
  }, [data]);

  return (
    <Modal
      show={!!data}
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
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      <Box className="thumbnail" component="label" sx={{ marginBottom: "4px" }}>
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
            bgcolor: grey[500],
          }}
          variant="rounded"
          alt="post thumbnail"
          src={thumbnail}
        >
          <PhotoCameraIcon sx={{ fontSize: "100px" }} />
        </Avatar>
        <input type="file" accept="image/*" hidden onChange={handleThumbnail} />
      </Box>
    </Modal>
  );
});
