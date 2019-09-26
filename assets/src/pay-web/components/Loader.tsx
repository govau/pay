import * as React from "react";
import styled, { css, keyframes } from "../styled-components";

interface Props {
  message?: string;
  className?: string;
}

const Wrapper = styled.div`
  margin: 2rem 0;
`;

const dotSize = "1.5rem";

const DotAnimation = keyframes`
  0%, 60%, 100% {
    transform: translateY(0rem)
  }
  25% {
    transform: translateY(-0.75rem)
  }
  50% {
    transform: translateY(0.4rem)
  }
`;

const DotsWrapper = styled.div`
  position: relative;
  height: ${dotSize};
  margin: 0 0 2rem;
`;

const dotStyle = css`
  display: block;
  position: absolute;
  top: 0;
  width: ${dotSize};
  height: ${dotSize};
  border-radius: 50%;
  background: ${props => props.theme.brandPrimary};
  animation: 1s ${DotAnimation} infinite cubic-bezier(0.38, 0.66, 0.65, 0.39);
`;

const Dots = styled.div`
  span {
    ${dotStyle};
    left: 2rem;
    animation-delay: 0.15s;
    &:first-child {
      left: 0;
      animation-delay: 0s;
    }
    &:last-child {
      left: 4rem;
      animation-delay: 0.3s;
    }
  }
`;

const Loader: React.StatelessComponent<Props> = ({ message = "Loading", className }) => {
  const [shouldRender, setShouldRender] = React.useState(false);

  React.useLayoutEffect(() => {
    setShouldRender(true);
  }, [shouldRender]);

  return (
    <Wrapper aria-live="assertive" role="alert" className={className}>
      <DotsWrapper aria-hidden="true">
        <Dots>
          <span />
          <span />
          <span />
        </Dots>
      </DotsWrapper>
      {shouldRender && message}
    </Wrapper>
  );
};

export default Loader;
