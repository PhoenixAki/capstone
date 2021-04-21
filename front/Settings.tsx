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
};

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

  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function handleBodyBackgroundColorChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setBodyBackgroundColor(bodyBackgroundColor);
  }

  function handleNavbarBackgroundColorChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setNavbarBackgroundColor(event.target.value);
  }

  function handleNavbarHoverColorChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setNavbarHoverColor(event.target.value);
  }

  function handleNavbarTextColorChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setNavbarTextColor(event.target.value);
  }

  function handleMessageTextColorChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setBodyTextColor(event.target.value);
  }

  function handleFontFamilyChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFontFamily(event.target.value);
  }

  return (
    <ul className={styles.list(bodyTextColor)}>
      <li className={styles.setting}>
        Username: &nbsp;{" "}
        <input type="text" value={username} onChange={handleUsernameChange} />
      </li>
      <li className={styles.setting}>
        Body Background Color Picker: &nbsp;
        <input
          type="color"
          value={bodyBackgroundColor}
          onChange={handleBodyBackgroundColorChange}
        />
      </li>
      <li className={styles.setting}>
        Navbar/Message Input Background Color Picker: &nbsp;
        <input
          type="color"
          value={navbarBackgroundColor}
          onChange={handleNavbarBackgroundColorChange}
        />
      </li>
      <li className={styles.setting}>
        Navbar Hover Color Picker: &nbsp;
        <input
          type="color"
          value={navbarHoverColor}
          onChange={handleNavbarHoverColorChange}
        />
      </li>
      <li className={styles.setting}>
        Navbar/Message Input Text Color Picker: &nbsp;
        <input
          type="color"
          value={navbarTextColor}
          onChange={handleNavbarTextColorChange}
        />
      </li>
      <li className={styles.setting}>
        Body Text Color Picker: &nbsp;
        <input
          type="color"
          value={bodyTextColor}
          onChange={handleMessageTextColorChange}
        />
      </li>
      <li className={styles.setting}>
        Font Style: &nbsp;
        <input
          type="text"
          value={fontFamily}
          onChange={handleFontFamilyChange}
        />
      </li>
    </ul>
  );
}
