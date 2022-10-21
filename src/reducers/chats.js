import { CLEAR_REDUX_STATE } from "../constants/app";
import {
  ADD_CHAT_SUCCESS,
  GET_CHAT_SUCCESS,
  DELETE_CHAT_SUCCESS,
  GET_CHATS_SUCCESS,
} from "../constants/chats";

const initialState = {
  chats: [],
  chat: {},
};

export const chats = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHAT_SUCCESS:
      return {
        ...state,
        chats: [...state.chats, action.payload.chat],
      };

    case GET_CHAT_SUCCESS:
      return {
        ...state,
        chat: action.payload.chat,
      };

    case DELETE_CHAT_SUCCESS:
      return {
        ...state,
        chats: state.chats.filter((chat) => chat.id !== action.payload.id),
      };

    case GET_CHATS_SUCCESS:
      return {
        ...state,
        chats: action.payload.chats,
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
