import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Typography, Box, TextField, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  PhotoCamera as PhotoCameraIcon,
  // Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Send as SendIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { commentsSocket } from "../../sockets";
import { convertDate, scrollDown } from "../../helpers";
import { Comment } from "./components/Comment/Comment";
import { useShowAlert } from "../../hooks/useShowAlert";
import { GET_POST_REQUEST } from "../../constants/posts";
import "./Post.css";

export const Post = memo(() => {
  const dispatch = useDispatch();
  const showAlert = useShowAlert();
  const inputRef = useRef();
  const textRef = useRef();
  const profile = useSelector((state) => state.user.profile);
  const post = useSelector((state) => state.posts.post);
  const { postId } = useParams();
  const [commentIdToEdit, setCommentIdToEdit] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const handleChange = useCallback((event) => {
    setText(event.target.value);
  }, []);

  const handleSend = useCallback(() => {
    if (text.trim()) {
      if (commentIdToEdit) {
        commentsSocket.emit("edit", {
          commentId: commentIdToEdit,
          text: text.trim(),
        });
        setText(textRef.current);
        setCommentIdToEdit(null);
      } else {
        commentsSocket.emit("send", {
          postId,
          text: text.trim(),
        });
        setText("");
      }
      inputRef.current.focus();
    }
  }, [text, postId, commentIdToEdit]);

  const handleEdit = useCallback(
    (commentId, commentText) => () => {
      textRef.current = text;
      setCommentIdToEdit(commentId);
      setText(commentText);
      inputRef.current.focus();
    },
    [text]
  );

  const handleDelete = useCallback(
    (commentId) => () => {
      commentsSocket.emit("delete", {
        commentId,
      });
    },
    []
  );

  const handleLike = useCallback((id) => { }, []);

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
      commentsSocket.on("error", (error) => showAlert("error", error));
      return () => {
        commentsSocket.emit("leave");
        commentsSocket.off();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    commentsSocket.on("sent", (payload) => {
      setComments([...comments, payload.comment]);
      scrollDown();
    });
    commentsSocket.on("deleted", (payload) => {
      setComments(
        comments.filter((comment) => comment.id !== payload.commentId)
      );
      showAlert("success", "Comment has been deleted.");
    });

    commentsSocket.on("edited", (payload) => {
      setComments(
        comments.map((comment) =>
          comment.id === payload.commentId
            ? {
              ...comment,
              text: payload.text,
              updatedAt: payload.updatedAt,
            }
            : comment
        )
      );
      showAlert("success", "Comment has been edited.");
    });
    return () => {
      commentsSocket.removeListener("sent");
      commentsSocket.removeListener("deleted");
      commentsSocket.removeListener("edited");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments]);

  return (
    <PageWrapper>
      {post.id && (
        <div className="post" style={{ marginTop: "76px" }}>
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
                onEdit={handleEdit(id, text)}
                onDelete={handleDelete(id)}
              />
            ))}
          </Box>
          <Box sx={{ display: "flex", margin: "8px 0px 24px 0px" }}>
            <TextField
              fullWidth
              inputRef={inputRef}
              sx={{ marginRight: "8px" }}
              value={text}
              onChange={handleChange}
            />
            <Button onClick={handleSend} variant="contained">
              {commentIdToEdit ? <EditIcon /> : <SendIcon />}
            </Button>
          </Box>
        </div>
      )}
    </PageWrapper>
  );
});
