import { io } from "socket.io-client";
import { URL } from "./config";

const socket = io(URL);

export default socket;
