import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CButton } from "../components/custom-button";

interface calInfo {
  num1: number;
  num2: number;
  result: number;
  operation: string;
}

export const EntryCard = ({
  info,
  index,
}: {
  info: calInfo;
  index: number;
}) => {
  return (
    <div
      style={{
        display: "flex",
        background: "#247881",
        borderRadius: "0.25rem",
        margin: "1rem",
        padding: "1rem",
        width: "60rem",
      }}
    >
      Calulation:{index}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "auto",
        }}
      >
        <p>num1= {info.num1}</p>
        <p>operation= {info.operation}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p>num2= {info.num2}</p>
        <p>result= {info.result}</p>
      </div>
    </div>
  );
};

export const HistoryPage = () => {
  const [historyAll, setHistoryAll] = useState<[]>([]);
  const [date, setDate] = useState<{ date: string }>({ date: "" });
  const [history, setHistory] = useState<{
    add: [];
    sub: [];
    mul: [];
    div: [];
  }>({ add: [], sub: [], mul: [], div: [] });
  const [filter, setFilter] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);
  function changeFilter(e: any) {
    setDate({ date: e.target.value });
    fetch(
      "http://localhost:5000/historyall?" +
        new URLSearchParams({ date: e.target.value })
    )
      .then((res) => res.json())
      .then((data) => setHistoryAll(data));
  }

  useEffect(() => {
    fetch("http://localhost:5000/historyall")
      .then((res) => res.json())
      .then((data) => setHistoryAll(data));
    fetch("http://localhost:5000/history")
      .then((res) => res.json())
      .then((data) => setHistory(data));
  }, [setHistory, setHistoryAll]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "fixed",
          top: "1rem",
          left: "20rem",
        }}
      >
        Filter By
        <CButton
          text="All"
          onClick={() => setFilter([true, false, false, false, false, false])}
        />
        <CButton
          text="Add"
          onClick={() => setFilter([false, true, false, false, false, false])}
        />
        <CButton
          text="Sub"
          onClick={() => setFilter([false, false, true, false, false, false])}
        />
        <CButton
          text="Mul"
          onClick={() => setFilter([false, false, false, true, false, false])}
        />
        <CButton
          text="Div"
          onClick={() => setFilter([false, false, false, false, true, false])}
        />
        <CButton
          text="Date"
          onClick={() => setFilter([false, false, false, false, false, true])}
        />
      </div>
      <div style={{ overflowY: "scroll", maxHeight: "30rem" }}>
        {filter[0] &&
          historyAll.map((item: calInfo, index) => {
            return (
              <EntryCard
                key={index}
                info={item}
                index={historyAll.length - index}
              />
            );
          })}
        {filter[1] &&
          history.add.map(
            (
              item: {
                num1: number;
                num2: number;
                result: number;
                operation: string;
              },
              index: number
            ) => {
              return (
                <EntryCard
                  key={index}
                  info={item}
                  index={history.add.length - index}
                />
              );
            }
          )}
        {filter[2] &&
          history.sub.map((item: calInfo, index: number) => {
            return (
              <EntryCard
                key={index}
                info={item}
                index={history.sub.length - index}
              />
            );
          })}
        {filter[3] &&
          history.mul.map((item: calInfo, index: number) => {
            return (
              <EntryCard
                key={index}
                info={item}
                index={history.mul.length - index}
              />
            );
          })}
        {filter[4] &&
          history.div.map((item: calInfo, index: number) => {
            return (
              <EntryCard
                key={index}
                info={item}
                index={history.div.length - index}
              />
            );
          })}
        {filter[5] && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            select a date
            <input
              type="date"
              onChange={(e) => changeFilter(e)}
              value={date.date}
            />
            {console.log(historyAll)}
            {historyAll.map((item: calInfo, index) => {
              return (
                <EntryCard
                  key={index}
                  info={item}
                  index={historyAll.length - index}
                />
              );
            })}
          </div>
        )}
      </div>
      <Link to={"/"}>
        <CButton text={"Back"} />
      </Link>
    </div>
  );
};
