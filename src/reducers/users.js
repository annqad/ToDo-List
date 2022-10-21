import { CLEAR_REDUX_STATE } from "../constants/app";
import { GET_USERS_SUCCESS } from "../constants/users";

const initialState = {
  users: [],
};

export const users = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
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
