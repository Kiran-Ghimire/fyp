import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import Footer from "./components/Footer";

import Routes from "./Routes/Routes";

const App = () => {
  const token = useSelector((state) => state.login.authToken);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
};

export default App;
