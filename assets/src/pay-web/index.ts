import styled, * as styledComponentsNamed from "./styled-components";
import * as Pages from "./pages/Pages";

const styledComponents = { styled, ...styledComponentsNamed };
export { styledComponents };

export { default as media, mobile, desktop, tablet } from "./media";
export { default as spacing } from "./components/spacing";
export { default as theme } from "./theme";
export { Pages };
export { default as PageContent } from "./layout/PageContent";
export { default as GlobalStyle } from "./components/GlobalStyle";
export { default as ScrollToTopOnMount } from "./components/ScrollToTopOnMount";
export { default as Loader } from "./components/Loader";
export {
  default as Container,
  ContainerSmall,
  ContainerMedium
} from "./components/Container";
export { default as Footer } from "./components/Footer";
export * from "./components/form";
export { default as validators } from "./lib/validation";
export { default as Button } from "./components/Button";
export { Link } from "./components/Link";
export { LinkButton } from "./components/LinkButton";
export { default as PageTitle } from "./components/PageTitle";
export * from "./components/Typography";
export * from "./components/icons";
export { default as Hr } from "./components/Hr";
export { default as ScreenReaderText } from "./components/ScreenReaderText";
export * from "./components/loaders";
export { default as Error } from "./components/Error";
export { default as ErrorAlert } from "./components/ErrorAlert";
export { default as Alert } from "./components/Alert";
