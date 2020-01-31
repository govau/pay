import * as React from "react";
import styled from "@pay/web/styled-components";
import { tablet } from "@pay/web";

export const Split = styled.div<{ reverse?: boolean }>`
  display: flex;
  flex-flow: ${props => (props.reverse ? "column" : "column-reverse")} nowrap;

  @media ${tablet} {
    flex-flow: row nowrap;
  }
`;

export const Content = styled.section`
  flex-grow: 99; /* take up all the space that aside isn't. any N works */
`;

export const Aside = styled.aside`
  @media ${tablet} {
    flex-basis: 28%;
    text-align: right;
    margin-left: 2rem;
  }
`;

export const SidebarLayout: React.FC<{
  sidebar?: React.ReactNode;
  important?: boolean;
}> = ({ children, sidebar = null, important = true }) =>
  sidebar ? (
    <Split reverse={!important}>
      <Content>{children}</Content>
      <Aside>{sidebar}</Aside>
    </Split>
  ) : (
    <>{children}</>
  );

export default Split;
