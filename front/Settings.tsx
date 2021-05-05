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
    padding: 8px 16px;
  `,
  list: (bodyTextColor: string) => css`
    color: ${bodyTextColor};
    background-color: rgb(50, 50, 50);
    li:nth-child(odd) {
      background-color: rgb(60, 60, 60);
    }
  `,
  settingLabel: css`
    display: inline-block;
    margin-right: 8px;
  `,
};

type SettingProps = {
  label: string;
  type: string;
  value: string;
  onChange: (value: any) => unknown;
  echoReply: boolean;
};

function Setting(props: SettingProps) {
  const { label, type, value, onChange, echoReply } = props;
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
