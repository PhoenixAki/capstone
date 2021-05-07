import * as React from "react";
import { css } from "@emotion/css";

import { useChatStore, sendMessage, ChatMessage } from "./ChatStore";
import { useSettingStore } from "./SettingStore";

const styles = {
  container: css`
    display: flex; //flexibly fill up space
    flex-direction: column; //want to flex up/down instead of horizontally
    height: 100%;
  `,
  messagesWrapper: css`
    flex: 0 1 100%; //grow vertically but not horizontally
    overflow-y: scroll; //add scroll bar if too many messages
  `,
  messageList: (messageTextColor: string) => css`
    min-height: 100%; //take up full space
    display: flex; //flexibly fill up space
    flex-direction: column; //want to flex up/down instead of horizontally
    justify-content: flex-end; //fill up from the bottom instead of top
    color: ${messageTextColor}; //ensures setting is used
  `,
  message: css`
    flex: 0 0 auto; //take up as much space as needed
  `,
  inputArea: (navbarBackgroundColor: string) => css`
    background-color: ${navbarBackgroundColor}; //ensures setting is used
    padding: 8px 16px; //8px top-bottom, 16px left-right
    display: flex;
  `,
  inputBox: (messageTextColor: string) => css`
    flex: 1 0 auto; //grow horizontally but not vertically
    border: none; //remove border
    background: transparent; //transparent background
    padding-left: 8px;
    color: ${messageTextColor}; //ensures setting is used
    outline: none; //remove outline
  `,
  bodyText: (bodyTextColor: string) => css`
    color: ${bodyTextColor}; //ensures setting is used
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
  const [message, setMessage] = React.useState(""); //assign a State to message
  const messageListRef = React.useRef<HTMLDivElement>(null); //used for animating

  //get state of messages and wait-status from ChatStore
  const [messages, waiting] = useChatStore((state) => [state.messages, state.waiting]);
  //get state of settings from SettingStore
  const [
    username,
    navbarBackgroundColor,
    navbarTextColor,
    bodyTextColor,
    echoReply,
  ] = useSettingStore((state) => [
    state.username,
    state.navbarBackgroundColor,
    state.navbarTextColor,
    state.bodyTextColor,
    state.echoReply,
  ]);

  //handles scrolling the message list up when new messages are sent/received
  React.useLayoutEffect(() => {
    const container = messageListRef.current;
    if (container == null) return;

    requestAnimationFrame(() => {
      container.scrollTop = Number.MAX_SAFE_INTEGER; //max integer to ensure scroll is all the way up
    });
  }, [messages]);

  //handles message input whenever an input is pressed
  function handleMessageInput(event: React.KeyboardEvent<HTMLInputElement>) {
    setMessage((event.target as HTMLInputElement).value); //update state of message variable
  }

  //handles message sending when Enter is pressed
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      sendMessage(message, username, echoReply); //send message, username, and echoReply to be sent to server
      setMessage(""); //reset message input text to nothing
    }
  }

  /*
   * Return:
   * 2 sections are returned: message list area, and message input area
   * Message List: space is filled up vertically with messages, appending when new ones are received
   * Message Input: contains an input space, pressing Enter will send the message to the server
   */
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
        <strong className={styles.bodyText(navbarTextColor)}>{">"}</strong>
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
