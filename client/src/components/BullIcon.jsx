import imgUrl from "/src/assets/bull-icon.png";

export function BullIcon() {
  return (
    <img
      src={imgUrl}
      alt="bull icon"
      width="24px"
      height="24px"
      style={{
        display: "inline",
        objectFit: "cover",
      }}
    />
  );
}
