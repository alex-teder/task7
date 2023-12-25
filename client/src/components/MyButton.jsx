import { forwardRef } from "react";

export const MyButton = forwardRef(function (props, ref) {
  return (
    <button
      ref={ref}
      type={props.type}
      disabled={props.disabled}
      style={{ ...props.style }}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
});
