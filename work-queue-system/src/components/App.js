import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./client/screens/HomePage";
import "../css/sass.css";
import Login from "./login";
import AdminHomePage from "./admin/screens/HomePage";
import NotFoundPage from "./404";
export default function App() {
  return (
    <>
      <div>
        <Switch>
          <Route path={"/"} exact component={HomePage} />
          <Route path={"/admin"} component={AdminHomePage} />
          <Route path={"/login"} component={Login} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </>
  );
}
