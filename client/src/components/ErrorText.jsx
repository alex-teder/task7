export function ErrorText({ text }) {
  return <p style={{ color: "red" }}>{text || "Ошибка! Попробуйте позже"}</p>;
}
