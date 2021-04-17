import * as React from "react";
import { useChatStore, sendMessage, ChatMessage } from "./ChatStore";
import { css } from "@emotion/css";
import { setMessageInputColor, useSettingStore } from "./SettingStore";

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    height: 100%;
  `,
  messagesWrapper: css`
    flex: 0 1 100%;
    overflow-y: scroll;
  `,
  messageList: css`
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  `,
  message: css`
    flex: 0 0 auto;
  `,
  messageInput: (color) => css`
    background-color: rgb(${color});
  `,
};

function Message(props: { message: ChatMessage; key: string }) {
  const { content, user } = props.message;

  return (
    <div className={styles.message}>
      <strong>[{user}]:</strong> {content}
    </div>
  );
}

export default function Interact() {
  const [message, setMessage] = React.useState("");
  const messageListRef = React.useRef<HTMLDivElement>(null);

  const [messages, waiting] = useChatStore((state) => [
    state.messages,
    state.waiting,
  ]);
  const [username, messageInputColor] = useSettingStore((state) => [
    state.username,
    state.messageInputColor,
  ]);

  React.useLayoutEffect(() => {
    const container = messageListRef.current;
    if (container == null) return;

    requestAnimationFrame(() => {
      container.scrollTop = Number.MAX_SAFE_INTEGER;
    });
  }, [messages]);

  function handleMessageInput(event: React.KeyboardEvent<HTMLInputElement>) {
    setMessage((event.target as HTMLInputElement).value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      sendMessage(message, username);
      setMessage("");
    }
  }

  function setColorThing(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      setMessageInputColor((event.target as HTMLInputElement).value);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.messagesWrapper} ref={messageListRef}>
        <div className={styles.messageList}>
          {messages.map((message, index) => (
            <Message message={message} key={String(index)} />
          ))}
        </div>
      </div>
      <div className={styles.messageInput(messageInputColor)}>
        <strong>Message: </strong>
        <input
          onChange={() => null}
          onKeyDown={handleKeyDown}
          onInput={handleMessageInput}
          value={message}
          placeholder="Type a message"
        />
        {waiting ? "Waiting for server..." : null}
      </div>
    </div>
  );
}
