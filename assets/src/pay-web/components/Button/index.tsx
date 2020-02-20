import styles, { ButtonProps as BasicButtonProps } from "./styles";
import styled from "../../styled-components";

export interface Props extends BasicButtonProps {
  type?: "submit" | "button";
}

const Button = styled("button")<Props>`
  ${styles}
`;

const ButtonGroup = styled.section`
  * + & {
    margin-top: 1em;
  }
`;

export { Button as default, ButtonGroup };
