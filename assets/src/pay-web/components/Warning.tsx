import * as React from "react";
import styled from "../styled-components";
import { WarningIcon } from "../../components/icons/WarningIcon";

const Wrapper = styled.div`
  display: flex;
  background: ${props => props.theme.colors.lightGrey};
  border-left: 4px solid ${props => props.theme.colors.orange};
  padding: 1.5rem 1rem 1.5rem 2.5rem;
  margin: 2rem 0 2rem 0;

  > svg {
    margin-right: 1.2rem;
    overflow: visible;
  }
  > div {
    margin-top: 0.8rem;
  }
`;

export const Warning: React.FC = ({ children }) => (
  <Wrapper>
    <WarningIcon />
    <div>{children}</div>
  </Wrapper>
);
