import * as React from "react";
import { NavLink } from "react-router-dom";
import { Routes } from "./Constants";
import { css } from "@emotion/css";

const styles = {
  navbar: css`
    position: fixed; /* Keeps bar visible even if page is scrolled */
    height: 56px;
    top: 0; /* Keeps navbar at top */
    width: 100%; /* Take up entire width of top of page */
    list-style-type: none; /* Removes markers */
    overflow: hidden; /* Unsure exactly, keeps the ul its own entity */
    background-color: rgb(40, 40, 40);
  `,
  link: css`
    display: block; /* Gives space around each link */
    color: white;
    padding: 14px 16px; /* 14px top-bottom, 16px left-right */
    text-decoration: none; /* Removes underline on link */
    font-size: 25px;
    &:hover {
      background-color: rgb(0, 125, 0);
    }
  `,
  li: css`
    float: left; /* Makes entries horizontal vs. vertical */
    &:last-child {
      float: right; /* Pushes last entry to right edge */
    }
  `,
  active: css`
    background-color: rgb(0, 125, 0); /* keep hover color when page is active */
  `,
};

export default function Navbar() {
  return (
    <ul className={styles.navbar}>
      <li className={styles.li}>
        <NavLink to={Routes.INTERACT} className={styles.link} activeClassName={styles.active} exact>
          Interact
        </NavLink>
      </li>
      <li className={styles.li}>
        <NavLink to={Routes.SETTINGS} className={styles.link} activeClassName={styles.active} exact>
          Settings
        </NavLink>
      </li>
      <li className={styles.li}>
        <NavLink to={Routes.ABOUT} className={styles.link} activeClassName={styles.active} exact>
          About
        </NavLink>
      </li>
    </ul>
  );
}