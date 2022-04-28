import React from "react";
import { CButton } from "../components/custom-button";
import { Link } from "react-router-dom";

export function MainPage() {
  return (
    <>
      <Link to="/calculator">
        <CButton text="Calculator" onClick={() => {}} />
      </Link>
      <Link to="/history">
        <CButton text="History" />
      </Link>
    </>
  );
}
