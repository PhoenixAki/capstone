import * as React from "react";

import { useChatStore, sendMessage, ChatMessage } from "./ChatStore";

const AUTHOR_NAME = "Sean";

function Message(props: { message: ChatMessage }) {
  const { content, author } = props.message;

  return (
    <div>
      <strong>[{author}]:</strong> {content}
    </div>
  );
}

export default function App() {
  const messages = useChatStore((state) => state.messages);

  function handleSendMessage(event: React.KeyboardEvent<HTMLInputElement>) {
    const { key, target } = event;
    if (key !== "Enter") return;

    const content = target.value;
    sendMessage(content, AUTHOR_NAME);
  }

  return (
    <div>
      {messages.map((message, index) => (
        <Message message={message} key={String(index)} />
      ))}

      <input onKeyDown={handleSendMessage} placeholder="Type a message" />
    </div>
  );
}
