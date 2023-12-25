import { useNavigate } from "react-router-dom";
import { MyButton } from "../components/MyButton";
import { ROUTES } from "../router";
import { useArrowKeys } from "../hooks/useArrowKeys";
import { useEffect, useState } from "react";

export function CreateOrJoinScreen() {
  const navigate = useNavigate();
  const [opt1, opt2, opt3] = useArrowKeys(3);
  const [isHintVisible, setIsHintVisible] = useState(true);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        setIsHintVisible(false);
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <>
      <h1>Быки и коровы</h1>
      <MyButton ref={opt1} onClick={() => navigate(ROUTES.SELECT_MODE)}>
        Создать игру
      </MyButton>
      <MyButton ref={opt2} onClick={() => navigate(ROUTES.JOIN)}>
        Присоединиться к игре
      </MyButton>
      <MyButton ref={opt3} onClick={() => navigate(ROUTES.HELP)}>
        Правила игры
      </MyButton>
      {isHintVisible && (
        <p style={{ marginTop: "1.5rem", color: "grey", fontSize: "0.75rem" }}>
          Используйте стрелки и клавишу Enter для навигации.
        </p>
      )}
    </>
  );
}
