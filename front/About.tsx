import * as React from "react";
import { css } from "@emotion/css";

import { useSettingStore } from "./SettingStore";

const styles = {
  bodyText: (bodyTextColor: string) => css`
    color: ${bodyTextColor};
  `,
};

export default function About() {
  const [bodyTextColor] = useSettingStore((state) => [state.bodyTextColor]);
  return <div className={styles.bodyText(bodyTextColor)}>About Placeholder</div>;
}
