import { useNavigate } from "react-router-dom";
import { useArrowKeys } from "../hooks/useArrowKeys";
import { MyButton } from "../components/MyButton";
import { ROUTES } from "../router";

export function ConnectionErrorScreen() {
  const navigate = useNavigate();

  const [opt1] = useArrowKeys(1);

  return (
    <>
      <p style={{ color: "red" }}>Ошибка подключения!</p>
      <MyButton ref={opt1} onClick={() => navigate(ROUTES.MENU)}>
        Главное меню
      </MyButton>
    </>
  );
}
