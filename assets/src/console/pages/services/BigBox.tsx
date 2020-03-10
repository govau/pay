import * as React from "react";
import styled, { css } from "@pay/web/styled-components";

const Wrapper = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.p`
  font-weight: bold;
`;

const Box = styled.div<{ variant: "positive" | "negative" | "neutral" }>`
  display: flex;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  ${({ theme, variant }) => {
    switch (variant) {
      case "positive":
        return css`
          border: 1px solid ${theme.colors.chateauGreen};
        `;
      case "negative":
        return css`
          border: 1px solid ${theme.colors.payBadRed};
        `;
      case "neutral":
        return css`
          border: 1px solid ${theme.colors.payDarkGrey};
        `;
    }
  }};
  border-left-width: 3px;
  font-size: 2.4rem;
  ${({ theme }) => css`
    background-color: ${theme.colors.payLightGrey};
  `}
`;

const BigBox: React.FC<{
  label: string;
  count: number;
  total: number;
  variant: "positive" | "negative" | "neutral";
}> = ({ label, count, total, variant }) => {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Box variant={variant}>
        <span>{count}</span>
        <span>${(total / 100).toFixed(2)}</span>
      </Box>
    </Wrapper>
  );
};

export default BigBox;
