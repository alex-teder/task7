import { useNavigate } from "react-router-dom";
import { MyButton } from "../components/MyButton";
import { useArrowKeys } from "../hooks/useArrowKeys";
import { ROUTES } from "../router";

export function SelectModeScreen() {
  const navigate = useNavigate();
  const [opt1, opt2, opt3] = useArrowKeys(3);
  return (
    <>
      <h1>Быки и коровы</h1>
      <MyButton ref={opt1} onClick={() => navigate(ROUTES.CREATE, { state: { mode: "long" } })}>
        Нормальный режим
      </MyButton>
      <MyButton ref={opt2} onClick={() => navigate(ROUTES.CREATE, { state: { mode: "short" } })}>
        Быстрый режим (3 цифры)
      </MyButton>
      <p />
      <MyButton ref={opt3} onClick={() => navigate(ROUTES.MENU)}>
        Вернуться в меню
      </MyButton>
    </>
  );
}
