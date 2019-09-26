import * as React from "react";

import styled, { css } from "../styled-components";
import { Link, LinkProps } from "../components/Link";
import styles, {
  ButtonProps,
  disabledStyles
} from "../components/Button/styles";

interface LinkButtonProps extends LinkProps, ButtonProps {
  disabled?: boolean;
}

const Stripped: React.FC<LinkButtonProps> = ({
  variation,
  stretch,
  disabled,
  padded,
  ...props
}) => <Link {...props} />;

const LinkButton = styled(Stripped)`
  ${styles};
  ${props => (props.disabled ? disabledStyles : css``)};
`;

export { LinkButton };
