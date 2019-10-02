import styled from "../styled-components";
import { desktop } from "../media";

const Container = styled.div`
  padding: 0 1rem;

  @media ${desktop} {
    max-width: 90rem;
    margin: 0 auto;
  }
`;

const ContainerSmall = styled(Container)`
  @media ${desktop} {
    max-width: 40rem;
  }
`;

const ContainerMedium = styled(Container)`
  @media ${desktop} {
    max-width: 50rem;
  }
`;

export { Container as default, Container, ContainerSmall, ContainerMedium };
