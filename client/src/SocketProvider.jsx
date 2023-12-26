import { createContext } from "react";
import socketio from "socket.io-client";

export const SocketContext = createContext();
// const socket = socketio("https://bulls-and-cows-game.onrender.com");
const socket = socketio("ws://localhost:3333");

export function SocketProvider({ children }) {
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
