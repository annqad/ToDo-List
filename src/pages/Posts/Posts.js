import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { Post } from "./components/Post/Post";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { GET_POSTS_REQUEST } from "../../constants/posts";

export const Posts = memo(() => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch({
      type: GET_POSTS_REQUEST,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageWrapper>
      <Box sx={{ marginTop: "20px" }}>
        {posts.map(({ id, thumbnail, description }) => (
          <Post
            key={id}
            id={id}
            thumbnail={thumbnail}
            description={description}
          />
        ))}
      </Box>
    </PageWrapper>
  );
});
