import create from "zustand";

type SettingStoreState = {
  username: string;
  messageInputColor: string;
};

const initialState: SettingStoreState = {
  username: "Sean",
  messageInputColor: "40,40,40",
};

export const useSettingStore = create(() => initialState);

export function setUsername(name: string) {
  useSettingStore.setState({
    username: name,
  });
}

export function setMessageInputColor(color: string) {
  useSettingStore.setState({
    messageInputColor: color,
  });
}
