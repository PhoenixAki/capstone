import * as React from "react";
import { css } from "@emotion/css";

import {
  useSettingStore,
  setUsername,
  setBodyBackgroundColor,
  setNavbarBackgroundColor,
  setNavbarHoverColor,
  setNavbarTextColor,
  setMessageTextColor,
  setFontFamily,
} from "./SettingStore";

const styles = {
  container: css``,
  placeholder: css``,
};

export default function Settings() {
  const [
    username,
    bodyBackgroundColor,
    navbarBackgroundColor,
    navbarHoverColor,
    navbarTextColor,
    messageTextColor,
    fontFamily,
  ] = useSettingStore((state) => [
    state.username,
    state.bodyBackgroundColor,
    state.navbarBackgroundColor,
    state.navbarHoverColor,
    state.navbarTextColor,
    state.messageTextColor,
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
    setMessageTextColor(event.target.value);
  }

  function handleFontFamilyChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFontFamily(event.target.value);
  }

  return (
    <div className={styles.container}>
      <div className={styles.placeholder}>
        Username: &nbsp;
        <input type="text" value={username} onChange={handleUsernameChange} />
      </div>
      <div className={styles.placeholder}>
        Body Background Color Picker
        <input
          type="color"
          value={bodyBackgroundColor}
          onChange={handleBodyBackgroundColorChange}
        />
      </div>
      <div className={styles.placeholder}>
        Navbar Background Color Picker
        <input
          type="color"
          value={navbarBackgroundColor}
          onChange={handleNavbarBackgroundColorChange}
        />
      </div>
      <div className={styles.placeholder}>
        Navbar Hover Color Picker
        <input
          type="color"
          value={navbarHoverColor}
          onChange={handleNavbarHoverColorChange}
        />
      </div>
      <div className={styles.placeholder}>
        Navbar Text Color Picker
        <input
          type="color"
          value={navbarTextColor}
          onChange={handleNavbarTextColorChange}
        />
      </div>
      <div className={styles.placeholder}>
        Message Text Color Picker
        <input
          type="color"
          value={messageTextColor}
          onChange={handleMessageTextColorChange}
        />
      </div>
      <div className={styles.placeholder}>
        Font Style: &nbsp;
        <input
          type="text"
          value={fontFamily}
          onChange={handleFontFamilyChange}
        />
      </div>
    </div>
  );
}
