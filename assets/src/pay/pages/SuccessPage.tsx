import * as React from "react";
import { Helmet } from "react-helmet";
import { PageTitle, P, H2, Strong, Callout, DescriptionList } from "@pay/web";

import { PaymentFragment } from "../__generated__/graphql";

interface Props {
  payment: PaymentFragment;
}

const SuccessPage: React.FC<Props> = ({ payment }) => (
  <>
    <Helmet>
      <title>Your payment was successful - {payment.description}</title>
    </Helmet>
    <PageTitle title="Your payment was successful" />
    <Callout>
      <P>
        Your payment reference number is <Strong>{payment.reference}</Strong>
      </P>
    </Callout>
    <H2>Payment summary</H2>
    <DescriptionList>
      <dt>Payment for:</dt>
      <dd>{payment.description}</dd>
      <dt>Total amount:</dt>
      <dd>${(payment.amount / 100).toFixed(2)}</dd>
    </DescriptionList>
  </>
);

export default SuccessPage;
