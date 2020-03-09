import * as React from "react";
import { Redirect } from "react-router-dom";
import {
  styled,
  ScrollToTopOnMount,
  Container,
  Footer,
  P,
  Link,
  ExternalLink,
  H1,
  desktop,
  Loader
} from "@pay/web";

import Header from "../../layout/Header";
import { useAuth0 } from "../../auth/AuthContext";
import DefaultLayout from "../../layout";

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const Main = styled.div`
  min-height: 50vh; /* IE11 min-height fix, changed to 50vh for home page */
  flex: 1;
  padding: 1rem 0 6rem;
`;

const ContentMain = styled(Main)`
  background-color: #0a6fc7;
  color: #fff;

  ${H1} {
    @media ${desktop} {
      margin-bottom: 5rem;
    }
  }

  ${P} {
    font-size: 2rem;
  }

  ${ExternalLink} {
    color: #fff;
  }
`;

const HomePage: React.FC = () => {
  const { user, isInitializing } = useAuth0();

  if (user && user.email_verified) {
    return <Redirect to="/console" />;
  }

  if (isInitializing) {
    return (
      <DefaultLayout>
        <Loader />
      </DefaultLayout>
    );
  }

  if (user) {
    return (
      <DefaultLayout>
        <H1>Almost there</H1>
        <P>You’ve successfully signed up. Just one more thing.</P>
        <P>Please check your email and verify your account to continue.</P>
        <P>
          <Link to={window.location}>Refresh</Link>
        </P>
      </DefaultLayout>
    );
  }

  return (
    <Wrapper>
      <ScrollToTopOnMount />
      <Header />
      <ContentMain role="main">
        <Container>
          <H1>Collect online payments from your customers</H1>
          <P>
            Pay.gov.au is a platform designed to make it simple and quick to
            accept online payments from users of public services.
          </P>
          <P>
            We’re still in early development of Pay.gov.au. If you’ve got a use
            case and want to help us trial the platform, please{" "}
            <ExternalLink href="/TODO">get in touch</ExternalLink> with the
            team.
          </P>
          <P>
            <ExternalLink href="/TODO">Read more</ExternalLink> about the
            platform.
          </P>
        </Container>
      </ContentMain>
      <Footer />
    </Wrapper>
  );
};

export default HomePage;
