import { useLocation, useNavigate } from "react-router-dom";
import { MyButton } from "../components/MyButton";
import { useArrowKeys } from "../hooks/useArrowKeys";
import { ROUTES } from "../router";
import { useContext, useEffect } from "react";
import { SocketContext } from "../SocketProvider";

export function ResultScreen() {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const { state } = useLocation();
  const won = state.won;

  const [opt1] = useArrowKeys(1);

  useEffect(() => {
    socket.emit("finishedPlaying");
  });

  return (
    <>
      <Result won={won} />
      <MyButton ref={opt1} onClick={() => navigate(ROUTES.MENU)}>
        Главное меню
      </MyButton>
    </>
  );
}

function Result({ won }) {
  switch (won) {
    case true:
      return <h1>Вы выиграли!</h1>;
    case false:
      return <h1>Вы проиграли!</h1>;
    default:
      return <h1>Ничья!</h1>;
  }
}
