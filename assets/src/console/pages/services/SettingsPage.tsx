import * as React from "react";
import { Helmet } from "react-helmet";
import { PageTitle, Link, P, styled } from "@pay/web";

import { GatewayAccountType } from "../../__generated__/graphql";
import { BreadBox } from "@pay/web/components/Breadcrumb";

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Li = styled.li`
  & ${Link} + ${P} {
    margin-top: 0;
  }
`;

export interface props {
  service: { externalId: string; name: string };
  gatewayAccounts: { externalId: string; type: GatewayAccountType }[];
}

const SettingsPage: React.FC<props> = ({ service, gatewayAccounts }) => {
  let gatewayAccount = null;
  if (gatewayAccounts && gatewayAccounts.length > 0) {
    const live = gatewayAccounts.filter(
      ga => ga.type === GatewayAccountType.Live
    );
    if (live.length > 0) {
      gatewayAccount = live[0];
    } else {
      gatewayAccount = gatewayAccounts[0];
    }
  }

  return (
    <>
      <Helmet>
        <title>Settings - {service.name}</title>
      </Helmet>
      <PageTitle
        title="Service settings"
        breadcrumbs={BreadBox.Settings({ service })}
      />
      <Ul>
        <Li>
          <Link to={`/console/services/${service.externalId}/edit-name`}>
            Edit name
          </Link>
          <P>
            Change the name of this service as it appears on payment pages and
            for administrators.
          </P>
        </Li>

        <Li>
          <Link to={`/console/services/${service.externalId}/team`}>
            Manage team members
          </Link>
          <P>
            Invite new team members or change the role of an existing member.
          </P>
        </Li>

        {gatewayAccount && (
          <>
            <Li>
              <Link
                to={`/console/services/${service.externalId}/gateway-accounts/${gatewayAccount.externalId}/credentials`}
              >
                Configure payment provider
              </Link>
              <P>
                Set up a payment provider to process payments for your service.
              </P>
            </Li>

            <Li>
              <Link
                to={`/console/services/${service.externalId}/gateway-accounts/${gatewayAccount.externalId}/card-types`}
              >
                Manage payment types
              </Link>
              <P>Choose which credit and debit cards you want to accept.</P>
            </Li>
          </>
        )}
      </Ul>
    </>
  );
};

export default SettingsPage;
