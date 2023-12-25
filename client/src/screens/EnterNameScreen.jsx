import { useNavigate } from "react-router-dom";
import { MyButton } from "../components/MyButton";
import { ROUTES } from "../router";
import { useArrowKeys } from "../hooks/useArrowKeys";
import { useContext, useState } from "react";
import { SocketContext } from "../SocketProvider";

export function EnterNameScreen() {
  const navigate = useNavigate();
  const [opt1, opt2] = useArrowKeys(2);
  const [name, setName] = useState("");

  const socket = useContext(SocketContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("setName", name || "Player");
    navigate(ROUTES.MENU);
  };

  return (
    <>
      <h1>Быки и коровы</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1.5rem" }}>
          <label>
            Введите своё имя:
            <input
              ref={opt1}
              type="text"
              style={{ fontSize: "0.5rem" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <MyButton ref={opt2} type="submit">
          Продолжить
        </MyButton>
      </form>
    </>
  );
}
