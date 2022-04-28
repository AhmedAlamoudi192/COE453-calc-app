import React from "react";
export function CButton({
  text,
  onClick,
}: {
  text: string;
  onClick?: () => void;
}) {
  return (
    <button className="buttonStyle" onClick={onClick}>
      {text}
    </button>
  );
}
