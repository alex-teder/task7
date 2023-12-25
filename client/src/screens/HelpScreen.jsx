import { useNavigate } from "react-router-dom";
import { MyButton } from "../components/MyButton";
import { ROUTES } from "../router";
import { useArrowKeys } from "../hooks/useArrowKeys";
import { BullIcon } from "../components/BullIcon";
import { CowIcon } from "../components/CowIcon";

export function HelpScreen() {
  const navigate = useNavigate();
  const [buttonRef] = useArrowKeys(1);

  return (
    <>
      <div>
        <BullIcon /> - бык
      </div>
      <div>
        <CowIcon /> - корова
      </div>
      <p style={{ fontSize: "0.825rem" }}>
        Соперники записывают тайное число из четырёх уникальных цифр. Цель игры - отгадать число
        соперника. Если в вашей попытке присутствует та же цифра, что и в тайном числе соперника, но
        на другой позиции - это корова. Если та же цифра на той же позиции - это бык.
      </p>
      <p style={{ fontSize: "0.9rem" }}>Выигрывает тот, кто первым соберёт четырёх быков.</p>
      <p style={{ fontSize: "0.9rem" }}>Удачи!</p>
      <MyButton ref={buttonRef} onClick={() => navigate(ROUTES.MENU)}>
        Вернуться в меню
      </MyButton>
    </>
  );
}
