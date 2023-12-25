import { useNavigate } from "react-router-dom";
import { MyButton } from "../components/MyButton";
import { ROUTES } from "../router";
import { useArrowKeys } from "../hooks/useArrowKeys";
import { SocketContext } from "../SocketProvider";
import { useContext, useEffect, useState } from "react";

export function WaitingForOpponentScreen() {
  const navigate = useNavigate();
  const [buttonRef] = useArrowKeys(1);
  const socket = useContext(SocketContext);
  const [id, setId] = useState("");

  useEffect(() => {
    socket.emit("createGame");

    const handleRoomId = (id) => setId(id);
    const handleGameReady = () => navigate(ROUTES.ENTER_SECRET);

    socket.on("roomId", handleRoomId);
    socket.on("gameReady", handleGameReady);

    return () => {
      socket.off("roomId", handleRoomId);
      socket.off("gameReady", handleGameReady);
    };
  }, []);

  return (
    <>
      <p>Идентификатор для входа:</p>
      <p>{id}</p>
      <p style={{ color: "grey" }}>Ожидание соперника...</p>
      <MyButton
        ref={buttonRef}
        style={{ marginTop: "5rem" }}
        onClick={() => {
          socket.emit("cancelCreateGame");
          navigate(ROUTES.MENU);
        }}
      >
        Вернуться в меню
      </MyButton>
    </>
  );
}
