import * as React from "react";
import { css } from "@emotion/css";

import { useChatStore, sendMessage, ChatMessage } from "./ChatStore";
import { useSettingStore } from "./SettingStore";

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
  messageList: (messageTextColor: string) => css`
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    color: ${messageTextColor};
  `,
  message: css`
    flex: 0 0 auto;
  `,
  inputArea: (navbarBackgroundColor: string) => css`
    background-color: ${navbarBackgroundColor};
    padding: 8px 16px;
    display: flex;
  `,
  inputBox: (messageTextColor: string) => css`
    flex: 1 0 auto;
    border: none;
    background: transparent;
    padding-left: 8px;
    color: ${messageTextColor};
    outline: none;
  `,
  bodyText: (bodyTextColor: string) => css`
    color: ${bodyTextColor};
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
  const [
    username,
    navbarBackgroundColor,
    navbarTextColor,
    bodyTextColor,
  ] = useSettingStore((state) => [
    state.username,
    state.navbarBackgroundColor,
    state.navbarTextColor,
    state.bodyTextColor,
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

  return (
    <div className={styles.container}>
      <div className={styles.messagesWrapper} ref={messageListRef}>
        <div className={styles.messageList(bodyTextColor)}>
          {messages.map((message, index) => (
            <Message message={message} key={String(index)} />
          ))}
        </div>
        <span className={styles.bodyText(bodyTextColor)}>
          <strong>{waiting ? "Waiting for server..." : null}</strong>
        </span>
      </div>
      <div className={styles.inputArea(navbarBackgroundColor)}>
        <strong className={styles.bodyText(bodyTextColor)}>{">"}</strong>
        <input
          className={styles.inputBox(navbarTextColor)}
          onChange={() => null}
          onKeyDown={handleKeyDown}
          onInput={handleMessageInput}
          value={message}
          placeholder="Type a message..."
        />
      </div>
    </div>
  );
}