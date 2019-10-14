import styled, { keyframes, css } from "../../styled-components";

const animation = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

const CircleLoader = styled.div`
  ${props => {
    const { white, midGray } = props.theme.colors;
    return css`
      font-size: 1rem;
      text-indent: -9999em;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      background: ${midGray};
      background: -moz-linear-gradient(
        left,
        ${midGray} 10%,
        rgba(255, 255, 255, 0) 42%
      );
      background: -webkit-linear-gradient(
        left,
        ${midGray} 10%,
        rgba(255, 255, 255, 0) 42%
      );
      background: -o-linear-gradient(
        left,
        ${midGray} 10%,
        rgba(255, 255, 255, 0) 42%
      );
      background: -ms-linear-gradient(
        left,
        ${midGray} 10%,
        rgba(255, 255, 255, 0) 42%
      );
      background: linear-gradient(
        to right,
        ${midGray} 10%,
        rgba(255, 255, 255, 0) 42%
      );
      position: relative;
      animation: ${animation} 1.4s infinite linear;
      transform: translateZ(0);

      &:before {
        width: 50%;
        height: 50%;
        background: ${midGray};
        border-radius: 100% 0 0 0;
        position: absolute;
        top: 0;
        left: 0;
        content: "";
      }

      &:after {
        background: ${white};
        width: 75%;
        height: 75%;
        border-radius: 50%;
        content: "";
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
      }
    `;
  }}
`;

export default CircleLoader;
