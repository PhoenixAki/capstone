import create from "zustand";

export type ChatMessage = {
  content: string; //message content from user or server
  user: string; //username
  echoReply: boolean; //echoReply setting, true or false
};

type ChatStoreState = {
  messages: Array<ChatMessage>; //list of messages sent/received
  waiting: boolean; //used to display "Waiting for server..." text when true
};

const initialState: ChatStoreState = {
  messages: [], //begin with empty array
  waiting: false, //default to false
};

export const useChatStore = create(() => initialState);

export function sendMessage(
  content: string,
  user: string,
  echoReply: boolean,
  submitToServer: boolean = true,
) {
  const newMessage = { content, user, echoReply };
  const state = useChatStore.getState();
  useChatStore.setState({
    messages: [...state.messages, newMessage], //append new message to list
    waiting: submitToServer, //waiting ends up true when user sent it, and false when server sent it
  });

  if (submitToServer) {
    requestChatResponse(newMessage);
  }
}

export function requestChatResponse(message: ChatMessage) {
  //makes POST request to Flask server, responds with a reply message
  fetch("http://35.226.227.207:5000/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  })
    .then((response) => response.json())
    .then((body) => {
      const { content, user, echoReply } = body.response;
      sendMessage(content, user, echoReply, false);
    });
}
