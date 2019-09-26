import React from "react";

interface Props {
  colour?: string;
}

const LeftArrowIcon: React.FC<Props> = ({ colour = "#0F6493" }) => (
  <svg width="12" height="10" xmlns="http://www.w3.org/2000/svg">
    <path
      fill={colour}
      d="M4.852 9L0 4.5 4.852 0l.887.823-3.354 3.096H12V5.08H2.385L5.74 8.177z"
      fillRule="evenodd"
    />
  </svg>
);

export { LeftArrowIcon };
