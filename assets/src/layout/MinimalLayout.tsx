import * as React from "react";
import styled from "@pay/web/styled-components";
import { ContainerSmall, ContainerMedium, ScrollToTopOnMount } from "@pay/web";

import LiteHeader from "./Header/Lite";

interface Props {
  containerSize?: "sm" | "md";
}

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const Centered = styled.div``;

const Main = styled.div`
  min-height: 100vh; /* IE11 min-height fix */
  flex: 1;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
`;

const Layout: React.FC<Props> = ({ children, containerSize = "sm" }) => {
  const Container = containerSize === "md" ? ContainerMedium : ContainerSmall;
  return (
    <Wrapper>
      <ScrollToTopOnMount />
      <Main role="main">
        <Centered>
          <Container>
            <LiteHeader />
          </Container>
          <Container>{children}</Container>
        </Centered>
      </Main>
    </Wrapper>
  );
};

export default Layout;
