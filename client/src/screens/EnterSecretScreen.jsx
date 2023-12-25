import { useContext, useEffect, useState } from "react";
import { MyButton } from "../components/MyButton";
import { useArrowKeys } from "../hooks/useArrowKeys";
import { SocketContext } from "../SocketProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../router";

export function EnterSecretScreen() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { mode } = state;
  const secretLength = mode === "long" ? 4 : 3;
  const [isAwaiting, setIsAwaiting] = useState(false);
  const [opt1, opt2] = useArrowKeys(2);
  const socket = useContext(SocketContext);
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    if (e.target.value.length > secretLength) return;
    setSecret(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAwaiting(true);
    socket.emit("setSecret", secret);
  };

  useEffect(() => {
    const handleNotFound = () => {
      setIsAwaiting(false);
      setError(`Введите ${secretLength} разных цифры`);
    };
    const handleStart = () => navigate(ROUTES.GAME, { state: { mode } });
    const handleConnectionError = () => navigate(ROUTES.CONNECTION_ERROR);

    socket.on("notFound", handleNotFound);
    socket.on("start", handleStart);
    socket.on("connectionError", handleConnectionError);

    return () => {
      socket.off("notFound", handleNotFound);
      socket.off("start", handleStart);
      socket.off("connectionError", handleConnectionError);
    };
  }, []);

  const preventKeyDown = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  };

  return (
    <>
      <h2>Старт игры...</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            Введите секретное число:
            <br />
            <input
              className="hide-spinners"
              ref={opt1}
              type="number"
              style={{ fontSize: "0.5rem" }}
              onKeyDown={preventKeyDown}
              value={secret}
              onChange={handleChange}
            />
          </label>
        </div>
        <MyButton
          style={{
            color: isAwaiting ? "white" : "black",
            cursor: isAwaiting ? "unset" : "pointer",
          }}
          ref={opt2}
          type="submit"
        >
          Продолжить
        </MyButton>
        {isAwaiting && <p style={{ color: "grey" }}>Ожидание соперника...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </>
  );
}
