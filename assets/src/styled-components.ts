import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

import Theme from "./theme";

const {
  default: styled,
  createGlobalStyle,
  css,
  keyframes,
  ThemeProvider,
  withTheme
} = styledComponents as ThemedStyledComponentsModule<Theme>;

export { createGlobalStyle, css, keyframes, ThemeProvider, withTheme };
export default styled;
