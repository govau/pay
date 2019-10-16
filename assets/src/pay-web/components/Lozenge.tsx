import styled, { css } from "../styled-components";

interface Props {
  variant: "dark" | "light" | "flair" | "pink";
}

const Lozenge = styled.span<Props>`
  font-size: 1.4rem;
  ${({ theme, variant }) => {
    switch (variant) {
      case "dark":
        return css`
          border: 1px solid ${theme.colors.black};
        `;
      case "light":
        return css`
          border: 1px solid ${theme.colors.white};
        `;
      case "pink":
        return css`
          background-color: ${theme.colors.payPink};
        `;
      case "flair":
        return css`
          background-color: ${theme.colors.flair};
        `;
    }
  }};
  padding: 2px 8px;
  border-radius: 2px;

  * + & {
    margin-left: 1em;
  }
`;

export default Lozenge;
