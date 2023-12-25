import { useNavigate } from "react-router-dom";
import { MyButton } from "../components/MyButton";
import { ROUTES } from "../router";
import { useArrowKeys } from "../hooks/useArrowKeys";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../SocketProvider";

export function JoinGameScreen() {
  const navigate = useNavigate();
  const [opt1, opt2, opt3] = useArrowKeys(3);
  const socket = useContext(SocketContext);
  const [id, setId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("joinGame", id);
  };

  useEffect(() => {
    const handleNotFound = () => setError("Игра не найдена");
    const handleGameReady = (mode) => navigate(ROUTES.ENTER_SECRET, { state: { mode } });

    socket.on("notFound", handleNotFound);
    socket.on("gameReady", handleGameReady);

    return () => {
      socket.off("notFound", handleNotFound);
      socket.off("gameReady", handleGameReady);
    };
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            Введите идентификатор:
            <input
              ref={opt1}
              type="text"
              style={{ fontSize: "0.5rem" }}
              value={id}
              onChange={(e) => {
                setError("");
                setId(e.target.value);
              }}
            />
          </label>
        </div>
        <MyButton ref={opt2} type="submit">
          Продолжить
        </MyButton>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <MyButton ref={opt3} type="button" onClick={() => navigate(ROUTES.MENU)}>
        Вернуться в меню
      </MyButton>
    </>
  );
}
