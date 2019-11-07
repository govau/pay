import styled from "@pay/web/styled-components";
import { tablet } from "@pay/web";

const Split = styled.div`
  @media ${tablet} {
    display: flex;
    flex-flow: row nowrap;
    align-items: start;
    justify-content: space-between;
  }
`;

export const Content = styled.section`
  @media ${tablet} {
    flex-basis: 50%;
  }
`;

export default Split;
