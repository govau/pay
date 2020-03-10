import * as React from "react";
import { tablet, P, Link } from "@pay/web";
import styled from "@pay/web/styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-basis: 50%;
  flex-direction: column;
  margin-bottom: 1rem;

  @media ${tablet} {
    margin-bottom: 3rem;
    padding-right: 2rem;
  }
`;

const Label = styled.p`
  font-weight: bold;
`;

const ActionBox: React.FC<{
  label: string;
  to: string;
  description: string;
}> = ({ label, to, description }) => (
  <Wrapper>
    <Label>
      <Link to={to}>{label}</Link>
    </Label>
    <P>{description}</P>
  </Wrapper>
);

export default ActionBox;
