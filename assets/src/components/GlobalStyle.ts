import { css, createGlobalStyle } from "../styled-components";
import reboot from "styled-reboot";

const rebootStyle = reboot({
  enablePointerCursorForButtons: true
});

// Needs to be a local variable for prettier formatting to work.
const globalStyle = css`
  ${rebootStyle};

  html,
  body {
    height: 100%;
  }

  body {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: 0;
  }
`;

const GlobalStyle = createGlobalStyle`
  ${globalStyle};
`;

export default GlobalStyle;
