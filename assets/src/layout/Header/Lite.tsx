import * as React from "react";
import {
  styled,
  styledComponents,
  spacing,
  Link as LinkComponent,
  Lozenge
} from "@pay/web";

import Wordmark from "./Wordmark";
import Coat from "./Coat";

const { ThemeProvider } = styledComponents;

const CoatWrapper = styled.div`
  svg {
    height: 6rem;
  }

  svg .a {
    fill: ${props => props.theme.colors.black};
  }

  & + * {
    margin-left: 1.5rem;
  }
`;

const Wrapper = styled.header`
  margin-bottom: ${spacing.large};
`;

const Logos = styled.div`
  padding: ${spacing.medium} 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

// link around logo
const HeaderLink = styled(LinkComponent)`
  display: flex;
  align-items: center;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

const Lite: React.FC = () => (
  <ThemeProvider
    theme={theme => ({
      ...theme,
      linkColor: theme.colors.black
    })}
  >
    <Wrapper>
      <Logos>
        <HeaderLink to="/">
          <CoatWrapper>
            <Coat />
          </CoatWrapper>
          <Wordmark />
          <Lozenge variant="dark">Beta</Lozenge>
        </HeaderLink>
      </Logos>
    </Wrapper>
  </ThemeProvider>
);

export default Lite;
