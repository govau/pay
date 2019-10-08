import * as React from "react";
import { styled, Strong } from "@pay/web";

const Wrapper = styled.div`
  margin-top: -5px;
  font-size: 3rem;

  * + & {
    margin-left: 1em;
  }
`;

// Wordmark is just pixel-pushed text for now.
const Wordmark: React.FC = () => (
  <Wrapper>
    <Strong>pay</Strong>.gov.au
  </Wrapper>
);

export default Wordmark;
