import React from "react";
import styled from "@pay/web/styled-components";

interface Props {
  white?: boolean;
}

const Tag = styled.span<Props>`
  border: 2px solid
    ${props =>
      props.white ? props.theme.colors.white : props.theme.colors.black};
  border-radius: 6px;
  padding: 0 6px;
  color: ${props =>
    props.white ? props.theme.colors.white : props.theme.colors.black};
  font-weight: bold;
  font-size: 12px;
  margin-left: 0.5rem;
  margin-bottom: 2px;
  line-height: 18px;

  &:hover {
    text-decoration: none;
  }
`;

export const BetaTag: React.FC<Props> = props => <Tag {...props}>beta</Tag>;
