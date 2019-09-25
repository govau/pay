import * as React from "react";
import { spacing, Link as LinkComponent } from "@pay/web";
import styled from "@pay/web/styled-components";
import { BetaTag } from "../../components/BetaTag";

import { WordmarkSVG } from "./Wordmark";
import COA from "./Coat";

interface Props {}

const Coat = styled.div`
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

const Link = styled(LinkComponent)`
  text-decoration: none;
  border-left: 1px solid ${props => props.theme.colors.black};
  padding-left: 1.5rem;
  height: 5rem;
  display: flex;
  align-items: center;

  svg {
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Lite: React.FC<Props> = props => (
  <Wrapper>
    <Logos>
      <Coat>
        <COA />
      </Coat>
      <Link to="/">
        <WordmarkSVG />
        <BetaTag />
      </Link>
    </Logos>
  </Wrapper>
);

export default Lite;
