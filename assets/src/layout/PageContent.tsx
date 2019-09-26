import { styledComponents, desktop } from "@pay/web";

const { styled } = styledComponents;

const PageContent = styled.div`
  @media ${desktop} {
    max-width: 87rem;
  }
`;

export default PageContent;
