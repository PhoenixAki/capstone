import create from "zustand";

export type ChatMessage = {
  content: string;
  user: string;
};

type ChatStoreState = {
  messages: Array<ChatMessage>;
  waiting: boolean;
};

const initialState: ChatStoreState = { messages: [], waiting: false };

export const useChatStore = create(() => initialState);

export function sendMessage(
  content: string,
  user: string,
  submitToServer: boolean = true
) {
  const newMessage = { content, user };
  const state = useChatStore.getState();
  useChatStore.setState({
    messages: [...state.messages, newMessage],
    waiting: submitToServer,
  });

  if (submitToServer) {
    requestChatResponse(newMessage);
  }
}

export function requestChatResponse(message: ChatMessage) {
  fetch("http://localhost:5000/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  })
    .then((response) => response.json())
    .then((body) => {
      const { content, user } = body.response;
      sendMessage(content, user, false);
    });
}
