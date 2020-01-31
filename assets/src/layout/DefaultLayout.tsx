import * as React from "react";
import {
  styledComponents,
  ScrollToTopOnMount,
  Container,
  Footer
} from "@pay/web";
import Header from "./Header";

const { styled } = styledComponents;

const IE11Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const Main = styled.div`
  flex: 1;
  padding: 1rem 0 6rem;
`;

const DefaultLayout: React.FC = ({ children }) => (
  <IE11Wrapper>
    <Wrapper>
      <ScrollToTopOnMount />
      <Header />
      <Main role="main">
        <Container>{children}</Container>
      </Main>
      <Footer />
    </Wrapper>
  </IE11Wrapper>
);

export default DefaultLayout;
