import * as React from "react";
import { css, cx } from "@emotion/css";

import { useChatStore, sendMessage, ChatMessage } from "./ChatStore";

function Message(props: { message: ChatMessage; key: string }) {
  const { content, author } = props.message;

  return (
    <div>
      <strong>[{author}]:</strong> {content}
    </div>
  );
}

export default function App() {
  const [message, setMessage] = React.useState("");
  const [username, setUsername] = React.useState("User");
  const messages = useChatStore((state) => state.messages);

  function handleUsernameInput(event: React.KeyboardEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function handleMessageInput(event: React.KeyboardEvent<HTMLInputElement>) {
    setMessage(event.target.value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      sendMessage(message, username);
      setMessage("");
    }
  }

  return (
    <div>
      {messages.map((message, index) => (
        <Message message={message} key={String(index)} />
      ))}
      <strong>Username: </strong>
      <input
        onChange={() => null}
        onInput={handleUsernameInput}
        value={username}
        placeholder="Enter author name"
      />
      <strong>Message: </strong>
      <input
        onChange={() => null}
        onKeyDown={handleKeyDown}
        onInput={handleMessageInput}
        value={message}
        placeholder="Type a message"
      />
    </div>
  );
}
