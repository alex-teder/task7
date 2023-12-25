import { RouterProvider } from "react-router-dom";
import { router } from "../router";

export function MainTextPanel() {
  return (
    <div
      style={{
        overflow: "auto",
        position: "fixed",
        margin: "2rem",
        padding: "2rem",
        top: 0,
        right: 0,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        width: "450px",
        height: "70%",
      }}
    >
      <RouterProvider router={router} />
    </div>
  );
}
