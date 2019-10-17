import * as React from "react";
import { Helmet } from "react-helmet";
import {
  PageTitle,
  ErrorAlert,
  P,
  Strong,
  LinkButton,
  Callout,
  H2,
  DescriptionList
} from "@pay/web";

import { ProductPaymentFragment } from "../__generated__/graphql";

interface Props {
  payment: ProductPaymentFragment;
}

// TODO: get from payment object.
const succeeded = false;

const StatusPage: React.FC<Props> = ({ payment }) =>
  succeeded ? (
    <>
      <Helmet>
        <title>Your payment was successful - {payment.product.name}</title>
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
        <dd>{payment.product.name}</dd>
        <dt>Total amount:</dt>
        <dd>${(payment.amount / 100).toFixed(2)}</dd>
      </DescriptionList>
    </>
  ) : (
    <>
      <Helmet>
        <title>Your payment has been declined - {payment.product.name}</title>
      </Helmet>
      <PageTitle title="Your payment has been declined" />
      <ErrorAlert
        title="Contact your bank for more details"
        message="No money has been taken from your account."
        showError
      ></ErrorAlert>
      <LinkButton
        to={`/products/${payment.product.service_name_slug}/${payment.product.name_slug}`}
      >
        Go back to try the payment again
      </LinkButton>
    </>
  );

export default StatusPage;
