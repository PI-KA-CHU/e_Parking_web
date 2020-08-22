import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Reserve from "./pages/Reserve";
import Order from "./pages/Order";
import { HashRouter, Route } from "react-router-dom";
import "../node_modules/antd/dist/antd.css";

function App() {
  return (
    <div>
      <HashRouter>
        <Route exact path="/reserve" component={Reserve} />
        <Route exact path="/order" component={Order} />
        <Route exact path="/:id" component={Home} />
      </HashRouter>
    </div>
  );
}

export default App;
