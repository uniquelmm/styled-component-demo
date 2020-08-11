import { storiesOf } from "@storybook/react";
import React from "react";
import Product from "../src/components/Button";
const stories = storiesOf("Base", module);

stories.addParameters({
  info: {
    inline: true,
    header: false,
  },
  options: {
    panelPosition: "right", // 操作面板在右边
  },
});

stories.add("example", () => <Product />);
