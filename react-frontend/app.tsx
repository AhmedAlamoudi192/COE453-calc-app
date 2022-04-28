import { render } from "react-dom";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CalculatorPage } from "./pages/calculator-page";
import { HistoryPage } from "./pages/histroy-page";
import { MainPage } from "./pages/main-page";

const App = () => {
  const styles: React.CSSProperties = {
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <Router>
      {/* I'm using the navbar on the entire app, so much code saved here as well as the container in main */}
      <main style={styles}>
        {/* <NavBar /> */}
        <Switch>
          <Route exact path="/" render={() => <MainPage />} />
          <Route exact path="/history" render={() => <HistoryPage />} />
          <Route exact path="/calculator" render={() => <CalculatorPage />} />
        </Switch>
      </main>
    </Router>
  );
};

render(React.createElement(App), document.getElementById("app"));
