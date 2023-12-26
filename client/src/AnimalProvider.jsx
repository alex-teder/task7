import { createContext, useContext, useEffect, useState } from "react";
import { SocketContext } from "./SocketProvider";

export const AnimalsContext = createContext();

export function AnimalsProvider({ children }) {
  const socket = useContext(SocketContext);
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
