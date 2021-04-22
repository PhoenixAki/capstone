import * as React from "react";
import { NavLink } from "react-router-dom";
import { css } from "@emotion/css";

import { Routes } from "./Constants";
import { useSettingStore } from "./SettingStore";

const styles = {
  navbar: (navbarBackgroundColor: string) => css`
    position: fixed; /* Keeps bar visible even if page is scrolled */
    height: 68px;
    top: 0; /* Keeps navbar at top */
    width: 100%; /* Take up entire width of top of page */
    list-style-type: none; /* Removes markers */
    background-color: ${navbarBackgroundColor};
  `,
  link: (navbarHoverColor: string, navbarTextColor: string) => css`
    display: block; /* Gives space around each link */
    color: ${navbarTextColor}; /* color doesn't inherit from default body color */
    padding: 14px 16px; /* 14px top-bottom, 16px left-right */
    text-decoration: none; /* Removes underline on link */
    &:hover {
      background-color: ${navbarHoverColor};
    }
  `,
  li: css`
    float: left; /* Makes entries horizontal vs. vertical */
    &:last-child {
      float: right; /* Pushes last entry to right edge */
    }
  `,
  active: (navbarHoverColor: string) => css`
    background-color: ${navbarHoverColor}; /* keep hover color when page is active */
  `,
};

export default function Navbar() {
  const [navbarBackgroundColor, navbarHoverColor, navbarTextColor] = useSettingStore((state) => [
    state.navbarBackgroundColor,
    state.navbarHoverColor,
    state.navbarTextColor,
  ]);

  return (
    <ul className={styles.navbar(navbarBackgroundColor)}>
      <li className={styles.li}>
        <NavLink
          to={Routes.INTERACT}
          className={styles.link(navbarHoverColor, navbarTextColor)}
          activeClassName={styles.active(navbarHoverColor)}
          exact>
          Interact
        </NavLink>
      </li>
      <li className={styles.li}>
        <NavLink
          to={Routes.SETTINGS}
          className={styles.link(navbarHoverColor, navbarTextColor)}
          activeClassName={styles.active(navbarHoverColor)}
          exact>
          Settings
        </NavLink>
      </li>
      <li className={styles.li}>
        <NavLink
          to={Routes.ABOUT}
          className={styles.link(navbarHoverColor, navbarTextColor)}
          activeClassName={styles.active(navbarHoverColor)}
          exact>
          About
        </NavLink>
      </li>
    </ul>
  );
}
