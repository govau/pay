import * as React from "react";

import styled from "../styled-components";
import { tablet } from "../media";

const Icon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25px"
    height="25px"
    viewBox="0 0 500 500"
    fill="#ffffff"
  >
    <g>
      <path
        d="M487.43,70.684H12.57C5.628,70.684,0,76.312,0,83.255V256.19c0,6.942,5.628,12.57,12.57,12.57h84.374v118.273H34.665
		c-6.942,0-12.571,5.629-12.571,12.571v17.142c0,6.941,5.629,12.569,12.571,12.569h149.7c6.942,0,12.569-5.628,12.569-12.569
		v-17.142c0-6.941-5.627-12.571-12.569-12.571h-62.28V268.76h261.118v118.273h-62.28c-6.941,0-12.569,5.629-12.569,12.571v17.142
		c0,6.941,5.628,12.569,12.569,12.569h149.701c6.942,0,12.569-5.628,12.569-12.569v-17.142c0-6.941-5.627-12.571-12.569-12.571
		h-62.28V268.76h79.086c6.942,0,12.57-5.628,12.57-12.57V83.255C500,76.312,494.372,70.684,487.43,70.684z M42.372,243.62h-17.23
		v-53.036l107.727-94.76h69.491L42.372,243.62z M135.373,243.62L295.951,95.825h68.677L204.05,243.62H135.373z M474.859,148.86
		l-107.729,94.76h-69.49L457.629,95.825h17.23V148.86L474.859,148.86z"
      />
    </g>
  </svg>
);

const color = "#f69900";

const Wrapper = styled.div`
  border: 3px solid ${color};
`;

const Heading = styled.div`
  padding: 1rem;
  font-weight: bold;
  font-size: 1.25em;
  background-color: ${color};
  color: white;

  > svg {
    margin-right: 1.5rem;
  }
`;

const MobileHeading = styled.span`
  @media ${tablet} {
    display: none;
  }
`;

const NonMobileHeading = styled.span`
  display: none;
  @media ${tablet} {
    display: inline-block;
  }
`;

const InnerWrapper = styled.div`
  padding: 1rem;
`;

const TODO: React.FC = ({ children }) => (
  <Wrapper>
    <Heading>
      <Icon />
      <MobileHeading>In development</MobileHeading>
      <NonMobileHeading>
        This section is in active development and is subject to change
      </NonMobileHeading>
    </Heading>
    <InnerWrapper>{children}</InnerWrapper>
  </Wrapper>
);

export default TODO;
