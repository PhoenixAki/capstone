import * as React from "react";
import { NavLink } from "react-router-dom";
import { css } from "@emotion/css";

import { Routes } from "./Constants";
import { useSettingStore } from "./SettingStore";

const styles = {
  navbar: (navbarBackgroundColor: string) => css`
    position: fixed; //keeps navbar up top
    height: 68px;
    width: 100%; //take up entire width of page
    list-style-type: none; //removes markers
    background-color: ${navbarBackgroundColor}; //ensures setting is used
  `,
  li: css`
    float: left; //makes entries horizontal vs. vertical
    &:last-child {
      float: right; //pushes last child to right edge
    }
  `,
  link: (navbarHoverColor: string, navbarTextColor: string) => css`
    display: block; //gives space around each link
    color: ${navbarTextColor}; //color doesn't inherit from default body color
    padding: 14px 16px; //14px top-bottom, 16px left-right
    text-decoration: none; //removes underline on link
    &:hover {
      background-color: ${navbarHoverColor}; //ensures setting is used
    }
  `,
  active: (navbarHoverColor: string) => css`
    background-color: ${navbarHoverColor}; //keep hover color when page is active
  `,
};

export default function Navbar() {
  const [navbarBackgroundColor, navbarHoverColor, navbarTextColor] = useSettingStore((state) => [
    state.navbarBackgroundColor,
    state.navbarHoverColor,
    state.navbarTextColor,
  ]);

  /*
   * Return:
   * <ul> that holds the individual NavLink components
   * render set of 3 NavLink components that link to other pages and have dynamic styling
   */
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
