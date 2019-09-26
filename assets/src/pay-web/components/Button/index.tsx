import styles, { ButtonProps as BasicButtonProps } from "./styles";
import styled from "../../styled-components";

export interface Props extends BasicButtonProps {
  type?: "submit" | "button";
}

const Button = styled("button")<Props>`
  ${styles}
`;

export default Button;
