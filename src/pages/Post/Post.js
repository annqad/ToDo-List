import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Typography, Box, TextField, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  PhotoCamera as PhotoCameraIcon,
  // Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { SHOW_ERROR_ALERT } from "../../constants";
import { GET_POST_REQUEST } from "../../constants/posts";
import { commentsSocket } from "../../sockets";
import { convertDate } from "../../helpers";
import "./Post.css";
import { Comment } from "./components/Comment/Comment";

export const Post = memo(() => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const profile = useSelector((state) => state.user.profile);
  const post = useSelector((state) => state.posts.post);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const handleChange = useCallback((event) => {
    setText(event.target.value);
  }, []);

  const handleSend = useCallback(() => {
    if (text.trim()) {
      commentsSocket.emit("send", {
        postId,
        text: text.trim(),
      });
      setText("");
    }
  }, [text, postId]);

  const handleEdit = useCallback((id) => () => {}, []);

  const handleDelete = useCallback((id) => () => {}, []);

  const handleLike = useCallback(() => {}, []);

  useEffect(() => {
    if (postId) {
      dispatch({
        type: GET_POST_REQUEST,
        payload: {
          postId,
        },
      });
      commentsSocket.emit("join", {
        postId,
      });
      commentsSocket.on("joined", (payload) => setComments(payload.comments));
      commentsSocket.on("error", (error) =>
        dispatch({
          type: SHOW_ERROR_ALERT,
          payload: {
            error,
          },
        })
      );
      return () => {
        commentsSocket.emit("leave");
        commentsSocket.off();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    commentsSocket.on("sent", (payload) =>
      setComments([...comments, payload.comment])
    );
  }, [comments]);
  // console.log(post);
  return (
    <PageWrapper>
      <div className="post">
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
          src={post.thumbnail}
        >
          <PhotoCameraIcon sx={{ fontSize: "100px" }} />
        </Avatar>
        <Box sx={{ width: "100%", maxWidth: "400px", marginTop: "8px" }}>
          <Typography
            sx={{ fontWeight: "bold" }}
            variant="subtitle1"
            component="div"
            gutterBottom
          >
            {post.title}
          </Typography>
          <Typography
            sx={{ textAlign: "justify" }}
            variant="subtitle2"
            component="div"
            gutterBottom
          >
            {post.description}
          </Typography>
          <div className="caption">
            <div className="likes">
              <FavoriteBorderIcon
                sx={{ marginRight: "4px", cursor: "pointer" }}
                onClick={handleLike}
              />
              <Typography variant="subtitle1" component="div">
                {post.likes}
              </Typography>
            </div>
            <Typography variant="subtitle2" display="block" gutterBottom>
              {convertDate(post.createdAt || post.updatedAt)}
            </Typography>
          </div>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {comments.map(({ id, text, user, createdAt, updatedAt }) => (
            <Comment
              key={id}
              avatar={user.avatar}
              firstName={user.firstName}
              lastName={user.lastName}
              bgcolor={user.bgcolor}
              text={text}
              createdAt={createdAt}
              updatedAt={updatedAt}
              canDelete={user.id === profile.id}
              canEdit={user.id === profile.id}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </Box>
        <Box sx={{ display: "flex", margin: "8px 0px 24px 0px" }}>
          <TextField
            fullWidth
            sx={{ marginRight: "8px" }}
            value={text}
            onChange={handleChange}
          />
          <Button onClick={handleSend} variant="contained">
            <SendIcon />
          </Button>
        </Box>
      </div>
    </PageWrapper>
  );
});
