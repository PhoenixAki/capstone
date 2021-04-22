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
  onChange: (value: string) => unknown;
};

function Setting(props: SettingProps) {
  const { label, type, value, onChange } = props;
  return (
    <li className={styles.setting}>
      <span className={styles.settingLabel}>{label}:</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} />
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
  ] = useSettingStore((state) => [
    state.username,
    state.bodyBackgroundColor,
    state.navbarBackgroundColor,
    state.navbarHoverColor,
    state.navbarTextColor,
    state.bodyTextColor,
    state.fontFamily,
  ]);

  return (
    <ul className={styles.list(bodyTextColor)}>
      <Setting type="text" value={username} label="Username" onChange={setUsername} />
      <Setting
        type="color"
        value={bodyBackgroundColor}
        label="Body Background Color Picker"
        onChange={setBodyBackgroundColor}
      />
      <Setting
        type="color"
        value={navbarBackgroundColor}
        label="Navbar/Message Input Background Color Picker"
        onChange={setNavbarBackgroundColor}
      />
      <Setting
        type="color"
        value={navbarHoverColor}
        label="Navbar Hover Color Picker"
        onChange={setNavbarHoverColor}
      />
      <Setting
        type="color"
        value={navbarTextColor}
        label="Navbar Text Color Picker"
        onChange={setNavbarTextColor}
      />
      <Setting
        type="color"
        value={bodyTextColor}
        label="Body Text Color Picker"
        onChange={setBodyTextColor}
      />
      <Setting type="text" value={fontFamily} label="Font Family" onChange={setFontFamily} />
    </ul>
  );
}
