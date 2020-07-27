import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./client/screens/HomePage";
import "../css/styles.css";
export default function App() {
  return (
    <>
      <div>
        <Router>
          <Route path={"/"} exact component={HomePage} />
        </Router>
      </div>
    </>
  );
}
