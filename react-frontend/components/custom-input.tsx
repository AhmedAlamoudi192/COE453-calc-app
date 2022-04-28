import React from "react";

export function CInput({ onChange }: { onChange: (e: any) => void }) {
  return <input onChange={onChange} className="inputStyles" />;
}
