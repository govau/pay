import * as React from "react";
import { useRouteMatch } from "react-router-dom";
import { Lozenge, Strong } from "@pay/web";
import {
  Container,
  PageInfo,
  SubNav,
  NavUl,
  Li,
  NavLink
} from "../layout/Header/PrimaryNav";

const HeaderNav: React.FC = () => {
  const match = useRouteMatch("");
  if (!match) {
    return null;
  }
  console.log(match);
  const { url } = match;
  return (
    <Container>
      <PageInfo>
        <Lozenge variation="pink">
          <Strong>Platform admin</Strong>
        </Lozenge>
      </PageInfo>
      <SubNav>
        <NavUl>
          <Li>
            <NavLink to={`${url}/organisations`}>Organisations</NavLink>
          </Li>
          <Li>
            <NavLink to={`${url}/services`}>Services</NavLink>
          </Li>
          <Li>
            <NavLink to={`${url}/card-types`}>Card types</NavLink>
          </Li>
        </NavUl>
      </SubNav>
    </Container>
  );
};

export default HeaderNav;
