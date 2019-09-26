import * as React from "react";
import styled from "../../styled-components";

interface SVGProps {
  className?: string;
}

const SVG: React.FC<SVGProps> = props => (
  <svg
    width="19"
    height="15"
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
  >
    <path
      d="M18.6 3.4c.2-.2.2-.5 0-.7L16.3.4c-.2-.2-.5-.2-.7 0L7 9 3.4 5.4c-.2-.2-.5-.2-.7 0L.4 7.7c-.2.2-.2.5 0 .7l6.3 6.3c.2.2.5.2.7 0L18.6 3.4z"
      fillRule="nonzero"
    />
  </svg>
);

interface TickProps {
  fill?: string;
}

const TickIcon = styled(SVG)<TickProps>`
  path {
    fill: ${props => props.fill || props.theme.colors.white};
  }
`;

export default TickIcon;
