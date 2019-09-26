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

  html {
    font-size: 62.5%;
    color: ${props => props.theme.textColor};
    background-color: ${props => props.theme.bgColor};
    font-family: ${props => props.theme.fontFamily};
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    padding: 0;
    font-size: 1.6rem;
    line-height: 2.2rem;
  }
`;

const GlobalStyle = createGlobalStyle`
  ${globalStyle};
`;

export default GlobalStyle;
