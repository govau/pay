import * as React from "react";
import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule, ThemeContext } from "styled-components";

import { Theme } from "./theme";

// TODO: delete once this is in styled-components.
const useTheme = () => {
  const outerTheme = React.useContext<Theme>(ThemeContext);
  return outerTheme;
};

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<Theme>;

export { css, createGlobalStyle, keyframes, ThemeProvider, useTheme };

export default styled;
