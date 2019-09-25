import * as React from "react";
import styled from "../../styled-components";

interface SVGProps {
  className?: string;
}

interface ArrowProps {
  fill?: string;
  direction?: "up" | "right" | "down" | "left";
  animate?: boolean;
}

const SVG: React.FC<SVGProps> = props => (
  <svg
    width="12"
    height="7"
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
  >
    <path
      d="M9.95842 0L5.63684 4.32158 1.31526 0 0 1.31526l5.63684 5.63685 5.63684-5.63685z"
      fill="#00698F"
      fillRule="nonzero"
    />
  </svg>
);

const ArrowIcon = styled(SVG)<ArrowProps>`
  ${props => {
    switch (props.direction) {
      case "up":
        return "transform: rotate(-180deg);";
      case "right":
        return "transform: rotate(-90deg);";
      case "left":
        return "transform: rotate(90deg);";
      default:
        return "";
    }
  }}
  ${props => (props.animate ? "transition: transform 225ms;" : "")}
  path {
    fill: ${props => props.fill || props.theme.linkColor};
  }
`;

export default ArrowIcon;
