import { createContext, useEffect, useState } from "react";
import socketio from "socket.io-client";

export const SocketContext = createContext();
const socket = socketio("https://bulls-and-cows-game.onrender.com");

export function SocketProvider({ children }) {
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}

export const AnimalsContext = createContext();

export function AnimalsProvider({ children }) {
  const [animals, setAnimals] = useState({ bulls: 4, cows: 4 });

  useEffect(() => {
    const handleAnimalsUpdate = (moveList) => {
      if (!moveList.length) return;
      const { bulls, cows } = moveList.at(-1);
      setAnimals({ bulls, cows });
    };
    socket.on("game:yourMoves", handleAnimalsUpdate);
    return () => socket.off("game:yourMoves", handleAnimalsUpdate);
  }, []);

  return <AnimalsContext.Provider value={animals}>{children}</AnimalsContext.Provider>;
}
