import create from "zustand";

export type ChatMessage = {
  content: string;
  author: string;
};

type ChatStoreState = {
  messages: Array<ChatMessage>;
};

const initialState: ChatStoreState = { messages: [] };

export const useChatStore = create(() => initialState);

export function sendMessage(
  content: string,
  author: string,
  submitToServer: boolean = true
) {
  const newMessage = { content, author };
  const state = useChatStore.getState();
  useChatStore.setState({
    messages: [...state.messages, newMessage],
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
      const { content, author } = body.response;
      sendMessage(content, author, false);
    });
}
