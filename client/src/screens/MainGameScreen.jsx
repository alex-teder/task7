import { useContext, useEffect, useState } from "react";
import { MyButton } from "../components/MyButton";
import { SocketContext } from "../SocketProvider";
import { MoveListItem } from "../components/MoveListItem";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../router";
import { useArrowKeys } from "../hooks/useArrowKeys";

export function MainGameScreen() {
  const smallerFont = { fontSize: "0.75rem" };
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { mode } = state;
  const secretLength = mode === "long" ? 4 : 3;
  const [fieldRef] = useArrowKeys(1);
  const [mySecret, setMySecret] = useState("");
  const [attempt, setAttempt] = useState("");
  const [error, setError] = useState("");
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [myMovesList, setMyMovesList] = useState([]);
  const [opMovesList, setOpMovesList] = useState([]);

  useEffect(() => {
    const handleYourSecret = (secret) => setMySecret(secret);
    const handleYourTurn = () => {
      setIsMyTurn(true);
      setTimeout(() => {
        fieldRef.current.focus();
      }, 100);
    };
    const handleOpponentTurn = () => setIsMyTurn(false);
    const handleYourMoves = (moveList) => setMyMovesList(moveList);
    const handleOpponentMoves = (moveList) => setOpMovesList(moveList);
    const handleNotFound = () => setError(`Введите ${secretLength} разных цифры`);
    const handleYouWin = () => navigate(ROUTES.RESULT, { state: { won: true } });
    const handleYouLose = () => navigate(ROUTES.RESULT, { state: { won: false } });
    const handleDraw = () => navigate(ROUTES.RESULT, { state: {} });
    const handleConnectionError = () => navigate(ROUTES.CONNECTION_ERROR);

    socket.on("yourSecret", handleYourSecret);
    socket.on("game:yourTurn", handleYourTurn);
    socket.on("game:opponentTurn", handleOpponentTurn);
    socket.on("game:yourMoves", handleYourMoves);
    socket.on("game:opponentMoves", handleOpponentMoves);
    socket.on("notFound", handleNotFound);
    socket.on("game:youWin", handleYouWin);
    socket.on("game:youLose", handleYouLose);
    socket.on("game:draw", handleDraw);
    socket.on("connectionError", handleConnectionError);

    return () => {
      socket.off("yourSecret", handleYourSecret);
      socket.off("game:yourTurn", handleYourTurn);
      socket.off("game:opponentTurn", handleOpponentTurn);
      socket.off("game:yourMoves", handleYourMoves);
      socket.off("game:opponentMoves", handleOpponentMoves);
      socket.off("notFound", handleNotFound);
      socket.off("game:youWin", handleYouWin);
      socket.off("game:youLose", handleYouLose);
      socket.off("game:draw", handleDraw);
      socket.off("connectionError", handleConnectionError);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAttempt("");
    setError("");
    socket.emit("game:submitMove", attempt);
  };

  const handleChange = (e) => {
    setError("");
    if (e.target.value.length > secretLength) return;
    setAttempt(e.target.value);
  };

  const preventKeyDown = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  };

  return (
    <>
      <p style={{ margin: 0, padding: 0 }}>Ваше секретное число: {mySecret}</p>
      <form onSubmit={handleSubmit}>
        <label>
          {isMyTurn && "Ваш ход!"}
          <input
            ref={fieldRef}
            type="number"
            disabled={!isMyTurn}
            style={{ fontSize: "0.875rem", margin: "0.5rem", width: "3rem" }}
            onKeyDown={preventKeyDown}
            value={attempt}
            onChange={handleChange}
          />
          <MyButton type="submit" disabled={!isMyTurn} style={smallerFont}>
            Отправить
          </MyButton>
        </label>
      </form>
      {isMyTurn || <p style={{ color: "grey" }}>Ожидаем ход противника...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div>
          <p style={smallerFont}>ваши ходы:</p>
          <ol>
            {myMovesList.map((data, idx) => (
              <MoveListItem
                cows={data.cows}
                bulls={data.bulls}
                attemptString={data.guess}
                key={idx}
              />
            ))}
          </ol>
        </div>
        <div>
          <p style={smallerFont}>ходы противника:</p>
          <ol>
            {opMovesList.map((data, idx) => (
              <MoveListItem
                cows={data.cows}
                bulls={data.bulls}
                attemptString={data.guess}
                key={idx}
              />
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
