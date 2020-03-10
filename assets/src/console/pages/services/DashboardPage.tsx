import * as React from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import queryString from "query-string";

import { styled, PageTitle, P, Button, Link, tablet } from "@pay/web";

import { GatewayAccountType } from "../../../__generated__/schema";
import BigBox from "./BigBox";
import ActionBox from "./ActionBox";

const SinceLinks = styled.ul`
  margin: 0 0 2rem 0;
  padding: 0;
  list-style: none;

  @media ${tablet} {
    margin: 0 0 4rem 0;
  }

  li {
    display: inline;
    margin-right: 2rem;
  }
`;

const SinceItem: React.FC<{
  label: string;
  value: number;
}> = ({ label, value }) => {
  const location = useLocation();

  const search = queryString.parse(location.search, { parseNumbers: true });

  if (search.since === value || (!search.since && value === 0)) {
    return <li>{label}</li>;
  }

  return (
    <li>
      <Link
        to={{
          ...location,
          search: queryString.stringify({ ...search, since: value })
        }}
      >
        {label}
      </Link>
    </li>
  );
};

const BigBoxes = styled.div`
  @media ${tablet} {
    display: flex;

    > * {
      flex: 33%;

      &:not(:last-child) {
        margin-right: 4rem;
      }
    }
  }
`;

const ExplainNumbersSection = styled.div`
  margin-bottom: 4rem;

  ${Button} {
    text-align: left;
  }
`;

const ActionBoxes = styled.div`
  @media ${tablet} {
    min-height: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
`;

interface Props {
  service: { externalId: string; name: string };
  gatewayAccounts: {
    externalId: string;
    type: GatewayAccountType;
  }[];
}

const DashboardPage: React.FC<Props> = ({ service }) => {
  const [explainNumbers, setExplainNumbers] = React.useState(false);

  return (
    <>
      <Helmet>
        <title>Overview - {service.name}</title>
      </Helmet>
      <PageTitle title="Overview" />
      <SinceLinks>
        <SinceItem label="Today" value={0} />
        <SinceItem label="Yesterday" value={-1} />
        <SinceItem label="Last 7 days" value={-7} />
        <SinceItem label="Last 30 days" value={-30} />
      </SinceLinks>
      <BigBoxes>
        <BigBox
          label="Successful payments"
          count={13}
          total={15500}
          variant="positive"
        />
        <BigBox
          label="Successful refunds"
          count={13}
          total={15500}
          variant="negative"
        />
        <BigBox label="Net income" count={13} total={15500} variant="neutral" />
      </BigBoxes>
      <ExplainNumbersSection>
        <P>
          <Button
            variant="link"
            onClick={() => setExplainNumbers(!explainNumbers)}
          >
            <span aria-hidden="true">{explainNumbers ? "-" : "+"}</span> How
            these numbers are calculated
          </Button>
        </P>
        {explainNumbers && (
          <P>
            Net income is calculated by subtracting the successful refunds from
            the successful payments for the selected period.
          </P>
        )}
      </ExplainNumbersSection>
      <ActionBoxes>
        <ActionBox
          label="Make a demo payment"
          to="/TODO"
          description="Try the payment experience as a user. Then view the completed payment as an administrator on Pay.gov.au."
        />
        <ActionBox
          label="Test with your users"
          to="/TODO"
          description="Create a reusable link to integrate your service prototype with Pay.gov.au and test with users."
        />
        <ActionBox
          label="Manage team members"
          to={`/console/services/${service.externalId}/team`}
          description="Invite new team members to help manage this service."
        />
        <ActionBox
          label="Request a live account"
          to="/TODO"
          description="To request a live account, tell us your organisation’s name, your payment service provider and agree to our terms and conditions. Once that’s done our team will email you."
        />
      </ActionBoxes>
    </>
  );
};

export default DashboardPage;
