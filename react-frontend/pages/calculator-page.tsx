import { useState } from "react";
import React from "react";
import { CInput } from "../components/custom-input";
import { CButton } from "../components/custom-button";
import { Link } from "react-router-dom";

export const CalculatorPage = () => {
  const [operation, setOperation] = useState<string>("add");
  const [result, setResult] = useState<undefined | number>(undefined);
  const [params, setparams] = useState({ num1: 0, num2: 0 });
  const calculate: (
    operation: string,
    params: { num1: number; num2: number }
  ) => Promise<number> = async (operation, params) => {
    switch (operation) {
      case "add":
        return await fetch("http://localhost:5000/add", {
          body: JSON.stringify(params),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((result) => result.result);
      case "sub":
        return await fetch("http://localhost:5000/sub", {
          body: JSON.stringify(params),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((result) => result.result);
      case "mul":
        return await fetch("http://localhost:5000/mul", {
          body: JSON.stringify(params),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((result) => result.result);
      case "div":
        return await fetch("http://localhost:5000/div", {
          body: JSON.stringify(params),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((result) => result.result);
      default:
        return 0;
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <br />
      {result}
      <CInput
        onChange={(e) =>
          setparams((state) => {
            return { ...state, num1: parseInt(e.target.value) };
          })
        }
      />
      <CInput
        onChange={(e) =>
          setparams((state) => {
            return { ...state, num2: parseInt(e.target.value) };
          })
        }
      />
      <div
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setOperation(e.target.value)
        }
      >
        <input defaultChecked={true} type="radio" value="add" name="gender" />{" "}
        Add
        <input type="radio" value="sub" name="gender" /> Sub
        <input type="radio" value="mul" name="gender" /> Mul
        <input type="radio" value="div" name="gender" /> Div
      </div>
      <div>
        <CButton
          onClick={async () =>
            setResult(await calculate(operation, params).then((res) => res))
          }
          text={"calculate"}
        />
        <Link to={"/"}>
          <CButton text={"Back"} />
        </Link>
      </div>
    </div>
  );
};
