import * as React from "react";
import { css, cx } from "@emotion/css";

import { useChatStore, sendMessage, ChatMessage } from "./ChatStore";

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    min-height: 100%;
    justify-content: flex-end;
  `,
  message: css`
    flex: 0 0 auto;
  `,
  messageInput: css`
    position: sticky;
    bottom: 0;
  `,
};

const USERNAME = "Sean";

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
  const messages = useChatStore((state) => state.messages);

  function handleMessageInput(event: React.KeyboardEvent<HTMLInputElement>) {
    setMessage(event.target.value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      sendMessage(message, USERNAME);
      setMessage("");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.message}>
        {messages.map((message, index) => (
          <Message message={message} key={String(index)} />
        ))}
      </div>
      <div className={styles.messageInput}>
        <strong>Message: </strong>
        <input
          onChange={() => null}
          onKeyDown={handleKeyDown}
          onInput={handleMessageInput}
          value={message}
          placeholder="Type a message"
        />
      </div>
    </div>
  );
}
