import imgUrl from "/src/assets/cow-icon.png";

export function CowIcon() {
  return (
    <img
      src={imgUrl}
      alt="cow icon"
      width="24px"
      height="24px"
      style={{
        display: "inline",
        objectFit: "cover",
      }}
    />
  );
}
