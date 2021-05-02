import * as React from "react";
import { css } from "@emotion/css";

import { useSettingStore } from "./SettingStore";

const styles = {
  container: (bodyTextColor: string) => css`
    color: ${bodyTextColor};
    margin: 14px 16px;
  `,
  heading: css`
    display: block;
    margin-top: 16px;
  `,
  text: css`
    display: block;
    padding: 25px;
  `,
  pageList: css`
    padding-left: 25px;
  `,
};

export default function About() {
  const [bodyTextColor] = useSettingStore((state) => [state.bodyTextColor]);
  return (
    <div className={styles.container(bodyTextColor)}>
      <strong className={styles.heading}>About this Website</strong>
      <span className={styles.text}>
        I created this website as my Capstone project for my Master's Degree program at Bridgewater
        State University in the Spring 2021 semester. The goal of my project was to train an AI
        model to function as a chatbot, and implement it into a website. This website is the
        culmination of that project, and I'm very proud of how it turned out.
        <br />
        <br />
        There are 3 pages accessible on this website, below is a detailed description of what each
        one does:
        <ul className={styles.pageList}>
          <li>Interact</li>
          The Interact page is where you can directly interact with the chatbot. Type messages into
          the message input area at the bottom of your browser and hit enter to send them to the
          server. The AI will think and send its reply. Due to limitations on processing power, the
          AI may take up to 10-15 seconds to reply.
          <li>Settings</li>
          placeholder
          <li>About</li>
          placeholder
        </ul>
      </span>

      <strong className={styles.heading}>How It Works</strong>
      <span className={styles.text}>
        This website functions primarily using React, the popular javascript web development
        library. The server script utilizes a trained AI model based on GPT2, which was initially
        released by OpenAI in February 2019.
      </span>
      <strong className={styles.heading}>How to Do This Yourself</strong>
      <span className={styles.text}>placeholder</span>
    </div>
  );
}
