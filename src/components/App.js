import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../css/sass.css";
import Login from "./login";
import Redirection from "./Redirection";
import HomePage from "./client/screens/HomePage";
import AdminHomePage from "./admin/screens/HomePage";
import NotFoundPage from "./404";
export default function App() {
  return (
    <>
      <div>
        <Switch>
          <Route path={"/"} exact component={Redirection} />
          <Route path={"/client/:job/:request/:reports/:generator"} component={HomePage} />
          <Route path={"/client/:user/:profile/:user_id"} component={HomePage} />
          <Route path={"/client/:upload/:requestforupload"} component={HomePage} />
          <Route path={"/client/:office"} component={HomePage} />
          <Route path={"/client"} component={HomePage} />
          <Route path={"/admin/:route"} component={AdminHomePage} />
          <Route path={"/admin/:user/:profile/:user_id"} component={AdminHomePage} />
          <Route path={"/admin"} component={AdminHomePage} />
          
          <Route path={"/login"} component={Login} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </>
  );
}
