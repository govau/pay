import * as React from "react";
import {
  styledComponents,
  ScrollToTopOnMount,
  Container,
  Footer
} from "@pay/web";
import Header from "./Header";

const { styled } = styledComponents;

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const Main = styled.div`
  min-height: 100vh; /* IE11 min-height fix */
  flex: 1;
  padding: 3rem 0 6rem;
`;

const Layout: React.FC = ({ children }) => (
  <Wrapper>
    <ScrollToTopOnMount />
    <Header />
    <Main role="main">
      <Container>{children}</Container>
    </Main>
    <Footer />
  </Wrapper>
);

export default Layout;
