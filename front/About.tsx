import * as React from "react";
import { css } from "@emotion/css";

import { useSettingStore } from "./SettingStore";

const styles = {
  container: (bodyTextColor: string) => css`
    color: ${bodyTextColor}; //ensures setting is used
    margin: 14px 16px; //14px top-bottom, 16px left-right
  `,
  heading: css`
    display: block; //give headings extra space around them
    margin-top: 16px;
  `,
  text: css`
    display: block; //give text areas extra space around them
    padding: 25px;
  `,
  pageList: css`
    padding-left: 27px;
    padding-top: 20px;
  `,
};

export default function About() {
  const [bodyTextColor] = useSettingStore((state) => [state.bodyTextColor]);

  /*
   * Return:
   * Page is pretty static, as in there is anything besides HTML and CSS styling
   * Mixture of <span> for text areas and <ul> for listing the page features
   */
  return (
    <div className={styles.container(bodyTextColor)}>
      <strong className={styles.heading}>About this Website</strong>
      <span className={styles.text}>
        I created this website for my Capstone project (master's degree) in Spring 2021 at
        Bridgewater State University. The goal of was to train an AI model to function as a chatbot,
        and implement it into a website. This website is the culmination of that project, and I'm
        very proud of how it turned out.
        <br />
        <br />
        There are 3 pages accessible on this website, below is a detailed description of what each
        one does:
        <ul className={styles.pageList}>
          <li>Interact</li>
          <span className={styles.text}>
            The Interact page is where you can directly interact with the chatbot. Type messages
            into the message input area and hit enter to send them to the server. The AI will think
            and send its reply. Due to limitations on processing power, the AI may take up to 10-15
            seconds to reply.
          </span>
          <li>Settings</li>
          <span className={styles.text}>
            The Settings page is where you can change a variety of settings. Most of the settings
            are colors for various elements across the website. You can also change the username
            that is used when messages are sent, as well as what font should be used. You do not
            need to hit enter or refresh for the settings to take effect.
            <br />
            <br />
            Also included is a setting called "Server Echo Reply". If this setting is checked, the
            server will instead respond with a copy of what you just sent it. This can be used for
            testing purposes, to make sure the server is working without having to wait for an AI
            response.
          </span>
          <li>About</li>
          <span className={styles.text}>
            The About page (where you currently are!) details what this website is, as well as how
            each individual page works. Also included is a section describing the tools and
            resources I used to make this project, so that you can get started doing it yourself.
          </span>
        </ul>
      </span>
      <strong className={styles.heading}>How to Do This Yourself</strong>
      <span className={styles.text}>
        A core motivation for this project was that I want to break the myth that you have to be an
        expert on Computer Science to get started with learning the field of AI. To assist with
        this, I have made sure that every part of the project is publicly available{" "}
        <a href="https://github.com/PhoenixAki/capstone" target="_blank">
          on my GitHub
        </a>
        . Wherever possible, there is detailed commenting in the files on the GitHub repository, so
        that it can be as clear as possible what each function and file is providing to the project.
        <br />
        <br />
        Note that the only parts of this section you need in order to interact with your own AI is
        the AI Training section. A website is NOT needed in order to use an AI model, as the website
        is only a way of visually representing it. Behind the scenes, it is a Python script that the
        AI uses to generate its reply, using the{" "}
        <a href="https://github.com/minimaxir/gpt-2-simple" target="_blank">
          gpt-2-simple library
        </a>
        , created by Max Woolf. Once your AI model is trained, you can easily load it into
        gpt-2-simple and generate text from it.
        <br />
        <br />
        <strong>AI Training: </strong>For the AI model, I used{" "}
        <a href="https://openai.com/blog/better-language-models/" target="_blank">
          GPT2, released by OpenAI
        </a>
        . GPT2 is designed to predict the next element in a sequence. That sequence can be anything,
        but here it was trained to predict the next word, given another sequence of words.
        Effectively, it learned how to speak English, and will respond in English to messages. To
        train an AI, you need a sample dataset. To do this, I used{" "}
        <a href="https://praw.readthedocs.io/en/latest/" target="_blank">
          PRAW
        </a>{" "}
        to retrieve comments from the{" "}
        <a href="https://www.reddit.com/r/CasualConversation/" target="_blank">
          r/CasualConversation
        </a>{" "}
        subreddit. Once the comments were downloaded (and after processing the data a bit) the AI
        model was trained using the comments{" "}
        <a
          href="https://colab.research.google.com/drive/1VLG8e7YSEwypxU-noRNhsv5dW4NfTGce"
          target="_blank">
          this Google Colaboratory notebook.
        </a>
        <br />
        <br />
        <strong>Website Building: </strong>This website functions off of{" "}
        <a href="https://reactjs.org/" target="_blank">
          React
        </a>
        , a popular Javascript library for web development. It was designed primarily with
        Typescript (a Javascript variant) alongside HTML for the page structure, and CSS for
        styling. Virtually all of the page generation is handled by React, with each page being
        considered its own "component" that returns its HTML and CSS as a function. This is what
        makes React so powerful - because of this, you can much more closely tie in Javascript
        functionality into each component.
      </span>
    </div>
  );
}
