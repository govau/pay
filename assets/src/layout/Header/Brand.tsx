import * as React from "react";
import styled from "styled-components";
import { BetaTag } from "../../components/BetaTag";

const Wrapper = styled.div`
  display: flex;

  img {
    border-right: 1px solid ${props => props.theme.colors.white};
    padding-right: 2rem;
  }
`;

const Heading = styled.h1`
  color: ${props => props.theme.colors.white};
  font-size: 3rem;
  white-space: nowrap;
`;

const Tag = styled(BetaTag)`
  height: 2.1rem;
  align-self: center;
`;

const Brand = () => (
  <Wrapper>
    <Heading>Pay.gov.au</Heading>
    <Tag white />
  </Wrapper>
);

export { Brand };
