import * as React from "react";
import styled from "@pay/web/styled-components";
import { H2, P, tablet } from "@pay/web";

import { PaymentFragment } from "../__generated__/graphql";

const Wrapper = styled.div`
  margin-top: 3rem;
  padding: 1.5rem;
  position: sticky;
  top: 2em;
  right: 0;
  font-size: 1.2em;
  background-color: ${props => props.theme.colors.payLightGrey};
  border-top: 2px solid ${props => props.theme.colors.payBlue};

  @media ${tablet} {
    flex-basis: 33.3333%;
    margin-top: 0;
  }
`;

const Amount = styled.span`
  display: block;
  font-weight: 700;
  font-size: 2em;
`;

interface Props {
  payment: PaymentFragment;
}

const Summary: React.FC<Props> = ({ payment }) => (
  <Wrapper>
    <H2>Payment summary</H2>
    <P>{payment.description}</P>
    <P>
      Total amount: <Amount>${(payment.amount / 100).toFixed(2)}</Amount>
    </P>
  </Wrapper>
);

export default Summary;