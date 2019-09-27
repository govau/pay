import * as React from "react";
import { useRouteMatch } from "react-router-dom";
import { PageTitle, Link } from "@pay/web";

const DashboardPage: React.FunctionComponent = () => {
  const match = useRouteMatch("");
  if (!match) {
    return null;
  }
  const { url } = match;

  return (
    <>
      <PageTitle title="Platform admin" />
      <ul>
        <li>
          <Link to={`${url}/organisations`}>Organisations</Link>
        </li>
        <li>
          <Link to={`${url}/services`}>Services</Link>
        </li>
        <li>
          <Link to={`${url}/card-types`}>Card types</Link>
        </li>
      </ul>
    </>
  );
};

export default DashboardPage;
