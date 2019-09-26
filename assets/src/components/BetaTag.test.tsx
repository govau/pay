import React from "react";
import ReactDOM from "react-dom";
import { BetaTag } from "./BetaTag";
import { ThemeProvider } from "@pay/web/styled-components";
import { theme } from "@pay/web";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <BetaTag />
    </ThemeProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
