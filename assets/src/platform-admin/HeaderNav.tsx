import * as React from "react";
import { useRouteMatch } from "react-router-dom";
import { Lozenge, Strong } from "@pay/web";
import {
  Container,
  PageInfo,
  SubNav,
  NavUl,
  NavLink
} from "../layout/Header/PrimaryNav";

const HeaderNav: React.FC = () => {
  const match = useRouteMatch();
  if (!match) {
    return null;
  }
  const { url } = match;
  return (
    <Container>
      <PageInfo>
        <Lozenge variant="pink">
          <Strong>Platform admin</Strong>
        </Lozenge>
      </PageInfo>
      <SubNav>
        <NavUl>
          <li>
            <NavLink to={`${url}/organisations`}>Organisations</NavLink>
          </li>
          <li>
            <NavLink to={`${url}/services`}>Services</NavLink>
          </li>
          <li>
            <NavLink to={`${url}/card-types`}>Card types</NavLink>
          </li>
        </NavUl>
      </SubNav>
    </Container>
  );
};

export default HeaderNav;
