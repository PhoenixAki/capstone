import create from "zustand";

type SettingStoreState = {
  username: string; //username for messages sent to the server
  bodyBackgroundColor: string; //background color of the main content area
  navbarBackgroundColor: string; //background color of the navbar and message input area
  navbarHoverColor: string; //color of navbar links when hovered over and active
  navbarTextColor: string; //color of text on navbar links
  messageTextColor: string; //color of message text
  fontFamily: string; //text font across the pages
};

const initialState: SettingStoreState = {
  username: "Sean",
  bodyBackgroundColor: "#000000",
  navbarBackgroundColor: "#282828",
  navbarHoverColor: "#007D00",
  navbarTextColor: "#FFFFFF",
  messageTextColor: "#FFFFFF",
  fontFamily: "sans-serif",
};

export const useSettingStore = create(() => initialState);

export function setUsername(name: string) {
  useSettingStore.setState({ username: name });
}

export function setBodyBackgroundColor(color: string) {
  useSettingStore.setState({ bodyBackgroundColor: color });
}

export function setNavbarBackgroundColor(color: string) {
  useSettingStore.setState({ navbarBackgroundColor: color });
}

export function setNavbarHoverColor(color: string) {
  useSettingStore.setState({ navbarHoverColor: color });
}

export function setNavbarTextColor(color: string) {
  useSettingStore.setState({ navbarTextColor: color });
}

export function setMessageTextColor(color: string) {
  useSettingStore.setState({ messageTextColor: color });
}

export function setFontFamily(font: string) {
  useSettingStore.setState({ fontFamily: font });
}
