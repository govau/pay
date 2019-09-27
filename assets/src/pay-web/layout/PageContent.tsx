import styled from "../styled-components";
import { desktop } from "../media";

const PageContent = styled.div`
  @media ${desktop} {
    max-width: 87rem;
  }
`;

export default PageContent;
