import { CLEAR_REDUX_STATE } from "../constants/app";
import {
  ADD_POST_SUCCESS,
  GET_POST_SUCCESS,
  GET_POSTS_SUCCESS,
} from "../constants/posts";

const initialState = {
  posts: [],
  post: {},
};

export const posts = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.payload.post],
      };

    case GET_POST_SUCCESS:
      return {
        ...state,
        post: action.payload.post,
      };

    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload.posts,
      };

    case CLEAR_REDUX_STATE:
      return {
        ...initialState,
      };

    default: {
      return state;
    }
  }
};
