import * as React from "react";
import { css } from "@emotion/css";

import {
  useSettingStore,
  setUsername,
  setBodyBackgroundColor,
  setNavbarBackgroundColor,
  setNavbarHoverColor,
  setNavbarTextColor,
  setBodyTextColor,
  setFontFamily,
  setEchoReply,
} from "./SettingStore";

const styles = {
  setting: css`
    padding: 8px 16px; //8px top-bottom, 16px left-right
  `,
  list: (bodyTextColor: string) => css`
    color: ${bodyTextColor}; //ensures setting is used
    background-color: rgb(50, 50, 50); //set default color to (50, 50, 50)
    li:nth-child(odd) {
      background-color: rgb(60, 60, 60); //ever other element will be (60, 60, 60) instead
    }
  `,
  settingLabel: css`
    display: inline-block;
    margin-right: 8px;
  `,
};

//Custom type to simplify Setting function
type SettingProps = {
  label: string;
  type: string;
  value: string;
  onChange: (value: any) => unknown;
  echoReply: boolean;
};

function Setting(props: SettingProps) {
  const { label, type, value, onChange, echoReply } = props; //extract values from props

  /*
   * Return:
   * Each returned value is an <li> tag containing the name of the setting and an input to change it
   */
  return (
    <li className={styles.setting}>
      <span className={styles.settingLabel}>{label}:</span>
      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(type == "checkbox" ? event.target.checked : event.target.value)
        }
        checked={echoReply}
      />
    </li>
  );
}

export default function Settings() {
  const [
    username,
    bodyBackgroundColor,
    navbarBackgroundColor,
    navbarHoverColor,
    navbarTextColor,
    bodyTextColor,
    fontFamily,
    echoReply,
  ] = useSettingStore((state) => [
    state.username,
    state.bodyBackgroundColor,
    state.navbarBackgroundColor,
    state.navbarHoverColor,
    state.navbarTextColor,
    state.bodyTextColor,
    state.fontFamily,
    state.echoReply,
  ]);

  /*
   * Return:
   * <ul> that holds individual Setting components (which are essentially <li> elements)
   * See above for what the Setting component function does
   */
  return (
    <ul className={styles.list(bodyTextColor)}>
      <Setting
        type="text"
        value={username}
        label="Username"
        onChange={setUsername}
        echoReply={false}
      />
      <Setting
        type="color"
        value={bodyBackgroundColor}
        label="Background Color"
        onChange={setBodyBackgroundColor}
        echoReply={false}
      />
      <Setting
        type="color"
        value={navbarBackgroundColor}
        label="Navbar Background Color"
        onChange={setNavbarBackgroundColor}
        echoReply={false}
      />
      <Setting
        type="color"
        value={navbarHoverColor}
        label="Navbar Link Hover Color"
        onChange={setNavbarHoverColor}
        echoReply={false}
      />
      <Setting
        type="color"
        value={navbarTextColor}
        label="Navbar Text Color"
        onChange={setNavbarTextColor}
        echoReply={false}
      />
      <Setting
        type="color"
        value={bodyTextColor}
        label="Body Text Color"
        onChange={setBodyTextColor}
        echoReply={false}
      />
      <Setting
        type="text"
        value={fontFamily}
        label="Font"
        onChange={setFontFamily}
        echoReply={false}
      />
      <Setting
        type="checkbox"
        value=""
        label="Server Echo Reply"
        onChange={setEchoReply}
        echoReply={echoReply}
      />
    </ul>
  );
}
