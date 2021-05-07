import create from "zustand";

type SettingStoreState = {
  username: string; //username for messages sent to the server
  bodyBackgroundColor: string; //background color of the main content area
  navbarBackgroundColor: string; //background color of the navbar and message input area
  navbarHoverColor: string; //color of navbar links when hovered over and active
  navbarTextColor: string; //color of text on navbar links
  bodyTextColor: string; //color of message text
  fontFamily: string; //text font across the pages
  echoReply: boolean; //used to specify an echo reply from the server
};

const initialState: SettingStoreState = {
  username: "User" + Math.floor(Math.random() * 101), //username with random numbers at the end by default
  bodyBackgroundColor: "#000000", //default to black
  navbarBackgroundColor: "#282828", //default to grey
  navbarHoverColor: "#007D00", //default to green
  navbarTextColor: "#FFFFFF", //default to white
  bodyTextColor: "#FFFFFF", //default to white
  fontFamily: "sans-serif", //default to sans-serif, any other valid name should work
  echoReply: false, //default to false
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

export function setBodyTextColor(color: string) {
  useSettingStore.setState({ bodyTextColor: color });
}

export function setFontFamily(font: string) {
  useSettingStore.setState({ fontFamily: font });
}

export function setEchoReply(echo: boolean) {
  useSettingStore.setState({ echoReply: echo });
}
