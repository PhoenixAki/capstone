import * as React from "react";
import { Router, Route, Switch } from "react-router";
import { Helmet } from "react-helmet";
import { createBrowserHistory } from "history";
import { css } from "@emotion/css";
const BrowserHistory = createBrowserHistory();

import "./style.css";
import { useSettingStore } from "./SettingStore";
import { Routes } from "./Constants";
import Interact from "./Interact";
import Settings from "./Settings";
import About from "./About";
import Navbar from "./Navbar";

const styles = {
  mainContent: css`
    padding-top: 68px;
    height: 100%;
  `,
  body: (bodyBackgroundColor: string, fontFamily: string) => css`
    background-color: ${bodyBackgroundColor}; //ensures setting is used
    font-family: ${fontFamily}; //ensurse setting is used
  `,
};

export default function App() {
  const [bodyBackgroundColor, fontFamily] = useSettingStore((state) => [
    state.bodyBackgroundColor,
    state.fontFamily,
  ]);

  /*
   * Return:
   * Helmet is to override the body styling from style.css with whatever the setting currently is
   * Render Navbar at top of window regardless of what URL
   * Render Interact/Settings/About underneath depending on what URL
   */
  return (
    <Router history={BrowserHistory}>
      <Helmet>
        <body className={styles.body(bodyBackgroundColor, fontFamily)}></body>
      </Helmet>
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
