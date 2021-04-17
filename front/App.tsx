import * as React from "react";
import { css } from "@emotion/css";
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
const BrowserHistory = createBrowserHistory();
import "./style.css";

import { Routes } from "./Constants";
import Interact from "./Interact";
import Settings from "./Settings";
import About from "./About";
import Navbar from "./Navbar";

const styles = {
  mainContent: css`
    padding-top: 56px;
    height: 100%;
  `,
};

export default function App() {
  return (
    <Router history={BrowserHistory}>
      <Navbar />
      <div className={styles.mainContent}>
        <Switch>
          <Route path={Routes.INTERACT} exact component={Interact} />
          <Route path={Routes.SETTINGS} exact component={Settings} />
          <Route path={Routes.ABOUT} exact component={About} />
        </Switch>
      </div>
    </Router>
  );
}
