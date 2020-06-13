import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Component imports
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/layout/Dashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
