import { io } from "socket.io-client";
import { URL } from "./config";

export const commentsSocket = io(`${URL}comments`);
// export const chatsSocket = io(`${URL}chats`);
export const messagesSocket = io(`${URL}messages`);
