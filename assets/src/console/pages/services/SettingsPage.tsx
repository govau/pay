import * as React from "react";
import { Helmet } from "react-helmet";
import { PageTitle, Link } from "@pay/web";

import { Service } from "../../__generated__/graphql";

const SettingsPage: React.FC<{
  service: Service;
}> = ({ service }) => {
  return (
    <>
      <Helmet>
        <title>Settings - {service.name}</title>
      </Helmet>
      <PageTitle title="Settings" />
      <ul>
        <li>
          <Link to={`/console/services/${service.id}/edit-name`}>
            Edit name
          </Link>{" "}
        </li>
        <li>
          <Link to={`/console/services/${service.id}/team`}>
            Manage service team members
          </Link>
        </li>
        <li>Manage API keys</li>
        <li>Manage payment service provider account credentials</li>
        <li>Manage the cards that you accept</li>
      </ul>
    </>
  );
};

export default SettingsPage;
