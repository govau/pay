import * as React from "react";
import { Lozenge, Strong } from "@pay/web";
import { Container, PageInfo } from "../layout/Header/PrimaryNav";

const HeaderNav: React.FC = () => {
  return (
    <Container>
      <PageInfo>
        <Lozenge variation="pink">
          <Strong>Products</Strong>
        </Lozenge>
      </PageInfo>
    </Container>
  );
};

export default HeaderNav;
